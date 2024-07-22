import { render } from '@testing-library/react';
import React from 'react';

import { BookstoreThemeProvider } from '../../context/ThemeContext';
import { IBook } from '../../models/book.model';
import BookItem from './BookItem';

const dummyBook: IBook = {
  id: 1,
  thumbnail: 'https://picsum.photos/id/1/128',
  title: 'Dummy Book',
  author: 'Dummy Author',
  price: 10000,
  pubDate: '2024-01-01',
  likes: 1,
  excerpt: 'Dummy Summary',
};

// describe('BookItem', () => {
//   it('렌더 여부', () => {
//     const { getByText, getByAltText } = render(
//       <BookstoreThemeProvider>
//         <BookItem book={dummyBook} />
//       </BookstoreThemeProvider>
//     );

//     expect(getByText(dummyBook.title)).toBeInTheDocument();
//     expect(getByText(dummyBook.excerpt)).toBeInTheDocument();
//     expect(getByText(dummyBook.author)).toBeInTheDocument();
//     expect(getByText('10,000원')).toBeInTheDocument();
//     expect(getByText(dummyBook.likes)).toBeInTheDocument();
//     expect(getByAltText(dummyBook.title)).toHaveAttribute(
//       'src',
//       dummyBook.thumbnail
//     );
//   });
// });
