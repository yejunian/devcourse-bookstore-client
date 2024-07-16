import Layout from './components/layout/Layout';
import Home from './pages/Home';
import ThemeSwitcher from './components/header/ThemeSwitcher';
import { BookstoreThemeProvider } from './context/ThemeContext';

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
