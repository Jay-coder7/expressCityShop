import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { View } from "react-native";
import * as CartActions from '../../store/modules/cart/actions';
import PropTypes from 'prop-types';
import TInput from '../../components/Input';
import checkout from '../../assets/animations/checkout.json';
import { ActivityIndicator, Text,StyleSheet  } from 'react-native';
import DropDownPicker from 'react-native-dropdown-picker';
import { CreditCardInput } from "expo-barty-credit-card-input";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Container,
  Wrapper,
  Label,
  LoginButton,
  ButtonText,
  WrapperAnimation,
  CheckoutAnimation
} from './styles';
import { ScrollView } from "react-native-gesture-handler";
import { saveAddressAndCard } from "../../store/modules/login/action";


export const CheckOut=({navigation})=>{
const insets=useSafeAreaInsets();
const dispatch=useDispatch();
    const profile=useSelector(state=>state.loggedInProfile)
    const [method,setMethod]=useState('online');
    const methodRef=useRef();

  const [loading, setLoading] = useState(false);
  const [card, setCard] = useState(null);
  const [address, setAddress] = useState({line1:'',line2:'',pincode:'',state:'',country:''});
  const [isCheckout, setIsCheckout] = useState(false);

  
  const lineOneRef=useRef();
  const lineTwoRef=useRef();
  const pincodeRef=useRef();
  const stateRef=useRef();
  const countryRef=useRef();
  const creditCardForm=(<CreditCardInput 
    onChange={(value)=>setCard(value)}
    inputContainerStyle={{ borderBottomWidth: 1, borderBottomColor: "#fff" }}
      inputStyle={{
        color:"rgba(255,255,255,0.6)",
      }}
      placeholderColor="rgba(255,255,255,0.6)"
      labelStyle={{
        color:"rgba(255,255,255,0.6)"
      }}
    />)

      useEffect(()=>{
        if(isCheckout){
        setLoading(true);
        setTimeout(()=>{
          setLoading(false);
          setIsCheckout(false);
          navigation.navigate('HomeRoute');
        },500)
        }
      },[isCheckout])

  //  const onPaymentSuccess = (token) => {
  //       setToken(token);
  //     };
    const onHandleSubmit = () => {
        if(validateData()){
          const add=`${address.line1}\n${address.line2}\n${address.state},${address.country}-${address.pincode}`
          dispatch(saveAddressAndCard({address:add,card:card?.values?.number||""}))
        dispatch(CartActions.checkoutRequest());
        setIsCheckout(true);
        }
      }
      const total=useSelector(state=>state.total);
      const validateData=()=>{
        if(!address.line1
            || !address.line2 || !address.pincode||!address.state
            ||!address.country
            ){
              return false;
        }
        return true;
      }
    return <>
    <View
    style={{
        paddingTop:insets.top,
        paddingBottom:insets.bottom,
        paddingRight:insets.right,
        paddingLeft:insets.left,
      backgroundColor:"#ff6346"
    }}
  ></View>
     {isCheckout ? (
  <WrapperAnimation>
    <CheckoutAnimation autoPlay loop source={checkout} />
  </WrapperAnimation>
):(
<Container>
        <ScrollView
        showsVerticalScrollIndicator={false}
          style={{
            width:"100%",
            height:"100%",
            padding:5
          }}
        >
        <Wrapper>
        <Label>Payment method</Label>
    <DropDownPicker
    containerStyle={{height: 40,width:200}}
         items={[
            {label: 'Cash On Delivery', value: 'cod'},
            {label: 'Online Payment', value: 'online' }
          ]}
          itemStyle={{
            justifyContent: 'flex-start'
        }}
          defaultValue={method}
          onChangeItem={(item)=>setMethod(item.value)}
          ref={methodRef}
          onSubmitEditing={()=>{}}
    />
      </Wrapper>
      <Wrapper>
      {method==="cod"?null:creditCardForm}
      </Wrapper>
      <Wrapper>
      <Label>Address Line 1</Label>
      <TInput
        value={address?.['line1']}
        onChangeText={(value)=>setAddress({
          ...address,
          line1:value
        })}
        autoCorrect={true}
        returnKeyType="next"
        placeholder="Address Line 1"
        ref={lineOneRef}
        onSubmitEditing={() => lineTwoRef.current.focus()}
      />
      </Wrapper>
      <Wrapper>
      <Label>Address Line 2</Label>
      <TInput
        value={address?.['line2']}
        onChangeText={(value)=>setAddress({
          ...address,
          line2:value
        })}
        autoCorrect={true}
        returnKeyType="next"
        placeholder="Address Line 2"
        ref={lineTwoRef}
        onSubmitEditing={() => pincodeRef.current.focus()}
      />
      </Wrapper>
      <Wrapper>
      <Label>Pincode</Label>
      <TInput
        value={address?.['pincode']}
        onChangeText={(value)=>setAddress({
          ...address,
          pincode:value
        })}
        autoCorrect={true}
        returnKeyType="next"
        placeholder="Pincode"
        ref={pincodeRef}
        onSubmitEditing={() => stateRef.current.focus()}
      />
      </Wrapper>
      <Wrapper>
      <Label>State</Label>
      <TInput
        value={address?.['state']}
        onChangeText={(value)=>setAddress({
          ...address,
          state:value
        })}
        autoCorrect={true}
        returnKeyType="next"
        placeholder="State"
        ref={stateRef}
        onSubmitEditing={() => countryRef.current.focus()}
      />
      </Wrapper>
      <Wrapper>
      <Label>Country</Label>
      <TInput
        value={address?.['country']}
        onChangeText={(value)=>setAddress({
          ...address,
          country:value
        })}
        autoCorrect={true}
        returnKeyType="send"
        placeholder="Country"
        ref={countryRef}
        onSubmitEditing={() =>onHandleSubmit() }
      />
      </Wrapper>
      <LoginButton
        onPress={() => {
          onHandleSubmit();
        }}
      >
                  {!loading ? (
          <ButtonText>
            {method==="cod"?"Place Order COD Amount: ":"PAY"}
             {total.total}</ButtonText>
        ) : (
          <ActivityIndicator color="tomato" size="large" />
        )}

      </LoginButton>
      </ScrollView>
    </Container>
    )}
</>
}
CheckOut.propTypes = {
    navigation: PropTypes.shape({
      navigate: PropTypes.func.isRequired,
    }).isRequired,
};

// {isCheckout && (
//   <WrapperAnimation>
//     <CheckoutAnimation autoPlay loop source={checkout} />
//   </WrapperAnimation>
// )}

// setIsCheckout(true);
// setTimeout(() => {
//   setIsCheckout(false);
// }, 1500);