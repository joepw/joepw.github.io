<template>
  <div
    id="top"
    class="home"
  >
    <SiteNav
      :sections="sections"
      :links="links"
    />

    <div class="home-main">
      <header class="hero">
        <p class="eyebrow hero-eyebrow">
          // Front-End Engineer — Jakarta, Indonesia
        </p>
        <h1 class="hero-name">
          Jonathan Prasetya
        </h1>
        <h2 class="hero-role">
          I build high-quality, user-centric websites that combine performance,
          aesthetics, and usability.
        </h2>
        <p class="hero-intro">
          I turn ideas into products people love to use. With five years of
          experience across e-commerce, advertising, and school systems, I craft
          interfaces that feel intuitive and fast — let's build something great
          together.
        </p>

        <div class="hero-actions">
          <a
            href="#work"
            class="button button--primary"
            @click.prevent="scrollToId('work')"
          >
            View selected work
          </a>
          <a
            href="#about"
            class="button"
            @click.prevent="scrollToId('about')"
          >
            About me
          </a>
        </div>

        <ul class="hero-links">
          <li
            v-for="link in links"
            :key="link.text"
          >
            <a
              :href="link.url"
              :title="link.text"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                :src="link.image"
                :alt="link.imageAlt"
                height="20"
                width="20"
                class="link-images"
              >
            </a>
          </li>
        </ul>
      </header>

      <section
        id="about"
        data-nav-section
        class="section about"
      >
        <h2 class="section-heading">
          <span class="eyebrow">01</span>
          <span class="section-title-title">About</span>
        </h2>
        <div class="about-grid">
          <div class="about-copy">
            <p class="about-paragraph">
              I'm Jonathan, a Front-End Engineer based in Jakarta, Indonesia, with
              a degree in Computer Science from Universitas Indonesia. I'm
              passionate about web technology, particularly its ability to deliver
              seamless experiences across both desktop and mobile. I enjoy crafting
              user interfaces that are not only visually engaging but also
              intuitive, functional, and genuinely useful.
            </p>
            <p class="about-paragraph">
              With over five years of experience in web development, I've
              contributed to a variety of innovative projects and collaborated with
              diverse, talented teams. My work spans building intuitive interfaces,
              improving user experiences through feedback-driven iterations, and
              applying modern best practices to create efficient, scalable
              solutions.
            </p>
          </div>
          <aside class="about-facts">
            <img
              src="/profile-photo.jpg"
              alt="Jonathan Prasetya Wijaya"
              class="about-photo"
              height="150"
              width="150"
            >
            <dl class="fact-list">
              <div class="fact">
                <dt>Role</dt>
                <dd>Front-End Engineer</dd>
              </div>
              <div class="fact">
                <dt>Location</dt>
                <dd>Jakarta, ID</dd>
              </div>
              <div class="fact">
                <dt>Base</dt>
                <dd>Universitas Indonesia</dd>
              </div>
              <div class="fact">
                <dt>Experience</dt>
                <dd>5+ years</dd>
              </div>
            </dl>
          </aside>
        </div>
      </section>

      <section
        id="experience"
        data-nav-section
        class="section experience"
      >
        <h2 class="section-heading">
          <span class="eyebrow">02</span>
          <span class="section-title-title">Experience</span>
        </h2>
        <div class="exp-list">
          <article
            v-for="(experience, i) in experiences"
            :key="i"
            class="exp-row"
          >
            <div class="exp-meta">
              <span class="exp-time mono">{{ experience.time }}</span>
              <span class="exp-type mono">{{ experience.type }}</span>
            </div>
            <div class="exp-body">
              <h3 class="exp-company">{{ experience.company }}</h3>
              <p class="exp-position mono">{{ experience.position }}</p>
              <p class="exp-desc">{{ experience.desc }}</p>
            </div>
          </article>
        </div>
      </section>

      <section
        id="skills"
        data-nav-section
        class="section skills"
      >
        <h2 class="section-heading">
          <span class="eyebrow">03</span>
          <span class="section-title-title">Skills</span>
        </h2>
        <div class="skills-grid">
          <div
            v-for="(skill, i) in skills"
            :key="i"
            class="skill-card"
          >
            <h3 class="skill-label mono">{{ skill.label }}</h3>
            <ul class="skill-list">
              <li
                v-for="(item, j) in skill.items"
                :key="j"
                class="skill-item"
              >
                {{ item }}
              </li>
            </ul>
          </div>
        </div>
      </section>

      <section
        id="work"
        data-nav-section
        class="section work"
      >
        <h2 class="section-heading">
          <span class="eyebrow">04</span>
          <span class="section-title-title">Selected Work</span>
        </h2>
        <div class="work-list">
          <article
            v-for="(pf, i) in portfolios"
            :key="i"
            class="work-card"
            :class="{ 'has-cover': pf.cover }"
          >
            <div
              v-if="pf.cover"
              class="work-cover"
            >
              <nuxt-link :to="pf.url">
                <ImageWithPlaceholder
                  :src="pf.cover"
                  :alt="pf.fullName"
                  :dimension="pf.coverDimension"
                />
              </nuxt-link>
            </div>
            <div class="work-body">
              <h3 class="work-name">
                <a
                  v-if="pf.href"
                  :href="pf.href"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  {{ pf.fullName }}<span class="work-ext" aria-hidden="true"> ↗</span>
                </a>
                <nuxt-link v-else :to="pf.url">{{ pf.fullName }}</nuxt-link>
              </h3>
              <p class="work-desc">{{ pf.description }}</p>
              <ul class="work-tech">
                <li
                  v-for="(tech, j) in pf.tech"
                  :key="j"
                  class="tech-chip"
                  :title="tech.name"
                >
                  <img
                    :src="tech.imgSrc"
                    :alt="tech.name"
                    height="16"
                    width="16"
                  >
                  <span class="tech-name mono">{{ tech.name }}</span>
                </li>
              </ul>
              <nuxt-link
                v-if="pf.cover"
                :to="pf.url"
                class="button button--primary work-link"
              >
                See More →
              </nuxt-link>
            </div>
          </article>
        </div>
      </section>
    </div>
  </div>
