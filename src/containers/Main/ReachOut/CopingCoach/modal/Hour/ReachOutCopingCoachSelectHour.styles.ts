import { makeStyle } from '@hooks/themed-style.hook';

export const useReachOutCopingCoachSelectHourStyles = makeStyle(() => ({
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  checkbox: {
    borderRadius: 0,
  },
  checkboxContainer: {
    alignItems: 'center',
    flexDirection: 'row',
    marginBottom: 10,
  },
}));
