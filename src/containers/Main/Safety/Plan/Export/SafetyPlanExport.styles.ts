import { makeStyle } from '@hooks/themed-style.hook';

export const useSafetyPlanExportStyles = makeStyle(() => ({
  root: {
    flex: 1,
  },
  body: {
    paddingHorizontal: 15,
    marginTop: 10,
    marginBottom: 10,
  },
  card: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    alignItems: 'flex-start',
    justifyContent: 'flex-start',
  },
  cardHeader: {
    width: '100%',
    alignItems: 'center',
  },
  toContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  toInputs: {
    width: '80%',
    marginLeft: 15,
    flexGrow: 1,
    backgroundColor: 'rgba(0,0,0,0.1)',
    height: 35,
    paddingVertical: 3,
  },
  toChip: {
    paddingHorizontal: 5,
    backgroundColor: 'orange',
    borderRadius: 100,
    marginHorizontal: 3,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
    width: '100%',
  },
  addMessageText: {
    textAlign: 'left',
    width: '100%',
  },
  exportDescription: {
    lineHeight: 24,
  },
}));
