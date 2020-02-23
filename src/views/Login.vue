<template>
  <div class="login-page">
    <div class="default-user-info">
      Username: test<br />
      Password: test
    </div>
    <form @submit.prevent="handleSubmit">
      <form-input
        :type="'text'"
        :label="$t('username')"
        :data="this.username"
        v-model="username"
      />
      <form-input
        :type="'password'"
        :label="$t('password')"
        :data="this.password"
        v-model="password"
      />
      <div class="form-row">
        <button type="submit" class="btn-submit" :disabled="loading">{{ $t('login') }}</button>
        <img v-show="loading" src="data:image/gif;base64,R0lGODlhEAAQAPIAAP///wAAAMLCwkJCQgAAAGJiYoKCgpKSkiH/C05FVFNDQVBFMi4wAwEAAAAh/hpDcmVhdGVkIHdpdGggYWpheGxvYWQuaW5mbwAh+QQJCgAAACwAAAAAEAAQAAADMwi63P4wyklrE2MIOggZnAdOmGYJRbExwroUmcG2LmDEwnHQLVsYOd2mBzkYDAdKa+dIAAAh+QQJCgAAACwAAAAAEAAQAAADNAi63P5OjCEgG4QMu7DmikRxQlFUYDEZIGBMRVsaqHwctXXf7WEYB4Ag1xjihkMZsiUkKhIAIfkECQoAAAAsAAAAABAAEAAAAzYIujIjK8pByJDMlFYvBoVjHA70GU7xSUJhmKtwHPAKzLO9HMaoKwJZ7Rf8AYPDDzKpZBqfvwQAIfkECQoAAAAsAAAAABAAEAAAAzMIumIlK8oyhpHsnFZfhYumCYUhDAQxRIdhHBGqRoKw0R8DYlJd8z0fMDgsGo/IpHI5TAAAIfkECQoAAAAsAAAAABAAEAAAAzIIunInK0rnZBTwGPNMgQwmdsNgXGJUlIWEuR5oWUIpz8pAEAMe6TwfwyYsGo/IpFKSAAAh+QQJCgAAACwAAAAAEAAQAAADMwi6IMKQORfjdOe82p4wGccc4CEuQradylesojEMBgsUc2G7sDX3lQGBMLAJibufbSlKAAAh+QQJCgAAACwAAAAAEAAQAAADMgi63P7wCRHZnFVdmgHu2nFwlWCI3WGc3TSWhUFGxTAUkGCbtgENBMJAEJsxgMLWzpEAACH5BAkKAAAALAAAAAAQABAAAAMyCLrc/jDKSatlQtScKdceCAjDII7HcQ4EMTCpyrCuUBjCYRgHVtqlAiB1YhiCnlsRkAAAOwAAAAAAAAAAAA==" />
      </div>
    </form>
  </div>
</template>

<script>
import { router } from '@/_helpers/router'
import { userService } from '@/_services/user.service'
import FormInput from '@/components/LoginFormInput'

export default {
  name: 'Login',
  components: {
    FormInput
  },
  data () {
    return {
      username: '',
      password: '',
      loading: false,
      returnUrl: '/',
      error: ''
    }
  },
  created () {
    this.$store.dispatch('logOut')
    // обнуляем (удаляем данные из localStorage) пользователя
    userService.logout()
  },
  methods: {
    handleSubmit (e) {
      if (!(this.username && this.password)) {
        return
      }

      this.loading = true
      userService.login(this.username, this.password).then(
        user => router.push('userlist'),
        error => {
          this.error = error
          this.loading = false
        }
      )
      this.$store.dispatch('logIn')
    }
  }
}
</script>

<style lang="scss">
  form {
    min-width: 300px;
    width: 80vw;
    display: flex;
    margin: auto;
    flex-direction: column;
    @media screen and (min-width: 768px) {
      width: 400px;
    }
    .form-row {
      margin: 10px auto;
      width: 100%;
      justify-content: space-around;
      align-items: center;
      display: flex;
      &:last-child {
        flex-direction: column;
      }
      label {
        font-size: 18px;
        line-height: 1;
        width: 30%;
      }
      input {
        width: 50%;
        border: 1px solid #d5d5d5;
        border-radius: 3px;
        line-height: 1;
        font-size: 16px;
        padding: 5px 10px;
        &.is-invalid {
          border-color: red;
        }
      }
      img {
        margin-top: 50px;
      }
    }
  }
  .btn-submit {
    background-color: #fff;
    outline: none;
    width: 200px;
    border: none;
    padding: 10px 0;
    text-align: center;
    line-height: 1;
    font-size: 20px;
    border-radius: 3px;
    box-shadow: 0 13px 27px -5px rgba(50, 50, 93, 0.25), 0 8px 16px -8px rgba(0, 0, 0, 0.3), 0 -6px 16px -6px rgba(0, 0, 0, 0.03);
    cursor: pointer;
    &:hover {
      box-shadow: 0 13px 27px -5px rgba(18, 81, 195, 0.4), 0 8px 16px -8px rgba(34, 81, 187, 0.58), 0 -6px 16px -6px rgba(0, 0, 0, 0);
    }
    &:focus,
    &:active {
      box-shadow: 0 13px 27px -5px rgba(67, 199, 43, 0.4), 0 8px 16px -8px rgba(59, 68, 21, 0.58), 0 -6px 16px -6px rgba(0, 0, 0, 0);
    }
  }
</style>