</template>

<script setup lang="ts">
import { portfolios } from '~/data/portfolios'
import { scrollToId } from '~/utils/scroll'

useHead({
  title: 'Jonathan Prasetya | Front-End Engineer',
  meta: [
    {
      name: 'description',
      content: 'Personal Website and Portfolios of Jonathan Prasetya Wijaya'
    }
  ]
})

const sections = [
  { id: 'about', index: '01', label: 'About' },
  { id: 'experience', index: '02', label: 'Experience' },
  { id: 'skills', index: '03', label: 'Skills' },
  { id: 'work', index: '04', label: 'Work' }
]

const links = [
  {
    text: 'LinkedIn',
    image: '/linkedin.svg',
    imageAlt: 'linkedin.com/in/jonathanpwijaya',
    url: 'https://www.linkedin.com/in/jonathanpwijaya/'
  },
  {
    text: 'Email',
    image: '/email.svg',
    imageAlt: 'jonathanpwijaya@gmail.com',
    url: 'mailto:jonathanpwijaya@gmail.com'
  }
]

const skills = [
  {
    label: 'Languages',
    items: ['HTML', 'CSS', 'JavaScript', 'TypeScript', 'GraphQL', 'NRQL']
  },
  {
    label: 'Frameworks / Libraries',
    items: ['React', 'Emotion', 'Jest', 'Playwright', 'Vue', 'Nuxt', 'Ant Design', 'Storybook', 'Koa', 'Fastify', 'NestJS', 'Radix UI']
  },
  {
    label: 'Tools',
    items: ['Git / GitHub', 'Chrome DevTools', 'Figma', 'Jira', 'Slack', 'Trello', 'Confluence', 'New Relic', 'GSuite', 'Consul', 'Jenkins', 'Supabase']
  }
]

