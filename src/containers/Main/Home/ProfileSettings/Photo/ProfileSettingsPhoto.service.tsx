import { ProfilePhoto } from 'containers/OnBoarding/ProfileFormSwiper/context/model';
import { BackendUpload } from 'service/backend-client.upload.service';
import { CommonResponse, resError, validateResponse } from 'model/backend';
import { User } from 'model/backend/login';

class ProfileSettingsPhotoServiceImpl {
  async updateAvatar(userId: string, photo: ProfilePhoto): Promise<User | null> {
    if (!photo.base64) {
      return null;
    }
    return BackendUpload.post<CommonResponse<'user', User>>(`/user/${userId}/avatar/create`, {
      filename: 'avatar.png',
      base64: photo.base64,
      type: 'image/png',
    })
      .then(validateResponse)
      .then((res) => res.user)
      .catch((err) => {
        console.warn(`Cannot add user ${userId} avatar. ${resError(err?.response?.data)}`, err);
        return null;
      });
  }
}

export const ProfileSettingsPhotoService = new ProfileSettingsPhotoServiceImpl();
