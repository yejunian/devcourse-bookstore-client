import Button from '../components/common/Button';
import InputText from '../components/common/InputText';
import Title from '../components/common/Title';
import { formatNumber } from '../utils/format';

const COUNT = 32767;

function Home() {
  return (
    <>
      <Title size="medium" color="background">
        제목 테스트
      </Title>
      <Button size="large" scheme="primary">
        버튼 테스트
      </Button>
      <InputText placeholder="여기에 입력하세요" />
      <div>Home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
}

export default Home;
