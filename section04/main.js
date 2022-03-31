var getUsers = function(callback) {
  setTimeout(function() {
    callback(null, userData)
  }, 1000)
}

// ユーザー一覧
var userData = [
  {
    id: 1,
    name: 'Takuya Kimura',
    description: 'SMAPの元メンバーです。'
  },
  {
    id: 2,
    name: 'Yohei Noda',
    description: 'アウトドア・フットサルが趣味です。'
  }
]
// ユーザーをIDで取得
var getUser = function(userId, callback) {
    setTimeout(function(){
      var filteredUsers = userData.filter(function(user){
        return user.id === parseInt(userId, 10)
      })
      callback(null, filteredUsers && filteredUsers[0])
    }, 1000)
}

// ユーザーを新規追加
var postUser = function(params, callback) {
  setTimeout(function(){
    params.id = userData.length + 1
    userData.push(params)
    callback(null, params)
  }, 1000)
}

// ログイン・ログアウトの実装
var Auth = {
  login: function(email, pass, cb) {
    setTimeout(function() {
      if(email === 'vue@example.com' && pass === 'vue') {
        localStorage.token = Math.random().toString(36).substring(7)
        if (cb) {cb(true)}
      } else {
        if (cb) {cb(false)}
      }
    }, 0)
  },
  logout: function() {
    console.log('logout')
    delete localStorage.token
  },
  loggedIn: function() {
    return !!localStorage.token
  }
}
// ------------------------------------------------- component -------------------------------------------------
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

var UserDetail = {
  template: '#user-detail',
  data: function() {
    return {
      loading: false,
      user: null,
      error: null
    }
  },
  created() {
    this.fetchData()
  },
  methods: {
    fetchData: function() {
      this.loading = true
      getUser(this.$route.params.userId, (function(err, user) {
        this.loading = false
        if (err) {
          this.error = err.toString()
        } else {
          this.user = user
        }
      }).bind(this))
    }
  }
}

var UserCreate = {
  template: '#user-create',
  data: function() {
    return {
      sending: false,
      user: this.defaultUser(),
      error: null
    }
  },
  created() {},
  methods: {
    defaultUser: function() {
      return {
        name: '',
        description: ''
      }
    },
    createUser: function() {
      if(this.user.name.trim() === '') {
        this.error = 'Nameは必須です'
        return
      }
      if (this.user.description.trim() === '') {
        this.error = 'Descriptionは必須です'
        return
      }
      postUser(this.user, (function(err, user) {
        this.sending = false
        if (err) {
          this.error = err.toString()
        } else {
          this.error = null
          this.user = this.defaultUser()
          alert('新規ユーザーが追加されました')
          this.$router.push('/users')
        }
      }).bind(this))
    },
  }
}

var Login = {
  template: '#login',
  data: function() {
    return {
      email: 'vue@example.com',
      pass: '',
      error: false
    }
  },
  methods: {
    login: function() {
      Auth.login(this.email, this.pass, (function(loggedIn) {
        if (!loggedIn) {
          this.error = true
        } else {
          this.$router.replace(this.$route.query.redirect || '/')
        }
      }).bind(this))
    }
  }
}
// ------------------------------------------------- router -------------------------------------------------
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
    {
      path: '/users/new',
      component: UserCreate,
      beforeEnter: function(to, from, next) {
        if (!Auth.loggedIn()) {
          next({
            path: '/login',
            query: {redirect: to.fullPath}
          })
        } else {
          next()
        }
      }
    },
    {
      path: '/users/:userId',
      component: UserDetail,
      name: 'user-detail'
    },
    {
      path: '/login',
      component: Login
    },
    {
      path: '/logout',
      beforeEnter: function(to, from, next) {
        Auth.logout()
        next('/top')
      }
    }
  ]
})
// ------------------------------------------------- instance -------------------------------------------------
var app = new Vue ({
  data: {
    Auth: Auth
  },
  router,
}).$mount('#app')