import { makeStyle } from '@hooks/themed-style.hook';

export const useTriggerCustomizePrepTagStyles = makeStyle((theme) => ({
  triggerLabel: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    backgroundColor: theme.palette.background.alternative,
    paddingHorizontal: 2,
    paddingVertical: 3,
    borderRadius: 40,
    borderWidth: 1,
    borderColor: theme.palette.primary,
    display: 'flex',
    width: 110,
    marginVertical: 7,
  },
  triggerLabelSelected: {
    backgroundColor: theme.palette.other.trigger.log.triggerLabel.selected,
    borderColor: theme.palette.other.trigger.log.triggerLabel.selected,
  },
  triggerLabelSVG: {
    color: theme.palette.primary,
  },
}));
