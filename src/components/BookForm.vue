<template>
  <form @submit.prevent="handleSubmit" class="mb-4">
    <div class="row g-2">
      <div class="col-md-3">
        <input
          v-model="bookData.title"
          type="text"
          class="form-control"
          placeholder="Book Title"
          required
        />
      </div>

      <div class="col-md-3">
        <input
          v-model="bookData.author"
          type="text"
          class="form-control"
          placeholder="Author"
          required
        />
      </div>

      <div class="col-md-2">
        <input
          v-model.number="bookData.year"
          type="number"
          class="form-control"
          placeholder="Year"
          required
        />
      </div>

      <div class="col-md-2">
        <input
          v-model="bookData.category"
          type="text"
          class="form-control"
          placeholder="Category"
          required
        />
      </div>

      <div class="col-md-2">
        <button type="submit" class="btn btn-primary w-100">
          {{ isEditing ? 'Update' : 'Add' }} Book
        </button>
      </div>
    </div>
  </form>
</template>

<script lang="ts" setup>
import { ref, watch } from 'vue';
import type { Book } from '../types/Book';

// Props
const props = defineProps<{ editingBook: Book | null }>();
const emit = defineEmits(['add']);

// Reactive data for form
const bookData = ref<Book>({
  id: 0,
  title: '',
  author: '',
  year: new Date().getFullYear(),
  category: '',
});

const isEditing = ref(false);

// Watch if an editingBook is passed from App.vue
watch(
  () => props.editingBook,
  (newVal) => {
    if (newVal) {
      bookData.value = { ...newVal };
      isEditing.value = true;
    }
  }
);

// Handle form submission
function handleSubmit() {
  emit('add', { ...bookData.value });

  // Reset form
  bookData.value = {
    id: 0,
    title: '',
    author: '',
    year: new Date().getFullYear(),
    category: '',
  };
  isEditing.value = false;
}
</script>
