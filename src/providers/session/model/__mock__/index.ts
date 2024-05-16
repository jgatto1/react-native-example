const MOCK = require('./mockSession.json');

export const SESSION = {
  name: MOCK.user.settings.display_name,
  lastName: MOCK.user.last_name,
  study: {
    id: MOCK.user.study_id,
    initials: MOCK.user.study_initials,
  },
  accessToken: MOCK.access_token,
  refreshToken: MOCK.refresh_token,
  user: MOCK.user,
};
