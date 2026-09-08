<template>
  <div
    v-if="portfolio"
    class="portfolio-detail"
  >
    <section class="section appear">
      <img
        src="/arrow-left.svg"
        alt="Back"
        height="30"
        width="30"
        class="back-button"
        @click="goBack"
      >
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
                @click="openLightbox(gi, j)"
              >
                <a
                  :href="s.src"
                  itemprop="contentUrl"
                  :data-size="s.dimension"
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
              v-if="ss.screens.length > 2"
              class="show_more_gradient"
            />
          </div>
          <div
            v-if="ss.screens.length > 2"
            class="show_more button"
            @click="toggleGroup(gi)"
          >
            Show More
          </div>
          <div
            class="show_less button"
            @click="toggleGroup(gi)"
          >
            Show Less
          </div>
        </div>
      </div>
      <div v-else class="privacy-note">
        Screenshots are not displayed for privacy reasons.
      </div>
    </section>

    <Teleport to="body">
      <div
        v-if="lightbox"
        class="lightbox"
        role="dialog"
        aria-modal="true"
        @click.self="closeLightbox"
      >
        <button
          class="lightbox-close"
          aria-label="Close (Esc)"
          @click="closeLightbox"
        >
          ×
        </button>
        <button
          class="lightbox-prev"
          aria-label="Previous"
          @click="prevImage"
        >
          ‹
        </button>
        <img
          :src="lightbox.items[lightbox.index].src"
          :alt="lightbox.items[lightbox.index].caption"
          class="lightbox-image"
        >
        <button
          class="lightbox-next"
          aria-label="Next"
          @click="nextImage"
        >
          ›
        </button>
        <div class="lightbox-caption">
          {{ lightbox.items[lightbox.index].caption }}
          <span class="lightbox-counter">
            {{ lightbox.index + 1 }}/{{ lightbox.items.length }}
          </span>
        </div>
      </div>
    </Teleport>
  </div>
</template>

<script setup lang="ts">
import { computed, onBeforeUnmount, onMounted, ref, watch } from 'vue'
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
    return Boolean(name && portfolioNames.includes(name))
  }
})

const portfolio = computed<Portfolio | undefined>(() => {
  return findPortfolio(route.params.name ?? '')
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

watch(
  portfolio,
  () => {
    if (portfolio.value) {
      expanded.value = portfolio.value.screenshots.map(() => false)
    }
  },
  { immediate: true }
)

const lightbox = ref<{ items: Screenshot[]; index: number } | null>(null)

function openLightbox (groupIndex: number, screenIndex: number) {
  const p = portfolio.value
  if (!p) return
  let flatIndex = screenIndex
  for (let i = 0; i < groupIndex; i++) {
    flatIndex += p.screenshots[i].screens.length
  }
  lightbox.value = { items: allImages.value, index: flatIndex }
}

function goBack () {
  if (window.history.length > 1) {
    router.go(-1)
  }
  else {
    router.push('/')
  }
}

function closeLightbox () {
  lightbox.value = null
}

function prevImage () {
  const lb = lightbox.value
  if (!lb) return
  lb.index = (lb.index - 1 + lb.items.length) % lb.items.length
}

function nextImage () {
  const lb = lightbox.value
  if (!lb) return
  lb.index = (lb.index + 1) % lb.items.length
}

function onKeydown (e: KeyboardEvent) {
  if (!lightbox.value) return
  if (e.key === 'Escape') {
    closeLightbox()
  }
  else if (e.key === 'ArrowLeft') {
    prevImage()
  }
  else if (e.key === 'ArrowRight') {
    nextImage()
  }
}

onMounted(() => {
  window.addEventListener('keydown', onKeydown)
})

onBeforeUnmount(() => {
  window.removeEventListener('keydown', onKeydown)
})

function galleryStyle (groupIndex: number, group: ScreenshotGroup) {
  const isExpanded = expanded.value[groupIndex]
  const collapsible = group.screens.length > 2
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
.back-button {
  cursor: pointer;
}

.portfolio-heading {
  text-align: center;
  font-weight: 500;
  margin-bottom: 10px;
}

.portfolio-subtitle {
  font-size: 20px;
}

.privacy-note {
  text-align: center;
  padding: 30px 0;
}

.screenshots {
  padding: 30px 0;
}

.screenshot-title {
  font-weight: 700;
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
  background-image: linear-gradient(to bottom, transparent, var(--color-screen-fade));
  z-index: 4;
}

.show_more,
.show_less {
  text-align: center;
  margin: 0 auto;
}

.show_less {
  display: none;
}

.lightbox {
  position: fixed;
  inset: 0;
  z-index: 50;
  background: var(--color-overlay);
  display: flex;
  align-items: center;
  justify-content: center;
}

.lightbox-image {
  max-width: 92%;
  max-height: 82%;
  object-fit: contain;
  box-shadow: var(--shadow);
}

.lightbox-close {
  position: absolute;
  top: 16px;
  right: 22px;
  font-size: 28px;
  line-height: 1;
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  z-index: 2;
}

.lightbox-prev {
  position: absolute;
  left: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 44px;
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  z-index: 2;
}

.lightbox-next {
  position: absolute;
  right: 24px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 44px;
  background: transparent;
  border: none;
  color: var(--color-text);
  cursor: pointer;
  z-index: 2;
}

.lightbox-caption {
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  padding: 12px 20px;
  text-align: center;
  color: var(--color-text-soft);
  background: var(--color-surface);
  z-index: 2;
}

.lightbox-counter {
  color: var(--color-muted);
}
</style>