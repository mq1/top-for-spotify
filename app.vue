<script setup lang="ts">
import { useI18n } from 'vue-i18n'

const { locale } = useI18n()
const storedLocale = useLocale()

useDark()

onMounted(() => locale.value = storedLocale.value)
watch(locale, () => storedLocale.value = locale.value)
</script>

<template>
  <Html :lang="locale">
    <Head>
      <Title>Top For Spotify</Title>
      <Meta name="description" content="A simple Spotify stats viewer" />
    </Head>
  </Html>

  <div min-h-screen flex flex-col items-center justify-between gap-y-8 dark:bg-black dark:text-white>
    <NuxtPage />
  </div>
</template>
