import styled from 'styled-components';

import BooksEmpty from '@/components/books/BooksEmpty';
import BooksFilter from '@/components/books/BooksFilter';
import BooksList from '@/components/books/BooksList';
import BooksViewSwitcher from '@/components/books/BooksViewSwitcher';
import Button from '@/components/common/Button';
import Loading from '@/components/common/Loading';
import Title from '@/components/common/Title';
import { useBooksInfinite } from '@/hooks/useBooksInfinite';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

function BooksInfinite() {
  const {
    books,
    pagination,
    isEmpty,
    isBooksLoading,
    fetchNextPage,
    hasNextPage,
  } = useBooksInfinite();

  const loadMore = () => {
    if (!hasNextPage) {
      return;
    }

    fetchNextPage();
  };

  const { targetRef: moreRef } = useIntersectionObserver(
    [pagination],
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          loadMore();
          observer.unobserve(entry.target);
        }
      });
    }
  );

  if (isEmpty) {
    return <BooksEmpty />;
  }

  if (!books || !pagination || isBooksLoading) {
    return <Loading />;
  }

  return (
    <>
      <Title size="large">도서 검색 결과</Title>

      <BooksStyle>
        <div className="filter">
          <BooksFilter />
          <BooksViewSwitcher />
        </div>

        <BooksList books={books} />

        <div className="more" ref={moreRef}>
          <Button
            size="medium"
            scheme="normal"
            onClick={() => fetchNextPage()}
            disabled={!hasNextPage}
          >
            {hasNextPage ? '더 보기' : '마지막 페이지'}
          </Button>
        </div>
      </BooksStyle>
    </>
  );
}

const BooksStyle = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  gap: 24px;

  .filter {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 20px 0;
  }
`;

export default BooksInfinite;
