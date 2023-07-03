<script setup>
const props = defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
  }
);

const categories = ref(null);
const authors = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  starts_with: "insights/",
  resolve_relations: "category,author",
});
categories.value = data.stories;
authors.value = data.stories;

const bodyCopyRichText = computed(() => renderRichText(props.blok.body_copy));

const defaultTitle =
  "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™";
const defaultDescription =
  "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.";
const defaultOgImage =
  "https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp";

const metaTitle =
  props.blok.metatags && props.blok.metatags.title
    ? props.blok.metatags.title
    : defaultTitle;
const metaDescription =
  props.blok.metatags && props.blok.metatags.description
    ? props.blok.metatags.description
    : defaultDescription;
const ogImage =
  props.blok.metatags && props.blok.metatags.og_image
    ? props.blok.metatags.og_image
    : defaultOgImage;

useSeoMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  image: ogImage,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
});

definePageMeta({
  title: metaTitle,
  ogTitle: metaTitle,
  description: metaDescription,
  ogDescription: metaDescription,
  image: ogImage,
  ogImage: ogImage,
  twitterCard: "summary_large_image",
});
</script>

<template>
  <div class="process-page">
    <h3 class="center">{{ blok.headline_copy }}</h3>
    <div
      class="center"
      v-html="bodyCopyRichText"
    ></div>

    <div class="process-callout-container">
      <div class="process-callout">
        <h2 class="size-2 center">{{ blok.callout_1_headline_copy }}</h2>
        <h3 class="center">{{ blok.callout_1_subheadline_copy }}</h3>
      </div>
      <div class="process-callout">
        <h2 class="size-2 center">{{ blok.callout_2_headline_copy }}</h2>
        <h3 class="center">{{ blok.callout_2_subheadline_copy }}</h3>
      </div>
    </div>

    <TabbedContent :tabList="tabList">
      <!-- BRANDING BUSINESS TAB -->
      <template v-slot:tabPanel-1>
        <div class="process-nav">
          <ul class="badge-anchor-container">
            <li
              v-for="(step, index) in blok.steps_business"
              :key="index"
              :class="{ 'active': index <= activeStep }"
            >
              <a
                :href="`#step-${index+1}`"
                class="smooth-scroll"
                @click="setActiveStep(index)"
              >
                <img
                  :src="step.step_icon.filename"
                  :alt="step.step_icon.alt"
                  :title="step.step_icon.title"
                >
                <h3>{{ index < 9 ? '0' + (index + 1) : (index + 1) }}</h3>
              </a>
            </li>
          </ul>
        </div>
        <div class="process-content">
          <!-- <pre>{{ blok.steps_business }}</pre> -->
          <section
            v-for="(step, index) in blok.steps_business"
            :key="index"
            :id="`step-${index+1}`"
            class="branding-step"
          >
            <div class="step-divider">
              <div>
                <img
                  :src="step.step_icon.filename"
                  :alt="step.step_icon.alt"
                  :title="step.step_icon.title"
                >
              </div>
              <div class="divider dark"></div>
            </div>

            <h3 class="large-only">{{ step.step_copy }}</h3>
            <div class="step-container">
              <div>
                <h3 class="small-only">{{ step.step_copy }}</h3>
                <h2 class="size-3">{{ step.step_title }}</h2>
              </div>
              <div>
                <p>
                  {{ step.step_body_copy }}
                </p>
                <h3 class="navy">{{ step.step_subheadline_copy }}</h3>
                <p>
                  {{ step.step_body_copy_2 }}
                </p>
              </div>
            </div>
          </section>
        </div>
      </template>
      <!-- BRANDING RESTAURANTS TAB -->
      <template v-slot:tabPanel-2>
        <div class="process-nav">
          <ul class="badge-anchor-container">
            <li
              v-for="(step, index) in blok.steps_restaurants"
              :key="index"
              :class="{ 'active': index <= activeStep }"
            >
              <a
                :href="`#step-${index+1}`"
                class="smooth-scroll"
                @click="setActiveStep(index)"
              >
                <img
                  :src="step.step_icon.filename"
                  :alt="step.step_icon.alt"
                  :title="step.step_icon.title"
                >
                <h3>{{ index < 9 ? '0' + (index + 1) : (index + 1) }}</h3>
              </a>
            </li>
          </ul>
        </div>
        <div class="process-content">
          <section
            v-for="(step, index) in blok.steps_restaurants"
            :key="index"
            :id="`#step-${index+1}`"
            class="branding-step"
          >
            <div class="step-divider">
              <div>
                <img
                  :src="step.step_icon.filename"
                  :alt="step.step_icon.alt"
                  :title="step.step_icon.title"
                >
              </div>
              <div class="divider dark"></div>
            </div>

            <h3 class="large-only">{{ step.step_copy }}</h3>
            <div class="step-container">
              <div>
                <h3 class="small-only">{{ step.step_copy }}</h3>
                <h2 class="size-3">{{ step.step_title }}</h2>
              </div>
              <div>
                <p>
                  {{ step.step_body_copy }}
                </p>
                <h3 class="navy">{{ step.step_subheadline_copy }}</h3>
                <p>
                  {{ step.step_body_copy_2 }}
                </p>
              </div>
            </div>
          </section>
        </div>
      </template>
    </TabbedContent>

    <div class="contact-form-container compact-width">
      <h2 class="size-2 center">{{ blok.contact_form_headline_copy }}</h2>
      <div class="spacer small"></div>
      <form
        name="process_page_contact_form"
        id="process_page_form"
        @submit.prevent="submitForm"
      >
        <input
          type="hidden"
          name="form-name"
          value="process_page_contact_form"
        />
        <p
          hidden
          class="hidden"
        >
          <label>Don’t fill this out: <input name="bot-field" /></label>
        </p>
        <div>
          <!-- <label for="first-name">First Name</label> -->
          <input
            type="text"
            id="first-name"
            placeholder="FIRST NAME*"
            v-model="firstName"
            name="first_name"
            required
          >
        </div>
        <div>
          <!-- <label for="last-name">Last Name</label> -->
          <input
            type="text"
            id="last-name"
            placeholder="LAST NAME*"
            v-model="lastName"
            name="last_name"
            required
          >
        </div>
        <div>
          <!-- <label for="pronouns">Pronouns</label> -->
          <input
            type="text"
            id="pronouns"
            placeholder="PRONOUNS"
            v-model="pronouns"
            name="pronouns"
          >
        </div>
        <div>
          <!-- <label for="email">EMAIL*</label> -->
          <input
            type="email"
            id="email"
            v-model="email"
            placeholder="EMAIL*"
            name="email"
            required
          >
        </div>
        <div>
          <!-- <label for="phone">PHONE*</label> -->
          <input
            type="tel"
            id="phone"
            placeholder="PHONE*"
            v-model="phone"
            name="phone"
            required
          >
        </div>
        <div>
          <!-- <label for="organization">Organization</label> -->
          <input
            type="text"
            placeholder="ORGANIZATION"
            id="organization"
            v-model="organization"
            name="organization"
          >
        </div>
        <div class="wide-container">
          <!-- <label for="how">HOW DID YOU HEAR ABOUT US?</label> -->
          <input
            type="text"
            id="how"
            v-model="how"
            placeholder="HOW DID YOU HEAR ABOUT US?"
            name="how"
          >
        </div>
        <div class="wide-container">
          <FormSelect
            :options="challengeOptions"
            v-model="challenges"
            inputName="challenges"
          />
          <!-- <label for="challenges">Challenges</label> -->
          <select
            id="challenges"
            class="hidden"
            v-model="challenges"
            name="challenges"
          >
            <option value="">Select a challenge</option>
            <option value="New Brand">New Brand</option>
            <option value="Brand Evolution">Brand Evolution</option>
            <option value="Website Design">Website Design</option>
            <option value="Packaging Design">Packaging Design</option>
            <option value="Restaurant Design">Restaurant Design</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <div class="textarea-container">
          <!-- <label for="message">How can we collaborate?</label> -->
          <textarea
            id="collaborate"
            placeholder="HOW CAN WE COLLABORATE?*"
            v-model="message"
            name="message"
            required
          ></textarea>
        </div>
        <div class="button-wrapper">
          <button
            class="dark"
            type="submit"
          ><svg
              width="11"
              height="11"
              viewBox="0 0 11 11"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M11 1C11 0.447715 10.5523 -3.74211e-07 10 4.72575e-08L1 -1.63477e-07C0.447715 -1.63477e-07 2.8711e-07 0.447715 2.8711e-07 1C2.8711e-07 1.55228 0.447715 2 1 2L9 2L9 10C9 10.5523 9.44772 11 10 11C10.5523 11 11 10.5523 11 10L11 1ZM1.70711 10.7071L10.7071 1.70711L9.29289 0.292893L0.292893 9.29289L1.70711 10.7071Z"
                fill="#303A3E"
              />
            </svg>
            SEND</button>
        </div>
      </form>
    </div>
  </div>

