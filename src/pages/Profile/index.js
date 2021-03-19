import React from 'react';
import PropTypes from 'prop-types';
import { Text, View } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { FontAwesome } from '@expo/vector-icons/';

import * as ProfileActions from '../../store/modules/login/action';

import {
  Container,
  HeaderProfile,
  ProfileInfo,
  Name,
  Email,
  ProfileAvatar,
  SingOutButton,
  SignOutText,
} from './styles';

import ProfileButton from './../../components/ProfileButton';
import TabIcon from './../../components/TabIcon';
import colors from './../../styles/colors';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

export default function Profile({ navigation }) {
  const insets=useSafeAreaInsets();
  const dispatch = useDispatch();
  const UserProfile = useSelector(state => state.loggedInProfile);
  console.log(UserProfile)
  function handleSignOut() {
    dispatch(ProfileActions.logOut());
    navigation.navigate('SignIn');
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
      <HeaderProfile>
        <ProfileAvatar
          source={{
            uri: 'https://api.adorable.io/avatars/100/abott@adorable.png',
          }}
        />
        <ProfileInfo>
          <Name>{UserProfile.name}</Name>
          <Email>{UserProfile.email}</Email>
        </ProfileInfo>
      </HeaderProfile>
      <ProfileButton name="envelope-o" margin={10}>
      Messages
      </ProfileButton>
      <ProfileButton name="cube">Requests</ProfileButton>
      <ProfileButton name="truck">{UserProfile?.address||"Address"}</ProfileButton>
      <ProfileButton name="credit-card">{UserProfile?.card||"Cards"}</ProfileButton>
      <SingOutButton onPress={handleSignOut}>
        <SignOutText>Sign Out</SignOutText>
        <FontAwesome
          style={{ marginLeft: 20 }}
          name="sign-out"
          color="rgba(255, 0, 0, 0.6)"
          size={20}
        />
      </SingOutButton>
    </Container>
    </>
  );
}

Profile.navigationOptions = {
  tabBarLabel: <Text style={{ fontSize: 12 }}>Perfil</Text>,
  tabBarIcon: props => <TabIcon name="user" {...props} />,
  tabBarColor: `${colors.primary}`,
};

Profile.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
