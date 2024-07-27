import { useMemo, useState } from 'react';
import { FaAngleLeft, FaAngleRight } from 'react-icons/fa';
import styled from 'styled-components';

import BannerItem from '@/components/common/banner/BannerItem';
import { IBanner } from '@/models/banner.model';

interface IProps {
  banners: IBanner[];
}

function Banner({ banners }: IProps) {
  const [currentIndex, setCurrentIndex] = useState(0);

  const transformValue = useMemo(() => {
    return currentIndex * -100;
  }, [currentIndex]);

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < banners.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleIndicatorClick = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <BannerStyle>
      <BannerContainerStyle $transformValue={transformValue}>
        {banners.map((banner) => (
          <BannerItem banner={banner} />
        ))}
      </BannerContainerStyle>

      <BannerButtonStyle>
        <button className="prev" onClick={handlePrev}>
          <FaAngleLeft />
        </button>
        <button className="next" onClick={handleNext}>
          <FaAngleRight />
        </button>
      </BannerButtonStyle>

      <BannerIndicatorStyle>
        {banners.map((_, index) => (
          <span
            key={index}
            className={index === currentIndex ? 'active' : undefined}
            onClick={() => handleIndicatorClick(index)}
          />
        ))}
      </BannerIndicatorStyle>
    </BannerStyle>
  );
}

const BannerStyle = styled.div`
  overflow: hidden;
  position: relative;
`;

interface BannerContainerStyleProps {
  $transformValue: number;
}

const BannerContainerStyle = styled.div<BannerContainerStyleProps>`
  display: flex;

  transform: translateX(${(props) => props.$transformValue}%);
  transition: transform 0.5s ease-in-out;
`;

const BannerButtonStyle = styled.div`
  button {
    border: 0;
    width: 40px;
    height: 40px;
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 512px;
    font-size: 2rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    position: absolute;
    top: 50%;
    transform: translateY(-50%);

    svg {
      fill: #fff;
    }

    &.prev {
      left: 10px;
    }

    &.next {
      right: 10px;
    }

    @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
      width: 28px;
      height: 28px;
      font-size: 1.5rem;

      &.prev {
        left: 0;
      }

      &.next {
        right: 0;
      }
    }
  }
`;

const BannerIndicatorStyle = styled.div`
  position: absolute;
  bottom: 10px;
  left: 50%;
  transform: translateX(-50%);

  span {
    display: inline-block;
    width: 16px;
    height: 16px;
    border-radius: 64px;
    background-color: #fff;
    margin: 0 4px;
    cursor: pointer;

    &.active {
      background-color: ${({ theme }) => theme.color.primary};
    }
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    bottom: 0;

    span {
      width: 12px;
      height: 12px;

      &.active {
        width: 24px;
      }
    }
  }
`;

export default Banner;
