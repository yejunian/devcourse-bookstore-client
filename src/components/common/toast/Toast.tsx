import { useState } from 'react';
import { FaBan, FaInfoCircle, FaPlus } from 'react-icons/fa';
import styled from 'styled-components';

import { useTimeout } from '@/hooks/useTimeout';
import useToastStore, { IToast } from '@/store/toastStore';

export const TOAST_REMOVE_DELAY = 3000;

function Toast({ id, message, type }: IToast) {
  const removeToast = useToastStore((state) => state.removeToast);

  const [isFadingOut, setIsFadingOut] = useState(false);

  useTimeout(() => {
    setIsFadingOut(true);
  }, TOAST_REMOVE_DELAY);

  const handleRemoveToast = () => {
    setIsFadingOut(true);
  };

  const handleAnimationEnd = () => {
    if (isFadingOut) {
      removeToast(id);
    }
  };

  return (
    <ToastStyle
      className={isFadingOut ? 'fade-out' : 'fade-in'}
      onAnimationEnd={handleAnimationEnd}
    >
      {type === 'info' && <FaInfoCircle />}
      {type === 'error' && <FaBan />}

      <p>{message}</p>

      <button onClick={handleRemoveToast}>
        <FaPlus />
      </button>
    </ToastStyle>
  );
}

const ToastStyle = styled.div`
  background-color: ${({ theme }) => theme.color.background};
  padding: 12px;
  border-radius: ${({ theme }) => theme.borderRadius.default};

  display: flex;
  justify-content: space-between;
  align-items: start;
  gap: 24px;

  p {
    color: ${({ theme }) => theme.color.text};
    line-height: 1;
    margin: 0;
    flex: 1;

    display: flex;
    align-items: end;
    gap: 4px;
  }

  button {
    background-color: transparent;
    border: 0;
    cursor: pointer;
    padding: 0;
    margin: 0;

    svg {
      transform: rotate(45deg);
    }
  }

  &.fade-in {
    animation: fade-in 0.3s ease-in-out forwards;
  }

  &.fade-out {
    animation: fade-out 0.3s ease-in-out forwards;
  }

  @keyframes fade-in {
    from {
      opacity: 0;
    }
    to {
      opacity: 1;
    }
  }

  @keyframes fade-out {
    from {
      opacity: 1;
    }
    to {
      opacity: 0;
    }
  }
`;

export default Toast;
