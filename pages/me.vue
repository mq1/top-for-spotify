<script setup lang="ts">
import { getUser } from '~/spotify'
import type { User } from '~/types'

const user = ref<User>()
const updateUser = () => getUser().then(u => user.value = u)

onMounted(() => {
  updateUser().then(() => {
    // if token has expired
    if ((user.value as any).error.status === 401)
      window.location.href = '/login'
  })
})
</script>

<template>
  <Header />

  <main flex flex-col gap-y-8 text-white mt-44 sm:mt-24 sm:p-8>
    <Obscurity />
    <Mood />
    <Genres />
    <Artists />
    <Tracks />
  </main>

  <Footer />
</template>
