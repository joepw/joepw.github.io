<template>
  <div>
    <section class="section appear">
      <img
        src="~static/arrow-left.svg"
        alt="Back"
        height="30"
        width="30"
        style="cursor: pointer;"
        @click="$router.go(-1)"
      >
      <h1 style="text-align: center; font-weight: 500; margin-bottom: 10px;">
        <a v-if="portfolio.href" :href="portfolio.href" target="_blank" rel="noopener noreferrer">
          {{ portfolio.fullName }}
        </a>
        <span v-else>{{ portfolio.fullName }}</span>
      </h1>
      <h2 class="subtitle" style="font-size: 20px;">
        {{ portfolio.description }}
      </h2>
      <div v-if="portfolio.screenshots.length">
        <div v-for="(ss, i) in portfolio.screenshots" :key="i" class="screenshots">
          <div style="font-weight: 700; margin-bottom: 10px;">
            {{ ss.title }}
          </div>
          <div class="gallery-wrapper">
            <div class="gallery" itemscope itemtype="http://schema.org/ImageGallery">
              <figure
                v-for="(s, j) in ss.screens"
                :key="j"
                itemprop="associatedMedia"
                itemscope
                itemtype="http://schema.org/ImageObject"
                :class="{ 'col-2': ss.preview === 'medium', 'col-3': ss.preview === 'small' }"
                style="width: 100%;"
              >
                <a :href="s.src" itemprop="contentUrl" :data-size="s.dimension">
                  <!-- <img :src="s.src" itemprop="thumbnail" alt="Image description" width="100%"> -->
                  <ImageWithPlaceholder :src="s.src" :alt="s.caption" :dimension="s.dimension" />
                </a>
                <figcaption itemprop="caption description" style="text-align: center;">
                  {{ s.caption }}
                </figcaption>
              </figure>
            </div>
            <div v-if="ss.screens.length > 2" class="show_more_gradient" />
          </div>
          <div v-if="ss.screens.length > 2" class="show_more button" @click="showMore(i)">
            Show More
          </div>
          <div class="show_less button" @click="showMore(i)">
            Show Less
          </div>
        </div>
      </div>
      <div v-else style="text-align: center; padding: 30px 0;">
        Screenshots are not displayed for privacy reasons.
      </div>
    </section>

    <!-- Root element of PhotoSwipe. Must have class pswp. -->
    <div class="pswp" tabindex="-1" role="dialog" aria-hidden="true">
      <!-- Background of PhotoSwipe.
          It's a separate element as animating opacity is faster than rgba(). -->
      <div class="pswp__bg" />

      <!-- Slides wrapper with overflow:hidden. -->
      <div class="pswp__scroll-wrap">
        <!-- Container that holds slides.
            PhotoSwipe keeps only 3 of them in the DOM to save memory.
            Don't modify these 3 pswp__item elements, data is added later on. -->
        <div class="pswp__container">
          <div class="pswp__item" />
          <div class="pswp__item" />
          <div class="pswp__item" />
        </div>

        <!-- Default (PhotoSwipeUI_Default) interface on top of sliding area. Can be changed. -->
        <div class="pswp__ui pswp__ui--hidden">
          <div class="pswp__top-bar">
            <!--  Controls are self-explanatory. Order can be changed. -->
            <div class="pswp__counter" />

            <button class="pswp__button pswp__button--close" title="Close (Esc)" />

            <button class="pswp__button pswp__button--fs" title="Toggle fullscreen" />

            <button class="pswp__button pswp__button--zoom" title="Zoom in/out" />

            <!-- Preloader demo https://codepen.io/dimsemenov/pen/yyBWoR -->
            <!-- element will get class pswp__preloader--active when preloader is running -->
            <div class="pswp__preloader">
              <div class="pswp__preloader__icn">
                <div class="pswp__preloader__cut">
                  <div class="pswp__preloader__donut" />
                </div>
              </div>
            </div>
          </div>

          <button class="pswp__button pswp__button--arrow--left" title="Previous (arrow left)" />

          <button class="pswp__button pswp__button--arrow--right" title="Next (arrow right)" />

          <div class="pswp__caption">
            <div class="pswp__caption__center" />
          </div>
        </div>
      </div>
    </div>
    <BackToTop />
  </div>
