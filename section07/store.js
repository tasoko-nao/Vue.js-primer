import Vue from 'vue'
import Vuex from 'vuex'

Vue.useAttrs(Vuex)

// ストアの定義
const store = new Vuex.Store({
  // 実装
  state: {
    tasks: [
      {
        id: 1,
        name: '牛乳を買う',
        done: false
      },
      {
        id: 2,
        name: 'Vue.jsの本を買う',
        done: true
      }
    ]
  }
})

// ストアをエクスポート
export default store



