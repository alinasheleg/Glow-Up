import { reactive } from 'vue'

const state = reactive({
  items: JSON.parse(localStorage.getItem('favorites') || '[]')
})

export const favoritesStore = {
  state,

  isFavorite(productId) {
    return state.items.some(item => item.id === productId)
  },

  toggle(product) {
    const index = state.items.findIndex(item => item.id === product.id)
    if (index !== -1) {
      state.items.splice(index, 1)
    } else {
      state.items.push(product)
    }
    localStorage.setItem('favorites', JSON.stringify(state.items))
  }
}