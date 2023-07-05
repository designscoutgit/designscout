<script setup>
const props = defineProps({ blok: Object });

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "published",
  is_startpage: true,
  starts_with: "contact",
});

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
  <div class="contact-page compact-width">
    <div
      v-for="blok in data.stories"
      :key="blok.id"
      v-editable="blok"
    >
      <h2>{{ blok.content.title }}</h2>
    </div>

    <form
      name="contact_page_contact_form"
      id="contact_page_form"
      @submit.prevent="submitForm"
    >
      <input
        type="hidden"
        name="form-name"
        value="contact_page_contact_form"
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
      <div class="spacer x-small"></div>
      <div class="textarea-container flex-checks">
        <h3>REQUESTED SERVICES* <span class="subtext italic">(check all that apply)</span></h3>
        <label for="new_brand">
          <input
            type="checkbox"
            id="new_brand"
            value="New Brand"
            v-model="challenges"
            :class="{ checked: challenges.includes('New Brand') }"
          >
          New Brand</label>

        <label for="brand_evolution">
          <input
            type="checkbox"
            id="brand_evolution"
            value="Brand Evolution"
            v-model="challenges"
            :class="{ checked: challenges.includes('Brand Evolution') }"
          >
          Brand Evolution</label>

        <label for="website_design">
          <input
            type="checkbox"
            id="website_design"
            value="Website Design"
            v-model="challenges"
            :class="{ checked: challenges.includes('Website Design') }"
          >
          Website Design</label>

        <label for="packaging_design">
          <input
            type="checkbox"
            id="packaging_design"
            value="Packaging Design"
            v-model="challenges"
            :class="{ checked: challenges.includes('Packaging Design') }"
          >
          Packaging Design</label>

        <label for="restaurant_design">
          <input
            type="checkbox"
            id="restaurant_design"
            value="Restaurant Design"
            v-model="challenges"
            :class="{ checked: challenges.includes('Restaurant Design') }"
          >
          Restaurant Design</label>

        <label for="other">
          <input
            type="checkbox"
            id="other"
            value="Other"
            v-model="challenges"
            :class="{ checked: challenges.includes('Other') }"
          >
          Other</label>
      </div>
      <div class="wide-container">
        <FormSelect
          :options="budgetOptions"
          v-model="budget"
          inputName="budget"
        />
        <!-- <label for="budget">What's your budget?*</label> -->
        <select
          id="budget"
          class="hidden"
          v-model="budget"
          name="budget"
        >
          <option value="">What's your budget?*</option>
          <option value="$25,000–$35,000">$25,000–$35,000</option>
          <option value="$35,001–$50,000">$35,001–$50,000</option>
          <option value="$50,001–$100,000">$50,001–$100,000</option>
          <option value="$100,001–$300,000">$100,001–$300,000</option>
        </select>
      </div>
      <div class="wide-container">
        <FormSelect
          :options="goalOptions"
          v-model="goal"
          inputName="goal"
        />
        <!-- <label for="goal">Launch goal?*</label> -->
        <select
          id="goal"
          class="hidden"
          v-model="goal"
          name="goal"
        >
          <option value="">Launch goal*</option>
          <option value="6 weeks">6 weeks</option>
          <option value="8 weeks">8 weeks</option>
          <option value="10 weeks">10 weeks</option>
          <option value="12 weeks">12 weeks</option>
          <option value="Beyond">Beyond</option>
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
      <div class="textarea-container">
        <!-- <label for="how">HOW DID YOU HEAR ABOUT US?</label> -->
        <input
          type="text"
          id="how"
          v-model="how"
          placeholder="HOW DID YOU HEAR ABOUT US?"
          name="how"
        >
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

    <div
      v-for="blok in data.stories"
      :key="blok.id"
      v-editable="blok"
      class="bottom-contact-info row"
    >
      <div class="contact-info-left left-col col">
        <div class="spacer"></div>
        <h3>Our studio</h3>
        <div class="spacer x-small"></div>
        <h6>{{ blok.content.address }} <a
            class="dark outgoing-link"
            :href="blok.content.google_maps_link.url"
            target="_blank"
          >MAP</a>
        </h6>

        <div class="spacer medium"></div>

        <h3>Give us a ring</h3>
        <div class="spacer x-small"></div>
        <div class="phone-link">
          <h6><a
              class="dark"
              :href="'tel:' + blok.content.phone_number"
            >{{ blok.content.phone_number }}</a></h6>
        </div>

        <div class="spacer medium"></div>

        <h3>Follow us on</h3>
        <div class="spacer x-small"></div>
        <div class="socials">
          <a
            href="https://www.instagram.com/designscout/"
            target="_blank"
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
            INSTAGRAM</a>
          <a
            href="https://www.linkedin.com/company/designscout-ltd/"
            target="_blank"
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
            LINKEDIN</a>
        </div>
      </div>

      <div class="featured-image contact-info-right right-col col">
        <div class="spacer"></div>
        <img
          :src="blok.content.featured_image.filename"
          :alt="blok.content.featured_image.alt"
          :title="blok.content.featured_image.title"
        >
        <img
          class="sticker"
          :src="blok.content.featured_image_sticker.filename"
          :alt="blok.content.featured_image_sticker.alt"
          :title="blok.content.featured_image_sticker.title"
        >
      </div>
    </div>
  </div>

</template>

<script>
import FormSelect from "~/components/FormSelect.vue";
import { createClient } from "@supabase/supabase-js";

const router = useRouter();

const supabase = createClient(
  "https://xnpxxlvywrcjtuqsjnun.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InhucHh4bHZ5d3JjanR1cXNqbnVuIiwicm9sZSI6ImFub24iLCJpYXQiOjE2ODMxMzIyNDcsImV4cCI6MTk5ODcwODI0N30.Y47OxVsjGtEhufJbma0rjRUDuJgo9FeOouNemhtSRV4"
);

export default {
  components: {
    FormSelect,
  },
  data() {
    return {
      email: "",
      first_name: "",
      last_name: "",
      pronouns: "",
      phone: "",
      message: "",
      organization: "",
      how: "",
      challenges: [], // Change to an empty array to store multiple selected values
      budget: "",
      goal: "",
      submitted: false,
      challengeOptions: [
        { label: "New Brand", value: "New Brand" },
        { label: "Brand Evolution", value: "Brand Evolution" },
        { label: "Website Design", value: "Website Design" },
        { label: "Packaging Design", value: "Packaging Design" },
        { label: "Restaurant Design", value: "Restaurant Design" },
        { label: "Other", value: "Other" },
      ],
      budgetOptions: [
        { label: "WHAT'S YOUR BUDGET?*", value: "" },
        { label: "$25,000–$35,000", value: "$25,000–$35,000" },
        { label: "$35,001–$50,000", value: "$35,001–$50,000" },
        { label: "$50,001–$100,000", value: "$50,001–$100,000" },
        { label: "$100,001–$300,000", value: "$100,001–$300,000" },
      ],
      goalOptions: [
        { label: "LAUNCH GOAL*", value: "" },
        { label: "6 weeks", value: "6 weeks" },
        { label: "8 weeks", value: "8 weeks" },
        { label: "10 weeks", value: "10 weeks" },
        { label: "12 weeks", value: "12 weeks" },
        { label: "Beyond", value: "Beyond" },
      ],
    };
  },

  methods: {
    async submitForm() {
      console.log("Submitting...");
      if (!this.email) {
        return;
      }

      try {
        const { data, error } = await supabase
          .from("contact_page_form")
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
              budget: this.budget,
              goal: this.goal,
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
  },
};
</script>