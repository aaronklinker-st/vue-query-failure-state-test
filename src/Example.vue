<template>
  <p v-if="isLoading">Loading...</p>
  <p v-else-if="isError">{{ errorMessage }}</p>
  <template v-else>
    <ul>
      <li v-for="color of colors" :key="color">{{ color }}</li>
      <li v-if="noResults">No results</li>
    </ul>
  </template>
</template>

<script lang="ts" setup>
import { computed } from "vue";
import { useQuery } from "vue-query";
import { Api } from "./api";

const { data: colors, isLoading, isError, error } = useQuery("example", Api.getColors);
const errorMessage = computed(() => (error.value as Error | undefined)?.message);
const noResults = computed(() => colors.value?.length === 0);
</script>
