<template>
  <div class="product-card">
    <h3>{{ product.name }}</h3>

    <p>
      {{ $t('product.price') }}: {{ product.price }} ₸
    </p>
  </div>
</template>

<script>
export default {
  props: ['product']
}
</script>