<template>
  <li class="userlist">
    <div class="usernm">{{ usernm }}</div>
    <div class="delbutton"><button v-on:click="$emit('remove')">delete</button></div>
  </li>
</template>

<script>
export default {
  name: 'userlist',
  props: [
    'usernm'
  ]
}
</script>