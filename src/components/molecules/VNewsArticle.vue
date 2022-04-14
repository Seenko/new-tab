<template>
  <a
    :href="link"
    target="_blank"
  >
    <article class="article">
      <div class="article__content">
        <p class="article__title">
          {{ title }}
        </p>
        <small class="article__topic">
          {{ topic }}
        </small>
        <!-- <p class="article__summary">
          {{ summary }}
        </p> -->
        <!-- <p class="article__published">
          {{ published_date }}
        </p> -->
      </div>
      <img
        class="article__image"
        :src="media"
        alt=""
      />
    </article>
  </a>
</template>

<script setup lang="ts">
defineProps({
  title: String,
  summary: String,
  published_date: Date,
  link: String,
  topic: String,
  media: String
})
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
    @apply opacity-70 dark:opacity-30;
  }

  &__content {
    @apply relative z-10 text-gray-200 text-center;
  }

  &__title {
    @apply font-bold text-lg pb-1;
  }

  &__topic {
    @apply border-t pt-1;
  }

  &__summary {
    @apply text-sm;
  }
}
</style>