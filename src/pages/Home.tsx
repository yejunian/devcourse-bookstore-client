import { formatNumber } from '../utils/format';

const COUNT = 32767;

function Home() {
  return (
    <>
      <div>Home body</div>
      <div>count: {formatNumber(COUNT)}</div>
    </>
  );
}

export default Home;
