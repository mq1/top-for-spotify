<script setup lang="ts">
const spotifyToken = useSpotifyToken()
const router = useRouter()

onMounted(() => {
  if (spotifyToken.value === '')
    router.push('/login')
  else
    router.push('/me')
})
</script>
