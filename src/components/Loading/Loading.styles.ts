import { makeStyle } from '@hooks/themed-style.hook';

export default makeStyle(() => ({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    height: '100%',
    width: '100%',
    display: 'flex',
    justifyContent: 'center',
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
  },
}));