const experiences = [
  {
    company: 'LittleLives',
    type: 'Full time',
    time: 'Sep 2024 - Jan 2026',
    position: 'Frontend Engineer',
    desc: 'Part of the product engineering team building a school management system used by administrators to manage day-to-day operations across multiple childcare centres, I worked across various modules of the admin dashboard to build and improve features for managing students, scheduling, and centre operations. I also contributed extensively to a real-time chat feature that enables direct communication between school administrators and parents within the platform. In addition, I helped develop a student assessment module—a form-building tool that allows educators to create, distribute, and review assessments for students. Alongside my frontend responsibilities, I occasionally took on backend tasks, supporting feature delivery by working on APIs and business logic in collaboration with the core backend team.'
  },
  {
    company: 'Tokopedia',
    type: 'Full time',
    time: 'Jan 2021 - Jun 2024',
    position: 'Software Engineer - Web Platform',
    desc: 'Contributed to the development of the TopAds dashboard, an advertising tool for sellers to manage and optimize their ad campaigns. I implemented features and functionality that enhanced the dashboard capabilities and developed features for ads placement within the Tokopedia marketplace, ensuring seamless integration and improving ad visibility and performance. Collaborated with cross-functional teams to deliver efficient and reliable solutions.'
  },
  {
    company: 'Blinkgoo',
    type: 'Full time',
    time: 'Jan 2019 - Sep 2020',
    position: 'Software Engineer',
    desc: 'Developed the Blinkgoo website from scratch, initially handling full-stack development before focusing exclusively on the front-end. Led the front-end team in implementing UI/UX designs and developing the website for both desktop and mobile web versions. Ensured optimal website performance by focusing on load speed, responsiveness, and accurate design implementation.'
  },
  {
    company: 'PT Astra Graphia Information Technology (AGIT)',
    type: 'Internship',
    time: 'Jun 2018 - Aug 2018',
    position: 'Software Engineer - Full Stack',
    desc: 'Developed key features including the courier assignment page, vendor assignment page, and delivery manifest creation page. The process involved creating detailed feature requirement documents, designing website wireframes, and developing both the front-end and back-end components.'
  },
  {
    company: 'Sikomo',
    type: 'Internship',
    time: 'Jun 2017 - Aug 2017',
    position: 'Software Engineer',
    desc: 'Began my internship by developing the front-end of the production web dashboard, later transitioning to developing the Android app. Gained in-depth experience with JavaScript frameworks and learned to seamlessly connect user interfaces with back-end services.'
  }
]
</script>

<style scoped>
.home {
  padding-left: 240px;
}

@media (max-width: 900px) {
  .home {
    padding-left: 0;
  }
}

.home-main {
  padding: 120px 64px;
}

@media (max-width: 900px) {
  .home-main {
    padding: 96px 24px;
  }
}

/* ---- Hero ---- */
.hero {
  max-width: 760px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.hero-eyebrow {
  margin-bottom: 22px;
}

.hero-name {
  font-family: var(--font-display);
  font-size: clamp(2.7rem, 7vw, 4.8rem);
  font-weight: 500;
  letter-spacing: -0.025em;
  line-height: 1.02;
  color: var(--color-text);
  margin-bottom: 18px;
}

.hero-role {
  font-family: var(--font-display);
  font-weight: 400;
  font-size: clamp(1.15rem, 2.5vw, 1.55rem);
  max-width: 34ch;
  line-height: 1.3;
  color: var(--color-text-soft);
  margin-bottom: 20px;
}

.hero-intro {
  max-width: 60ch;
  color: var(--color-text-soft);
  margin-bottom: 36px;
}

.hero-actions {
  display: flex;
  gap: 14px;
  flex-wrap: wrap;
  margin-bottom: 40px;
}

.hero-links {
  list-style: none;
  display: flex;
  gap: 18px;
  padding: 0;
  margin: 0;
}

.hero-links img {
  opacity: 0.75;
  transition: opacity 0.15s ease;
}

.hero-links a:hover img {
  opacity: 1;
}

/* ---- Section headings ---- */
.section {
  padding: 110px 0;
  border-top: 1px solid var(--color-border);
  scroll-margin-top: 96px;
}

.section-heading {
  display: flex;
  align-items: baseline;
  gap: 16px;
  margin-bottom: 48px;
}

.section-heading .eyebrow {
  display: inline-block;
  min-width: 34px;
}

.section-title-title {
  font-family: var(--font-display);
  font-size: 1.9rem;
  font-weight: 500;
  letter-spacing: -0.02em;
  color: var(--color-text);
}

/* ---- About ---- */
.about-grid {
  display: grid;
  grid-template-columns: 1fr 240px;
  gap: 56px;
  align-items: start;
}

.about-paragraph {
  margin-bottom: 20px;
  color: var(--color-text-soft);
  max-width: 60ch;
}

.about-facts {
  display: flex;
  flex-direction: column;
  gap: 24px;
}

.about-facts img {
  border-radius: 50%;
  width: 130px;
  height: 130px;
  object-fit: cover;
}

.fact-list {
  margin: 0;
  padding: 0;
}

.fact {
  padding: 10px 0;
  border-bottom: 1px solid var(--color-border);
}

.fact dt {
  font-family: var(--font-mono);
  font-size: 0.72rem;
  text-transform: uppercase;
  color: var(--color-muted);
  margin-bottom: 3px;
}

.fact dd {
  color: var(--color-text);
  font-size: 0.92rem;
}

/* ---- Experience ---- */
.exp-list {
  display: flex;
  flex-direction: column;
}

.exp-row {
  display: grid;
  grid-template-columns: 180px 1fr;
  gap: 32px;
  padding: 28px 0;
  border-top: 1px solid var(--color-border);
}

.exp-meta {
  display: flex;
  flex-direction: column;
  gap: 4px;
}

.exp-time {
  font-size: 0.78rem;
  color: var(--color-faint);
}

.exp-type {
  font-size: 0.7rem;
  color: var(--color-muted);
}

.exp-company {
  font-family: var(--font-display);
  font-size: 1.35rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 4px;
}

.exp-position {
  font-size: 0.78rem;
  color: var(--color-accent);
  margin-bottom: 10px;
}

.exp-desc {
  color: var(--color-text-soft);
  max-width: 60ch;
}

/* ---- Skills ---- */
.skills-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
}

