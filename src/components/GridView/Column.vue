<template>
  <div class="list">
    <template v-for="image in list">
      <PictureFrame v-bind:image="image"/>
    </template>
  </div>
</template>

<script>
import PictureFrame from '../PictureFrame'

export default {
  name: 'Column',
  props: ['list'],
  components: {PictureFrame}
}
</script>

<style lang="sass" scoped>

</style>
