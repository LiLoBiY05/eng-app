<script setup lang="ts">
import Navigation from "~/components/Navigation.vue";
</script>

<template>
  <NuxtLayout>
    <div class="grid grid-cols-1 sm:grid-cols-[300px_1fr] gap-4">
      <Navigation />
      <NuxtPage />
    </div>
  </NuxtLayout>
</template>
