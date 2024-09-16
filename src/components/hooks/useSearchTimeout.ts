import { useCallback, useEffect, useRef, useState } from 'react';

export const useSearchTimeout = (
  onSearch: () => void,
  beforeSearch?: () => void
) => {
  const searchTimeout = useRef<number | undefined>();
  const [textInputValue, setTextInputValue] = useState('');
  const [loading, setLoading] = useState(false);

  const search = useCallback(() => {
    if (beforeSearch) beforeSearch();

    if (searchTimeout.current != null) {
      clearTimeout(searchTimeout.current);
    }

    if (textInputValue.length === 0) {
      setLoading(false);
      return;
    }

    if (!loading && textInputValue.length !== 0) {
      setLoading(true);
    }

    searchTimeout.current = window.setTimeout(async () => {
      await onSearch();
      setLoading(false);
      searchTimeout.current = undefined;
    }, 500);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [textInputValue]);

  useEffect(() => {
    search();
  }, [search]);

  return {
    textInputValue,
    setTextInputValue,
    loading,
  };
};
