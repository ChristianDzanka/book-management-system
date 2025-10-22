import type { Book } from '../types/Book';

const STORAGE_KEY = 'books';

export const saveBooks = (books: Book[]): void => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(books));
};

export const getBooks = (): Book[] => {
  const data = localStorage.getItem(STORAGE_KEY);
  return data ? JSON.parse(data) : [];
};
