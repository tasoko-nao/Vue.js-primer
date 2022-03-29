var counterButton = Vue.extend({
  template: '<span>{{counter}}個<button v-on:click="addToCart">追加</button></span>',
  data: function() {
    return {
      counter: 0
    }
  },
  methods: {
    addToCart: function() {
      this.counter += 1
      this.$emit('increment')
    }
  }
})

// 親コンポーネント
new Vue ({
  el: '#app',
  components: {
    'counter-button': counterButton
  },
  data: {
    total: 0,
    fruits: [
      {name: '梨'},
      {name: 'イチゴ'}
    ]
  },
  methods: {
    incrementCartStatus: function() {
      this.total += 1
    }
  }
})