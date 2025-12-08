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
  return props.depth * 16; // 16px per level
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
        'bg-gray-100 dark:bg-gray-800': isActiveOrHasActiveChild,
      }"
      class="flex items-center gap-2 rounded-lg px-4 py-2 text-gray-700 dark:text-gray-200 hover:bg-gray-50 dark:hover:bg-gray-700"
      :style="{ paddingLeft: `${paddingLeft + 16}px` }"
    >
      <span class="text-sm font-medium">{{ item.title }}</span>
    </NuxtLink>

    <!-- Item with children - expandable -->
    <details
      v-else
      class="group [&_summary::-webkit-details-marker]:hidden"
      :open="isActiveOrHasActiveChild"
    >
      <summary
        class="group flex cursor-pointer items-center justify-between rounded-lg px-4 py-2 text-gray-500 hover:bg-gray-100 hover:text-gray-700 dark:text-gray-400 dark:hover:bg-gray-800 dark:hover:text-gray-200"
        :style="{ paddingLeft: `${paddingLeft + 16}px` }"
      >
        <span class="flex items-center gap-2">
          <span class="text-sm font-medium">{{ item.title }}</span>
        </span>

        <span class="shrink-0 transition duration-300 group-open:-rotate-180">
          <ChevronDown :size="16" />
        </span>
      </summary>

      <!-- Recursive rendering of children -->
      <ul class="mt-1 space-y-1">
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
