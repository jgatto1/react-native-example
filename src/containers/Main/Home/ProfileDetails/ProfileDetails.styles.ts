import { makeStyle } from 'providers/hooks/themed-style.hook';
import { StyleSheet } from 'react-native';

const ProfileDetailsStyles = StyleSheet.create({
  root: {
    flex: 1,
  },
  content: {
    flex: 9,
  },
});

export const useCardStyle = StyleSheet.create({
  root: {
    marginHorizontal: 8,
    marginTop: 16,
    backgroundColor: '#FFF',
    padding: 16,
    borderRadius: 4,
    marginBottom: 10,
    shadowOffset: {
      width: 1,
      height: 2,
    },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  header: {
    flexDirection: 'row',
    marginBottom: 24,
  },
  name: {
    fontSize: 16,
  },
  info: {
    alignItems: 'stretch',
    flex: 1,
    marginLeft: 16,
  },
  infoRow: {
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
    flexDirection: 'row',
    marginBottom: 4,
  },
  about: {
    fontWeight: '300',
    fontSize: 12,
  },
  aboutMeTitle: {
    fontWeight: 'bold',
  },
  aboutMeContent: {
    marginVertical: 16,
    fontSize: 15,
    color: '#999',
  },
  emotionalEmoji: {
    width: 20,
    height: 20,
    marginRight: 8,
  },
  interestTitle: {
    fontWeight: 'bold',
    fontSize: 15,
    marginBottom: 8,
  },
  interestChip: {
    backgroundColor: 'rgb(242,171,121)',
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginRight: 8,
    borderRadius: 16,
  },
  interestChipText: {
    fontSize: 14,
  },
});

export const useAvatarStyle = makeStyle({
  container: { height: 60 },
  root: {
    flex: 1,
    width: 60,
    height: 60,
    borderRadius: 30,
  },
});

export default ProfileDetailsStyles;
