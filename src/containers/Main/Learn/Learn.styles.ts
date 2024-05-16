import { alphaRGB, makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useLearnStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    paddingHorizontal: 15,
  },
  modalMiddle: {
    backgroundColor: theme.palette.divider.accent,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 5,
  },
  headerCenter: {
    padding: 5,
    justifyContent: 'center',
    alignItems: 'center',
    flexGrow: 1,
  },
  headerSides: {
    width: Dimensions.get('window').width * 0.2,
  },
  image: {
    width: '100%',
    height: 225,
  },
  asteriskContainer: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  asteriskSVG: {
    color: alphaRGB(theme.palette.error.primary, 0.6),
  },
  category: {
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'flex-start',
    paddingLeft: 20,
    position: 'relative',
    backgroundColor: theme.palette.other.safety.button.background,
  },
  categoryExpandSVG: {
    position: 'absolute',
    right: 10,
    color: theme.palette.text.primary,
  },
  post: {
    flexDirection: 'row',
    paddingVertical: 15,
    paddingHorizontal: 10,
    justifyContent: 'center',
    alignItems: 'center',
    //position: 'relative',
    backgroundColor: theme.palette.background.alternative,
  },
  postText: {
    flexGrow: 1,
    fontSize: 15,
    fontWeight: '500',
    flexShrink: 1,
  },
  postAsterisk: {
    marginHorizontal: 5,
  },
  postOpen: {
    color: theme.palette.text.primary,
  },
  cardContainer: {
    paddingHorizontal: 15,
  },
  suggestInput: {
    minHeight: 150,
    maxHeight: 150,
  },
  suggestButtonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  suggestButton: {
    paddingVertical: 15,
    backgroundColor: theme.palette.other.learn.suggest.background,
  },
}));
