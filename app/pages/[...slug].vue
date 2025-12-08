<script lang="ts" setup>
import Surrounding from "~/components/Surrounding.vue";
const route = useRoute();
const { data: page } = await useAsyncData(route.path, () => {
  return queryCollection("content").path(route.path).first();
});
</script>

<template>
  <main class="p-6">
    <template v-if="page">
      <ContentRenderer
        class="prose md:prose-lg lg:prose-xl dark:prose-invert"
        :value="page"
      />
    </template>
    <template v-else>
      <div class="empty-page">
        <h1>Page Not Found</h1>
        <p>Oops! The content you're looking for doesn't exist.</p>
        <NuxtLink to="/">Go back home</NuxtLink>
      </div>
    </template>

    <Surrounding />
  </main>
</template>
