import { useEffect, useState } from 'react';

import { getTheme } from '@/style/theme';

export const useMediaQuery = () => {
  const [isMobile, setIsMobile] = useState(
    window.matchMedia(getTheme('light').mediaQuery.mobile).matches
  );

  useEffect(() => {
    const mobileQuery = window.matchMedia(getTheme('light').mediaQuery.mobile);

    setIsMobile(mobileQuery.matches);
  }, []);

  return { isMobile };
};
