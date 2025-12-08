<script setup lang="ts">
import { Button } from "~/components/ui/button";
import { Separator } from "~/components/ui/separator";

const route = useRoute();

const { data } = await useAsyncData("surround", () => {
  return queryCollectionItemSurroundings("content", route.path);
});
</script>

<template>
  <div v-if="data">
    <Separator />

    <div class="flex space-x-2 items-center">
      <template v-for="item in data" :key="`surrounding-${item?.path}`">
        <Button asChild v-if="item">
          <NuxtLink :to="item.path">
            {{ item.title }}
          </NuxtLink>
        </Button>
      </template>
    </div>
  </div>
</template>
