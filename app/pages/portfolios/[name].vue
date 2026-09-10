<template>
  <div
    v-if="portfolio"
    class="portfolio-detail"
  >
    <section class="section detail appear">
      <a
        class="back-button"
        href="#"
        @click.prevent="goBack"
      >
        <img
          src="/arrow-left.svg"
          alt=""
          height="16"
          width="16"
          class="button-icon"
        >
        <span>Back</span>
      </a>
      <h1 class="portfolio-heading">
        <a
          v-if="portfolio.href"
          :href="portfolio.href"
          target="_blank"
          rel="noopener noreferrer"
        >
          {{ portfolio.fullName }}
        </a>
        <span v-else>{{ portfolio.fullName }}</span>
      </h1>
      <h2 class="subtitle portfolio-subtitle">
        {{ portfolio.description }}
      </h2>

      <div v-if="portfolio.screenshots.length">
        <div
          v-for="(ss, gi) in portfolio.screenshots"
          :key="gi"
          class="screenshots"
        >
          <div class="screenshot-title">
            {{ ss.title }}
          </div>
          <div
            class="gallery-wrapper"
            :style="galleryStyle(gi, ss)"
          >
            <div
              class="gallery"
              itemscope
              itemtype="http://schema.org/ImageGallery"
            >
              <figure
                v-for="(s, j) in ss.screens"
                :key="j"
                itemprop="associatedMedia"
                itemscope
                itemtype="http://schema.org/ImageObject"
                :class="figureClass(ss.preview)"
                class="gallery-item"
              >
                <a
                  :href="s.src"
                  itemprop="contentUrl"
                  :data-size="s.dimension"
                  class="gallery-thumb"
                  onclick="event.preventDefault()"
                  @click.prevent="openLightbox(gi, j)"
                >
                  <ImageWithPlaceholder
                    :src="s.src"
                    :alt="s.caption"
                    :dimension="s.dimension"
                  />
                </a>
                <figcaption
                  itemprop="caption description"
                  class="caption"
                >
                  {{ s.caption }}
                </figcaption>
              </figure>
            </div>
            <div
              v-if="hasMultipleSections && ss.screens.length > 2 && !expanded[gi]"
              class="show_more_gradient"
            />
          </div>
          <div
            v-if="hasMultipleSections && ss.screens.length > 2"
            class="show-toggle button"
            :aria-expanded="expanded[gi]"
            @click="toggleGroup(gi)"
          >
            {{ expanded[gi] ? 'Show Less' : 'Show More' }}
            <svg
              class="toggle-chevron"
              :class="{ 'is-open': expanded[gi] }"
              viewBox="0 0 24 24"
              width="14"
              height="14"
              aria-hidden="true"
            >
              <path d="M6 5L12 20 18 5Z" />
            </svg>
          </div>
        </div>
      </div>
      <div v-else class="privacy-note">
        Screenshots are not displayed for privacy reasons.
      </div>
    </section>


  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
import PhotoSwipeLightbox from 'photoswipe/lightbox'
import 'photoswipe/style.css'
import {
  findPortfolio,
  portfolioNames,
  type Portfolio,
  type Screenshot,
  type ScreenshotGroup
} from '~/data/portfolios'

const route = useRoute()
const router = useRouter()

// Route validation — unknown names are rejected (404).
definePageMeta({
  validate: (data) => {
    const name = data.params?.name
    return Boolean(name && portfolioNames.includes(String(name)))
  }
})

const portfolio = computed<Portfolio | undefined>(() => {
  return findPortfolio(String(route.params.name ?? ''))
})

useHead(() => {
  const p = portfolio.value
  return p
    ? {
        title: `${p.fullName} | Jonathan Prasetya`,
        meta: [{ name: 'description', content: p.description }]
      }
    : {}
})

// All screenshots flattened for a seamless lightbox across groups.
const allImages = computed<Screenshot[]>(() =>
  portfolio.value ? portfolio.value.screenshots.flatMap((g: ScreenshotGroup) => g.screens) : []
)

const expanded = ref<boolean[]>([])

// Collapse/expand ("Show More") only makes sense when the page has several
// screenshot sections to compress; single-section pages show everything.
const hasMultipleSections = computed(() =>
  portfolio.value ? portfolio.value.screenshots.length > 1 : false
)

watch(
  portfolio,
  () => {
    if (portfolio.value) {
      expanded.value = portfolio.value.screenshots.map(() => false)
    }
  },
  { immediate: true }
)

// PhotoSwipe lightbox instance (created once on mount).
let lightbox: PhotoSwipeLightbox | null = null

function goBack () {
  if (window.history.length > 1) {
    router.go(-1)
  }
  else {
    router.push('/')
  }
}

function buildDataSource () {
  return allImages.value.map((s) => ({
    src: s.src,
    width: Number(s.dimension.split('x')[0]) || 1360,
    height: Number(s.dimension.split('x')[1]) || 768,
    alt: s.caption,
    caption: s.caption,
  }))
}

