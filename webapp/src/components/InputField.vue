<template>
  <div
    class="form-group flex-col flex-align-center"
    :class="{ 'margin-bottom-2': defaultSpacing }"
  >
    <input
      @input="$emit('update:modelValue', $event.target.value)"
      placeholder=" "
      class="form-input"
      :id="id"
      :type="type"
      :title="title"
      :value="modelValue"
    />
    <label class="form-label" :for="id">
      {{ label }}
    </label>
  </div>
</template>

<script lang="ts">

import { defineComponent } from 'vue';

export default defineComponent({
  name: 'InputField',
  props: {
    label: {
      type: String,
      required: true,
    },
    modelValue: {
      type: String,
      required: true,
    },
    id: {
      type: String,
      required: false,
      default: null,
    },
    title: {
      type: String,
      required: false,
      default: null,
    },
    type: {
      type: String,
      required: false,
      default: 'text',
    },
    defaultSpacing: {
      type: Boolean,
      required: false,
      default: true,
    },
  },
});
</script>

<style scoped>

</style>
