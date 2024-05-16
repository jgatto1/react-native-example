import { BackendClient, BASE_URL } from 'service/backend-client.service';
import RNFS, { Fields } from 'react-native-fs';
import RNFetchBlob from 'rn-fetch-blob';

export interface Base64UploadFile {
  name?: string;
  filename: string;
  base64: string;
  type: string;
}

class BackendUploadImpl {
  async post<T>(path: string, b64File: Base64UploadFile, fields?: Fields): Promise<{ data: T }> {
    const imagePath = `${RNFS.TemporaryDirectoryPath}avatar.png`;
    return RNFS.writeFile(imagePath, b64File.base64, 'base64')
      .then(() => {
        const files = [
          {
            name: b64File.name || b64File.filename,
            filename: b64File.filename,
            filepath: imagePath,
            filetype: b64File.type,
          },
        ];
        return this.postFiles<T>(path, files, fields);
      })
      .then(async (data) => {
        await RNFS.unlink(imagePath).catch((err) =>
          console.warn(`Cannot unlink recently uploaded file ${b64File.filename}`, err)
        );
        return data;
      });
  }

  async postFiles<T>(path: string, files: RNFS.UploadFileItem[], fields?: Fields): Promise<{ data: T }> {
    return this.requestFiles('POST', path, files, fields);
  }

  async putFiles<T>(path: string, files: RNFS.UploadFileItem[], fields?: Fields): Promise<{ data: T }> {
    return this.requestFiles('PUT', path, files, fields);
  }

  async requestFiles<T>(
    method: string,
    path: string,
    files: RNFS.UploadFileItem[],
    fields?: Fields
  ): Promise<{ data: T }> {
    const headers = {
      ...BackendClient.defaults.headers.common,
    };
    const url = `${BASE_URL}${path.startsWith('/') ? '' : '/'}${path}`;

    return RNFS.uploadFiles({
      toUrl: url,
      files: files,
      method: method,
      headers: {
        ...headers,
        Accept: 'application/json',
      },
      fields: { ...(fields || {}) },
      progress: (_) => {
        // const percentage = Math.floor((response.totalBytesSent / response.totalBytesExpectedToSend) * 100);
      },
    }).promise.then(async (response) => {
      return { data: JSON.parse(response.body) as T };
    });
  }

  async fetchBase64(url: string): Promise<Base64Response | null> {
    const headers = {
      ...BackendClient.defaults.headers.common,
    };
    return RNFetchBlob.config({ fileCache: true })
      .fetch('GET', url, headers)
      .then(async (res) => {
        const type = res.respInfo.headers['Content-Type'] as string;
        return {
          path: res.path(),
          base64: (await res.readFile('base64')) as string,
          type,
          name: 'image.png',
        } as Base64Response;
      })
      .catch((err) => {
        console.warn(`Cannot read base64 from ${url}`, err);
        return null;
      });
  }
}

export interface Base64Response {
  base64: string;
  type: string;
  name: string;
  path: string;
}

export const BackendUpload = new BackendUploadImpl();
