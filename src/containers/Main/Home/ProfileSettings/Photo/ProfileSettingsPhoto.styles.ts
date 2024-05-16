import { makeStyle } from '@hooks/themed-style.hook';

export const useProfileSettingsPhotoStyles = makeStyle(() => ({
  root: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  previewContainer: {
    justifyContent: 'flex-end',
    alignItems: 'center',
  },
  previewBox: {
    width: 120,
    height: 120,
    backgroundColor: '#d4e2d7',
    borderRadius: 100,
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  previewImage: {
    maxWidth: 120,
    maxHeight: 120,
    width: 120,
    height: 120,
    zIndex: 12,
  },
  buttonsContainer: {
    alignItems: 'center',
  },
  actionButtons: {
    position: 'relative',
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
}));
