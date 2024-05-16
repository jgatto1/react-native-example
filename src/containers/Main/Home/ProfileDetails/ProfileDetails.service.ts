import { BackendClient } from 'service/backend-client.service';
import { Res, validateResponse } from 'model/backend';
import { Settings } from 'model/backend/login';
import { InterestGroup } from 'model/backend/interest-group';

class ProfileDetailsServiceImpl {
  fetchUserInfo = (userId: string): Promise<Settings> => {
    return BackendClient.get<Res<{ user: any }>>(`/user/${userId}`)
      .then(validateResponse)
      .then((res) => res.user.settings)
      .catch((err) => console.warn(err, `/user/${userId}`));
  };
  fetchUserInterestGroups = (userId: string): Promise<InterestGroup[]> => {
    return BackendClient.get<Res<{ interest_groups: any }>>(`/user/${userId}/interest_groups`)
      .then(validateResponse)
      .then((res) => res.interest_groups)
      .catch((err) => console.warn(err, `/user/${userId}/interest_groups`));
  };
}

export const ProfileDetailsService = new ProfileDetailsServiceImpl();
