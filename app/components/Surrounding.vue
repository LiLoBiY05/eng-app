<script setup lang="ts">
import { ChevronLeft, ChevronRight } from "lucide-vue-next";
import { Button } from "~/components/ui/button";

const route = useRoute();

const { data } = await useAsyncData("surround", () => {
  return queryCollectionItemSurroundings("content", route.path);
});

// data is an array [prev, next]
const prev = computed(() => data.value?.[0]);
const next = computed(() => data.value?.[1]);
</script>

<template>
  <nav
    v-if="prev || next"
    class="flex items-center flex-wrap justify-between gap-4"
  >
    <!-- Previous Link -->
    <Button class="h-auto" size="sm" as-child v-if="prev" variant="outline">
      <NuxtLink :to="prev.path">
        <ChevronLeft :size="16" class="shrink-0" />
        <div class="min-w-0 flex-1">
          <div class="text-xs text-muted-foreground">Previous</div>
          <div class="truncate font-medium break-all">{{ prev.title }}</div>
        </div>
      </NuxtLink>
    </Button>
    <div v-else class="flex-1"></div>

    <!-- Next Link -->
    <Button class="h-auto" size="sm" as-child v-if="next" variant="outline">
      <NuxtLink :to="next.path">
        <div class="flex-1">
          <div class="text-xs text-muted-foreground">Next</div>
          <div class="truncate font-medium break-all">{{ next.title }}</div>
        </div>
        <ChevronRight :size="16" class="shrink-0" />
      </NuxtLink>
    </Button>
    <div v-else class="flex-1"></div>
  </nav>
</template>
