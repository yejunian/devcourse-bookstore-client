import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { LIMIT } from '../../constants/pagination';
import { QUERYSTRING } from '../../constants/querystring';
import { IPagination } from '../../models/pagination.model';
import Button from '../common/Button';

interface IProps {
  pagination: IPagination;
}

function Pagination({ pagination }: IProps) {
  const [searchParams, setSearchParams] = useSearchParams();

  const { total, current } = pagination;
  const pages = Math.ceil(total / LIMIT);

  const handleClickPage = (page: number) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.PAGE, page.toString());

    setSearchParams(newSearchParams);
  };

  return (
    <PaginationStyle>
      {pages > 0 && (
        <ol>
          {Array(pages)
            .fill(0)
            .map((_, index) => (
              <li key={index}>
                <Button
                  size="small"
                  scheme={index + 1 === current ? 'primary' : 'normal'}
                  onClick={() => handleClickPage(index + 1)}
                >
                  {index + 1}
                </Button>
              </li>
            ))}
        </ol>
      )}
    </PaginationStyle>
  );
}

const PaginationStyle = styled.div`
  display: flex;
  justify-content: start;
  align-items: center;
  padding: 24px;

  ol {
    list-style: none;
    display: flex;
    gap: 8px;
    padding: 0;
    margin: 0;
  }
`;

export default Pagination;
