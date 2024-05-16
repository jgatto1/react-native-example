import { makeStyle } from '@hooks/themed-style.hook';
import { Dimensions } from 'react-native';

export const useProfileFormGroupsStyles = makeStyle((theme) => ({
  root: {
    flex: 1,
    display: 'flex',
  },
  rootAlt: {
    flexDirection: 'column-reverse',
    justifyContent: 'center',
  },
  textContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  optionalText: {
    fontStyle: 'italic',
    marginBottom: 4,
  },
  groupsContainer: {
    flexGrow: 1,
    paddingBottom: '10%',
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  groupsButtonsContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-evenly',
  },
  groupsContainerAlt: {
    flexDirection: 'column',
    justifyContent: 'space-between',
    height: 270,
  },
  error: {
    color: theme.palette.error.primary,
  },
  groupButton: {
    flexDirection: 'row',
    maxWidth: Dimensions.get('window').width * 0.35,
    width: Dimensions.get('window').width * 0.35,
    marginVertical: 3,
    backgroundColor: theme.palette.background.alternative,
    borderWidth: 1,
    borderColor: theme.palette.primary,
    alignItems: 'center',
    borderRadius: 20,
  },
  groupButtonSelected: {
    backgroundColor: theme.palette.accent,
    borderColor: theme.palette.accent,
  },
  groupButtonText: {
    fontSize: 12,
    flexShrink: 1,
    paddingVertical: 1,
  },
  groupButtonIcon: {
    margin: 5,
  },
  groupButtonIconText: {
    fontWeight: 'bold',
    fontSize: 20,
    color: theme.palette.background.alternative,
  },
  publicSwitchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
  },
  publicSwitchContainerAlt: {
    justifyContent: 'center',
    marginBottom: 20,
  },
  publicSwitchText: {
    fontSize: 12,
    fontWeight: '500',
  },
  publicSwitch: {
    transform: [{ scaleX: 0.6 }, { scaleY: 0.6 }],
  },
}));
