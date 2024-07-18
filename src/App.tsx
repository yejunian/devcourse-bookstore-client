import ThemeSwitcher from './components/header/ThemeSwitcher';
import Layout from './components/layout/Layout';
import { BookstoreThemeProvider } from './context/ThemeContext';
import Home from './pages/Home';

function App() {
  return (
    <BookstoreThemeProvider>
      <ThemeSwitcher />

      <Layout>
        <Home />
        {/* <Detail /> */}
      </Layout>
    </BookstoreThemeProvider>
  );
}

export default App;
