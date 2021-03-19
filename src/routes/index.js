import React from 'react';

import { createAppContainer, createSwitchNavigator } from 'react-navigation';
import { createMaterialBottomTabNavigator } from 'react-navigation-material-bottom-tabs';

import { Text } from 'react-native';
import TabIcon from '../components/TabIcon';
import TabStateIcon from '../components/TabStateIcon';

import Home from '../pages/Home';
import Deals from '../pages/Deals';
import AddProducts from '../pages/AddProducts';
import Favorite from '../pages/Favorite';
import Profile from '../pages/Profile';
import Cart from '../pages/Cart';
import SignIn from '../pages/SignIn';
import SignUp from '../pages/SignUp';
import Product from '../components/Product';
import colors from '../styles/colors';
import { CheckOut } from '../pages/Checkout';

const HomeRoute = createSwitchNavigator(
  {
    Home,
    Product,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('Home');
      },
      tabBarColor: colors.primary,
      tabBarLabel: <Text style={{ fontSize: 12 }}>Home</Text>,
      tabBarIcon: props => <TabIcon name="home" {...props} />,
    },
  }
);
const SHomeRoute = createSwitchNavigator(
  {
    Home,
    Product,
  },
  {
    initialRouteName: 'Home',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('Home');
      },
      tabBarColor: colors.primary,
      tabBarLabel: <Text style={{ fontSize: 12 }}>Home</Text>,
      tabBarIcon: props => <TabIcon name="home" {...props} />,
    },
  }
);

const DealsRoute = createSwitchNavigator(
  {
    Deals,
    Product,
  },
  {
    initialRouteName: 'Deals',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('Deals');
      },
      tabBarColor: '#1C1919',
      tabBarLabel: <Text style={{ fontSize: 12 }}>Offers</Text>,
      tabBarIcon: props => <TabIcon name="tag" {...props} />,
    },
  }
);

const CartRoute = createSwitchNavigator(
  {
    Cart,
    CheckOut
  },
  {
    initialRouteName: 'Cart',
    navigationOptions: {
      tabBarOnPress: ({ navigation }) => {
        navigation.navigate('Cart');
      },
      tabBarColor: colors.primary,
      tabBarLabel: <Text style={{ fontSize: 12 }}>Cart</Text>,
      tabBarIcon: props => <TabStateIcon name="shopping-cart" {...props} />,
    },
  }
);

const BottomRoutesBuyer = createMaterialBottomTabNavigator(
  {
    HomeRoute,
    DealsRoute,
    Favorite,
    CartRoute,
    Profile,
  },
  {
    initialRouteName: 'HomeRoute',
    activeColor: '#fff',
    inactiveColor: 'rgba(255,255,255,0.5)',
    labeled: true,
  }
);
const BottomRoutesSellers = createMaterialBottomTabNavigator(
  {
    SHomeRoute,
    AddProducts,
    // Favorite,
    // CartRoute,
    // Profile,
  },
  {
    initialRouteName: 'SHomeRoute',
    activeColor: '#fff',
    inactiveColor: 'rgba(255,255,255,0.5)',
    labeled: true,
  }
);

const EntryPoint = createSwitchNavigator(
  {
    SignIn,
    SignUp,
    BottomRoutesBuyer,
    BottomRoutesSellers
  },
  {
    initialRouteName: 'SignIn',
  }
);

const Routes = createAppContainer(EntryPoint);

export default Routes;