.skill-card {
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 8px;
  padding: 24px;
}

.skill-label {
  font-size: 0.8rem;
  color: var(--color-accent);
  margin-bottom: 16px;
}

.skill-list {
  list-style: none;
  padding: 0;
  margin: 0;
  display: flex;
  flex-wrap: wrap;
  gap: 6px 14px;
}

.skill-item {
  font-size: 0.86rem;
  color: var(--color-text-soft);
}

/* ---- Work ---- */
.work-list {
  display: flex;
  flex-direction: column;
  gap: 64px;
}

.work-card {
  display: grid;
  grid-template-columns: minmax(0, 1.1fr) minmax(0, 1fr);
  gap: 36px;
  align-items: center;
  border: 1px solid var(--color-border);
  background: var(--color-surface);
  border-radius: 10px;
  padding: 20px;
}

/* Cards without a cover (e.g. privacy-only projects) fill the full width. */
.work-card:not(.has-cover) {
  display: block;
  padding: 32px 32px;
}

.work-cover {
  position: relative;
  border-radius: 8px;
  overflow: hidden;
}

.work-cover a {
  display: block;
}

.work-cover a:hover {
  opacity: 0.9;
}

.work-name {
  font-family: var(--font-display);
  font-size: 1.5rem;
  font-weight: 500;
  color: var(--color-text);
  margin-bottom: 10px;
}

.work-name a,
.work-name .work-ext {
  color: var(--color-text);
}

.work-name a:hover {
  color: var(--color-accent);
}

.work-name .work-ext {
  font-size: 0.85em;
}

.work-desc {
  color: var(--color-text-soft);
  margin-bottom: 18px;
}

.work-link {
  margin-top: 18px;
}

.work-tech {
  list-style: none;
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 0;
  margin: 0;
}

.tech-chip {
  display: inline-flex;
  align-items: center;
  gap: 6px;
  padding: 5px 10px;
  border: 1px solid var(--color-border);
  border-radius: 30px;
  background: var(--color-bg);
}

.tech-name {
  font-size: 0.72rem;
  color: var(--color-text-soft);
}

/* ---- Responsive ---- */
@media (max-width: 900px) {
  .about-grid {
    grid-template-columns: 1fr;
  }

  .exp-row {
    grid-template-columns: 1fr;
    gap: 12px;
  }

  .skills-grid {
    grid-template-columns: 1fr;
  }

  .work-card {
    grid-template-columns: 1fr;
  }

  .section {
    padding: 80px 0;
  }
}
</style>
