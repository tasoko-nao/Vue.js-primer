import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    // タスクの一覧
    tasks: [
      {
        id: 1,
        name: '牛乳を買う',
        labelIds: [1,2],
        done: false
      },
      {
        id: 2,
        name: 'Vue.jsの本を買う',
        labelIds: [1,3],
        done: true
      }
    ],
    labels:[
      {
        id: 1,
        text: '買い物'
      },
      {
        id: 2,
        text: '食料'
      },
      {
        id: 3,
        text: '本'
      },
    ],
    // 次に追加するタスクのID
    nextTaskId: 3,
    // 次に追加するラベルのID
    nextLabelId: 4,
    // フィルタするラベルのID
    filter: null,
  },
  getters: {
    filteredTasks(state) {
      if (!state.filter) {return state.tasks}
      // 選択されているラベルでフィルタリング
      return state.tasks.filter(task => {
        return task.labelIds.indexOf(state.filter) >= 0
      })
    }
  },
  mutations: {
    // タスクを追加する
    addTask(state, {name, labelIds}) {
      state.tasks.push({
        id: state.nextTaskId,
        name,
        labelIds,
        done: false
      })
      state.nextTaskId++
    },

    // タスクの完了状態を変更する
    toggleTaskStatus (state, {id}) {
      console.log(id)
      const filtered = state.tasks.filter(task => {
        return task.id === id
      })
      filtered.forEach(task => {
        task.done = !task.done
      })
    },

    // ラベルを追加する
    addLabel (state, {text}) {
      state.labels.push({id: state.nextLabelId, text})
      state.nextLabelId++
    },

    // フィルタリング対象のラベルを変更する
    changeFilter(state, {filter}) {
      state.filter = filter
    }
  },
  actions: {
  },
  modules: {
  }
})
