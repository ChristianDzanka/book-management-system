<template>
  <div class="container mt-4">
    <h1 class="text-center mb-4">📚 Book Management System</h1>

    <!-- Search Bar -->
    <SearchBar @search="handleSearch" />

    <!-- Book Form -->
    <BookForm @add="addBook" :editingBook="editingBook" />

    <!-- Book List -->
    <BookList
      :books="filteredBooks"
      @edit="editBook"
      @delete="deleteBook"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref, computed } from 'vue';
import type { Book } from './types/Book';
import { saveBooks, getBooks } from './utils/localStorageHelper';

// Import components
import BookForm from './components/BookForm.vue';
import BookList from './components/BookList.vue';
import SearchBar from './components/SearchBar.vue';

// Reactive state
const books = ref<Book[]>(getBooks());
const editingBook = ref<Book | null>(null);
const searchTerm = ref('');

// Computed search filtering
const filteredBooks = computed(() => {
  if (!searchTerm.value) return books.value;
  return books.value.filter(
    (b) =>
      b.title.toLowerCase().includes(searchTerm.value.toLowerCase()) ||
      b.author.toLowerCase().includes(searchTerm.value.toLowerCase())
  );
});

// Add new book
function addBook(book: Book) {
  if (editingBook.value) {
    // Editing existing
    const index = books.value.findIndex((b) => b.id === book.id);
    if (index !== -1) books.value[index] = book;
    editingBook.value = null;
  } else {
    // Adding new
    book.id = Date.now();
    books.value.push(book);
  }
  saveBooks(books.value);
}

// Edit book
function editBook(book: Book) {
  editingBook.value = { ...book };
}

// Delete book
function deleteBook(id: number) {
  books.value = books.value.filter((b) => b.id !== id);
  saveBooks(books.value);
}

// Handle search
function handleSearch(term: string) {
  searchTerm.value = term;
}
</script>

<style>
body {
  background-color: #f9f9f9;
}
</style>
