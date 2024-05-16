import { makeStyle } from '@hooks/themed-style.hook';

const RECORD_RED = 'rgb(203,129,128)';

export const useSafetyTalkToSelfCreateStyles = makeStyle((theme) => ({
  root: {
    marginTop: 10,
    paddingHorizontal: 15,
  },
  questionText: {
    paddingHorizontal: 10,
  },
  recordButtonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  recordButton: {
    backgroundColor: theme.palette.primary,
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderRadius: 1000,
  },
  statusRecordingContainer: {
    flexDirection: 'row',
    width: '100%',
    paddingHorizontal: 20,
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  recContainer: {
    flexDirection: 'row',
  },
  recIconContainer: {
    borderWidth: 1,
    borderColor: RECORD_RED,
    padding: 5,
    borderRadius: 1000,
  },
  recIconInner: {
    backgroundColor: RECORD_RED,
    width: 7,
    height: 7,
    borderRadius: 1000,
  },
  recText: {
    color: RECORD_RED,
  },
  recTimeContainer: {
    flexDirection: 'row',
  },
  textInput: {
    borderWidth: 0,
  },
  textInputContainer: {
    padding: 0,
    paddingHorizontal: 0,
    paddingVertical: 0,
    paddingRight: 10,
    paddingTop: 5,
  },
  nextContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
}));
