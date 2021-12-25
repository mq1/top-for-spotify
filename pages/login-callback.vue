<script setup lang="ts">
const spotifyToken = useSpotifyToken()
const router = useRouter()
const location = useBrowserLocation()

const parseSpotifyAccessToken = () => /#access_token=(.*?)&/.exec(location.value.hash!)![1]

const saveSpotifyAccessToken = () => {
  spotifyToken.value = parseSpotifyAccessToken()
}

onMounted(() => {
  saveSpotifyAccessToken()
  router.push('/')
})
</script>
