import { makeStyle } from 'providers/hooks/themed-style.hook';

export const useHandoutStyles = makeStyle(() => ({
  modalRoot: {
    justifyContent: 'center',
    alignItems: 'stretch',
    height: '100%',
  },
  webView: {
    flex: 1,
  },
  hide: {
    flex: 0,
  },
  loadingIndicator: {
    flex: 1,
  },
}));
