import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text,StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
// import Toast from 'react-native-root-toast';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import {
  Container,
  Wrapper,
  Label,
  LoginButton,
  ButtonText,
  CustomImage,
} from './styles';
import db from "../../../db";

// import * as ProfileActions from '../../store/modules/profile/actions';
// import api from '../../services/api';

import TInput from '../../components/Input';
import { logIn } from '../../store/modules/login/action';
import logo from '../../assets/icons/logo.png';
import { loadSellerProduct } from '../../store/modules/products/actions';

export default function SignUp({ navigation }) {

  const dispatch = useDispatch();
  const emailRef = useRef();
  const passwordRef = useRef();
  const typeRef=useRef();
  const nameRef=useRef();

  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [type, setType] = useState('Buyer');
  const [name, setName] = useState('');
  
  async function handleSignUp() {
    setLoading(true);
    if(email && password&&name){
      const id=db.profile.length+1;
      const user={
        "id": id,
        "name": name,
        "email": email,
        "password": password,
        type:type
      }
      dispatch(logIn(user));
      if(user.type==="Buyer"){
        navigation.navigate('BottomRoutesBuyer');
      }else{
        dispatch(loadSellerProduct(user.id))
        navigation.navigate('BottomRoutesSellers');
      }
    }
    setLoading(false);    
  };

const insets=useSafeAreaInsets()

  return (
    
    <Container
    paddingTop={Math.round(insets.top)}
    >
                <CustomImage source={logo} />

      <Wrapper>
        <Label>Name</Label>
        <TInput
          autoCorrect={false}
          autoCapitalize="none"
          returnKeyType="next"
          placeholder="name"
          ref={nameRef}
          onSubmitEditing={() => emailRef.current.focus()}
          value={name}
          onChangeText={setName}
        />
      </Wrapper>
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
          onSubmitEditing={()=>handleSignUp}
        />
      </Wrapper>
      <Wrapper>
    <DropDownPicker
    containerStyle={{height: 40,width:100}}
         items={[
            {label: 'Buyer', value: 'Buyer'},
            {label: 'Seller', value: 'Seller' }
          ]}
          itemStyle={{
            justifyContent: 'flex-start'
        }}
          defaultValue={type}
          onChangeItem={(item)=>setType(item.value)}
          ref={typeRef}
          onSubmitEditing={handleSignUp}
    />
      </Wrapper>
      <LoginButton
        onPress={() => {
          handleSignUp();
        }}
      >
        {!loading ? (
          <ButtonText>Sign Up</ButtonText>
        ) : (
          <ActivityIndicator color="tomato" size="large" />
        )}
      </LoginButton>
       <Text>Or</Text>
      <LoginButton 
    
    onPress={()=>navigation.navigate('SignIn')}
      >
          <ButtonText>Log In</ButtonText>
      </LoginButton>
    </Container>
  );
}

SignUp.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