function openLightbox (groupIndex: number, screenIndex: number) {
  const p = portfolio.value
  if (!p || !lightbox) return
  const screenshots = p.screenshots
  let index = screenIndex
  for (let i = 0; i < groupIndex; i++) {
    index += screenshots[i]!.screens.length
  }
  lightbox!.options.dataSource = buildDataSource()
  lightbox!.loadAndOpen(index)
}

onMounted(() => {
  lightbox = new PhotoSwipeLightbox({
    dataSource: buildDataSource(),
    pswpModule: () => import('photoswipe'),
    wheelToZoom: true,
    spacing: 0.1,
    bgOpacity: 0.92,
    padding: { top: 20, bottom: 60, left: 20, right: 20 },
    closeTitle: 'Close (Esc)',
    zoomTitle: 'Zoom',
    arrowPrevTitle: 'Previous',
    arrowNextTitle: 'Next',
    errorMsg: 'Image could not be loaded',
  })
  lightbox.on('uiRegister', () => {
    lightbox!.pswp!.ui.registerElement({
      name: 'custom-caption',
      order: 9,
      isButton: false,
      appendTo: 'root',
      html: '',
      onInit: (el) => {
        lightbox!.pswp!.on('change', () => {
          const caption = lightbox!.pswp!.currSlide?.data?.caption ?? ''
          el.textContent = caption
        })
      },
    })
  })
  lightbox.init()
})

onBeforeUnmount(() => {
  lightbox?.destroy()
  lightbox = null
})

function galleryStyle (groupIndex: number, group: ScreenshotGroup) {
  const isExpanded = expanded.value[groupIndex]
  const collapsible = hasMultipleSections.value && group.screens.length > 2
  return {
    maxHeight: collapsible && !isExpanded ? '600px' : '9999px',
    overflow: isExpanded ? 'visible' : 'hidden'
  }
}

function figureClass (preview: string) {
  return preview === 'medium' ? 'col-2' : 'col-3'
}

function toggleGroup (groupIndex: number) {
  expanded.value[groupIndex] = !expanded.value[groupIndex]
}
</script>

<style scoped>
.detail {
  padding: 96px 0;
}

.back-button {
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-family: var(--font-mono);
  font-size: 0.85rem;
  color: var(--color-text-soft);
  text-decoration: none;
}

.back-button:hover {
  color: var(--color-accent);
}

.portfolio-heading {
  text-align: center;
  font-family: var(--font-display);
  font-weight: 500;
  font-size: 2.6rem;
  letter-spacing: -0.02em;
  color: var(--color-text);
  margin: 40px 0 8px;
}

.portfolio-subtitle {
  font-size: 1.05rem;
  max-width: 56ch;
  text-align: center;
  color: var(--color-text-soft);
  margin: 0 auto 20px;
}

.privacy-note {
  text-align: center;
  color: var(--color-text-soft);
  padding: 30px 0;
}

.screenshots {
  padding: 30px 0;
}

.screenshot-title {
  font-family: var(--font-mono);
  font-size: 0.9rem;
  color: var(--color-accent);
  margin-bottom: 10px;
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
  gap: 24px;
  justify-content: center;
  align-items: flex-start;
}

.gallery figure {
  display: block;
  padding: 0;
  text-align: center;
  min-width: 0;
}

.gallery-thumb {
  display: block;
}

/* flex-grow is 0 so rows with fewer items (e.g. a lone last-row image)
   keep their column width instead of stretching to fill the row.
   Basis subtracts the gap so columns fit exactly at every breakpoint. */
.col-3 {
  flex: 0 1 calc((100% - 48px) / 3);
}

.col-2 {
  flex: 0 1 calc((100% - 24px) / 2);
}

.gallery figcaption {
  margin-top: 8px;
  color: var(--color-muted);
  font-size: 13px;
}

@media (max-width: 960px) {
  .col-3 {
    flex: 0 1 calc((100% - 24px) / 2);
  }
}

@media (max-width: 600px) {
  .detail {
    padding: 40px 0;
  }

  .col-2,
  .col-3 {
    flex: 1 1 100%;
  }

  .gallery {
    gap: 16px;
  }
}

.show_more_gradient {
  position: absolute;
  bottom: 0;
  width: 100%;
  height: 60px;
  background-image: linear-gradient(to bottom, transparent, var(--color-screen-fade));
  z-index: 4;
}

.show-toggle {
  text-align: center;
  margin: 12px auto 0;
}

.toggle-chevron {
  margin-left: 6px;
  fill: currentColor;
  transition: transform 0.3s ease;
}

.toggle-chevron.is-open {
  transform: rotate(180deg);
}
</style>

<style>
/* PhotoSwipe custom caption (global — injected outside component scope) */
.pswp__custom-caption {
  background: rgba(0, 0, 0, 0.6);
  font-size: 14px;
  color: #fff;
  width: calc(100% - 32px);
  max-width: 480px;
  padding: 6px 12px;
  border-radius: 6px;
  position: absolute;
  left: 50%;
  bottom: 16px;
  transform: translateX(-50%);
  text-align: center;
  z-index: 1;
}
</style>