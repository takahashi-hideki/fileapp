<template>
  <li class='filelist'>
    <div class="dlbutton"><button v-on:click="$emit('download')">download</button></div>
    <div class="delbutton"><button v-on:click="$emit('remove')">delete</button></div>
    <div class="filenm">{{ filenm }}</div>
  </li>
</template>

<script>
export default {
  name: 'filelist',
  props: [
    'filenm'
  ]
}
</script>