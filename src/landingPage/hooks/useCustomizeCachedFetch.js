import { useEffect, useState } from "react";

export const useCachedFetch = (cache, setCache, apiFn) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (cache) return; // already cached

    setLoading(true);
    apiFn()
      .then((res) => setCache(res?.data || []))
      .finally(() => setLoading(false));
  }, []);

  return loading;
};
