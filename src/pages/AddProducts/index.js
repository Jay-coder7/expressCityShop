import React, { useEffect, useRef, useState } from 'react';
import PropTypes from 'prop-types';
import { ActivityIndicator, Text  } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';

import { useSafeAreaInsets } from 'react-native-safe-area-context';
import DropDownPicker from 'react-native-dropdown-picker';

import TabStateIcon from './../../components/TabStateIcon';

import {
  Container,
  Wrapper,
  Label,
  LoginButton,
  ButtonText,
} from './styles';

import TInput from '../../components/Input';

import db from "../../../db";
import colors from '../../styles/colors';
import { withNavigationFocus } from 'react-navigation';
import { ScrollView } from 'react-native-gesture-handler';
import { addProduct, updateProduct } from '../../store/modules/products/actions';

function AddProducts(props) {
  const INITIAL_STATE={  "id": 0,
  "departmentId": 1,
  "title": "",
  "description": " ",
  "rating": 0,
  "numrating": 0,
  "images": ['','',''],
  "price": '0',
  "discount":'0',
  "sellerId": profile?.id}
  const {navigation,isFocused}=props;
  const profile=useSelector(state=>state.loggedInProfile);
  const sellerProducts=useSelector(state=>state.sellerProducts)

const insets=useSafeAreaInsets();
  const dispatch = useDispatch();
  const product=navigation.getParam('product');
  const titleRef = useRef();
  const departmentRef = useRef();
  const descriptionRef = useRef();
  const imageOneRef = useRef();
  const imageTwoRef = useRef();
  const imageThreeRef = useRef();
  const priceRef = useRef();
  const discountRef = useRef();
  
  const [isEdit,setIsEdit]=useState(false);
  const [loading, setLoading] = useState(false);
  
  const [state, setState] = useState(  {
    "id": 0,
    "departmentId": 1,
    "title": "",
    "description": " ",
    "rating": 0,
    "numrating": 0,
    "images": ['','',''],
    "price": '0',
    "discount":'0',
    "sellerId": profile?.id
},);
  
  useEffect(()=>{
    console.log(isFocused,"mount");
    if(isFocused){
        if(product){
          setIsEdit(true);
           setState({
        ...product,
        price:product?.price?.toString()||'0',
        discount:product?.discount?.toString()||'0',
        images:product?.images?.map(x=>x?x:'')||['','','']
      });
        }else{
          setIsEdit(false);
          setState({
            ...INITIAL_STATE
          })
        }
    }else{
      navigation.setParams({product:undefined});
    }
    // return ()=>{
    // console.log(isFocused,"unmount");
    //   navigation.setParams({product:undefined});
    // }
  },[isFocused]);

  // useEffect(()=>{
  //   if(isEdit){
  //     setState({
  //       ...product,
  //       price:product?.price?.toString()||'0',
  //       discount:product?.discount?.toString()||'0',
  //       images:product?.images?.map(x=>x?x:'')||['','','']
  //     });
  //   }else{
  //     setState({
  //       ...INITIAL_STATE
  //     })
  //   }
  // },[isEdit]);

  const onAdd=()=>{
  let data;
  if(isEdit){
    data={
      ...state,
      price:parseFloat(state.price),
      discount:parseFloat(state.discount)
    };
    dispatch(updateProduct(data));
    navigation.navigate('Home');
  }else{
    data={
      ...state,
      price:parseFloat(state.price),
      discount:parseFloat(state.discount),
      id:sellerProducts.length
    }
    dispatch(addProduct(data));
    navigation.navigate('Home');
  }
  }

  return (
    <Container
    paddingTop={Math.round(insets.top)}
    >
        <ScrollView
        showsVerticalScrollIndicator={false}
          style={{
            width:"100%",
            height:"100%",
            padding:5
          }}
        >
      <Wrapper>
        <Label>Title</Label>
        <TInput
          autoCorrect={true}
          autoCapitalize="none"
          returnKeyType="next"
          placeholder="Title"
          ref={titleRef}
          onSubmitEditing={() => departmentRef.current.focus()}
          value={state.title}
          onChangeText={value=>setState({
            ...state,
            title:value,
          })}
        />
      </Wrapper>
      <Wrapper>
    <DropDownPicker
    containerStyle={{height: 40,width:200}}
         items={db.department.map(x=>{
           return {label:x.title,
            value:x.id
          }
         })}
          itemStyle={{
            justifyContent: 'flex-start'
        }}
          defaultValue={state.departmentId}
          ref={departmentRef}
          onChangeItem={(item)=>setState({
            ...state,
            departmentId:item.value
          })}
          onSubmitEditing={() => descriptionRef.current.focus()}

    />
      </Wrapper>
      <Wrapper>
        <Label>Description</Label>
        <TInput
          returnKeyType="next"
          placeholder="Description"
          ref={descriptionRef}
          value={state?.description}
          onChangeText={(value)=>setState({
            ...state,
            description:value
          })}
          onSubmitEditing={() => imageOneRef.current.focus()}

        />
      </Wrapper>
      <Wrapper>
        <Label>Image 1</Label>
        <TInput
          returnKeyType="next"
          placeholder="Image 1"
          ref={imageOneRef}
          value={state?.images[0]||''}
          onChangeText={(value)=>setState({
            ...state,
            images:state.images.map((x,i)=>{
              return i===0?value:x
            })
          })}
          onSubmitEditing={() => imageTwoRef.current.focus()}
        />
      </Wrapper>
      <Wrapper>
        <Label>Image 2</Label>
        <TInput
          returnKeyType="next"
          placeholder="Image 2"
          ref={imageTwoRef}
          value={state?.images[1]}
          onChangeText={(value)=>setState({
            ...state,
            images:state.images.map((x,i)=>{
              return i===1?value:x
            })
          })}
          onSubmitEditing={() => imageThreeRef.current.focus()}
        />
      </Wrapper>
      <Wrapper>
        <Label>Image 3</Label>
        <TInput
          returnKeyType="next"
          placeholder="Image 3"
          ref={imageThreeRef}
          value={state?.images[2]}
          onChangeText={(value)=>setState({
            ...state,
            images:state.images.map((x,i)=>{
              return i===2?value:x
            })
          })}
          onSubmitEditing={() => priceRef.current.focus()}
        />
      </Wrapper>
      <Wrapper>
        <Label>Price</Label>
        <TInput
          returnKeyType="next"
          keyboardType="number-pad"
          placeholder="Price"
          ref={priceRef}
          value={state?.price}
          onChangeText={(value)=>setState({
            ...state,
            price:value
          })}
          onSubmitEditing={() => discountRef.current.focus()}
        />
      </Wrapper>
      <Wrapper>
        <Label>Discount</Label>
        <TInput
          returnKeyType="send"
          keyboardType="number-pad"
          placeholder="Discount"
          ref={discountRef}
          value={state?.discount}
          onChangeText={(value)=>setState({
            ...state,
            discount:value
          })}
          onSubmitEditing={() => onAdd()}
        />
      </Wrapper>


      <LoginButton
        onPress={() => {onAdd()}}
      >
        {!loading ? (
          <ButtonText>{isEdit?"Update":"Add"} Product</ButtonText>
        ) : (
          <ActivityIndicator color="tomato" size="large" />
        )}
      </LoginButton>
      </ScrollView>
    </Container>
  );
}

AddProducts.navigationOptions = {
    tabBarColor: colors.primary,
    tabBarLabel: <Text style={{ fontSize: 12 }}>Add New</Text>,
    tabBarIcon: props => <TabStateIcon name="plus" {...props} />,
  };

AddProducts.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};
export default withNavigationFocus(AddProducts)