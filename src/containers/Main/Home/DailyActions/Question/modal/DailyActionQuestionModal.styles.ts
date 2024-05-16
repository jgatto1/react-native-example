import { makeStyle } from '@hooks/themed-style.hook';

export const useDailyActionsModalStyles = makeStyle(() => ({
  modalRoot: {
    padding: 0,
  },
  cardRoot: {
    alignItems: 'center',
  },
  modalMiddleText: {
    marginVertical: 15,
  },
  modalButton: {
    paddingHorizontal: 60,
  },
}));
