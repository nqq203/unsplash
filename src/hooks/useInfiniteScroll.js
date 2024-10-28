import { useState, useEffect } from 'react';

export const useInfiniteScroll = (callback) => {
  // const [isFetching, setIsFetching] = useState(false);

  // useEffect(() => {
  //   window.addEventListener('scroll', handleScroll);
  //   return () => window.removeEventListener('scroll', handleScroll);
  // }, [isFetching]);

  // // useEffect(() => {
  // //   if (!isFetching) 
  // //     return () => window.removeEventListener('scroll', handleScroll);
  // // }, [isFetching]);

  // useEffect(() => {
  //   if (!isFetching) return;
  //   setTimeout(() => {
  //     callback();
  //   }, [3000]);
  // }, [isFetching, callback]);

  // function handleScroll() {
  //   if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight && !isFetching) {
  //     setIsFetching(true);
  //   }
  // }

  // return [isFetching, setIsFetching];

  const [isFetching, setIsFetching] = useState(false);
  const [canFetch, setCanFetch] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      if (window.innerHeight + document.documentElement.scrollTop + 1 >= document.documentElement.offsetHeight && !isFetching && canFetch) {
        setIsFetching(true);
        setCanFetch(false);
        setTimeout(() => {
          callback();
          setIsFetching(false); 
          setTimeout(() => setCanFetch(true), 500); 
        }, 2000);
      }
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, [isFetching, canFetch, callback]); // Thêm canFetch vào dependencies

  return [isFetching];
};
