import React from 'react';
import styled from 'styled-components';

import Footer from '@/components/common/Footer';
import Header from '@/components/common/Header';

interface ILayoutProps {
  children: React.ReactNode;
}

function Layout({ children }: ILayoutProps) {
  return (
    <>
      <Header />
      <LayoutStyle>{children}</LayoutStyle>
      <Footer />
    </>
  );
}

const LayoutStyle = styled.main`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};
  padding: 20px 0;

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    padding: 20px 12px;
  }
`;

export default Layout;
