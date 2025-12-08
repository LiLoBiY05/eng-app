<script setup lang="ts">
import { Moon, Sun, BookOpen } from "lucide-vue-next";
import Navigation from "~/components/Navigation.vue";

const colorMode = useColorMode();

const toggleDarkMode = () => {
  colorMode.preference = colorMode.value === "dark" ? "light" : "dark";
};
</script>

<template>
  <div class="min-h-screen bg-background">
    <!-- Header -->
    <header
      class="sticky top-0 z-50 w-full border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60"
    >
      <div class="container flex h-16 items-center px-4">
        <div class="flex items-center gap-2">
          <BookOpen :size="24" class="text-primary" />
          <h1 class="text-xl font-semibold">English Learning Portal</h1>
        </div>

        <div class="ml-auto flex items-center gap-4">
          <!-- Dark mode toggle -->
          <button
            @click="toggleDarkMode"
            class="inline-flex items-center justify-center rounded-md p-2 text-sm font-medium transition-colors hover:bg-accent hover:text-accent-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            aria-label="Toggle dark mode"
          >
            <Sun
              v-if="colorMode.value === 'dark'"
              :size="20"
              class="transition-all"
            />
            <Moon v-else :size="20" class="transition-all" />
          </button>
        </div>
      </div>
    </header>

    <!-- Main layout -->
    <div class="container px-4 py-6">
      <div class="grid grid-cols-1 gap-6 lg:grid-cols-[280px_1fr]">
        <!-- Sidebar Navigation -->
        <aside
          class="lg:sticky lg:top-20 lg:h-[calc(100vh-7rem)] lg:overflow-y-auto lg:pr-4"
        >
          <div
            class="rounded-lg border border-border bg-card p-4 shadow-sm"
          >
            <h2 class="mb-4 text-sm font-semibold uppercase tracking-wide text-muted-foreground">
              Navigation
            </h2>
            <Navigation />
          </div>
        </aside>

        <!-- Main Content -->
        <main class="min-w-0">
          <slot />
        </main>
      </div>
    </div>
  </div>
</template>

<style scoped>
/* Custom scrollbar for sidebar */
aside::-webkit-scrollbar {
  width: 6px;
}

aside::-webkit-scrollbar-track {
  background: transparent;
}

aside::-webkit-scrollbar-thumb {
  background: hsl(var(--muted));
  border-radius: 3px;
}

aside::-webkit-scrollbar-thumb:hover {
  background: hsl(var(--muted-foreground) / 0.5);
}
</style>
