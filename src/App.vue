<template>
  <div id="app">
    <GridView
        v-bind:image-list="imageList"
        v-bind:column-num="columnNum"
    />
  </div>
</template>

<script>
  import GridView from "./components/GridView/GridView";
  import {getImagesInfo} from "./api"
  import _ from "lodash/array";
  import $ from "jquery";

  function min(array) {
    if (array.length === 0) {
      return undefined;
    }

    let index = 0;
    let smallest = 99999;
    array.forEach((v, i) => {
      if (v < smallest) {
        smallest = v;
        index = i;
      }
    });

    return index;
  }

  function addCalcSize(images, columnNum) {
    const gridGap = 20;
    const width = ($(window).width() - (columnNum - 1) * gridGap) / columnNum;

    images.forEach(image => {
      image.calcWidth = width;
      image.calcHeight = image.height / image.width * width;
    });
  }

  export default {
    name: 'app',
    components: {
      GridView
    },

    data: function () {
      return {
        images: [],
        columnNum: 4
      }
    },


    computed: {
      imageList: function () {
        const len = this.columnNum;
        const heightArr = Array(len);
        _.fill(heightArr, 0);
        const resultArr = Array(len);
        for (let i = 0; i !== len; ++i) {
          resultArr[i] = [];
        }

        let count = 1;


        addCalcSize(this.images, this.columnNum);

        this.images.forEach(image => {
          const insertLocation = min(heightArr);
          heightArr[insertLocation] += image.calcHeight;
          resultArr[insertLocation].push(
            {
              url: image.url,
              height: image.height,
              width: image.width,
              calcHeight: image.calcHeight,
              calcWidth: image.calcWidth
            }
          );
        });

        return resultArr;
      }
    },


    mounted: function () {
      const that = this;
      getImagesInfo()
        .then((result) => {
          console.log("got images ", result);
          that.images = result.images;
        });
    },

    updated: function () {
      console.log("updated")
    },

  };
</script>

<style lang="sass">
  body
    overflow-y: scroll
    #app
      font-family: 'Avenir', Helvetica, Arial, sans-serif
      -webkit-font-smoothing: antialiased
      -moz-osx-font-smoothing: grayscale
      text-align: center
      color: #2c3e50

      .card
        border-radius: 2px
        box-shadow: 0 1px 3px rgba(0, 0, 0, 0.12), 0 1px 2px rgba(0, 0, 0, 0.24)
        transition: all 0.3s cubic-bezier(.25, .8, .25, 1)
        &:hover
          box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16), 0 3px 6px rgba(0, 0, 0, 0.23)

      li
        list-style: none
</style>
