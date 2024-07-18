import { useEffect, useState } from 'react';

import { fetchCategory } from '../api/category.api';
import { Category } from '../models/category.model';

export const useCategory = () => {
  const [category, setCategory] = useState<Category[]>([]);

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
    });
  }, []);

  return { category };
};
