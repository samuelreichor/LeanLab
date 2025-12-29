<script setup lang="ts">
interface Props {
  label?: string
  placeholder?: string
  buttonLabel?: string
  labelClass?: string
}

const props = withDefaults(defineProps<Props>(), {
  label: 'Beim Newsletter anmelden',
  placeholder: 'muss-wirken@gmail.com',
  buttonLabel: 'Anmelden',
  labelClass: ''
})

const toast = useToast()

const email = ref('')
const loading = ref(false)

async function onSubmit() {
  if (!email.value || loading.value) return

  loading.value = true

  try {
    await $fetch('/api/newsletter', {
      method: 'POST',
      body: { email: email.value }
    })

    toast.add({
      title: 'Erfolgreich angemeldet!',
      description: 'Du erhältst bald unsere besten Rezepte per E-Mail.',
      color: 'success'
    })
    email.value = ''
  } catch (error: unknown) {
    const fetchError = error as { data?: { message?: string } }
    toast.add({
      title: 'Fehler',
      description: fetchError.data?.message || 'Anmeldung fehlgeschlagen. Bitte versuche es erneut.',
      color: 'error'
    })
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <form @submit.prevent="onSubmit">
    <UFormField
      name="email"
      :label="props.label"
      size="lg"
      :ui="props.labelClass ? { label: props.labelClass } : undefined"
    >
      <UInput
        v-model="email"
        type="email"
        class="w-full"
        :placeholder="props.placeholder"
        :disabled="loading"
      >
        <template #trailing>
          <UButton
            type="submit"
            size="xs"
            :label="props.buttonLabel"
            :loading="loading"
          />
        </template>
      </UInput>
    </UFormField>
  </form>
</template>
