<template>
  <div class="input-group mb-4">
    <input
      type="text"
      class="form-control"
      placeholder="Search by title or author..."
      v-model="query"
      @input="emitSearch"
    />
  </div>
</template>

<script lang="ts" setup>
import { ref } from 'vue';

const emit = defineEmits(['search']);
const query = ref('');

const emitSearch = () => {
  emit('search', query.value);
};
</script>
