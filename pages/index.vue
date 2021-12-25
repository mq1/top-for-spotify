<script setup lang="ts">
const spotifyToken = useSpotifyToken()

onMounted(() => {
  if (spotifyToken.value === '')
    window.location.href = '/login'
  else
    window.location.href = '/me'
})
</script>
