<template>
  <div id="app">
    <ul>
      <li><router-link to="/" exact>TOP</router-link></li>
      <li><router-link to="/member" exact>MEMBER</router-link></li>
      <li><router-link to="/login" exact>LOGIN</router-link></li>
      <li><router-link to="/file" exact>FILE</router-link></li>
    </ul>
    <router-view></router-view>
  </div>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style scoped>
#app {
  color: #311d0a;
  font-family: 'Meiryo';
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
ul {
  display: flex;
  list-style: none;
  margin: 0;
  padding: 0;
  width: 100%;
  background: #d0af01;
  color: #fff
}
ul a {
  display: block;
  line-height: 40px;
  padding: 0 10px;
  text-decoration: none;
  transition: backgroud-color 1s;
}
</style>
