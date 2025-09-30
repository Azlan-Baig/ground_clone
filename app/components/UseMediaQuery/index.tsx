'use client'
// import { useState, useEffect } from 'react';

// const UseMediaQuery = (query: string): boolean => {
//   const [matches, setMatches] = useState<boolean>(() => window?.matchMedia(query).matches);

//   useEffect(() => {
//     const mediaQueryList = window.matchMedia(query);

//     const listener = (event: MediaQueryListEvent) => {
//       setMatches(event.matches);
//     };

//     // Use addEventListener for modern API
//     mediaQueryList.addEventListener('change', listener);

//     // Cleanup listener on unmount
//     return () => {
//       mediaQueryList.removeEventListener('change', listener);
//     };
//   }, [query]);

//   return matches;
// };

// export default UseMediaQuery;

import { useState, useEffect } from 'react';

const UseMediaQuery = (query: string): boolean => {
  const [matches, setMatches] = useState<boolean>(false);

  useEffect(() => {
    // Check if we are running in the browser
    if (typeof window === 'undefined') {
      return;
    }

    const mediaQueryList = window.matchMedia(query);

    const listener = (event: MediaQueryListEvent) => {
      setMatches(event.matches);
    };

    setMatches(mediaQueryList.matches); // Set the initial value

    mediaQueryList.addEventListener('change', listener);

    return () => {
      mediaQueryList.removeEventListener('change', listener);
    };
  }, [query]);

  return matches;
};

export default UseMediaQuery;

