import 'sanitize.css';
import { createGlobalStyle } from 'styled-components';
import { TThemeName } from './theme';

interface IProps {
  themeName: TThemeName;
}

export const GlobalStyle = createGlobalStyle<IProps>`
  body {
    margin: 0;
    padding: 0;
    background-color: ${(props) =>
      props.themeName === 'light' ? 'white' : 'black'};
  }

  h1 {
    margin: 0;
  }

  * {
    color: ${(props) => (props.themeName === 'light' ? 'black' : 'white')};
  }
`;
