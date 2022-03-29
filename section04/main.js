var getUsers = function(callback) {
  setTimeout(function() {
    callback(null, [
      {
        id: 1,
        name: 'Takuya Kimura'
      },
      {
        id: 2,
        name: 'Yoichiro Noda'
      }
    ])
  }, 1000)
}

var UserList = {
  template: '#user-list',
  data: function() {
    return {
      loading: false,
      users: function() {return []},
      error: null
    }
  },
  created() {
    this.fetchData()
  },
  watch: {
    '$route': 'fetchData'
  },
  methods: {
    fetchData: function() {
      this.loading = true
      getUsers((function(err, users) {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.users = users
        }
      }).bind(this))
    }
  }
}


var router = new VueRouter({
  routes: [
    {
      path: '/top',
      component: {
        template: '<div>トップぺージです</div>'
      }
    },
    {
      path: '/users',
      component: UserList
    },
  ]
})

var app = new Vue ({
  router,
}).$mount('#app')