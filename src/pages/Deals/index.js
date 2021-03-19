import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, View } from 'react-native';
import CountDown from 'react-native-countdown-component';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import {
  Container,
  HeaderCountDown,
  ContainerGradient,
  WrapperCount,
  Title,
  WrapperAnimation,
  LoadingAnimation,
} from './styles';

import ProductItem from '../../components/ProductItem';
import loadingAnimation from '../../assets/animations/loading.json';

// import api from '~/services/api';
import db from '../../../db';

export default function Deals({ navigation }) {
  const [loading, setLoading] = useState(true);
  const [products, setProduts] = useState([]);

  function loadProducts() {
    const response = db.products
    const discountProducts = response.filter(p => p.discount > 0);
    setProduts(discountProducts);
    setLoading(false);
  }
  useEffect(() => {
    loadProducts();
  }, []);
  const insets=useSafeAreaInsets();
  return (<>
  <View
    style={{
        paddingTop:insets.top,
        paddingBottom:insets.bottom,
        paddingRight:insets.right,
        paddingLeft:insets.left,
      backgroundColor:"#ff6346"
    }}
  ></View>
    <ContainerGradient>
      <WrapperCount>
        <HeaderCountDown>
          <Title>Limited time offer</Title>
          <CountDown
            until={60 }
            digitStyle={{ backgroundColor: 'rgba(0,0,0,0.6)' }}
            digitTxtStyle={{ color: '#fff' }}
            timeLabelStyle={{
              color: '#fff',
              fontSize: 12,
              fontWeight: 'bold',
            }}
            separatorStyle={{ color: '#fff' }}
            timeToShow={['H', 'M', 'S']}
            showSeparator
            size={22}
          />
        </HeaderCountDown>
      </WrapperCount>

      {loading ? (
        <WrapperAnimation>
          <LoadingAnimation autoPlay loop source={loadingAnimation} />
        </WrapperAnimation>
      ) : (
        <Container>
          <FlatList
            numColumns={1}
            data={products}
            keyExtractor={item => String(item.id)}
            renderItem={({ item }) => (
              <ProductItem item={item} navigation={navigation} />
            )}
          />
        </Container>
      )}
    </ContainerGradient>
 </>
  );
}

Deals.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
