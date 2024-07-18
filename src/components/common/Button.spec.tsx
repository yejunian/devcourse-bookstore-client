import { render, screen } from '@testing-library/react';

import { BookstoreThemeProvider } from '../../context/ThemeContext';
import Button from './Button';

describe('Title 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    // 1. 렌더: render
    render(
      <BookstoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookstoreThemeProvider>
    );

    // 2. 확인: expect
    expect(screen.getByText('버튼')).toBeInTheDocument();
  });

  it('size prop 적용', () => {
    render(
      <BookstoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookstoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({ fontSize: '1.5rem' });
  });

  it('scheme prop 적용', () => {
    render(
      <BookstoreThemeProvider>
        <Button size="large" scheme="primary">
          버튼
        </Button>
      </BookstoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({
      color: 'white',
      backgroundColor: 'midnightblue',
    });
  });

  it('disabled prop 적용', () => {
    render(
      <BookstoreThemeProvider>
        <Button size="large" scheme="primary" disabled>
          버튼
        </Button>
      </BookstoreThemeProvider>
    );

    expect(screen.getByRole('button')).toHaveStyle({
      opacity: '0.5',
      pointerEvents: 'none',
      cursor: 'none',
    });
  });
});
