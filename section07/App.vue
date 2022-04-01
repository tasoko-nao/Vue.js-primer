<template>
  <div>
    <!-- 実装 -->
    <h2>タスク実装</h2>
    <ul>
      <li v-for="task in tasks" v-bind:key="task.id">
        <input type="checkbox" v-bind:checked="task.done">
        {{task.name}}
      </li>
    </ul>
  </div>
</template>

<script>
export default {
  // 実装
  computed: {
    tasks() {
      return this.$store.state.tasks
    }
  }
}
</script>