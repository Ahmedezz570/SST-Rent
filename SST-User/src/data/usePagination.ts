
import { useMemo } from 'react';

interface UsePaginationProps<T> {
  items: T[];
  itemsPerPage: number;
  currentPage: number;
  sortByDate?: (item: T) => string | Date;
}

export function usePagination<T>({
  items,
  itemsPerPage,
  currentPage,
  sortByDate,
}: UsePaginationProps<T>) {
  const sortedItems = useMemo(() => {
    if (!sortByDate) return items;
    
    return [...items].sort((a, b) => {
      const dateA = new Date(sortByDate(a));
      const dateB = new Date(sortByDate(b));
      return dateB.getTime() - dateA.getTime(); 
    });
  }, [items, sortByDate]);

  const totalPages = Math.ceil(sortedItems.length / itemsPerPage);
  
  const paginatedItems = useMemo(() => {
    const startIndex = (currentPage - 1) * itemsPerPage;
    const endIndex = startIndex + itemsPerPage;
    return sortedItems.slice(startIndex, endIndex);
  }, [sortedItems, currentPage, itemsPerPage]);

  return {
    items: paginatedItems,
    totalPages,
    totalItems: sortedItems.length,
    currentPage,
    hasNextPage: currentPage < totalPages,
    hasPreviousPage: currentPage > 1,
  };
}
