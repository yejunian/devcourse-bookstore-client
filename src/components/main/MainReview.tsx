import Slider from 'react-slick';
import 'slick-carousel/slick/slick-theme.css';
import 'slick-carousel/slick/slick.css';
import styled from 'styled-components';

import BookReviewItem from '@/components/book/BookReviewItem';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IBookReviewItem } from '@/models/book.model';

interface IProps {
  reviews: IBookReviewItem[];
}

function MainReview({ reviews }: IProps) {
  const { isMobile } = useMediaQuery();

  const sliderSettings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: isMobile ? 1 : 3,
    slidesToScroll: isMobile ? 1 : 3,
    gap: 16,
  };

  return (
    <MainReviewStyle>
      <Slider {...sliderSettings}>
        {reviews.map((review) => (
          <BookReviewItem key={review.id} review={review} />
        ))}
      </Slider>
    </MainReviewStyle>
  );
}

const MainReviewStyle = styled.div`
  padding: 0 0 24px 0;

  .slick-track {
    padding: 12px 0;
  }

  .slick-slide > div {
    margin: 0 12px;
  }

  .slick-prev::before,
  .slick-next::before {
    color: #000;
  }

  @media screen and (${({ theme }) => theme.mediaQuery.mobile}) {
    .slick-prev {
      left: 0;
    }

    .slick-next {
      right: 0;
    }
  }
`;

export default MainReview;
