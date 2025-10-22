<template>
  <div class="container py-4">
    <h2 class="mb-4 text-center">📚 Book Management System</h2>

    <BookForm :bookToEdit="selectedBook" @save="saveBook" />
    <SearchBar @search="filterBooks" />
    <BookList
      :books="filteredBooks"
      @edit="editBook"
      @delete="deleteBook"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Book } from '../types/Book';
import { getBooks, saveBooks } from '../utils/localStorageHelper';
import BookForm from '../components/BookForm.vue';
import BookList from '../components/BookList.vue';
import SearchBar from '../components/SearchBar.vue';

const books = ref<Book[]>(getBooks());
const searchQuery = ref('');
const selectedBook = ref<Book | null>(null);

const filteredBooks = computed(() => {
  if (!searchQuery.value) return books.value;
  const q = searchQuery.value.toLowerCase();
  return books.value.filter(
    (b) =>
      b.title.toLowerCase().includes(q) ||
      b.author.toLowerCase().includes(q)
  );
});

const saveBook = (book: Book) => {
  const index = books.value.findIndex((b) => b.id === book.id);
  if (index >= 0) {
    books.value[index] = book;
  } else {
    books.value.push(book);
  }
  saveBooks(books.value);
  selectedBook.value = null;
};

const editBook = (book: Book) => {
  selectedBook.value = book;
};

const deleteBook = (id: number) => {
  books.value = books.value.filter((b) => b.id !== id);
  saveBooks(books.value);
};

const filterBooks = (query: string) => {
  searchQuery.value = query;
};
</script>
