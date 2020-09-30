<template>
  <div>
    <header class="intro appear">
      <div style="display: flex; flex-wrap: wrap; margin: 0 auto;">
        <div class="profile-photo">
          <img src="profile-photo.jpg" alt="Jonathan Prasetya Wijaya" class="circle" height="150" width="150">
        </div>
        <div style="max-width: 700px;">
          <h1 class="title">
            Hi! I am Jonathan, a web developer.
          </h1>
          <h2 class="subtitle">
            I am currently focusing on front end development. Experienced building web applications using Vue. Interested in developing web apps that are good looking, easy to use, and have high performance.
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
          I have been <b>building web applications</b> for almost 2 years. Since I graduated from the <b>Universitas Indonesia</b> as a computer science bachelor in 2019, I have explored more about web development through the development of <a href="https://www.blinkgoo.com" style="font-weight: 700;" target="_blank" rel="noopener noreferrer">blinkgoo.com</a> site. I love developing web apps that are responsive and can run on mobile devices because users can use them with any device they want, anywhere and anytime. I feel satisfied when I provide a good experience to users through the app I have developed.
        </p>
      </div>
    </section>
    <section class="section appear">
      <h2 class="section-title">
        Skills
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
          <div>
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
          items: ['Javascript', 'HTML', 'CSS', 'Go', 'Java', 'MySQL']
        },
        {
          label: 'Frameworks',
          items: ['Vue.js', 'Nuxt.js', 'Vuetify', 'Echo (Go)']
        },
        {
          label: 'Tools',
          items: ['Git', 'Google Lighthouse', 'Chrome DevTools', 'Postman', 'Android Studio']
        }
      ],
      experiences: [
        {
          company: 'Blinkgoo',
          type: 'Full time',
          time: 'Jan 2019 - Sep 2020',
          position: 'Web Developer',
          desc: 'A website that helps users to search and compare products, get the best promos and discounts for products from various leading e-commerce or marketplaces. I developed the blinkgoo website from scratch, initially developing full stack then focused more on front end development. I led the front end team in implementing the design of the UI / UX team and developing the website for desktop and mobile web versions. I was responsible for website performance in terms of load speed, responsiveness and accuracy of design implementation.'
        },
        {
          company: 'PT Astra Graphia Information Technology (AGIT)',
          type: 'Intern',
          time: 'Jun 2018 - Aug 2018',
          position: 'Software Engineer - Full Stack',
          desc: 'I was assigned to the team that developed MyMovo, a B2B web platform for logistics service providers to manage express delivery. I developed delivery dipatcher feature which includes courier assignment page, vendor assignment page, and delivery manifest creation page. The development process started from creating a document about the feature requirements, creating a mockup, developing the front end, then the back end.'
        },
        {
          company: 'Sikomo',
          type: 'Intern',
          time: 'Jun 2017 - Aug 2017',
          position: 'Software Engineer - Web and Android',
          desc: 'A Jakarta-Bandung shuttle bus booking application. My job as an intern at Sikomo began with developing the front end of the production web dashboard, then moving on to developing the Android app until the end. Here I learned more about javascript framework and connecting the user interface with back end services.'
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
