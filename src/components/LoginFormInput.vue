<template>
  <div class="form-row">
    <label :for="this.label">{{ this.label }}</label>
    <input
      :type="this.type"
      :name="this.label"
      v-model="displayValue"
      v-on:keyup.enter="focusOut"
      @focus="isInputActive = true"
    />
  </div>
</template>

<script>

export default {
  name: 'LoginFormInput',
  props: {
    label: String,
    type: String,
    data: String
  },
  data () {
    return {
      isInputActive: false,
      newValue: this.value,
      isSet: false
    }
  },
  computed: {
    displayValue: {
      get: function () {
        return this.value
      },
      set: function (modifiedValue) {
        this.isSet = true
        this.$emit('input', modifiedValue)
      }
    }
  },
  methods: {
    focusOut () {
      this.isInputActive = false
      if (this.isSet) {
        this.$emit(this.newValue)
        this.isSet = false
      }
    }
  }
}
</script>
