import { render, screen } from '@testing-library/react';

import { BookstoreThemeProvider } from '../../context/ThemeContext';
import Title from './Title';

describe('Title 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    // 1. 렌더: render
    render(
      <BookstoreThemeProvider>
        <Title size="large">제목</Title>
      </BookstoreThemeProvider>
    );

    // 2. 확인: expect
    expect(screen.getByText('제목')).toBeInTheDocument();
  });

  it('size prop 적용', () => {
    const { container } = render(
      <BookstoreThemeProvider>
        <Title size="large">제목</Title>
      </BookstoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ fontSize: '2rem' });
  });

  it('color prop 적용', () => {
    const { container } = render(
      <BookstoreThemeProvider>
        <Title size="large" color="primary">
          제목
        </Title>
      </BookstoreThemeProvider>
    );

    expect(container?.firstChild).toHaveStyle({ color: 'brown' });
  });
});
