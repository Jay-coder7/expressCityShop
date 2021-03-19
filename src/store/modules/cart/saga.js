import { call, select, put, all, takeLatest } from 'redux-saga/effects';
import Toast from 'react-native-root-toast';

// import api from '~/services/api';
import db from "./../../../../db";

import { addToCartSuccess, updateAmountSuccess } from './actions';

function* addToCart({ id }) {
  const productExists = yield select(state =>
    state.cart.find(p => p.id === id)
  );

  const stock = db.stock.find(i=>i.id===id);
  const stockAmount = stock.amount;
  const currentAmount = productExists ? productExists.amount : 0;
  const amount = currentAmount + 1;

  if (amount > stockAmount) {
    Toast.show('Quantity not available in stock', {
      duration: Toast.durations.SHORT,
      position: -75,
      backgroundColor: 'red',
      shadow: true,
      hideOnPress: true,
    });

    return;
  }

  Toast.show('Product added to cart', {
    duration: Toast.durations.SHORT,
    position: -75,
    backgroundColor: 'green',
    shadow: true,
    hideOnPress: true,
  });

  if (productExists) {
    yield put(updateAmountSuccess(id, amount));
  } else {
    const response = db.products.find(i=>i.id===id);

    const data = {
      ...response,
      amount: 1,
      finalPrice: Number(
        response.price *
          Number(response.discount > 0 ? response.discount : 1)
      ),
    };

    yield put(addToCartSuccess(data));
  }
}

function* updateAmount({ id, amount }) {
  if (amount <= 0) return;

  const  data  = db.stock.find(i=>i.id===id);
  const stockAmount = data.amount;

  if (amount > stockAmount) {
    Toast.show('Quantity not available in stock', {
      duration: Toast.durations.SHORT,
      position: -75,
      backgroundColor: 'red',
      shadow: true,
      hideOnPress: true,
    });
    return;
  }

  yield put(updateAmountSuccess(id, amount));
}

export default all([
  takeLatest('@cart/ADD_REQUEST', addToCart),
  takeLatest('@cart/UPDATE_AMOUNT_REQUEST', updateAmount),
]);
