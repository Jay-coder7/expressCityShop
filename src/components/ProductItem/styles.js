import styled from 'styled-components/native';
import { RectButton } from 'react-native-gesture-handler';
import CustomText from '../CustomText';
import BuyButton from '../BuyButton';

import colors from '../../styles/colors';

export const ProductItem = styled.View`
  height: 150px;
  width: 100%;
  background-color: rgba(255, 255, 255, 1);
  margin-top: 5px;
  flex-direction: row;
  padding: 5px;
`;

export const LeftContent = styled.View`
  flex: 1;
`;

export const ProductImage = styled.Image.attrs({
  resizeMode: 'contain',
  aspectRatio: 1,
})``;

export const RightContent = styled.View`
  flex: 2;
  border-left-width: 1px;
  border-color: rgba(0, 0, 0, 0.1);
  margin-left: 4px;
  padding: 0 5px 5px 5px;
  justify-content: space-between;
`;

export const Title = styled(CustomText).attrs({
  numberOfLines: 2,
})`
  font-family: 'roboto-bold';
  font-size: 14px;
  color: ${colors.text};
`;

export const Price = styled(CustomText)`
  font-family: 'roboto-bold';
  font-size: 22px;
  color: ${colors.primary};
  letter-spacing: 1;
`;

export const PriceInfo = styled(CustomText)`
  font-family: 'roboto-regular';
  font-size: 18px;
  color: ${colors.text};
`;

export const PriceContainer = styled.View`
  flex-direction: row;
  align-self: stretch;
  align-items: center;
  justify-content: center;
`;

export const ProductActions = styled.View`
  flex-direction: row;
  justify-content: flex-end;
`;

export const AddButton = styled(BuyButton)`
  height: 50px;
`;

export const FavoriteButton = styled(RectButton)`
  height: 26px;
  width: 26px;
  border-radius: 13px;
  background: rgba(255, 255, 255, 0.8);
  position: absolute;
  align-items: center;
  justify-content: center;
  align-self: flex-start;
  top: -3px;
  left: 5px;
`;

export const RatingWrapper = styled.View`
  background: rgba(255, 255, 255, 0.8);
  align-items: center;
  top: -18;
`;
