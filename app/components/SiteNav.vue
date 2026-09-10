<template>
  <nav
    class="site-nav"
    aria-label="Section navigation"
    :class="{ 'is-open': menuOpen }"
  >
    <a
      href="#top"
      class="nav-brand"
      @click.prevent="handleNav('top')"
    >
      <span class="nav-brand-mark">JP</span>
      <span class="nav-brand-text">Jonathan Prasetya</span>
    </a>

    <button
      class="nav-toggle"
      type="button"
      :aria-expanded="menuOpen"
      :aria-label="menuOpen ? 'Close menu' : 'Open menu'"
      @click="menuOpen = !menuOpen"
    >
      <span v-if="menuOpen">Close</span>
      <span v-else>Menu</span>
    </button>

    <ul class="nav-links">
      <li
        v-for="s in sections"
        :key="s.id"
        class="nav-link-item"
      >
        <a
          :href="`#${s.id}`"
          class="nav-link"
          :class="{ 'is-active': active === s.id }"
          @click.prevent="handleNav(s.id)"
        >
          <span class="nav-index">{{ s.index }}</span>
          <span class="nav-label">{{ s.label }}</span>
        </a>
      </li>
    </ul>

    <div class="nav-foot">
      <a
        v-for="l in links"
        :key="l.text"
        :href="l.url"
        :title="l.text"
        target="_blank"
        rel="noopener noreferrer"
        class="nav-social"
      >
        <img
          :src="l.image"
          :alt="l.imageAlt"
          class="link-images"
          height="18"
          width="18"
        >
      </a>
      <p class="nav-foot-label">Available for work</p>
    </div>
  </nav>
</template>

<script setup lang="ts">
import { onBeforeUnmount, onMounted, ref } from 'vue'
import { scrollToId } from '~/utils/scroll'

defineProps<{
  sections: { id: string; index: string; label: string }[]
  links: { text: string; image: string; imageAlt: string; url: string }[]
}>()

const menuOpen = ref(false)
const active = ref<string | null>(null)

let observer: IntersectionObserver | null = null

function handleNav (id: string) {
  menuOpen.value = false
  scrollToId(id)
}

function onIntersect (entries: IntersectionObserverEntry[]) {
  const visible = entries
    .filter(e => e.isIntersecting)
    .sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)
  if (visible.length) {
    active.value = visible[0].target.id
  }
}

onMounted(() => {
  const els = document.querySelectorAll<HTMLElement>('[data-nav-section]')
  if (!('IntersectionObserver' in window)) {
    active.value = els[0]?.id ?? null
    return
  }
  observer = new IntersectionObserver(onIntersect, {
    rootMargin: '-45% 0px -45% 0px',
    threshold: 0
  })
  els.forEach(el => observer?.observe(el))
})

onBeforeUnmount(() => {
  observer?.disconnect()
  observer = null
})
</script>

<style scoped>
.site-nav {
  position: fixed;
  top: 0;
  left: 0;
  height: 100vh;
  width: 240px;
  padding: 28px 20px 24px;
  display: flex;
  flex-direction: column;
  border-right: 1px solid var(--color-border);
  background: var(--color-bg);
  z-index: 50;
}

.nav-brand {
  display: flex;
  align-items: center;
  gap: 10px;
  color: var(--color-text);
}

.nav-brand-mark {
  font-family: var(--font-display);
  font-weight: 700;
  font-size: 1.05rem;
  display: inline-flex;
  width: 38px;
  height: 38px;
  align-items: center;
  justify-content: center;
  border: 1px solid var(--color-border-strong);
  border-radius: 6px;
  color: var(--color-accent);
}

.nav-brand-text {
  font-family: var(--font-mono);
  font-size: 0.78rem;
  color: var(--color-text-soft);
}

.nav-toggle {
  display: none;
}

.nav-links {
  list-style: none;
  margin-top: 44px;
  display: flex;
  flex-direction: column;
  gap: 2px;
  padding: 0;
}

.nav-link {
  display: flex;
  align-items: baseline;
  gap: 12px;
  padding: 9px 6px;
  border-radius: 5px;
}

.nav-link:hover,
.nav-link.is-active {
  background: var(--color-accent-soft);
  color: var(--color-accent);
}

.nav-index {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  color: var(--color-accent);
}

.nav-label {
  font-family: var(--font-mono);
  font-size: 0.86rem;
  color: var(--color-text-soft);
}

.nav-link:hover .nav-label,
.nav-link.is-active .nav-label {
  color: var(--color-text);
}

.nav-foot {
  margin-top: auto;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 8px;
}

.nav-social {
  display: inline-flex;
}

.nav-foot-label {
  font-family: var(--font-mono);
  font-size: 0.7rem;
  color: var(--color-faint);
  margin-top: 6px;
}

/* Mobile / tablet: collapse the rail into a top bar with a menu. */
@media (max-width: 900px) {
  .site-nav {
    width: 100%;
    height: auto;
    min-height: 62px;
    padding: 14px 20px;
    flex-direction: row;
    align-items: center;
    gap: 14px;
    border-right: none;
    border-bottom: 1px solid var(--color-border);
  }

  .nav-brand-text {
    display: none;
  }

  .nav-toggle {
    display: inline-flex;
    margin-left: auto;
    font-family: var(--font-mono);
    font-size: 0.8rem;
    color: var(--color-accent);
    background: transparent;
    border: 1px solid var(--color-border);
    border-radius: 5px;
    padding: 8px 12px;
    cursor: pointer;
  }

  .nav-links {
    position: absolute;
    top: 62px;
    left: 0;
    right: 0;
    margin: 0;
    padding: 12px 20px 20px;
    background: var(--color-bg);
    border-bottom: 1px solid var(--color-border);
    display: none;
    flex-direction: column;
    gap: 2px;
  }

  .site-nav.is-open .nav-links {
    display: flex;
  }

  .nav-foot {
    display: none;
  }
}

@media (prefers-reduced-motion: reduce) {
  .nav-link {
    transition: none;
  }
}
</style>