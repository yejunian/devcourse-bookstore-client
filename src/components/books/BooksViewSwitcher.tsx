import { ReactNode, useEffect } from 'react';
import { FaList, FaTh } from 'react-icons/fa';
import { useSearchParams } from 'react-router-dom';
import styled from 'styled-components';

import { QUERYSTRING } from '../../constants/querystring';
import Button from '../common/Button';

export type TViewMode = 'grid' | 'list';

const viewOptions: { value: TViewMode; icon: ReactNode }[] = [
  {
    value: 'list',
    icon: <FaList />,
  },
  {
    value: 'grid',
    icon: <FaTh />,
  },
];

function BooksViewSwitcher() {
  const [searchParams, setSearchparams] = useSearchParams();

  const handleSwitch = (value: TViewMode) => {
    const newSearchParams = new URLSearchParams(searchParams);

    newSearchParams.set(QUERYSTRING.VIEW, value);

    setSearchparams(newSearchParams);
  };

  useEffect(() => {
    if (!searchParams.get(QUERYSTRING.VIEW)) {
      handleSwitch('grid');
    }
  }, []);

  return (
    <BooksViewSwitcherStyle>
      {viewOptions.map(({ value, icon }) => (
        <Button
          key={value}
          size="medium"
          scheme={
            searchParams.get(QUERYSTRING.VIEW) === value ? 'primary' : 'normal'
          }
          onClick={() => handleSwitch(value)}
        >
          {icon}
        </Button>
      ))}
    </BooksViewSwitcherStyle>
  );
}

const BooksViewSwitcherStyle = styled.div`
  display: flex;
  gap: 8px;

  svg {
    fill: #fff;
  }
`;

export default BooksViewSwitcher;
