<script setup lang="ts">
import { ChevronDown } from "lucide-vue-next";

interface NavigationItem {
  title: string;
  path: string;
  children?: NavigationItem[];
}

interface Props {
  item: NavigationItem;
  depth?: number;
}

const props = withDefaults(defineProps<Props>(), {
  depth: 0,
});

const route = useRoute();

// Calculate padding based on depth
const paddingLeft = computed(() => {
  return props.depth * 12; // 12px per level
});

// Check if current item or any child is active
const isActiveOrHasActiveChild = computed(() => {
  if (props.item.path === route.path) return true;
  if (props.item.path !== '/' && route.path.includes(props.item.path)) return true;
  return false;
});
</script>

<template>
  <li>
    <!-- Item without children - simple link -->
    <NuxtLink
      v-if="!item.children"
      :to="item.path"
      :class="{
        'bg-accent text-accent-foreground font-medium': isActiveOrHasActiveChild,
      }"
      class="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-foreground transition-colors hover:bg-accent/50"
      :style="{ paddingLeft: `${paddingLeft + 12}px` }"
    >
      <span>{{ item.title }}</span>
    </NuxtLink>

    <!-- Item with children - expandable -->
    <details
      v-else
      class="group [&_summary::-webkit-details-marker]:hidden"
      :open="isActiveOrHasActiveChild"
    >
      <summary
        class="group flex cursor-pointer items-center justify-between rounded-md px-3 py-2 text-sm text-muted-foreground transition-colors hover:bg-accent/50 hover:text-foreground"
        :style="{ paddingLeft: `${paddingLeft + 12}px` }"
      >
        <span class="font-medium">{{ item.title }}</span>

        <span class="shrink-0 transition-transform duration-200 group-open:rotate-180">
          <ChevronDown :size="14" />
        </span>
      </summary>

      <!-- Recursive rendering of children -->
      <ul class="mt-0.5 space-y-0.5">
        <NavigationItem
          v-for="child in item.children"
          :key="`nav-${child.path}`"
          :item="child"
          :depth="depth + 1"
        />
      </ul>
    </details>
  </li>
</template>
