<template>
  <section class="max-w-7xl mx-auto px-4 py-12">
    <h2 class="text-2xl md:text-3xl font-bold text-gray-900 mb-8">
      {{ $t('categories.title') }}
    </h2>

    <div class="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
      <router-link 
        v-for="(category, index) in categories"
        :key="index"
        :to="category.link"
        class="bg-white rounded-xl p-6 text-center hover:shadow-lg transition cursor-pointer block"
      >
        <div class="bg-gradient-to-br from-pink-100 to-purple-100 w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center">
          <span class="text-3xl">{{ category.icon }}</span>
        </div>

        <h3 class="font-medium text-gray-900 text-sm">
          {{ $t(category.name) }}
        </h3>

      </router-link>
    </div>
  </section>
</template>

<script>
export default {
  name: 'Categories',
  data() {
    return {
      categories: [
        { name: 'categories.skincare', icon: '✨', link: '/categorySkincare' },
        { name: 'categories.makeup', icon: '💄', link: '/categoryMakeup' },
        { name: 'categories.perfume', icon: '🌸', link: '/categoryPerfume' },
        { name: 'categories.haircare', icon: '💆', link: '/categoryHaircare' },
        { name: 'categories.bodycare', icon: '🧴', link: '/categoryBodycare' },
        { name: 'categories.men', icon: '🧔', link: '/categoryMen' }
      ]
    }
  }
}
</script>

<style scoped>
/* Чтобы ссылки вели себя как карточки */
a {
  text-decoration: none;
  color: inherit;
}
</style>
