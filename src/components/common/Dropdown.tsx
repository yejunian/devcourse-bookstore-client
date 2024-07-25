import React, { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';

interface IProps {
  children: React.ReactNode;
  toggleButton: React.ReactNode;
  isOpen?: boolean;
}

function Dropdown({ children, toggleButton, isOpen = false }: IProps) {
  const [open, setOpen] = useState(isOpen);

  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleOutsideClick(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        setOpen(false);
      }
    }

    if (open) {
      document.addEventListener('mousedown', handleOutsideClick);
    }

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [dropdownRef, open]);

  return (
    <DropdownStyle ref={dropdownRef} $open={open}>
      <button className="toggle" onClick={() => setOpen(!open)}>
        {toggleButton}
      </button>

      {open && <div className="panel">{children}</div>}
    </DropdownStyle>
  );
}

interface IDropdownStyleProps {
  $open: boolean;
}

const DropdownStyle = styled.div<IDropdownStyleProps>`
  position: relative;

  button {
    background: none;
    border: 0;
    cursor: pointer;
    outline: none;

    svg {
      width: 30px;
      height: 30px;
      fill: ${({ theme, $open }) =>
        $open ? theme.color.primary : theme.color.text};
    }
  }

  .panel {
    position: absolute;
    top: 40px;
    right: 0;
    padding: 16px;
    background-color: #fff;
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.1);
    border-radius: ${({ theme }) => theme.borderRadius.default};
    z-index: 100;
  }
`;

export default Dropdown;
