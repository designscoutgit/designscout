<script setup>
import CookieModal from './components/CookieModal.vue';
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories/config", {
  version: "draft",
  resolve_links: "url",
});

console.log(data.story.content.site_title);

useSeoMeta({
  title: data.story.content.site_title,
  ogTitle: data.story.content.site_title,
  description: data.story.content.site_description,
  ogDescription: data.story.content.site_description,
  ogImage: data.story.content.featured_image.filename,
  twitterCard: "summary_large_image",
});

const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  { version: useRoute().query._storyblok ? "draft" : "published" }
);

async function setup() {
  return {
    story,
  };
}
</script>

<template>
  <div>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
  <!-- <CookieControl >
    < !-- <CookieModal  /> -- >
    <template #bar class="test">
      <h2 class="size-4 padd-bottom-15">Cookies Settings</h2>
      <p class="size-5 padding-bottom-0 cookie-desc">We use our own cookies and third-party cookies so that we can display this website correctly and better understand how
          this website used, with a view to improving the services we offer. A decision on cookie usage permissions can be
          changed anytime using the cookie button that will appear atter a selection has been made on this banner.
      </p>
    </template>
  </CookieControl> -->
</div>
</template>

<script>
export default {
  name: "App",
  data() {
    return {
      pageName: "",
    };
  },
  mounted() {

    // if (location.protocol !== "https:") {
    //   location.href =
    //     "https:" +
    //     window.location.href.substring(window.location.protocol.length);
    // }
    this.initGoogleAnalytics();
    this.updatePageNameClass();
    document.addEventListener("click", this.handleClickEvent);
  },
  beforeUnmount() {
    document.removeEventListener("click", this.handleClickEvent);
  },
  watch: {
    $route(to, from) {
      this.updatePageNameClass();

      if (window.dataLayer) {
        window.dataLayer.push({
          event: "page_view",
          page_path: to.fullPath,
        });
      }
    },
    
  },
  methods: {
    initGoogleAnalytics() {
      if (window.dataLayer) return; // Prevent re-initializing the tracking code

      const script = document.createElement("script");
      script.src = "https://www.googletagmanager.com/gtag/js?id=G-V76EM4BBH1";
      script.async = true;
      document.head.appendChild(script);

      script.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag() {
          window.dataLayer.push(arguments);
        }
        gtag("js", new Date());
        gtag("config", "G-V76EM4BBH1");
      };
    },
    handleClickEvent(event) {
      const target = event.target;
      const isButton = target.tagName.toLowerCase() === "button";
      const isLink = target.tagName.toLowerCase() === "a";

      if (isButton || isLink) {
        const category = isButton ? "button" : "link";
        const action = "click";
        const label =
          target.innerText ||
          target.getAttribute("title") ||
          target.getAttribute("aria-label");

        if (window.dataLayer) {
          window.dataLayer.push({
            event: "event",
            event_category: category,
            event_action: action,
            event_label: label,
          });
        }
      }
    },
    updatePageNameClass() {
      this.pageName = this.$route.name;
      let slug = this.$route.params.slug || ["home"]; // Update the slug data property
      let bodyClassArray = slug; // Create an array of class names

      // Remove all previous classes
      document.body.className = "";

      // Filter out any empty strings from the bodyClassArray
      bodyClassArray = bodyClassArray.filter(
        (className) => className.trim() !== ""
      );

      // Use the spread operator to pass class names and make sure the array is not empty
      if (bodyClassArray.length > 0) {
        document.body.classList.add(...bodyClassArray);
      }

      if (bodyClassArray.join(" ") === "camp-diary") {
        document.body.classList.add("camp-diary-gallery");
      } else {
        document.body.classList.remove("dark");
      }
    },
  },
};
</script>

<style>
.layout-enter-active,
.layout-leave-active {
  transition: all 0.4s;
}
.layout-enter-from,
.layout-leave-to {
  filter: grayscale(1);
}
</style>
