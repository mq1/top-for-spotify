<script setup lang="ts">
import { getUser } from '~/spotify'
import type { User } from '~/types'

const spotifyToken = useSpotifyToken()
const location = useBrowserLocation()
const router = useRouter()
const { share, isSupported } = useShare()

const user = ref<User>()
const updateUser = () =>
  getUser().then(u => user.value = u)

const logOut = () => {
  spotifyToken.value = ''
  router.push('login')
}

const shareURL = () => {
  const url = `${location.value.origin}${import.meta.env.BASE_URL}login-callback#access_token=${spotifyToken.value}&token_type=Bearer&expires_in=3600`
  if (isSupported) {
    share({
      title: 'top-for-spotify',
      text: `${user.value?.display_name}'s Spotify stats`,
      url,
    })
  }
  else {
    navigator.clipboard.writeText(url)
    // eslint-disable-next-line no-alert
    window.alert('URL copied to clipboard')
  }
}

onMounted(updateUser)
</script>

<template>
  <div p-4 sm:p-8 dark:bg-black border-b-2 border-gray-300 dark:border-gray-700 w-full flex flex-wrap gap-y-4 justify-between items-center fixed z-10 bg-white>
    <h1 text-5xl font-bold>
      Top for Spotify
    </h1>
    <div flex items-center gap-x-2>
      <TimeRangeSelector />
      <LanguageSelector />
    </div>
    <div flex items-center gap-x-8>
      <img h-12 rounded-xl shadow-lg hidden sm:block :src="user?.images[0].url">
      <button scale-200 i-feather-share @click="shareURL" />
      <button scale-200 i-feather-log-out @click="logOut" />
    </div>
  </div>
</template>
