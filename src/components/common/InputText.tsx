import React from 'react';
import styled from 'styled-components';

interface IProps {
  placeholder?: string;
}

const InputText = React.forwardRef(
  ({ placeholder }: IProps, ref: React.ForwardedRef<HTMLInputElement>) => {
    return (
      <InputTextStyled placeholder={placeholder} ref={ref}></InputTextStyled>
    );
  }
);

const InputTextStyled = styled.input.attrs({ type: 'text' })`
  padding: 0.25rem 0.75rem;
  border: 1px solid ${({ theme }) => theme.color.border};
  border-radius: ${({ theme }) => theme.borderRadius.default};
  font-size: 1rem;
  line-height: 1.5;
  color: ${({ theme }) => theme.color.text};
`;

export default InputText;
