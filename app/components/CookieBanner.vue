<script setup lang="ts">
const cookiebotLoaded = ref(false)
const COOKIEBOT_ID = 'c4c17485-4e93-49fb-82ff-2ca8396c7964'

function loadCookiebot() {
  if (cookiebotLoaded.value) return

  cookiebotLoaded.value = true

  const script = document.createElement('script')
  script.id = 'Cookiebot'
  script.src = 'https://consent.cookiebot.com/uc.js'
  script.type = 'text/javascript'
  script.defer = true
  script.dataset.cbid = COOKIEBOT_ID
  script.dataset.blockingmode = 'auto'

  document.head.appendChild(script)

  // Remove event listeners after loading
  removeInteractionListeners()
}

function onUserInteraction() {
  // Use requestIdleCallback for non-critical loading, fallback to setTimeout
  if ('requestIdleCallback' in window) {
    requestIdleCallback(() => loadCookiebot(), { timeout: 2000 })
  } else {
    setTimeout(loadCookiebot, 100)
  }
}

const interactionEvents = ['scroll', 'click', 'touchstart', 'mousemove', 'keydown']

function addInteractionListeners() {
  interactionEvents.forEach((event) => {
    window.addEventListener(event, onUserInteraction, { once: true, passive: true })
  })
}

function removeInteractionListeners() {
  interactionEvents.forEach((event) => {
    window.removeEventListener(event, onUserInteraction)
  })
}

onMounted(() => {
  // Check if user has already interacted (e.g., navigated from another page)
  if (document.readyState === 'complete') {
    // Give the page a moment to render, then load after 3 seconds if no interaction
    const fallbackTimer = setTimeout(() => {
      loadCookiebot()
    }, 3000)

    // But load immediately on first interaction
    interactionEvents.forEach((event) => {
      window.addEventListener(event, () => {
        clearTimeout(fallbackTimer)
        onUserInteraction()
      }, { once: true, passive: true })
    })
  } else {
    // Page still loading, wait for interaction
    addInteractionListeners()

    // Fallback: load after 5 seconds if no interaction
    setTimeout(() => {
      if (!cookiebotLoaded.value) {
        loadCookiebot()
      }
    }, 5000)
  }
})

onUnmounted(() => {
  removeInteractionListeners()
})
</script>

<template>
  <div />
</template>
