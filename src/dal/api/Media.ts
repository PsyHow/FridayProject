import { instance } from 'dal/apiConfing';

export const MediaAPI = {
  postNewAvatar(file: File) {
    return instance.post('/file', { formData: { myFile: file } });
  },
};
