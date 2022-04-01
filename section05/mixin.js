var sharable = {
  data: function() {
    return {
      _isProcessing: false
    }
  },
  template: '<p>templateや同名のメソッドは上書きされる</p>',
  methods: {
    share: function() {
      if (this._isProcessing) {
        return 
      }
      if (!window.confirm('シェアしますか？')) {
        return
      }
      this._isProcessing = true
      setTimeout(() => {
        window.alert('シェアしました')
        this._isProcessing = false
      }, 300)      
    }
  }
}

var text1ShareButton = {
  mixins: [sharable],
  template: '<button @click="share">share1</button>'
}
var text2ShareButton = {
  mixins: [sharable],
  template: '<button @click="share">{{buttonLabel}}</button>',
  data: function() {
    return {
      buttonLabel: 'share2'
    }
  }
}

new Vue({
  el: '#app',
  components: {
    text1ShareButton,
    text2ShareButton
  }
})
