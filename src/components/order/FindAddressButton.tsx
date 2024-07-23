import { useEffect } from 'react';

import Button from '../common/Button';

interface IProps {
  onCompleted: (address: string) => void;
}

const SCRIPT_URL =
  '//t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js';

function FindAddressButton({ onCompleted }: IProps) {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = SCRIPT_URL;
    script.async = true;
    document.head.appendChild(script);

    return () => {
      document.head.removeChild(script);
    };
  }, []);

  const handleOpen = () => {
    new window.daum.Postcode({
      oncomplete: (data: any) => {
        onCompleted(data.address as string);
      },
    }).open();
  };

  return (
    <Button type="button" size="medium" scheme="normal" onClick={handleOpen}>
      주소 찾기
    </Button>
  );
}

export default FindAddressButton;
