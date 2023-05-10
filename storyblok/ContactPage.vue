<script setup>
const props = defineProps({ blok: Object });

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "published",
  is_startpage: true,
  starts_with: "contact",
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
  process.env.SUPABASE_URL,
  process.env.SUPABASE_KEY
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