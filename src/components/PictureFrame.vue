<!--v-bind:style="{height: image.height + 'px'}"-->
<template v-bind="image">
  <div>

    <img
        v-bind:src="`https://placeimg.com/${image.width*2}/${image.height*2}/any`"
        class="drawing card"
        v-bind:class="{expand:expanded}"
        v-bind:data-id="image.url"
        v-on:click="click"
        v-bind:style="styleObject"
    />
  </div>
</template>

<script>
import $ from 'jquery'

export default {
  name: 'PictureFrame',
  props: ['image'],

  data: function () {
    return {
      styleObject: {
        height: this.image.calcHeight + 'px'
      },
      expandedStyle: null,
      expanded: false
    }
  },

  methods: {
    click: function (e) {
      const rect = $(e.target)[0].getBoundingClientRect()
      console.log('rect', rect.left, rect.top)
      if (this.expanded) {
        this.shrink()
      } else {
        this.expand(rect)
      }
    },

    shrink () {
      console.log('shrink', this)
      this.expanded = false
      this.styleObject.transform = null
    },

    expand: function (rect) {
      window.addEventListener('scroll', this.scrollEvent)
      this.expanded = true
      const oT = rect.top
      const oL = rect.left

      const margin = 20

      const windowWidth = $(window).width()
      const windowHeight = $(window).height()

      const windowRatio = windowWidth / windowHeight
      const pictureRatio = this.image.width / this.image.height

      let scaleFactor
      if (pictureRatio > windowRatio) {
        // fit width
        scaleFactor = (windowWidth - margin * 2) / this.image.calcWidth
      } else {
        // fit height
        scaleFactor = (windowHeight - margin * 2) / this.image.calcHeight
      }
      // scaleFactor = 1;

      const centeredOT = Math.round((windowHeight - this.image.calcHeight * scaleFactor) / 2)
      const centeredOL = Math.round((windowWidth - this.image.calcWidth * scaleFactor) / 2)

      const transform = `scale(${scaleFactor}) translate(${(centeredOL - oL) / scaleFactor}px, ${(centeredOT - oT) / scaleFactor}px)`
      this.styleObject.transform = transform
    },

    scrollEvent: function () {
      console.log('scroll')
      this.shrink()
      console.log(this.scrollEvent)
      window.removeEventListener('scroll', this.scrollEvent)
    }
  }

}
</script>

<style lang="sass" scoped>
  .drawing
    background: gray
    transform-origin: left top
    width: 100%
    margin-top: 0.5em
    &.expand
      transform: scale(2)
</style>
