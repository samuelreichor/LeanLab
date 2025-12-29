interface WakeLockOptions {
  autoActivate?: boolean
}

export function useWakeLock(options: WakeLockOptions = {}) {
  const isSupported = ref(false)
  const isActive = ref(false)
  let wakeLock: WakeLockSentinel | null = null

  onMounted(() => {
    isSupported.value = 'wakeLock' in navigator
    if (options.autoActivate && isSupported.value) {
      request()
    }
  })

  async function request() {
    if (!isSupported.value) return false

    try {
      wakeLock = await navigator.wakeLock.request('screen')
      isActive.value = true

      wakeLock.addEventListener('release', () => {
        isActive.value = false
      })

      return true
    } catch {
      isActive.value = false
      return false
    }
  }

  async function release() {
    if (wakeLock) {
      await wakeLock.release()
      wakeLock = null
      isActive.value = false
    }
  }

  async function toggle() {
    if (isActive.value) {
      await release()
    } else {
      await request()
    }
  }

  // Re-acquire wake lock when page becomes visible again
  function handleVisibilityChange() {
    if (document.visibilityState === 'visible' && isActive.value && !wakeLock) {
      request()
    }
  }

  onMounted(() => {
    document.addEventListener('visibilitychange', handleVisibilityChange)
  })

  onUnmounted(() => {
    release()
    document.removeEventListener('visibilitychange', handleVisibilityChange)
  })

  return {
    isSupported,
    isActive,
    request,
    release,
    toggle
  }
}
