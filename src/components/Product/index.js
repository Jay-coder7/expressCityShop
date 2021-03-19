import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { FontAwesome } from '@expo/vector-icons/';
import PropTypes from 'prop-types';

import { formatPrice } from '../../util/format';

import * as CartActions from '../../store/modules/cart/actions';

import {
  Header,
  Container,
  ProductInfo,
  ProductHeader,
  Name,
  PriceOriginal,
  PriceContainer,
  Price,
  PriceDiscount,
  ProductFinish,
  Description,
  AddButton,
  FavoriteButton,
} from './styles';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import Carousel from '../Carousel';
import { toggleFavorite } from '../../store/modules/favorite/actions';
import { View } from 'react-native';

export default function Product({ navigation }) {
  const product = navigation.getParam('product');
  const { params } = navigation.state;

const insets=useSafeAreaInsets();
const [favorited, setFavorited] = useState(false);
  const dispatch = useDispatch();

  const favoritedItem = useSelector(state =>
    state.favorite.filter(f => f.id === product.id)
  );
  const profile=useSelector(state=>state.loggedInProfile);

  useEffect(() => {
    if (favoritedItem >= 0) {
      setFavorited(true);
    } else {
      setFavorited(false);
    }
  }, [favoritedItem]);

  function handleAddProduct(id) {
    if(profile.type==="Seller"){
      navigation.navigate('AddProducts',{
        product: product,
      })
    }else{
    dispatch(CartActions.addToCartRequest(id));
  }
  }

  function handleFavorite(prod) {
    dispatch(toggleFavorite(prod));
  }

  return (
    <>
      <View
    style={{
        paddingTop:insets.top,
        paddingBottom:insets.bottom,
        paddingRight:insets.right,
        paddingLeft:insets.left,
      backgroundColor:"#ff6346"
    }}
  ></View>
    <Container>
      <Header>
        <TouchableOpacity onPress={() => navigation.navigate(params.keyScreen)}>
          <FontAwesome name="arrow-left" color="#a4a4a4" size={18} />
        </TouchableOpacity>
        <ProductHeader>
          <FavoriteButton onPress={() => handleFavorite(product)}>
            {!favorited ? (
              <FontAwesome
                name="heart"
                color="rgba(255, 0, 0, 0.6)"
                size={20}
              />
            ) : (
              <FontAwesome name="heart-o" color="#a4a4a4" size={20} />
            )}
          </FavoriteButton>
        </ProductHeader>
      </Header>
      <Carousel
        data={product.images}
        dataSize={Object.keys({ ...product.images }).length}
      />
      <ProductInfo>
        <Name>{product.title}</Name>

        <ProductFinish>
          {product.discount ? (
            <PriceContainer>
              <Price>From {formatPrice(product.price)} to</Price>
              <PriceDiscount>
                {formatPrice(product.price * product.discount)}
              </PriceDiscount>
            </PriceContainer>
          ) : (
            <PriceContainer>
              <PriceOriginal>{formatPrice(product.price)} INR</PriceOriginal>
              <Price>Only</Price>
            </PriceContainer>
          )}

          <AddButton onPress={() => handleAddProduct(product.id)}>
            {profile?.type==="Seller"?"Edit Product":"Add to cart"}
          </AddButton>
        </ProductFinish>
        <Description>{product.description}</Description>
      </ProductInfo>
    </Container>
    </>
  );
}

Product.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
    getParam: PropTypes.func.isRequired,
    state: PropTypes.object.isRequired,
  }).isRequired,
};
