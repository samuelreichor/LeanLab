<script setup lang="ts">
</script>

<template>
  <section class="pt-12 md:pt-16 text-white">
    <UContainer>
      <div class="bg-primary rounded-2xl p-8 md:p-12">
        <div class="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-8">
          <!-- Left: Icon + Text -->
          <div class="lg:max-w-xl">
            <div class="w-14 h-14 rounded-2xl bg-white flex items-center justify-center mb-4">
              <UIcon
                name="i-lucide-mail"
                class="w-7 h-7 text-primary"
              />
            </div>

            <h2 class="text-2xl md:text-3xl font-bold mb-3">
              Neue Rezepte direkt in dein Postfach
            </h2>

            <p class="">
              Erhalte wöchentlich unsere neuen High-Protein Rezepte, Meal Prep Tipps und exklusive Inhalte.
            </p>
          </div>

          <!-- Right: Form -->
          <div class="lg:w-96">
            <NewsletterForm
              label-class="text-neutral-100"
            />

            <p class="text-xs text-white mt-3">
              Kein Spam. Jederzeit abmelden.
            </p>
          </div>
        </div>
      </div>
    </UContainer>
  </section>
</template>
