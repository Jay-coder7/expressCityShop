import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons/';

import * as CartActions from '../../store/modules/cart/actions';
import * as FavoriteActions from '../../store/modules/favorite/actions';
import { formatPrice } from '../../util/format';
import Discount from '../Discount';

import {
  ProductItem,
  LeftContent,
  ProductImage,
  RightContent,
  Title,
  PriceContainer,
  Price,
  PriceInfo,
  AddButton,
  FavoriteButton,
} from './styles';

export default function ProdItem({ navigation, item ,isSeller}) {
  const [favorited, setFavorited] = useState(false);
  const dispatch = useDispatch();

  const favoritedItem = useSelector(state =>
    state.favorite.filter(f => f.id === item.id)
  );

  useEffect(() => {
    if (favoritedItem >= 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favoritedItem]);

  function handleAddProduct(id) {
    if(isSeller){
      navigation.navigate('AddProducts',{
        product: item,
      })
    }else{
      dispatch(CartActions.addToCartRequest(id));
    }
  }

  function handleFavorite(product) {
    dispatch(FavoriteActions.toggleFavorite(product));
  }

  return (
    <ProductItem>
      <LeftContent>
        <ProductImage
          source={{
            uri: `${item.images[0]}`,
          }}
        />

        <FavoriteButton onPress={() => handleFavorite(item)}>
          {!favorited ? (
            <FontAwesome name="heart" color="rgba(255, 0, 0, 0.6)" size={18} />
          ) : (
            <FontAwesome name="heart-o" color="#a4a4a4" size={18} />
          )}
        </FavoriteButton>
        {item.discount > 0 && <Discount>{item.discount}</Discount>}
      </LeftContent>
      <RightContent>
        <Title
          onPress={() =>
            navigation.navigate('Product', {
              product: item,
              keyScreen: navigation.state.key,
            })
          }
        >
          {item.title}
        </Title>

        <PriceContainer>
          <Price>
            {formatPrice(item.price * (item.discount > 0 ? item.discount : 1))}
            <PriceInfo>INR</PriceInfo>
          </Price>
        </PriceContainer>
        <AddButton onPress={() => handleAddProduct(item.id)}>
          {isSeller?"Edit Product":"Add to cart"}
        </AddButton>
      </RightContent>
    </ProductItem>
  );
}

ProdItem.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
    isSeller:PropTypes.bool,
  }).isRequired,
  item: PropTypes.shape({
    id: PropTypes.number.isRequired,
    images: PropTypes.arrayOf(PropTypes.string).isRequired,
    title: PropTypes.string.isRequired,
    rating: PropTypes.number.isRequired,
    numrating: PropTypes.number.isRequired,
    discount: PropTypes.number.isRequired,
    price: PropTypes.number.isRequired,
    
  }).isRequired,
};
