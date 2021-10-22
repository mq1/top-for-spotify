<script setup lang="ts">
import { spotifyToken } from '~/store'

const router = useRouter()

onMounted(() => {
  if (spotifyToken.value === '')
    router.push('/login')
  else
    router.push('/me')
})
</script>
