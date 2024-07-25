import React, { useState } from 'react';
import styled from 'styled-components';

interface ITabProps {
  title: string;
  children: React.ReactNode;
}

function Tab({ children }: ITabProps) {
  return (
    <>
      <div>{children}</div>
    </>
  );
}

interface ITabsProps {
  children: React.ReactNode;
}

function Tabs({ children }: ITabsProps) {
  const [activeIndex, setActiveIndex] = useState(0);

  const tabs = React.Children.toArray(
    children
  ) as React.ReactElement<ITabProps>[];

  return (
    <TabsStyle>
      <div className="tab-header">
        {tabs.map((tab, index) => (
          <button
            key={index}
            className={activeIndex === index ? 'active' : undefined}
            onClick={() => setActiveIndex(index)}
          >
            {tab.props.title}
          </button>
        ))}
      </div>

      <div className="tab-content">{tabs[activeIndex]}</div>
    </TabsStyle>
  );
}

const TabsStyle = styled.div`
  .tab-header {
    display: flex;
    gap: 2px;
    border-bottom: 1px solid #ddd;

    button {
      border: 0;
      background-color: #ddd;
      cursor: pointer;
      font-size: 1.25rem;
      font-weight: bold;
      color: ${({ theme }) => theme.color.text};
      border-radius: ${({ theme }) => theme.borderRadius.default}
        ${({ theme }) => theme.borderRadius.default} 0 0;
      padding: 12px 24px;

      &.active {
        color: #fff;
        background-color: ${({ theme }) => theme.color.primary};
      }
    }
  }

  .tab-content {
    padding: 24px 0;
  }
`;

export { Tabs, Tab };
