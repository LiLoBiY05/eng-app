<script lang="ts" setup>
import { FileQuestion } from "lucide-vue-next";
import Surrounding from "~/components/Surrounding.vue";

const route = useRoute();
const { data: page } = await useAsyncData(`page-${route.path}`, () => {
  return queryCollection("content").path(route.path).first();
});

// Set page title dynamically
useHead(() => ({
  title: page.value?.title || 'Page Not Found',
  titleTemplate: '%s | English Learning Portal'
}));
</script>

<template>
  <article>
    <template v-if="page">
      <!-- Content Card -->
      <div class="rounded-lg border border-border bg-card shadow-sm">
        <!-- Content Header -->
        <div
          v-if="page.title"
          class="border-b border-border px-6 py-4 sm:px-8 sm:py-6"
        >
          <h1 class="text-2xl font-bold tracking-tight sm:text-3xl">
            {{ page.title }}
          </h1>
        </div>

        <!-- Content Body -->
        <div class="px-6 py-6 sm:px-8 sm:py-8">
          <ContentRenderer
            class="prose prose-neutral max-w-none dark:prose-invert prose-headings:scroll-mt-20 prose-headings:font-semibold prose-h1:text-3xl prose-h2:text-2xl prose-h3:text-xl prose-a:font-medium prose-a:text-primary prose-a:no-underline hover:prose-a:underline prose-pre:bg-muted prose-pre:text-foreground prose-img:rounded-lg"
            :value="page"
          />
        </div>

        <!-- Surrounding Navigation -->
        <div class="border-t border-border px-6 py-4 sm:px-8">
          <Surrounding />
        </div>
      </div>
    </template>

    <!-- 404 State -->
    <template v-else>
      <div
        class="flex min-h-[400px] flex-col items-center justify-center rounded-lg border border-dashed border-border bg-card p-8 text-center"
      >
        <FileQuestion :size="64" class="mb-4 text-muted-foreground" />
        <h1 class="mb-2 text-2xl font-bold">Page Not Found</h1>
        <p class="mb-6 text-muted-foreground">
          Oops! The content you're looking for doesn't exist.
        </p>
        <NuxtLink
          to="/"
          class="inline-flex items-center justify-center rounded-md bg-primary px-4 py-2 text-sm font-medium text-primary-foreground transition-colors hover:bg-primary/90"
        >
          Go back home
        </NuxtLink>
      </div>
    </template>
  </article>
</template>
