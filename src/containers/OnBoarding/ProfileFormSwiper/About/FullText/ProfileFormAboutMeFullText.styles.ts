import { makeStyle } from '@hooks/themed-style.hook';

export const useProfileFormAboutMeFullTextStyles = makeStyle((theme) => ({
  fullTextHeaderContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  fullTextCloseViewContainer: {
    position: 'absolute',
    height: '100%',
    left: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  fullTextHeaderText: {
    fontSize: 15,
    fontWeight: 'bold',
  },
  fullTextView: {
    flex: 1,
    width: '100%',
    height: '100%',
    backgroundColor: theme.palette.background.alternative,
  },
  fullTextInputContainer: {
    flexGrow: 1,
    flexShrink: 1,
    paddingHorizontal: 10,
    paddingVertical: 5,
  },
  fullTextCharCount: {
    position: 'absolute',
    bottom: 15,
    right: 15,
    zIndex: 1,
  },
  fullTextCharCountText: {
    opacity: 0.5,
  },
  fullTextInput: {
    paddingLeft: 5,
    paddingHorizontal: 5,
    flexGrow: 1,
    fontSize: 14,
  },
  fullTextButtonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
}));
