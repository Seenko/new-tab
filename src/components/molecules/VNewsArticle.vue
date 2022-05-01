<template>
  <a :href="link">
    <article class="article">
      <div class="article__content">
        <p class="article__category">
          {{ unescape(category) }}
        </p>
        <p class="article__title">
          {{ truncatedTitle }}
        </p>
        <small class="article__source">
          {{ unescape(source) }}
        </small>
      </div>
      <img
        v-if="media"
        class="article__image"
        :src="media"
        alt=""
      >
    </article>
  </a>
</template>

<script setup lang="ts">
import unescape from 'lodash/unescape';
import truncate from 'lodash/truncate';
import { computed } from 'vue';

interface Props {
  title: string,
  source: string,
  link: string,
  category: string,
  media: string
}

const props = withDefaults(defineProps<Props>(),{
  title: '',
  source: '',
  link: '',
  category: '',
  media: ''
});

const truncatedTitle = computed(() => {
  return truncate(unescape(props.title), {
    length: 50,
    separator: /,? +/,
    omission: '...'
  });
});
</script>

<style lang="scss" scoped>
.article {
  @apply relative overflow-hidden h-full;
  @apply rounded-lg p-5 bg-black;
  @apply transition-transform;
  @apply flex justify-center items-center;

  &:hover {
    @apply scale-105;
  }

  &:active {
    @apply scale-100;
  }

  &__image {
    width: 200%;
    height: 200%;
    @apply absolute z-0 object-cover top-0 left-0 right-0 bottom-0;
    @apply opacity-50 dark:opacity-30;
  }

  &__content {
    @apply relative z-10 text-gray-200;
    @apply flex flex-col gap-3 w-full h-full;
  }

  // &__category {
  //   @apply row-span-1;
  // }

  &__title {
    @apply flex-grow;
    @apply font-bold text-lg;
  }

  // &__source {
  //   @apply row-span-1;
  // }
}
</style>