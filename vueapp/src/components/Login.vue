<template>
  <div class="login">
    <p>{{ error }}</p>
    <input type="text" name="userid" placeholder="username" v-model="userid">
    <button v-on:click="login()">Login</button>
  </div>
</template>

<script>
import axios from 'axios'
import Router from '@/router/index'

export default {
  name: 'login',
  data: function () {
    return {
      error: '',
      userid: ''
    }
  },
  methods: {
    login: function () {
      var self = this
      axios.post('/auth/login', {
        userid: self.userid
      })
      .then(function (res) {
        if (res.data.result) {
          Router.push('/loginresult')
        } else {
          self.error = res.data.error
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  }
}

</script>