<template>
  <div>
    <h1>{{ $t('hi') }} {{user.firstName}}!</h1>
    <em v-if="users.loading">{{ $t('loading') }}</em>
    <ul v-if="users.length" class="user-list">
      <li v-for="user in users" :key="user.id">
        {{user.firstName + ' ' + user.lastName}}
      </li>
    </ul>
    <p>
      <router-link to="/login">{{ $t('logout') }}</router-link>
    </p>
  </div>
</template>

<script>
import { userService } from '@/_services/user.service'

export default {
  name: 'Userlist',
  data () {
    return {
      user: {},
      users: []
    }
  },
  created () {
    this.user = JSON.parse(localStorage.getItem('user'))
    this.users.loading = true
    userService.getAll().then(users => (this.users = users))
  }
}
</script>

<style lang="scss">
  .user-list {
    width: 300px;
    margin: auto;
    padding: 0;
    list-style: none;
    li {
      font-size: 20px;
    }
  }
</style>
