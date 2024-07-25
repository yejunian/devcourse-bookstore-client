import { FaSignInAlt, FaRegUser, FaUserCircle } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

import logo from '@/assets/logo.png';
import Dropdown from '@/components/common/Dropdown';
import ThemeSwitcher from '@/components/header/ThemeSwitcher';
import { useCategory } from '@/hooks/useCategory';
import { useAuthStore } from '@/store/authStore';

function Header() {
  const { category } = useCategory();

  const { isLoggedIn, storeLogout } = useAuthStore();

  return (
    <HeaderStyle>
      <h1 className="logo">
        <Link to="/">
          <img src={logo} alt="Bookstore" />
        </Link>
      </h1>

      <nav className="category">
        <ul>
          {category.map(({ id, name }) => (
            <li key={id}>
              <Link to={id === null ? '/books' : `/books?category_id=${id}`}>
                {name}
              </Link>
            </li>
          ))}
        </ul>
      </nav>

      <nav className="auth">
        <Dropdown toggleButton={<FaUserCircle />}>
          {isLoggedIn && (
            <ul>
              <li>
                <Link to="/cart">장바구니</Link>
              </li>
              <li>
                <Link to="/orderlist">주문내역</Link>
              </li>
              <li>
                <button onClick={storeLogout}>로그아웃</button>
              </li>
            </ul>
          )}

          {!isLoggedIn && (
            <ul>
              <li>
                <Link to="/login">
                  <FaSignInAlt />
                  로그인
                </Link>
              </li>
              <li>
                <Link to="/signup">
                  <FaRegUser />
                  회원가입
                </Link>
              </li>
            </ul>
          )}

          <ThemeSwitcher />
        </Dropdown>
      </nav>
    </HeaderStyle>
  );
}

const HeaderStyle = styled.header`
  width: 100%;
  margin: 0 auto;
  max-width: ${({ theme }) => theme.layout.width.large};

  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 20px 0;
  border-bottom: 1px solid ${({ theme }) => theme.color.background};

  .logo {
    img {
      width: 200px;
    }
  }

  .category {
    ul {
      display: flex;
      gap: 32px;

      li {
        a {
          font-size: 1.5rem;
          font-weight: 600;
          text-decoration: none;
          color: ${({ theme }) => theme.color.text};

          &:hover {
            color: ${({ theme }) => theme.color.primary};
          }
        }
      }
    }
  }

  .auth {
    ul {
      display: flex;
      flex-direction: column;
      gap: 16px;
      width: 100px;

      li {
        a,
        button {
          font-size: 1rem;
          font-weight: 600;
          text-decoration: none;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 100%;
          line-height: 1;
          background: none;
          border: 0;
          cursor: pointer;

          svg {
            margin-right: 6px;
          }
        }
      }
    }
  }
`;

export default Header;
