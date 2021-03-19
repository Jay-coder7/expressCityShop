import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';


import {
  Container,
  Wrapper,
  Label,
  LoginButton,
  CustomImage,
  ButtonText,
} from './styles';

// import * as ProfileActions from '../../store/modules/profile/actions';
// import api from '../../services/api';

import TInput from '../../components/Input';
import logo from '../../assets/icons/logo.png';
import db from "../../../db";
import { logIn } from '../../store/modules/login/action';
import { loadSellerProduct } from '../../store/modules/products/actions';

export default function SignIn({ navigation }) {
const insets=useSafeAreaInsets();
  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const profile=useSelector(state=>state.loggedInProfile);
  async function handleLogin() {
    setLoading(true);
    setTimeout(() => {
      const user=db.profile.find(i=>i.email===email&&i.password===password);
      if(user){
        dispatch(logIn(user));
        switch (user.type) {
          case 'Buyer':
          navigation.navigate('BottomRoutesBuyer');
            break;
          case 'Seller':
            dispatch(loadSellerProduct(user.id))
          navigation.navigate('BottomRoutesSellers');
          break;
          default:
            break;
        }
      }
    }, 200);
    setLoading(false);    
  }

  return (
    <Container
    paddingTop={Math.round(insets.top)}
    >
           <CustomImage source={logo} />
      <Wrapper>
        <Label>E-mail</Label>
        <TInput
          icon="envelope"
          keyboardType="email-address"
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          placeholder="e-mail"
          ref={emailRef}
          onSubmitEditing={() => passwordRef.current.focus()}
          value={email}
          onChangeText={setEmail}
        />
      </Wrapper>
      <Wrapper>
        <Label>Password</Label>
        <TInput
          icon="lock"
          returnKeyType="send"
          placeholder="Password"
          secureTextEntry
          ref={passwordRef}
          value={password}
          onChangeText={setPassword}
          onSubmitEditing={handleLogin}
        />
      </Wrapper>
      <LoginButton
        onPress={() => {
          handleLogin();
        }}
      >
        {!loading ? (
          <ButtonText>Login</ButtonText>
        ) : (
          <ActivityIndicator color="tomato" size="large" />
        )}
      </LoginButton>
      <Text>Or</Text>
      <LoginButton 
    
    onPress={()=>navigation.navigate('SignUp')}
      >
          <ButtonText>Sign Up</ButtonText>
      </LoginButton>
    </Container>
  );
}

SignIn.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
