<template>
  <div class="card shadow p-3">
    <h5 class="mb-3">Book List</h5>
    <table class="table table-striped">
      <thead>
        <tr>
          <th>Title</th>
          <th>Author</th>
          <th>Year</th>
          <th>Category</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="book in books" :key="book.id">
          <td>{{ book.title }}</td>
          <td>{{ book.author }}</td>
          <td>{{ book.year }}</td>
          <td>{{ book.category }}</td>
          <td>
            <button class="btn btn-sm btn-warning me-2" @click="$emit('edit', book)">Edit</button>
            <button class="btn btn-sm btn-danger" @click="$emit('delete', book.id)">Delete</button>
          </td>
        </tr>
        <tr v-if="books.length === 0">
          <td colspan="5" class="text-center">No books added yet.</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts" setup>
import type { Book } from '../types/Book';
defineProps<{ books: Book[] }>();
defineEmits(['edit', 'delete']);
</script>
