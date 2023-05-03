<template>
  <div class="faq-accordion-container">
    <div class="faq-accordion">
      <div
        v-for="(item, index) in items"
        :key="index"
        class="faq-item"
      >
        <div
          class="faq-item-header"
          :class="{ 'faq-item-header-active': activeIndex === index }"
          @click="toggleActive(index)"
        >
          <h3 class="faq-item-title">{{ item.title }}</h3>
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              x1="-8.74228e-08"
              y1="14"
              x2="29"
              y2="14"
              stroke="#B6B3A4"
              stroke-width="2"
              class="horizontal"
            />
            <line
              x1="14.5"
              y1="29"
              x2="14.5"
              stroke="#B6B3A4"
              stroke-width="2"
              class="vertical"
            />
          </svg>

        </div>
        <div
          :class="{ active: activeIndex === index }"
          class="faq-item-content"
        >
          <p
            class="faq-item-text"
            v-html="item.text"
          ></p>

        </div>
      </div>
    </div>
  </div>
</template>
  
  <script>
export default {
  data() {
    return {
      activeIndex: null,
      items: [
        {
          title: "ARE YOU HIRING SOON?",
          text: "We are a small studio with very little turnover thanks to our intense rest ethic and overall focus on wellbeing. We do not anticipate that we will be hiring soon. Follow us on <a href='https://www.instagram.com/designscout/' target='_blank'>Instagram</a> or <a href='https://www.linkedin.com/company/2560494/' target='_blank'>LinkedIn</a> for updates.",
        },
        {
          title: "DO YOU HAVE INTERNSHIPS?",
          text: "Short answer: Not at this time. Long answer: Interns deserve to be taken seriously and provided with valuable enrichment. We aren’t a “get us coffee” kinda studio. That said, the time it takes to provide a high-quality internship is a little beyond our bandwidth as a small studio at this time. For any upcoming opportunities, please follow our Instagram and LinkedIn, or subscribe to our newsletter.",
        },
        {
          title: "WHAT OTHER STUDIOS SHOULD I BE LOOKING AT FOR POSITIONS?",
          text: "There are countless amazing studios in Chicago specifically. We recommend following these local agencies: <a href='https://www.firebellydesign.com/' target='_blank'>Firebelly</a>, <a href='https://soulsight.com/' target='_blank'>Soulsight</a>, and <a href='https://www.pivotdesign.com/' target='_blank'>Pivot</a>.",
        },
        {
          title: "HOW DO I GET HIRED?",
          text: "As we are not currently hiring, we ask that you do not send your portfolio. We do offer occasional portfolio reviews and invite you to sign up for our newsletter to receive notice of upcoming dates.",
        },
      ],
    };
  },
  methods: {
    toggleActive(index) {
      if (this.activeIndex === index) {
        this.activeIndex = null;
      } else {
        this.activeIndex = index;
      }
    },
  },
};
</script>
