<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">home</router-link>
      <template v-if="!isLogin">
        <router-link to="/login">login</router-link>
      </template>
      <template v-else>
        <router-link to="/userlist">userlist</router-link>
      </template>
    </div>
    <Langtoggle />
    <router-view/>
  </div>
</template>

<script>
import Langtoggle from '@/components/Langtoggle'
export default {
  components: { Langtoggle },
  data () {
    return {}
  },
  computed: {
    isLogin () {
      return this.$store.state.isLogin
    }
  }
}
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

#nav {
  padding: 30px;

  a {
    font-weight: bold;
    color: #2c3e50;
    margin: 0 10px;
    text-decoration: none;

    &.router-link-exact-active {
      color: #42b983;
      text-decoration: underline;
    }
  }
}
</style>
