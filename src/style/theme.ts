export type TThemeName = 'light' | 'dark';

type TColorKey = 'primary' | 'secondary' | 'third' | 'background';

interface ITheme {
  name: TThemeName;
  color: Record<TColorKey, string>;
}

export const light: ITheme = {
  name: 'light',
  color: {
    primary: 'brown',
    secondary: 'blue',
    third: 'green',
    background: 'lightgray',
  },
};

export const dark: ITheme = {
  name: 'dark',
  color: {
    primary: 'coral',
    secondary: 'darkblue',
    third: 'darkgreen',
    background: 'midnightblue',
  },
};

export const getTheme = (themeName: TThemeName) => {
  switch (themeName) {
    case 'light':
      return light;
    case 'dark':
      return dark;
  }
};
