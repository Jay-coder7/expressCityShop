import React, { forwardRef } from 'react';
import { FontAwesome } from '@expo/vector-icons/';

import { Container, TArea } from './styles';

function TextArea({ icon, ...rest }, ref) {
  return (
    <Container>
      <TArea ref={ref} {...rest} />
      {icon && (
        <FontAwesome name={icon} size={20} color="rgba(255,255,255,0.6)" />
      )}
    </Container>
  );
}

export default forwardRef(TextArea);
