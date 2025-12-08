<script setup lang="ts">
import NavigationItem from "./NavigationItem.vue";

const { data } = await useAsyncData("navigation", () => {
  return queryCollectionNavigation("content");
});
</script>

<template>
  <nav v-if="data" class="space-y-1">
    <ul class="space-y-1">
      <NavigationItem
        v-for="item in data"
        :key="`nav-${item.path}`"
        :item="item"
        :depth="0"
      />
    </ul>
  </nav>
</template>
