import { render, screen } from '@testing-library/react';
import React from 'react';

import { BookstoreThemeProvider } from '../../context/ThemeContext';
import InputText from './InputText';

describe('InputText 컴포넌트 테스트', () => {
  it('렌더 확인', () => {
    // 1. 렌더: render
    render(
      <BookstoreThemeProvider>
        <InputText placeholder="여기에 입력" />
      </BookstoreThemeProvider>
    );

    // 2. 확인: expect
    expect(screen.getByPlaceholderText('여기에 입력')).toBeInTheDocument();
  });

  it('forwardRef 테스트', () => {
    const ref = React.createRef<HTMLInputElement>();
    render(
      <BookstoreThemeProvider>
        <InputText placeholder="여기에 입력" ref={ref} />
      </BookstoreThemeProvider>
    );

    expect(ref.current).toBeInstanceOf(HTMLInputElement);
  });
});
