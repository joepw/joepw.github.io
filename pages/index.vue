<template>
  <div>
    <header class="intro appear">
      <div style="display: flex; flex-wrap: wrap; margin: 0 auto;">
        <div class="profile-photo">
          <img src="profile-photo.jpg" alt="Jonathan Prasetya Wijaya" class="circle" height="150" width="150">
        </div>
        <div style="max-width: 740px;">
          <h1 class="title">
            Hi! I'm Jonathan, a Front-End Web Developer.
          </h1>
          <h2 class="subtitle">
            I focus on creating high-quality, user-friendly websites that perform seamlessly. With commitment to excellence, I transform ideas into engaging digital experiences. Let's create something amazing together!
          </h2>
          <div style="padding: 16px 0;">
            <a
              v-for="(link, id) in links"
              :key="id"
              :href="link.url"
              target="_blank"
              rel="noopener noreferrer"
            >
              <img :src="link.image" :alt="link.imageAlt" height="30" width="30" class="link-images">
            </a>
          </div>
        </div>
      </div>
      <div class="button" @click="goToAbout">
        About Me
        <img src="arrow-down.svg" alt="About Me" style="margin-left: 4px;">
      </div>
    </header>
    <section class="section about appear">
      <h2 class="section-title">
        About Me
      </h2>
      <div class="section-content">
        <p style="margin-bottom: 20px; font-size: 18px;">
          I am Jonathan, a web developer from Jakarta, Indonesia, with a degree in Computer Science from Universitas Indonesia. My fascination with web technology stems from its versatility in serving both desktop and mobile environments. I take pride in creating user interfaces that are not only visually appealing but also highly functional and helpful for users.
        </p>
        <p style="font-size: 18px;">
          With over 5 years of experience in the web development industry, I have had the opportunity to work on several innovative projects, collaborating with talented professionals along the way. These projects have ranged from developing intuitive user interfaces to enhancing user experiences based on feedback and best practices.
        </p>
      </div>
    </section>
    <section class="section appear">
      <h2 class="section-title">
        Skillsets
      </h2>
      <div class="section-content">
        <div style="display: flex; justify-content: space-around; flex-wrap: wrap">
          <div v-for="(skill, i) in skills" :key="i" style="padding: 0 10px;">
            <div style="font-weight: 700; text-transform: uppercase;">
              {{ skill.label }}
            </div>
            <div v-for="(item, j) in skill.items" :key="j" style="margin: 3px 0; font-size: .9rem;">
              {{ item }}
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="section appear">
      <h2 class="section-title">
        Experience
      </h2>
      <div class="section-content">
        <div v-for="(experience, i) in experiences" :key="i" style="margin-bottom: 24px;">
          <div style="font-weight: 700;">
            {{ experience.company }}
          </div>
          <div>
            {{ experience.time + " • " + experience.type }}
          </div>
          <div>
            {{ experience.position }}
          </div>
          <div style="margin-top: 10px;">
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
        <div v-for="(pf, i) in portfolios" :key="i" style="margin-bottom: 60px;">
          <div style="font-weight: 700; margin-bottom: 10px;">
            <a v-if="pf.href" :href="pf.href" target="_blank" rel="noopener noreferrer">
              {{ pf.fullName }}
            </a>
            <span v-else>{{ pf.fullName }}</span>
          </div>
          <div style="margin-bottom: 10px;">
            {{ pf.description }}
          </div>
          <div v-for="(tech, j) in pf.tech" :key="j" class="tooltip" style="display: inline-block; margin-right: 8px;">
            <img :src="tech.imgSrc" :alt="tech.name" height="30" width="30">
            <span class="tooltip-text">{{ tech.name }}</span>
          </div>
          <div v-if="pf.cover">
            <img :src="pf.cover" :alt="pf.fullName" width="100%" style="margin: 10px 0;">
            <div style="text-align: center; font-weight: 700; display: flex;">
              <nuxt-link :to="pf.url" style="margin: 0 auto; color: white;">
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

<script>
import { portfolios } from '~/data.js'

export default {
  data () {
    return {
      links: [
        {
          text: 'linkedin.com/in/jonathanpwijaya',
          image: 'linkedin.svg',
          imageAlt: 'linkedin.com/in/jonathanpwijaya',
          url: 'https://www.linkedin.com/in/jonathanpwijaya/'
        },
        {
          text: 'jonathanpwijaya@gmail.com',
          image: 'email.svg',
          imageAlt: 'jonathanpwijaya@gmail.com',
          url: 'mailto:jonathanpwijaya@gmail.com'
        }
      ],
      skills: [
        {
          label: 'Languages',
          items: ['HTML', 'CSS', 'Javascript', 'Typescript', 'GraphQL', 'NRQL']
        },
        {
          label: 'Frameworks/Libraries',
          items: ['React', 'Emotion', 'Jest', 'Playwright', 'Vue', 'Nuxt', 'Ant Design', 'Storybook', 'Koa', 'Fastify']
        },
        {
          label: 'Tools',
          items: ['Git/Github', 'Chrome DevTools', 'Figma', 'Jira', 'Slack', 'Trello', 'Confluence', 'New Relic', 'GSuite', 'Consul', 'Jenkins']
        }
      ],
      experiences: [
        {
          company: 'Tokopedia',
          type: 'Full time',
          time: 'Jan 2021 - Jun 2024',
          position: 'Software Engineer - Web Platform',
          desc: 'contributed to the development of the TopAds dashboard, an advertising tool for sellers to manage and optimize their ad campaigns. I implemented features and functionality to enhance the dashboard\'s capabilities and developed features for ads placement within the Tokopedia marketplace, ensuring seamless integration and improving ad visibility and performance. Collaborated with cross-functional teams to deliver efficient and reliable solutions.'
        },
        {
          company: 'Blinkgoo',
          type: 'Full time',
          time: 'Jan 2019 - Sep 2020',
          position: 'Web Developer',
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
          position: 'Software Engineer - Web and Android',
          desc: 'Began my internship by developing the front-end of the production web dashboard, later transitioning to developing the Android app. Gained in-depth experience with JavaScript frameworks and learned to seamlessly connect user interfaces with back-end services.'
        }
      ],
      portfolios
    }
  },
  methods: {
    goToAbout () {
      const el = this.$el.getElementsByClassName('about')[0]
      if (el) {
        el.scrollIntoView({ behavior: 'smooth' })
      }
    }
  }
}
</script>

<style scoped>
.intro {
  padding: 120px 100px;
  height: 100vh;
  margin: 0 auto;
  display: flex;
  align-items: center;
  flex-direction: column;
  justify-content: center;
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

  /* Position the tooltip */
  position: absolute;
  top: 30px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1;
}

.tooltip:hover .tooltip-text {
  visibility: visible;
}
</style>
