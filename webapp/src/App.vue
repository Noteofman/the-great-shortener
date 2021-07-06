<template>
  <Header />
  <div class="main-wrapper">
    <router-view/>
  </div>
</template>

<style src="../src/style/base.css"/>
<style src="../src/style/typography.css"/>
<style src="../src/style/input.css"/>
<style src="../src/style/utils.css"/>
<style src="../src/style/spacing.css"/>
<style src="../src/style/buttons.css"/>

<script>

import Header from '@/views/Header.vue';

export default {
  components: { Header },
};

</script>

<style scoped>

.main-wrapper {
  margin-top: 140px;
}

</style>
