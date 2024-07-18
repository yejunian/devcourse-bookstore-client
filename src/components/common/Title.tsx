import React from 'react';
import styled from 'styled-components';

import { TColorKey, THeadingSize } from '../../style/theme';

interface IProps {
  children: React.ReactNode;
  size: THeadingSize;
  color?: TColorKey;
}

function Title({ children, size, color }: IProps) {
  return (
    <TitleStyle size={size} color={color}>
      {children}
    </TitleStyle>
  );
}

const TitleStyle = styled.h1<Omit<IProps, 'children'>>`
  font-size: ${({ theme, size }) => theme.heading[size].fontSize};
  color: ${({ theme, color }) => theme.color[color ?? 'primary']};
`;

export default Title;
