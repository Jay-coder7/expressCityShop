import React, { useMemo, useCallback, useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { FlatList, Text, View } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import {
  Container,
  DepartmentContainer,
  DepartmentItem,
  DepartmentLogo,
  DepartmentImage,
  DepartmentText,
  SalesContainer,
  SpinnerLoading,
  Wrapper,
  EmptyImage,
} from './styles';

import Header from './../../components/Header';
import ProductItem from './../../components/ProductItem';
// import api from '../../..';
import all from './../../assets/icons/online-store.png';
import drone from './../../assets/icons/drone.png';
import tv from './../../assets/icons/tv.png';
import smartphone from './../../assets/icons/smartphone.png';
import videogames from './../../assets/icons/videogames.png';
import laptop from './../../assets/icons/laptop.png';
import notfound from './../../assets/images/not-found.png';
import db from '../../../db';
import { useSelector } from 'react-redux';

export default function Home({ navigation }) {
const insets=useSafeAreaInsets();
const profile=useSelector(state=>state.loggedInProfile);
  const [loading, setLoading] = useState(false);
  const [products, setProducts] = useState([]);
  const [department, setDepartment] = useState('todos');
  const sellerProducts=useSelector(state=>state.sellerProducts)
  const loadProducts = useCallback(async () => {
    setLoading(true);
    const data=profile.type==="Seller"?sellerProducts:db.products;
    setProducts(data);
    setLoading(false);
  }, []);

  useEffect(() => {
    loadProducts();
  }, [loadProducts]);

  useEffect(()=>{
    if(profile.type==="Seller"){
      console.log("loadProducts52",sellerProducts)
      loadProducts()
    }
  },[loadProducts,sellerProducts])

  useMemo(async () => {
    setLoading(true);
    let response;
    if (department !== 'todos') {
      const {id:departmentId}=db.department.find(x=>x.title===department);
      const selectedType=profile?.type==="Seller"?sellerProducts:db.products;
      const data=selectedType.filter(x=>{
        return x.departmentId===departmentId
      })
      
      setProducts(data);
    } else {
      const data=profile?.type==="Seller"?sellerProducts:db.products;
      setProducts(data);
    }
    setLoading(false);
  }, [department]);

  async function handleSearchSubmit(search) {
    setLoading(true);
    const selectedType=profile?.type==="Seller"?sellerProducts:db.products;
    if(search){
      const response = {
        data:selectedType.filter(p=>{
          return p.title.toLowerCase().includes(search.toLowerCase())
        })
      }
    setProducts(response.data);
    }else{
      const data=selectedType
      setProducts(data);
    }
    setLoading(false);
  }

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
    <Container>
      <Header handleSearchSubmit={handleSearchSubmit} />
      {
        profile.type==="Buyer"?
        <>
           <DepartmentContainer>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('todos');
            }}
          >
            <DepartmentImage source={all} />
          </DepartmentLogo>
          <DepartmentText>Todos</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('drone');
            }}
          >
            <DepartmentImage source={drone} />
          </DepartmentLogo>
          <DepartmentText>Drone</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('tv');
            }}
          >
            <DepartmentImage source={tv} />
          </DepartmentLogo>
          <DepartmentText>TV</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('laptop');
            }}
          >
            <DepartmentImage source={laptop} />
          </DepartmentLogo>
          <DepartmentText>Notebook</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('videogames');
            }}
          >
            <DepartmentImage source={videogames} />
          </DepartmentLogo>
          <DepartmentText>Video games</DepartmentText>
        </DepartmentItem>
        <DepartmentItem>
          <DepartmentLogo
            onPress={() => {
              setDepartment('smartphone');
            }}
          >
            <DepartmentImage source={smartphone} />
          </DepartmentLogo>
          <DepartmentText>Smarthphone</DepartmentText>
        </DepartmentItem>
      </DepartmentContainer>

        </>:
        <>
          <Text
            style={{
              
              justifyContent:'center',
              textAlign:'center',
              fontSize:25,
      backgroundColor:"#ff6346",
      color:'#fff'
    }}
          >
            Your products
          </Text>
        </>
      }
      <SalesContainer>
        {loading ? (
          <SpinnerLoading />
        ) : (
          <>
            {products.length > 0 ? (
              <FlatList
                showsVerticalScrollIndicator={false}
                numColumns={1}
                data={products}
                keyExtractor={item => String(item.id)}
                renderItem={({ item }) => (
                  <ProductItem item={item} navigation={navigation} 
                    isSeller={profile.type==="Seller"}
                  />
                )}
              />
            ) : (
              <Wrapper>
                <EmptyImage source={notfound} />
              </Wrapper>
            )}
          </>
        )}
      </SalesContainer>
    </Container>
  </>);
}

Home.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired,
  }).isRequired,
};


// product redux....use redux when seller..otherwise use simple db.profucts
// add/edit page for products in seller