</template>

<script>
import FormSelect from "~/components/FormSelect.vue";
import TabbedContent from "~/components/TabbedContent.vue";
import { createClient } from "@supabase/supabase-js";

const router = useRouter();

const supabase = createClient(
  "https://xnpxxlvywrcjtuqsjnun.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucHh4bHZ5d3JjanR1cXNqbnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMzIyNDcsImV4cCI6MTk5ODcwODI0N30.Y47OxVsjGtEhufJbma0rjRUDuJgo9FeOouNemhtSRV4"
);

export default {
  name: "Process Page",

  components: {
    TabbedContent,
    FormSelect,
  },

  data() {
    return {
      tabList: ["BRANDING BUSINESS", "BRANDING RESTAURANTS"],
      activeStep: 0,
      email: "",
      first_name: "",
      last_name: "",
      pronouns: "",
      phone: "",
      message: "",
      organization: "",
      how: "",
      challenges: "",
      submitted: false,
      challengeOptions: [
        { label: "CHALLENGES", value: "" },
        { label: "New Brand", value: "New Brand" },
        { label: "Brand Evolution", value: "Brand Evolution" },
        { label: "Website Design", value: "Website Design" },
        { label: "Packaging Design", value: "Packaging Design" },
        { label: "Restaurant Design", value: "Restaurant Design" },
        { label: "Other", value: "Other" },
      ],
      observer: null,
    };
  },

  created() {
    this.observer = new IntersectionObserver(this.onElementObserved, {
      root: this.$el,
      threshold: 0.22,
    });
  },

  methods: {
    async submitForm() {
      console.log("Submitting...");
      if (!this.email) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from("process_page_form")
          .insert([
            {
              email: this.email,
              first_name: this.firstName,
              last_name: this.lastName,
              pronouns: this.pronouns,
              phone: this.phone,
              message: this.message,
              organization: this.organization,
              how: this.how,
              challenges: this.challenges,
            },
          ]);

        if (error) {
          console.error("Error submitting form.", error.message);
        } else {
          console.log("Successfully submitted form!");
          router.push("/contact/thanks");
          this.submitted = true;
        }
      } catch (error) {
        console.error("Error submitting form: ", error.message);
      }
    },
    setActiveStep(index) {
      this.activeStep = index;
    },

    onElementObserved(entries) {
      let lastActiveIndex = -1; // keep track of index of last active section
      entries.forEach(({ target, isIntersecting }) => {
        const id = target.getAttribute("id");
        const anchor = this.$el.querySelector(
          `.badge-anchor-container li a[href="#${id}"]`
        );
        if (isIntersecting) {
          const index = Array.from(
            this.$el.querySelectorAll("section[id]")
          ).indexOf(target);
          if (index > lastActiveIndex) {
            lastActiveIndex = index; // update last active index
          }
        }
      });

      const activeSection = this.$el.querySelector(
        `section[id]:nth-of-type(${lastActiveIndex + 1})`
      );
      if (activeSection) {
        activeSection.scrollIntoView({ behavior: "smooth" });
      }

      this.$el
        .querySelectorAll(".badge-anchor-container li")
        .forEach((li, index) => {
          if (index === lastActiveIndex) {
            li.classList.add("active");
          } else {
            li.classList.remove("active");
          }
        });
    },
  },

  beforeDestroy() {
    this.observer.disconnect();
  },

  mounted() {
    document.querySelectorAll("a.smooth-scroll").forEach((anchor) => {
      anchor.addEventListener("click", function (event) {
        event.preventDefault();

        const targetElement = document.querySelector(this.getAttribute("href"));
        const targetPosition = targetElement.offsetTop;
        const startPosition = window.pageYOffset;
        const distance = targetPosition - startPosition;
        const duration = 1000; // adjust as needed
        let start = null;

        function step(timestamp) {
          if (!start) start = timestamp;
          const progress = timestamp - start;
          window.scrollTo(
            0,
            easeInOutCubic(progress, startPosition, distance, duration)
          );
          if (progress < duration) window.requestAnimationFrame(step);
        }

        function easeInOutCubic(t, b, c, d) {
          t /= d / 2;
          if (t < 1) return (c / 2) * t * t * t + b;
          t -= 2;
          return (c / 2) * (t * t * t + 2) + b;
        }

        window.requestAnimationFrame(step);
      });
    });

    this.$el.querySelectorAll("section[id]").forEach((section) => {
      this.observer.observe(section);
    });

    const processNav = document.querySelector(".badge-anchor-container");
    let processNavOffset =
      processNav.getBoundingClientRect().top + window.scrollY;
    const handleScroll = () => {
      if (window.scrollY >= processNavOffset) {
        processNav.classList.add("snap");
      } else {
        processNav.classList.remove("snap");
      }
    };
    const handleResize = () => {
      processNavOffset =
        processNav.getBoundingClientRect().top + window.scrollY;
    };
    window.addEventListener("scroll", handleScroll);
    window.addEventListener("resize", handleResize);
  },
};
</script>