<template>
  <div class="home">
    <header class="intro appear">
      <div class="intro-inner">
        <div class="profile-photo">
          <img
            src="/profile-photo.jpg"
            alt="Jonathan Prasetya Wijaya"
            class="circle"
            height="150"
            width="150"
          >
        </div>
        <div>
          <h1 class="title">
            Hi! I'm Jonathan, a Front-End Engineer.
          </h1>
          <h2 class="subtitle">
            I focus on building high-quality, user-centric websites that combine performance, aesthetics, and usability.
            I turn ideas into products people love to use—let's build something great together!
          </h2>
          <div class="link-row">
            <a
              v-for="link in links"
              :key="link.text"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img
                :src="link.image"
                :alt="link.imageAlt"
                height="30"
                width="30"
                class="link-images"
              >
            </a>
          </div>
        </div>
      </div>
      <div class="button" @click="goToAbout">
        About Me
        <img
          src="/arrow-down.svg"
          alt="About Me"
          class="button-icon"
        >
      </div>
    </header>

    <section
      ref="aboutSection"
      class="section about appear"
    >
      <h2 class="section-title">
        About Me
      </h2>
      <div class="section-content">
        <p class="about-paragraph">
          I'm Jonathan, a Front-End Engineer based in Jakarta, Indonesia, with a degree in Computer Science from Universitas Indonesia.
          I'm passionate about web technology, particularly its ability to deliver seamless experiences across both desktop and mobile platforms.
          I enjoy crafting user interfaces that are not only visually engaging but also intuitive, functional, and genuinely useful.
        </p>
        <p class="about-paragraph">
          With over five years of experience in web development, I've contributed to a variety of innovative projects and collaborated with diverse, talented teams.
          My work spans building intuitive interfaces, improving user experiences through feedback-driven iterations, and applying modern best practices to create efficient and scalable solutions.
        </p>
      </div>
    </section>

    <section class="section appear">
      <h2 class="section-title">
        Skillsets
      </h2>
      <div class="section-content">
        <div class="skillsets">
          <div
            v-for="(skill, i) in skills"
            :key="i"
            class="skills"
          >
            <div class="skill-label">
              {{ skill.label }}
            </div>
            <span
              v-for="(item, j) in skill.items"
              :key="j"
              class="skill-item"
            >
              {{ item }}<span v-if="j < skill.items.length - 1"> •</span>
            </span>
          </div>
        </div>
      </div>
    </section>

    <section class="section appear">
      <h2 class="section-title">
        Experience
      </h2>
      <div class="section-content">
        <div
          v-for="(experience, i) in experiences"
          :key="i"
          class="experience-block"
        >
          <div class="experience-company">
            {{ experience.company }}
          </div>
          <div>
            {{ experience.time }} • {{ experience.type }}
          </div>
          <div>
            {{ experience.position }}
          </div>
          <div class="experience-desc">
            {{ experience.desc }}
          </div>
        </div>
      </div>
    </section>

    <section class="section appear">
      <h2 class="section-title">
        Portfolio
      </h2>
      <div class="section-content">
        <div
          v-for="(pf, i) in portfolios"
          :key="i"
          class="portfolio-block"
        >
          <div class="portfolio-name">
            <a
              v-if="pf.href"
              :href="pf.href"
              target="_blank"
              rel="noopener noreferrer"
            >
              {{ pf.fullName }}
            </a>
            <span v-else>{{ pf.fullName }}</span>
          </div>
          <div class="portfolio-desc">
            {{ pf.description }}
          </div>
          <div
            v-for="(tech, j) in pf.tech"
            :key="j"
            class="tooltip tech-item"
          >
            <img
              :src="tech.imgSrc"
              :alt="tech.name"
              height="30"
              width="30"
            >
            <span class="tooltip-text">{{ tech.name }}</span>
          </div>
          <div v-if="pf.cover">
            <ImageWithPlaceholder
              :src="pf.cover"
              :alt="pf.fullName"
              :dimension="pf.coverDimension"
              class="portfolio-cover"
            />
            <div class="portfolio-actions">
              <nuxt-link
                :to="pf.url"
                class="portfolio-link"
              >
                <div class="button">
                  See More
                </div>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import { portfolios } from '~/data/portfolios'

useHead({
  title: 'Jonathan Prasetya | Front-End Engineer',
  meta: [
    {
      name: 'description',
      content: 'Personal Website and Portfolios of Jonathan Prasetya Wijaya'
    }
  ]
})

