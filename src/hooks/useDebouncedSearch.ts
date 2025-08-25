import { useState, useEffect, useCallback } from 'react';
import { useDebounce } from './useDebounce';

interface UseDebouncedSearchProps {
  onSearch: (searchTerm: string) => void;
  delay?: number;
}

/**
 * Custom hook khusus untuk search dengan debouncing
 * Mengembalikan searchTerm dan handler untuk input
 */
export const useDebouncedSearch = ({ 
  onSearch, 
  delay = 500 
}: UseDebouncedSearchProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [isSearching, setIsSearching] = useState(false);

  // Debounce search term
  const debouncedSearchTerm = useDebounce(searchTerm, delay);

  // Execute search when debounced term changes
  useEffect(() => {
    if (searchTerm !== '') {
      setIsSearching(true);
    }

    onSearch(debouncedSearchTerm);
    setIsSearching(false);
  }, [debouncedSearchTerm, onSearch]);

  // Handler untuk input change
  const handleSearchChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  }, []);

  // Clear search
  const clearSearch = useCallback(() => {
    setSearchTerm('');
  }, []);

  return {
    searchTerm,
    isSearching,
    handleSearchChange,
    clearSearch
  };
};
