import { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

import { fetchCategory } from '../api/category.api';
import { Category } from '../models/category.model';

export const useCategory = () => {
  const location = useLocation();

  const [category, setCategory] = useState<Category[]>([]);

  const setActive = () => {
    const params = new URLSearchParams(location.search);

    if (params.get('category_id')) {
      setCategory((prev) =>
        prev.map((item) => ({
          ...item,
          isActive: item.id === Number(params.get('category_id')),
        }))
      );
    } else {
      setCategory((prev) =>
        prev.map((item) => ({
          ...item,
          isActive: false,
        }))
      );
    }
  };

  useEffect(() => {
    fetchCategory().then((data) => {
      if (!data) {
        return;
      }

      const categoryWithAll = [
        {
          id: null,
          name: '전체',
        },
        ...data.categories,
      ];

      setCategory(categoryWithAll);
      setActive();
    });
  }, []);

  useEffect(() => {
    setActive();
  }, [location.search]);

  return { category };
};
