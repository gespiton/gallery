<template>
  <div
      id="wrapper"
      v-bind:style=styleObject

  >
    <template
        class="list"
        v-for="list in imageList"
    >
      <Column v-bind:list="list"/>
    </template>
  </div>

</template>

<script>
  import Column from './Column.vue';

  export default {
    name: 'gridView',
    components: {
      Column
    },

    created: function () {
    },

    beforeUpdate: function (props) {
      console.log("will update ", props);

    },

    data: function () {
      return {
        styleObject: {
          "grid-template-columns": `repeat(${this.columnNum} ,1fr)`
        }
      }
    },

    props: ['imageList', 'columnNum']
  }

</script>

<style lang="sass">
  #wrapper
    display: grid
    grid-gap: 20px
    background: #e2e1e0
    .list
      display: flex
      flex-direction: column

</style>