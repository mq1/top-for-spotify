<script setup lang="ts">
import { getUser } from '~/spotify'
import type { User } from '~/types'

const router = useRouter()

const user = ref<User>()
const updateUser = () => getUser().then(u => user.value = u)

onMounted(() => {
  updateUser().then(() => {
    // if token has expired
    if ((user.value as any).error.status === 401)
      router.push('/login')
  })
})
</script>

<template>
  <Header></Header>

  <main flex flex-col gap-y-8 text-white mt-44 sm:mt-24 sm:p-8>
    <Obscurity></Obscurity>
    <Mood></Mood>
    <Genres></Genres>
    <Artists></Artists>
    <Tracks></Tracks>
  </main>

  <Footer></Footer>
</template>