const links = [
  {
    text: 'linkedin.com/in/jonathanpwijaya',
    image: '/linkedin.svg',
    imageAlt: 'linkedin.com/in/jonathanpwijaya',
    url: 'https://www.linkedin.com/in/jonathanpwijaya/'
  },
  {
    text: 'jonathanpwijaya@gmail.com',
    image: '/email.svg',
    imageAlt: 'jonathanpwijaya@gmail.com',
    url: 'mailto:jonathanpwijaya@gmail.com'
  }
]

const skills = [
  {
    label: 'Languages',
    items: ['HTML', 'CSS', 'Javascript', 'Typescript', 'GraphQL', 'NRQL']
  },
  {
    label: 'Frameworks/Libraries',
    items: ['React', 'Emotion', 'Jest', 'Playwright', 'Vue', 'Nuxt', 'Ant Design', 'Storybook', 'Koa', 'Fastify', 'NestJS', 'Radix UI']
  },
  {
    label: 'Tools',
    items: ['Git/Github', 'Chrome DevTools', 'Figma', 'Jira', 'Slack', 'Trello', 'Confluence', 'New Relic', 'GSuite', 'Consul', 'Jenkins', 'Supabase']
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
    desc: "contributed to the development of the TopAds dashboard, an advertising tool for sellers to manage and optimize their ad campaigns. I implemented features and functionality to enhance the dashboard's capabilities and developed features for ads placement within the Tokopedia marketplace, ensuring seamless integration and improving ad visibility and performance. Collaborated with cross-functional teams to deliver efficient and reliable solutions."
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

const aboutSection = ref<HTMLElement | null>(null)

function goToAbout () {
  if (aboutSection.value) {
    aboutSection.value.scrollIntoView({ behavior: 'smooth' })
  }
}
</script>

<style scoped>
.intro {
  padding: 120px 100px;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
}

.intro-inner {
  display: flex;
  flex-wrap: wrap;
  margin: 0 auto;
  max-width: 900px;
}

@media (max-width: 960px) {
  .intro {
    padding: 120px 40px;
  }
}

.profile-photo {
  margin-right: 100px;
}

@media (max-width: 600px) {
  .profile-photo {
    margin-right: 0;
    width: 100%;
    text-align: center;
  }
}

.link-row {
  padding: 16px 0;
}

.button-icon {
  margin-left: 4px;
}

.section-title {
  color: #a9a9a9;
  text-transform: uppercase;
  text-align: center;
  font-size: 16px;
  letter-spacing: 2px;
  margin-bottom: 70px;
}

.section-content {
  font-weight: 300;
  max-width: 700px;
  width: 100%;
  margin: 0 auto;
  color: #cccccc;
}

.link-images {
  opacity: 0.6;
}

.link-images:hover {
  opacity: 1;
}

.circle {
  border-radius: 50%;
}

.tooltip {
  position: relative;
}

.tooltip .tooltip-text {
  visibility: hidden;
  background-color: black;
  text-align: center;
  border-radius: 6px;
  padding: 5px;
  font-weight: normal;
  white-space: nowrap;
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 3;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}

.about-paragraph {
  margin-bottom: 20px;
  font-size: 18px;
}

.skillsets {
  display: flex;
  justify-content: space-around;
  flex-wrap: wrap;
  gap: 8px;
}

@media (min-width: 961px) {
  .skillsets {
    min-width: 618px;
  }
}

@media (max-width: 720px) {
  .skillsets {
    flex-direction: column;
    align-items: center;
  }
}

.skills {
  border: 1px solid #fff;
  border-radius: 6px;
  width: 200px;
  padding: 10px;
}

.skill-label {
  font-weight: 700;
  text-transform: uppercase;
  font-size: 0.9rem;
}

.skill-item {
  font-size: 0.9rem;
}

.experience-block {
  margin-bottom: 24px;
}

.experience-company {
  font-weight: 700;
}

.experience-desc {
  margin-top: 10px;
}

.portfolio-block {
  margin-bottom: 60px;
}

.portfolio-name {
  font-weight: 700;
  margin-bottom: 10px;
}

.portfolio-desc {
  margin-bottom: 10px;
}

.tech-item {
  display: inline-block;
  margin-right: 8px;
}

.portfolio-cover {
  margin: 10px 0;
}

.portfolio-actions {
  text-align: center;
  font-weight: 700;
  display: flex;
}

.portfolio-link {
  margin: 0 auto;
  color: white;
}
</style>