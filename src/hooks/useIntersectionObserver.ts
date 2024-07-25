import { DependencyList, useEffect, useRef } from 'react';

export const useIntersectionObserver = (
  deps: DependencyList,
  callback: IntersectionObserverCallback,
  options?: IntersectionObserverInit
) => {
  const targetRef = useRef(null);

  useEffect(() => {
    const observer = new IntersectionObserver(callback, options);

    if (targetRef.current) {
      observer.observe(targetRef.current);
    }

    return () => {
      if (targetRef.current) {
        observer.unobserve(targetRef.current);
      }

      observer.disconnect();
    };
  }, deps);

  return { targetRef };
};
