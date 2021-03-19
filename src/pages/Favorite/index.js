import React from 'react';
import PropTypes from 'prop-types';
import { StatusBar, Text, FlatList, View } from 'react-native';
import { useSelector } from 'react-redux';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { Container, Wrapper, EmptyFavorite } from './styles';
import emptyFavorite from '../../assets/images/empty-favorite.png';
import TabStateIcon from './../../components/TabStateIcon';
import ProductItem from './../../components/ProductItem';
import colors from '../../styles/colors';

export default function Favorite({ navigation }) {
  const FavoriteData = useSelector(state => state.favorite);
  const insets=useSafeAreaInsets();
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
      <StatusBar backgroundColor="#ff6347" />
      {FavoriteData.length > 0 ? (
        <FlatList
          numColumns={1}
          data={FavoriteData}
          keyExtractor={item => String(item.id)}
          renderItem={({ item }) => (
            <ProductItem item={item} navigation={navigation} />
          )}
        />
      ) : (
        <Wrapper>
          <EmptyFavorite source={emptyFavorite} />
        </Wrapper>
      )}
    </Container>
    </>
  );
}

Favorite.navigationOptions = {
  tabBarColor: colors.primary,
  tabBarLabel: <Text style={{ fontSize: 12 }}>Favorites</Text>,
  tabBarIcon: props => <TabStateIcon name="heart" {...props} />,
};

Favorite.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
