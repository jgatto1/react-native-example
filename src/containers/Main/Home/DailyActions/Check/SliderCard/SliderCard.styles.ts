import { makeStyle } from '@hooks/themed-style.hook';

export const useSliderCardStyles = makeStyle((theme) => ({
  card: {
    marginVertical: 12,
  },
  cardTitleContainer: {
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardTitle: {
    fontWeight: 'bold',
  },
  slider: {
    paddingHorizontal: 10,
  },
  sliderTilesContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  sliderTileContainer: {
    maxWidth: `${100 / 5}%`,
  },
  sliderContainer: {
    marginVertical: 10,
    width: '100%',
    height: 18,
    justifyContent: 'center',
    borderWidth: 0.6,
    borderRadius: 20,
    borderColor: theme.palette.primary,
  },
  sliderThumbnail: {
    height: 25,
    width: 25,
    borderRadius: 1000,
  },
  sliderTrack: {
    height: '100%',
    borderRadius: 1000,
  },
}));
