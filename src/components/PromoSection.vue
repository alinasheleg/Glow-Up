<template>
  <section class="max-w-7xl mx-auto px-4 py-12">
    <div class="grid md:grid-cols-2 gap-6">

      <!-- Black Friday -->
      <div class="bg-gradient-to-r from-pink-500 to-purple-600 rounded-2xl p-8 text-white relative overflow-hidden min-h-[300px]">

        <div class="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1570172619644-dfd03ed5d881?w=800&h=400&fit=crop" 
            alt="Beauty products"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="relative z-10">

          <div class="mb-4">
            <span class="bg-white text-pink-600 px-3 py-1 rounded-full text-sm font-bold">
              {{ $t('promo.blackFriday.discount') }}
            </span>
          </div>

          <h3 class="text-2xl md:text-3xl font-bold mb-2">
            {{ $t('promo.blackFriday.title') }}
          </h3>

          <p class="mb-6 text-lg">
            {{ $t('promo.blackFriday.subtitle') }}
          </p>

          <router-link to="/sales">
            <button class="bg-white text-pink-600 px-6 py-2 rounded-full hover:bg-gray-100 transition font-medium">
              {{ $t('promo.blackFriday.button') }}
            </button>
          </router-link>

        </div>
      </div>

      <!-- New Collection -->
      <div class="bg-gradient-to-r from-purple-500 to-pink-600 rounded-2xl p-8 text-white relative overflow-hidden min-h-[300px]">

        <div class="absolute inset-0 opacity-30">
          <img 
            src="https://images.unsplash.com/photo-1541643600914-78b084683601?w=800&h=400&fit=crop" 
            alt="Perfume collection"
            class="w-full h-full object-cover"
          />
        </div>

        <div class="relative z-10">

          <div class="mb-4">
            <span class="bg-white text-purple-600 px-3 py-1 rounded-full text-sm font-bold">
              {{ $t('promo.new.badge') }}
            </span>
          </div>

          <h3 class="text-2xl md:text-3xl font-bold mb-2">
            {{ $t('promo.new.title') }}
          </h3>

          <p class="mb-6 text-lg">
            {{ $t('promo.new.subtitle') }}
          </p>

          <router-link to="/new">
            <button class="bg-white text-purple-600 px-6 py-2 rounded-full hover:bg-gray-100 transition font-medium">
              {{ $t('promo.new.button') }}
            </button>
          </router-link>

        </div>
      </div>

    </div>
  </section>
</template>

<script>
export default {
  name: 'PromoSection'
}
</script>