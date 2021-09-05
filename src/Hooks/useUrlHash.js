import { useCallback, useEffect, useState } from 'react';

/**
 * Hook that takes care of URL hash
 * setUrlHash writes directly to the window.location.hash property
 * currentHash is in sync of browsers URL
 */
function useUrlHash() {
  const decodeHash = (hash) => {
    return decodeURIComponent(hash).replace(/^#/, '');
  };

  const encodeHash = (hash) => {
    return encodeURIComponent(hash);
  };

  const [currentHash, setHash] = useState(decodeHash(window.location.hash));

  const onHashChangeCallback = useCallback(() => {
    setHash(decodeHash(window.location.hash));
  }, []);

  const setUrlHash = (hash) => {
    window.location.hash = encodeHash(hash);
  };

  useEffect(() => {
    window.addEventListener('hashchange', onHashChangeCallback);
    return () => window.removeEventListener('hashchange', onHashChangeCallback);
  }, [onHashChangeCallback]);

  return [currentHash, setUrlHash];
};

export default useUrlHash;
