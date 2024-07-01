<template>
  <div class="image-container" :style="placeholderStyle">
    <img
      :src="src"
      :alt="alt"
      class="loaded-image"
      @load="onLoad"
    >
    <div v-if="!loaded" class="shimmer" />
  </div>
</template>

<script>
export default {
  props: {
    src: {
      type: String,
      required: true
    },
    alt: {
      type: String,
      default: ''
    },
    dimension: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      loaded: false,
      aspectRatio: 1
    }
  },
  computed: {
    placeholderStyle () {
      return {
        width: '100%',
        paddingBottom: `${100 / this.aspectRatio}%`
      }
    }
  },
  watch: {
    dimension: {
      immediate: true,
      handler () {
        this.calculateAspectRatio()
      }
    }
  },
  mounted () {
    this.calculateAspectRatio()
  },
  methods: {
    onLoad () {
      this.loaded = true
    },
    calculateAspectRatio () {
      const [width, height] = this.dimension.split('x').map(Number)
      this.aspectRatio = width / height
    }
  }
}
</script>

<style scoped>
.image-container {
  width: 100%;
  position: relative;
  overflow: hidden;
}

.loaded-image {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  z-index: 2;
}

.shimmer {
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  background: linear-gradient(
    to right,
    #dcdcdc 0%,
    #c0c0c0 20%,
    #dcdcdc 40%,
    #dcdcdc 100%
  );
  background-size: 200% auto;
  animation: shimmer 1.5s linear infinite;
  z-index: 1;
}

@keyframes shimmer {
  0% {
    background-position: 200% 0;
  }
  100% {
    background-position: -200% 0;
  }
}
</style>
