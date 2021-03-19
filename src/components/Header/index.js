import React, { useEffect, useState } from 'react';
import PropTypes from 'prop-types';

import { Container, Logo } from './styles';
import InputSearch from '../InputSearch';
import logo from '../../assets/icons/logo.png';

export default function Header({ handleSearchSubmit }) {
  const [search, setSearch] = useState('');

  useEffect(()=>{
      handleSearchSubmit(search)
  },[search])
  return (
    <Container>
      <Logo source={logo} />
      <InputSearch
        placeholder="Search"
        icon="search"
        autoCorrect={false}
        autoCapitalize="none"
        returnKeyType="send"
        onSubmitEditing={ setSearch}
        search={search}
        setSearch={setSearch}
      />
    </Container>
  );
}

Header.propTypes = {
  handleSearchSubmit: PropTypes.func.isRequired,
};