</template>

<script>
import PhotoSwipe from 'photoswipe/dist/photoswipe'
// eslint-disable-next-line camelcase
import PhotoSwipeUI_Default from 'photoswipe/dist/photoswipe-ui-default'
import 'photoswipe/dist/photoswipe.css'
import 'photoswipe/dist/default-skin/default-skin.css'
import { portfolios } from '~/data.js'

export default {
  validate ({ params }) {
    const names = ['topads', 'blinkgoo', 'sikomo', 'sikomo-dashboard']
    return names.includes(params.name)
  },
  data () {
    return {
      portfolio: {}
    }
  },
  created () {
    this.portfolio = portfolios.find(e => e.name === this.$route.params.name)
  },
  mounted () {
    this.initPhotoSwipeFromDOM('.gallery')
  },
  methods: {
    initPhotoSwipeFromDOM (gallerySelector) {
      // parse slide data (url, title, size ...) from DOM elements
      // (children of gallerySelector)
      const parseThumbnailElements = function (el) {
        const thumbElements = el.childNodes
        const numNodes = thumbElements.length
        const items = []
        let figureEl
        let linkEl
        let size
        let item

        for (let i = 0; i < numNodes; i++) {
          figureEl = thumbElements[i] // <figure> element

          // include only element nodes
          if (figureEl.nodeType !== 1) {
            continue
          }

          linkEl = figureEl.children[0] // <a> element

          size = linkEl.getAttribute('data-size').split('x')

          // create slide object
          item = {
            src: linkEl.getAttribute('href'),
            w: parseInt(size[0], 10),
            h: parseInt(size[1], 10)
          }

          if (figureEl.children.length > 1) {
            // <figcaption> content
            item.title = figureEl.children[1].innerHTML
          }

          if (linkEl.children.length > 0) {
            // <img> thumbnail element, retrieving thumbnail url
            item.msrc = linkEl.children[0].getAttribute('src')
          }

          item.el = figureEl // save link to element for getThumbBoundsFn
          items.push(item)
        }

        return items
      }

      // find nearest parent element
      const closest = function closest (el, fn) {
        return el && (fn(el) ? el : closest(el.parentNode, fn))
      }

      // triggers when user clicks on thumbnail
      const onThumbnailsClick = function (e) {
        e = e || window.event
        e.preventDefault ? e.preventDefault() : e.returnValue = false

        const eTarget = e.target || e.srcElement

        // find root element of slide
        const clickedListItem = closest(eTarget, function (el) {
          return (el.tagName && el.tagName.toUpperCase() === 'FIGURE')
        })

        if (!clickedListItem) {
          return
        }

        // find index of clicked item by looping through all child nodes
        // alternatively, you may define index via data- attribute
        const clickedGallery = clickedListItem.parentNode
        const childNodes = clickedListItem.parentNode.childNodes
        const numChildNodes = childNodes.length
        let nodeIndex = 0
        let index

        for (let i = 0; i < numChildNodes; i++) {
          if (childNodes[i].nodeType !== 1) {
            continue
          }

          if (childNodes[i] === clickedListItem) {
            index = nodeIndex
            break
          }
          nodeIndex++
        }

        if (index >= 0) {
          // open PhotoSwipe if valid index found
          openPhotoSwipe(index, clickedGallery)
        }
        return false
      }

      // parse picture index and gallery index from URL (#&pid=1&gid=2)
      const photoswipeParseHash = function () {
        const hash = window.location.hash.substring(1)
        const params = {}

        if (hash.length < 5) {
          return params
        }

        const vars = hash.split('&')
        for (let i = 0; i < vars.length; i++) {
          if (!vars[i]) {
            continue
          }
          const pair = vars[i].split('=')
          if (pair.length < 2) {
            continue
          }
          params[pair[0]] = pair[1]
        }

        if (params.gid) {
          params.gid = parseInt(params.gid, 10)
        }

        return params
      }

      const openPhotoSwipe = function (index, galleryElement, disableAnimation, fromURL) {
        const pswpElement = document.querySelectorAll('.pswp')[0]
        let gallery = {}
        let options = {}
        let items = []

        items = parseThumbnailElements(galleryElement)

        // define options (if needed)
        options = {

          // define gallery index (for URL)
          galleryUID: galleryElement.getAttribute('data-pswp-uid'),

          getThumbBoundsFn (index) {
            // See Options -> getThumbBoundsFn section of documentation for more info
            const thumbnail = items[index].el.getElementsByTagName('img')[0] // find thumbnail
            const pageYScroll = window.pageYOffset || document.documentElement.scrollTop
            const rect = thumbnail.getBoundingClientRect()

            return { x: rect.left, y: rect.top + pageYScroll, w: rect.width }
          },
          focus: false,
          closeOnScroll: false,
          closeOnVerticalDrag: false,
          tapToClose: true,
          bgOpacity: 0.7
        }

        // PhotoSwipe opened from URL
        if (fromURL) {
          if (options.galleryPIDs) {
            // parse real index when custom PIDs are used
            // http://photoswipe.com/documentation/faq.html#custom-pid-in-url
            for (let j = 0; j < items.length; j++) {
              if (items[j].pid === index) {
                options.index = j
                break
              }
            }
          } else {
            // in URL indexes start from 1
            options.index = parseInt(index, 10) - 1
          }
        } else {
          options.index = parseInt(index, 10)
        }

        // exit if index not found
        if (isNaN(options.index)) {
          return
        }

        if (disableAnimation) {
          options.showAnimationDuration = 0
        }

        // Pass data to PhotoSwipe and initialize it
        gallery = new PhotoSwipe(pswpElement, PhotoSwipeUI_Default, items, options)
        gallery.init()
      }

      // loop through all gallery elements and bind events
      const galleryElements = document.querySelectorAll(gallerySelector)

      for (let i = 0, l = galleryElements.length; i < l; i++) {
        galleryElements[i].setAttribute('data-pswp-uid', i + 1)
        galleryElements[i].onclick = onThumbnailsClick
      }

      // Parse URL and open gallery if it contains #&pid=3&gid=1
      const hashData = photoswipeParseHash()
      if (hashData.pid && hashData.gid) {
        openPhotoSwipe(hashData.pid, galleryElements[hashData.gid - 1], true, true)
      }
    },
    showMore (i) {
      const dom = document.getElementsByClassName('screenshots')[i]
      const gallery = dom.querySelector('.gallery-wrapper')
      const gradient = dom.querySelector('.show_more_gradient')
      const showMore = dom.querySelector('.show_more')
      const showLess = dom.querySelector('.show_less')
      if (gradient.style.display === '' || gradient.style.display === 'block') {
        gallery.style.maxHeight = '9999px'
        gallery.style.overflow = 'visible'
        gradient.style.display = 'none'
        showMore.style.display = 'none'
        showLess.style.display = 'block'
      } else {
        gallery.style.maxHeight = '600px'
        gallery.style.overflow = 'hidden'
        gradient.style.display = 'block'
        showMore.style.display = 'block'
        showLess.style.display = 'none'
      }
    }
  }
}
</script>

<style scoped>
.pswp__caption__center {
  text-align: center;
}

.screenshots {
  padding: 30px 0;
}

.gallery-wrapper {
  position: relative;
  max-height: 600px;
  overflow: hidden;
  transition: max-height 1s cubic-bezier(0, 1, 0, 1);
}

.gallery {
  display: flex;
  flex-wrap: wrap;
}

.gallery figure {
  display: inline-block;
  padding: 25px;
}

.col-3 {
  max-width: 33.3%;
}

.col-2 {
  max-width: 50%;
}

@media (max-width: 960px) {
  .gallery figure {
    padding: 20px;
  }

  .col-3 {
    max-width: 50%;
  }
}

@media (max-width: 600px) {
  .section {
    padding: 40px;
  }

  .gallery figure {
    padding: 10px;
  }

  .col-2 {
    max-width: 100%;
  }
}

.show_more_gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-image: linear-gradient(to bottom, transparent, #191a1d);
  z-index: 4;
}

.show_more, .show_less {
  text-align: center;
  margin: 0 auto;
}

.show_less {
  display: none;
}
</style>
