import { ImageRequireSource } from 'react-native';

export interface Avatar {
  source: ImageRequireSource;
  getBase64: () => Promise<string>;
}

const AVATARS_B64 = require('./avatars.json');

/**
 * The avatar will be pushed to backend as base64 content.
 * The workaround to do this is using a json which already contains
 * the base64 content of each image. This is because static images couldn't be
 * read from file using gs dynamically.
 * @param required a require of image to use as <Image source={require} />
 * @param path The key of avatar into the file 'avatars.json'
 */
function avatar(required: any, path: string): Avatar {
  return {
    source: required,
    getBase64: async () => {
      const avatarJson = AVATARS_B64[path];
      if (!avatarJson) {
        throw new Error(`Add ${path} to avatars.json`);
      }
      return avatarJson.base64;
    },
  };
}

export const AVATARS: Avatar[] = [
  avatar(require('./Asset-1.png'), 'Asset-1.png'),
  avatar(require('./Asset-2.png'), 'Asset-2.png'),
  avatar(require('./Asset-3.png'), 'Asset-3.png'),
  avatar(require('./Asset-4.png'), 'Asset-4.png'),
  avatar(require('./Asset-5.png'), 'Asset-5.png'),
  avatar(require('./Asset-6.png'), 'Asset-6.png'),
  avatar(require('./Asset-7.png'), 'Asset-7.png'),
  avatar(require('./Asset-8.png'), 'Asset-8.png'),
  avatar(require('./Asset-9.png'), 'Asset-9.png'),
  avatar(require('./Asset-10.png'), 'Asset-10.png'),
  avatar(require('./Asset-11.png'), 'Asset-11.png'),
  avatar(require('./Asset-12.png'), 'Asset-12.png'),
  avatar(require('./Asset-13.png'), 'Asset-13.png'),
  avatar(require('./Asset-14.png'), 'Asset-14.png'),
  avatar(require('./Asset-15.png'), 'Asset-15.png'),
  avatar(require('./Asset-16.png'), 'Asset-16.png'),
  avatar(require('./Asset-17.png'), 'Asset-17.png'),
  avatar(require('./Asset-18.png'), 'Asset-18.png'),
  avatar(require('./Asset-19.png'), 'Asset-19.png'),
  avatar(require('./Asset-20.png'), 'Asset-20.png'),
  avatar(require('./Asset-21.png'), 'Asset-21.png'),
  avatar(require('./Asset-22.png'), 'Asset-22.png'),
  avatar(require('./Asset-23.png'), 'Asset-23.png'),
  avatar(require('./Asset-24.png'), 'Asset-24.png'),
  avatar(require('./Asset-25.png'), 'Asset-25.png'),
  avatar(require('./Asset-26.png'), 'Asset-26.png'),
  avatar(require('./Asset-27.png'), 'Asset-27.png'),
  avatar(require('./Asset-28.png'), 'Asset-28.png'),
  avatar(require('./Asset-29.png'), 'Asset-29.png'),
  avatar(require('./Asset-30.png'), 'Asset-30.png'),
  avatar(require('./Asset-31.png'), 'Asset-31.png'),
  avatar(require('./Asset-32.png'), 'Asset-32.png'),
  avatar(require('./Asset-33.png'), 'Asset-33.png'),
  avatar(require('./Asset-34.png'), 'Asset-34.png'),
  avatar(require('./Asset-35.png'), 'Asset-35.png'),
  avatar(require('./Asset-36.png'), 'Asset-36.png'),
  avatar(require('./Asset-37.png'), 'Asset-37.png'),
  avatar(require('./Asset-38.png'), 'Asset-38.png'),
  avatar(require('./Asset-39.png'), 'Asset-39.png'),
  avatar(require('./Asset-40.png'), 'Asset-40.png'),
  avatar(require('./Asset-41.png'), 'Asset-41.png'),
  avatar(require('./Asset-42.png'), 'Asset-42.png'),
  avatar(require('./Asset-43.png'), 'Asset-43.png'),
  avatar(require('./Asset-44.png'), 'Asset-44.png'),
  avatar(require('./Asset-45.png'), 'Asset-45.png'),
  avatar(require('./Asset-46.png'), 'Asset-46.png'),
  avatar(require('./Asset-47.png'), 'Asset-47.png'),
  avatar(require('./Asset-48.png'), 'Asset-48.png'),
  avatar(require('./Asset-11024.png'), 'Asset-11024.png'),
  avatar(require('./Asset-21024.png'), 'Asset-21024.png'),
  avatar(require('./Asset-31024.png'), 'Asset-31024.png'),
  avatar(require('./Asset-41024.png'), 'Asset-41024.png'),
  avatar(require('./Asset-51024.png'), 'Asset-51024.png'),
  avatar(require('./Asset-61024.png'), 'Asset-61024.png'),
  avatar(require('./Asset-71024.png'), 'Asset-71024.png'),
  avatar(require('./Asset-81024.png'), 'Asset-81024.png'),
  avatar(require('./Asset-91024.png'), 'Asset-91024.png'),
  avatar(require('./Asset-101024.png'), 'Asset-101024.png'),
  avatar(require('./Asset-111024.png'), 'Asset-111024.png'),
  avatar(require('./Asset-121024.png'), 'Asset-121024.png'),
  avatar(require('./Asset-131024.png'), 'Asset-131024.png'),
  avatar(require('./Asset-141024.png'), 'Asset-141024.png'),
  avatar(require('./Asset-151024.png'), 'Asset-151024.png'),
  avatar(require('./Asset-161024.png'), 'Asset-161024.png'),
  avatar(require('./Asset-171024.png'), 'Asset-171024.png'),
  avatar(require('./Asset-181024.png'), 'Asset-181024.png'),
  avatar(require('./Asset-191024.png'), 'Asset-191024.png'),
  avatar(require('./Asset-201024.png'), 'Asset-201024.png'),
  avatar(require('./Asset-211024.png'), 'Asset-211024.png'),
  avatar(require('./Asset-221024.png'), 'Asset-221024.png'),
  avatar(require('./Asset-231024.png'), 'Asset-231024.png'),
  avatar(require('./Asset-241024.png'), 'Asset-241024.png'),
  avatar(require('./Asset-251024.png'), 'Asset-251024.png'),
  avatar(require('./Asset-261024.png'), 'Asset-261024.png'),
  avatar(require('./Asset-271024.png'), 'Asset-271024.png'),
  avatar(require('./Asset-281024.png'), 'Asset-281024.png'),
  avatar(require('./Asset-291024.png'), 'Asset-291024.png'),
  avatar(require('./Asset-301024.png'), 'Asset-301024.png'),
  avatar(require('./Asset-311024.png'), 'Asset-311024.png'),
  avatar(require('./Asset-321024.png'), 'Asset-321024.png'),
  avatar(require('./Asset-331024.png'), 'Asset-331024.png'),
  avatar(require('./Asset-341024.png'), 'Asset-341024.png'),
  avatar(require('./Asset-351024.png'), 'Asset-351024.png'),
  avatar(require('./Asset-361024.png'), 'Asset-361024.png'),
  avatar(require('./Asset-371024.png'), 'Asset-371024.png'),
  avatar(require('./Asset-381024.png'), 'Asset-381024.png'),
  avatar(require('./Asset-391024.png'), 'Asset-391024.png'),
  avatar(require('./Asset-401024.png'), 'Asset-401024.png'),
  avatar(require('./Asset-411024.png'), 'Asset-411024.png'),
  avatar(require('./Asset-421024.png'), 'Asset-421024.png'),
  avatar(require('./Asset-431024.png'), 'Asset-431024.png'),
  avatar(require('./Asset-441024.png'), 'Asset-441024.png'),
  avatar(require('./Asset-451024.png'), 'Asset-451024.png'),
  avatar(require('./Asset-461024.png'), 'Asset-461024.png'),
  avatar(require('./Asset-471024.png'), 'Asset-471024.png'),
  avatar(require('./Asset-481024.png'), 'Asset-481024.png'),
];
