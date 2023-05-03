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
          <div>
            <h3 class="faq-item-title">{{ item.subtitle }}</h3>
            <!-- <h3 class="faq-item-title">{{ item.title }}</h3> -->
          </div>
          <svg
            width="29"
            height="29"
            viewBox="0 0 29 29"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <line
              class="horizontal"
              x1="-8.74228e-08"
              y1="14"
              x2="29"
              y2="14"
              stroke="#B6B3A4"
              stroke-width="2"
            />
            <line
              class="vertical"
              x1="14.5"
              y1="29"
              x2="14.5"
              stroke="#B6B3A4"
              stroke-width="2"
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
          subtitle: "We Offer Unique Insights",
          title: "OUR WORK DRIVES REVENUE.",
          text: "It’s not just about what looks good. Our designs are timeless because they’re intentional – rooted in distinct business objectives. They are effective because they connect your consumers to your authentic story, driving sales.",
        },
        {
          subtitle: "We Are Team Players",
          title: "WE'RE A PLEASURE TO WORK WITH.",
          text: "You have myriad partners and professionals involved in the process – perhaps even other branding experts who are on board. While we believe in the power of our recommendations, we easily respect the talents of others and strive to weave all the good ideas into the final result.",
        },
        {
          subtitle: "We Are Always, Always Thinking",
          title: "WE ARE BRILLIANT PARTNERS.",
          text: "At DesignScout, we focus on more than just meeting deadlines and adhering to budgets. We are thoughtful, attuned, savvy professionals who maintain an always-evolving expertise for our industry and yours. We give valuable advice that our clients can count on.",
        },
        {
          subtitle: "Women Helping Women",
          title: "WE UPLIFT ENTREPRENEURS.",
          text: "As a woman-owned and 100% woman-operated business, we work relentlessly with our clients to smash the status quo, helping more women launch, scale, and exit businesses. We are proudly WBENC certified, members of NAWBO, The Female Founder Collective, 10th House, and volunteer with Women Employed, a Chicago-based non-profit that has been dedicated to improving women’s economic status and pursuing equity in the workplace for all.",
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
