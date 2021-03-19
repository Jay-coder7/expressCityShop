import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { formatPrice } from '../../util/format';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Container,
  TotalWrapper,
  TotalText,
  TotalPrice,
  FinishButton,
  Wrapper,
  BuyButton,
  ButtonText,
  EmptyCartImage,
  WrapperAnimation,
  CheckoutAnimation,
} from './styles';
import ProductCart from '../../components/ProductCart';
import emptyCart from '../../assets/images/empty-cart.png';
import { setTotal } from '../../store/modules/total/actions';


export default function Cart({ navigation }) {
  const insets=useSafeAreaInsets();
const dispatch=useDispatch();
  const cart = useSelector(state =>
    state.cart.map(product => ({
      ...product,
      subtotal: formatPrice(product.finalPrice * product.amount),
    }))
  );

  const total = useSelector(state =>
    formatPrice(
      state.cart.reduce((totalSum, product) => {
        return totalSum + product.finalPrice * product.amount;
      }, 0)
    ));


  function handleCheckout() {
    dispatch(setTotal(total))
    navigation.navigate('CheckOut');
  }

  return (<>
    <View
      style={{
          paddingTop:insets.top,
          paddingBottom:insets.bottom,
          paddingRight:insets.right,
          paddingLeft:insets.left,
      
      }}
    ></View>
    <Container>
      {cart.length > 0 ? (
        <>
          <FlatList
            numColumns={1}
            data={cart}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => <ProductCart item={item} />}
          />
          <TotalWrapper>
            <TotalText>
              TOTAL
              <TotalPrice> {total}</TotalPrice>
            </TotalText>
          </TotalWrapper>
          <FinishButton onPress={() => handleCheckout()}>
            <ButtonText>Place Order</ButtonText>
          </FinishButton>
        </>
      ) : (
          <Wrapper>
            <EmptyCartImage source={emptyCart} />
            <BuyButton onPress={() => navigation.navigate('HomeRoute')}>
              <ButtonText>Go shopping</ButtonText>
            </BuyButton>
          </Wrapper>
      )}
    </Container>
    </>
  );
}

Cart.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
