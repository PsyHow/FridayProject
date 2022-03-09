export const postNewAvatar = (file: File) =>
  ({
    type: 'POST_NEW_AVATAR',
    payload: { file },
  } as const);
