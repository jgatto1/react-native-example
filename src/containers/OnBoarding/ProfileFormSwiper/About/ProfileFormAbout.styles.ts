import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';

export const useProfileFormAboutStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionalText: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  formContainer: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'flex-start',
    paddingVertical: 10,
  },
  formText: {
    fontWeight: 'bold',
  },
  fullTextOpener: {
    minHeight: 55,
    height: 55,
    borderColor: theme.palette.border.primary,
    width: '100%',
    marginVertical: 5,
    borderWidth: 2,
    paddingVertical: 10,
    paddingLeft: 20,
    backgroundColor: 'white',
  },
  fullTextOpenerPlaceholder: {
    fontSize: 12,
    fontWeight: '400',
    color: 'grey',
  },
  fullTextOpenerPlaceholderFilled: {
    color: 'black',
  },
  publicSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  publicSwitchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  publicSwitch: {
    transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }],
  },
  emotionalStatusText: {
    marginTop: 5,
    fontSize: 12,
  },
  emojiContainer: {
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    width: '100%',
    marginTop: 10,
  },
  selectedEmojiContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 3,
    paddingVertical: 4,
    borderRadius: 200,
    borderColor: theme.palette.primary,
  },
  emojis: {
    backgroundColor: alphaRGB(theme.palette.other.onBoarding.text.accent, 0.15),
    borderColor: alphaRGB(theme.palette.other.onBoarding.text.accent, 0.15),
    borderWidth: 0.5,
    alignItems: 'center',
    flexDirection: 'row',
    paddingVertical: 5,
    justifyContent: 'space-evenly',
    borderRadius: 2,
  },
  emoji: {
    width: 10,
    height: 10,
    padding: 12,
    marginHorizontal: 4,
  },
  selectedEmoji: {
    width: 10,
    height: 10,
  },
}));
