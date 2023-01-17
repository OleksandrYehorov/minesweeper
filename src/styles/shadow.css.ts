import { styleHelper } from '../utils/styleHelper';

const createShadow = (inverted: boolean) => {
  const light = 'white';
  const dark = 'grey';
  const topLeftColor = inverted ? dark : light;
  const bottomRightColor = inverted ? light : dark;

  return styleHelper({
    backgroundColor: 'lightgray',
    borderWidth: '0.2rem',
    borderStyle: 'solid',
    borderTopColor: topLeftColor,
    borderLeftColor: topLeftColor,
    borderBottomColor: bottomRightColor,
    borderRightColor: bottomRightColor,
  });
};

export const [shadow, shadowRule] = createShadow(false);

export const [invertedShadow, invertedShadowRule] = createShadow(true);
