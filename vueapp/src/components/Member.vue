<template>
  <div class="member">
    <p>{{ result }}</p>
    <ul>
     <li is="userlist" v-for="(user, index) in users" v-bind:key="user.usernm" v-bind:usernm="user.usernm" v-on:remove="user_delete(index)"></li>
    </ul>
    <div class="useradd">
      <input type="text" name="newuser" placeholder="new user" v-model="newuser">
      <button v-on:click="user_add()">Add</button>
    </div>
  </div>
</template>

<script>
import axios from 'axios'
import UserListView from '@/components/UserList/UserListItem'
export default {
  name: 'entry',
  data: function () {
    return {
      users: [],
      result: '',
      newuser: ''
    }
  },
  created: function () {
    axios.get('/database/api/users')
    .then((res) => {
      this.users = res.data
    })
  },
  methods: {
    user_delete: function (index) {
      var self = this
      axios.post('/database/api/deluser', {
        usernm: self.users[index].usernm
      })
      .then(function (res) {
        if (res.data.result) {
          self.result = 'deleted user : ' + self.users[index].usernm
          axios.get('/database/api/users')
            .then((res) => {
              self.users = res.data
            })
        } else {
          self.result = res.data.error
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    },
    user_add: function () {
      var self = this
      axios.post('/database/api/adduser', {
        usernm: self.newuser
      })
      .then(function (res) {
        if (res.data.result) {
          self.result = 'added user : ' + self.newuser
          axios.get('/database/api/users')
            .then((res) => {
              self.users = res.data
              self.newuser = ''
            })
        } else {
          self.result = res.data.error
        }
      })
      .catch(function (err) {
        console.log(err)
      })
    }
  },
  components: {
    'userlist': UserListView
  }
}
</script>

<style scoped>
ul {
  list-style: none;
}
.useradd {
  margin-left: 50px;
}
</style>

<style>
li.userlist {
  clear: both;
}
li.userlist .usernm {
  float: left;
  border: double;
  width: 200px;
  padding-left: 2px;
}
li.userlist .delbutton {
  display: block;
}
</style>