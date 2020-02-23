<template>
  <div class="locale-changer">
    <select v-model="$i18n.locale" @change="getLocale">
      <option v-for="(lang, i) in langs" :key="i" :value="lang">{{ lang }}</option>
    </select>
  </div>
</template>

<script>
export default {
  name: 'Langtoggle',
  data () {
    return { langs: ['ua', 'en'] }
  },
  methods: {
    getLocale (val) {
      localStorage.name = val.target.value
    }
  }
}
</script>
