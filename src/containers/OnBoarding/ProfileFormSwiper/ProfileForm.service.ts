import { ProfileFormData, ProfileInterestGroup } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import { BackendClient } from 'service/backend-client.service';
import { User } from 'model/backend/login';
import { UserSettings } from 'model/backend/user.settings';
import { CommonResponse, FGroups, FUser, isErrorRes, Res, resError } from 'model/backend';
import { BackendUpload } from 'service/backend-client.upload.service';

export interface UserWithInterestGroups {
  user: User;
  interestGroups?: ProfileInterestGroup[] | null;
}

class ProfileFormServiceImpl {
  async sendForm(userId: string, profile: ProfileFormData): Promise<UserWithInterestGroups> {
    const data: UserSettings = {
      about_me_long: profile.aboutMe?.excerpt,
      about_me_short: profile.aboutMe?.fullText,
      emotional_status: profile.aboutMe?.emotionalStatus ? profile.aboutMe?.emotionalStatus + 1 : undefined,
      hide_about_me: !profile.aboutMe?.public,
      hide_interest_groups: !profile.groupsPublic,
      is_onboarded: true,
      display_name: profile.info?.publicName || '',
    };
    return BackendClient.put<CommonResponse<'user', User>>(`/user/${userId}/settings`, data)
      .then((res) => {
        if (!res.data || isErrorRes(res.data) || !res.data.user) {
          throw new Error(`Cannot update user  ${userId} settings: ${resError(res?.data)}`);
        }
        return res.data.user;
      })
      .then(async (user) => {
        const avatarPromise = this.safeAddAvatar(userId, profile);
        const groupsPromise = this.safeAddInterestGroups(userId, profile);
        return {
          user: (await avatarPromise) || user,
          interestGroups: await groupsPromise,
        };
      });
  }

  async safeAddInterestGroups(userId: string, profile: ProfileFormData): Promise<ProfileInterestGroup[] | null> {
    if (!profile.groups || !profile.groups.length) {
      return null;
    }
    const groupsData = { interest_group_ids: profile.groups.map(({ id }) => id) };
    return BackendClient.put<Res<FUser & FGroups>>(`/user/${userId}/interest_groups/add`, groupsData)
      .then((res) => {
        if (!res.data || isErrorRes(res.data) || !res.data.interest_groups) {
          throw new Error(`Cannot add user ${userId} interest groups ${resError(res?.data)}`);
        }
        return res.data.interest_groups;
      })
      .catch((err) => {
        console.warn(`Cannot update user ${userId} interest groups. ${resError(err?.response?.data)}`, err);
        return null;
      });
  }

  async safeAddAvatar(userId: string, profile: ProfileFormData): Promise<User | null> {
    if (!profile.photo?.base64) {
      return null;
    }
    return BackendUpload.post<CommonResponse<'user', User>>(`/user/${userId}/avatar/create`, {
      filename: 'avatar.png',
      base64: profile.photo.base64,
      type: 'image/png',
    })
      .then((res) => {
        if (!res.data || isErrorRes(res.data) || !res.data.user) {
          throw new Error(`Cannot add user ${userId} avatar: ${resError(res?.data)}`);
        }
        return res.data.user;
      })
      .catch((err) => {
        console.warn(`Cannot add user ${userId} avatar. ${resError(err?.response?.data)}`, err);
        return null;
      });
  }
}

export const ProfileFormService = new ProfileFormServiceImpl();
