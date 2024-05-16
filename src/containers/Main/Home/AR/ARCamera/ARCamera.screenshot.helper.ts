import ImageResizer from 'react-native-image-resizer';
import { Image, Permission, PermissionsAndroid } from 'react-native';

interface ImageSize {
  width: number;
  height: number;
}

const getSize = (url: string): Promise<ImageSize> => {
  return new Promise((resolve, reject) => {
    Image.getSize(
      url,
      (width, height) => resolve({ width, height }),
      (e) => reject(e)
    );
  });
};

export const resize = async (url: string) => {
  const size = await getSize(url);
  return ImageResizer.createResizedImage(
    url,
    Math.floor(size.width * 0.5),
    Math.floor(size.height * 0.5),
    'JPEG',
    80,
    0,
    undefined,
    true
  );
};

export const retry = async <T>(
  call: (info: string) => Promise<T>,
  evaluator: (res: T) => boolean,
  times: number
): Promise<T> => {
  let i = 0;
  let info = 'Fetching scene screenshot';
  while (i < times) {
    try {
      const result = await call(info);
      if (evaluator(result)) {
        return result;
      } else {
        console.log(`Retrying due to no result... Fetching again scene photo (${i}/${times})`);
      }
    } catch (e) {
      console.warn(`Fail to call action. Time: ${times}`, e);
      console.log(`Retrying due to error '${e.message}'... Fetching again scene photo (${i}/${times})`);
    }
    i++;
  }
  throw Error(`Failed to call action. Intents: ${times}`);
};

export const permission = async (perm: Permission) => {
  const can = await PermissionsAndroid.check(perm);
  if (can) {
    return true;
  }
  const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE, {
    title: 'Seeking Safety save photo permission',
    message: 'Seeking Safety App needs access to write/read storage to storage',
    buttonNegative: 'Cancel',
    buttonPositive: 'OK',
  });
  return result === 'granted';
};
