<script setup>
import HeroCarousel from "~/components/HeroCarousel.vue";

const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  { version: useRoute().query._storyblok ? "draft" : "published" }
);

definePageMeta({
  layout: "default",
});

const components = {
  HeroCarousel,
};

async function setup() {
  return {
    story,
  };
}

const props = defineProps({ blok: Object });

const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: useRoute().query._storyblok ? "draft" : "published",
  starts_with: "home",
});

const slide3Body = computed(() => renderRichText(props.blok.slide_3_body));
const founderSectionBody = computed(() =>
  renderRichText(props.blok.founder_body_copy)
);
const b2pBodyCopy = computed(() => renderRichText(props.blok.b2p_body_copy));

console.log("===>", props.blok.metatags)
const defaultTitle =
  "DesignScout | Chicago Branding Agency | Ego-Free Since 2003™";
const defaultDescription = "We build brave brands. DesignScout is a Chicago Branding Agency that builds bold identities for rule-bending hospitality and disruptor B2B brands.";
const defaultOgImage = "https://a.storyblok.com/f/200165/1500x821/cf2a979912/designscout-featured-image.webp";

const metaTitle = props.blok.metatags && props.blok.metatags.title ? props.blok.metatags.title : defaultTitle;
const ogMetaTitle = props?.blok?.metatags?.og_title || defaultTitle;
const metaDescription = props.blok.metatags && props.blok.metatags.description ? props.blok.metatags.description : defaultDescription;
const ogDescription = props?.blok?.metatags?.og_description || ""
const ogImage = props.blok.metatags && props.blok.metatags.og_image ? props.blok.metatags.og_image : defaultOgImage;
const twitterDescription = props?.blok?.metatags?.twitter_description || ""
const twitterImage = props?.blok?.metatags?.twitter_image || ""
const twitterTitle = props?.blok?.metatags?.twitter_title || ""

useSeoMeta({
  title: metaTitle,
  ogTitle: ogMetaTitle,
  description: metaDescription,
  ogDescription: ogDescription,
  image: ogImage,
  ogImage: ogImage,
  twitterDescription,
  twitterImage,
  twitterTitle,
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
  <div
    v-editable="blok"
    class="container"
  >
    <div class="hero-section">
      <div>
        <div class="hero-slides">
          <div class="slide-3 hero-section-content light">
            <div class="col hero-wrapper">
              <div class="spacer small"></div>
              <div class="col left">
                <h2
                  ref="wordizeSlide3"
                  class="wordize pad-left"
                >{{ blok.slide_3_headline }}</h2>
                <h3>{{ blok.slide_3_subheadline }}</h3>
                <div class="spacer small small-only"></div>
              </div>
              <div class="col right">
                <div v-html="slide3Body"></div>
                <!-- <p>DesignScout is a full-service branding and design studio in Chicago, IL. We make it easy for businesses like yours to launch, evolve, and scale.</p>
                <p>Captivate your audience with a distinctive brand from our creative studio. We'll get you where you need to go.</p> -->
                <nuxt-link
                  to="/about"
                  class="btn dark no-mar-btm margin-bottom-0"
                >
                  <svg
                    width="12"
                    height="13"
                    viewBox="0 0 12 13"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      d="M11.0534 2C11.0534 1.42366 10.626 0.956451 10.0989 0.956451L1.5087 0.956451C0.981566 0.956451 0.554237 1.42366 0.554237 2C0.554237 2.57634 0.981566 3.04355 1.5087 3.04355L9.14443 3.04355L9.14443 11.3919C9.14443 11.9683 9.57176 12.4355 10.0989 12.4355C10.626 12.4355 11.0534 11.9683 11.0534 11.3919L11.0534 2ZM2.5421 11.7379L10.7738 2.7379L9.42399 1.2621L1.19228 10.2621L2.5421 11.7379Z"
                      fill="#303A3E"
                    />
                  </svg>
                  ABOUT
                </nuxt-link>

              </div>
              <div class="spacer medium"></div>
            </div>
            <div class="divider dark"></div>
            <div class="spacer x-small"></div>
            <div class="divider dark"></div>
          </div>
          <div
            id="reel"
            class="slide-2 video-section hero-section-content dark"
            ref="videoSection"
          >
            <div class="video-overlay"></div>
            <video
              ref="reel"
              loading="lazy"
              controls
              muted
              loop
              autoplay
              playsinline
              poster="https://danny-petrilli.s3.us-east-2.amazonaws.com/designscout/DS_Sizzle_F6_subtitle_Poster.jpg"
            >
              <source
                :src="videoSource"
                type="video/mp4"
              >
            </video>
            <div class="play-btn">
              <h2 class="size-3 center">Meet DesignScout</h2>
              <button
                @click="toggleVideo"
                class="watch-reel btn light"
              >
                <svg
                  width="11"
                  height="14"
                  viewBox="0 0 11 14"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M11 7L0.499999 13.0622L0.5 0.937822L11 7Z"
                    fill="#F7F5F0"
                  />
                </svg>
                WATCH REEL
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="page-content"
      @wheel="onPageScroll"
    >
      <!-- <StoryblokComponent
        v-if="story"
        :blok="story.content"
      /> -->
      <div class="scouts-block">
        <div class="image-w-badge">
          <div class="scouts-img">
            <img
              src="~/assets/images/Scout-Driscoll-Founder-DesignScout.webp"
              alt="Founder of DesignScout, Scout Driscoll, swinging from a hanging egg chair in their studio."
              title="Scout Driscoll - Founder of DesignScout"
            />
          </div>
          <img
            class="floating-badge"
            src="~/assets/svg/Badge_First_Class.svg"
            alt="First Class Badge"
            title="First Class Badge"
          />
        </div>
        <div class="scout-content-wrapper">
          <h2 class="size-3">{{ blok.founder_headline }}</h2>
          <div v-html="founderSectionBody"></div>
          <div class="spacer small large-only"></div>
          <div class="spacer medium small-only"></div>
          <div>
            <a
              class="btn dark with-arrow"
              href="/scout/"
            >
              <svg
                width="11"
                height="12"
                viewBox="0 0 11 12"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11 1.68164C11 1.12936 10.5523 0.68164 10 0.681641L1 0.68164C0.447715 0.68164 2.8711e-07 1.12936 2.8711e-07 1.68164C2.8711e-07 2.23393 0.447715 2.68164 1 2.68164L9 2.68164L9 10.6816C9 11.2339 9.44772 11.6816 10 11.6816C10.5523 11.6816 11 11.2339 11 10.6816L11 1.68164ZM1.70711 11.3887L10.7071 2.38875L9.29289 0.974534L0.292893 9.97453L1.70711 11.3887Z"
                  fill="#303A3E"
                />
              </svg>
              GET TO KNOW SCOUT</a>
          </div>
          <div class="spacer medium"></div>
         <h3>RECENT APPEARANCES</h3>
          <!-- <p>BOPP Beer Design Conference: <br>Speaker on Sep 21, 2022</p> -->
          <p>Features: <a
              href="https://www.spreaker.com/user/foodabletv/how-to-be-brave-and-bold-with-your-brand"
              target="_blank"
              class="underline navy"
            >Turning Tables Podcast</a>, 
            <a
              href="https://www.allupinmyladybusiness.com/timeless-design-fine-wine-with-scout-driscoll/"
              target="_blank"
              class="underline navy"
            > All Up In My Lady Business</a></p>
          <p> Podcast: <a
              href="https://vint.studio/vinted-podcast/"
              target="_blank"
              class="underline navy"
            >VINT<em>ed</em> by Scout Driscoll</a></p>
        </div>
      </div>

      <div class="divider dark"></div>
      <div class="spacer x-small"></div>
      <div class="divider dark"></div>
      <div class="spacer medium"></div>

      <section ref="section1">
        <div class="case-studies-carousel-container">
          <CaseStudiesCarousel />
        </div>
      </section>
      <section
        ref="section2"
        class="large-width"
      >
        <div class="row compact-width contact-block-container">
          <div class="col contact-block-content">
            <h2 class="size-3">{{ blok.contact_headline }}</h2>
          </div>
          <div class="col">
            <a
              href="/contact"
              class="btn dark"
            >
              <svg
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
              CONTACT US</a>
            <a
              href="/case-studies"
              class="btn dark"
            >
              <svg
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
              CASE STUDIES</a>
          </div>
        </div>

        <div class="spacer medium"></div>
        <div class="divider dark"></div>
        <div class="spacer small"></div>
      </section>
      <section
        ref="section3"
        class="large-width"
      >
        <div class="b2p-container">
          <div class="two-cols">
            <div class="col left-col align-flex-start">
              <h2 class="headline">{{ blok.b2p_headline }}</h2>
              <h3>{{ blok.b2p_subheadline }}</h3>
              <div v-html="b2pBodyCopy"></div>
              <a
                class="btn dark"
                href="/contact/"
              >
                <svg
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

                CONTACT US</a>
            </div>
            <div class="col right-col">
              <div class="pennant">
                <div class="divider dark small-only"></div>
                <img
                  src="~/assets/images/pennant_rooted_in_strategy-scaled.webp"
                  alt="Pennant that reads &quot;Rooted in Strategy&quot;"
                  title="Pennant that reads &quot;Rooted in Strategy&quot;"
                >
              </div>
              <p><em>End to End Branding</em></p>
              <div class="separator"></div>
              <ul class="services-list">
                <li>
                  <h3>BRAND STRATEGY</h3>
                </li>
                <li>
                  <h3>BRANDING</h3>
                </li>
                <li>
                  <h3>WEBSITE DESIGN</h3>
                </li>
                <li>
                  <h3>SOCIAL MEDIA</h3>
                </li>
                <li>
                  <h3>MARKETING DESIGN</h3>
                </li>
                <li>
                  <h3>EMAIL MARKETING</h3>
                </li>
                <li>
                  <h3>PACKAGING</h3>
                </li>
                <li>
                  <h3>ART-PACK DESIGN</h3>
                </li>
                <li>
                  <h3>EXPERIENTIAL DESIGN</h3>
                </li>
              </ul>
              <a
                class="btn dark"
                href="/services/"
              >
                <svg
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

                OUR SERVICES</a>
            </div>
          </div>
        </div>

        <div
          v-for="(blok, index) in data.stories"
          :key="index"
          class="homepage-grid"
        >
          <div
            v-for="(media, index) in blok.content.images"
            :key="index"
          >
            <img
              v-if="!isVideo(media.filename)"
              :src="media.filename"
              :alt="media.alt"
              :title="media.title"
            >
            
            <video
              v-else
              
              autoplay
              muted
              loop
              
            >
              <source
                :src="media.filename"
                :title="media.title"
              >
              Your browser does not support the video tag.
            </video>
          </div>
        </div>

        <!-- <div class="rebranding-container">
          <div class="col-md-6 left-col">
            <h2 class="headline">The<br>rebrand<br>experts.</h2>
            <h3 class="subheadline">YOUR BRAND, JUST MORE YOU.</h3>
            <p>When your logo no longer matches your success, it’s time for a rebrand. We understand the nuance it takes to evolve your business’ branding. You’ll never hear us tell you what the cool kids are doing these days because your rebrand will be 0% trend and 100% you.</p>
            <a
              href="/contact"
              class="btn dark"
            >
              <svg
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
              CONTACT US</a>
          </div>
          <div class="col-md-6 right-img">
            <iframe
              src="https://player.vimeo.com/video/817366640?h=456df723ac&title=0&byline=0&portrait=0&background=1"
              frameborder="0"
              allow="autoplay; fullscreen; picture-in-picture"
              allowfullscreen
              class="rebranding-video"
            ></iframe>
            <p class="hidden"><a href="https://vimeo.com/817366640">DesignScout_TV_Frame_Before &amp; After_Logos</a> from <a href="https://vimeo.com/user645229">DesignScout | A Branding Agency</a> on <a href="https://vimeo.com">Vimeo</a>.</p>
          </div>
        </div> -->
      </section>
      <section
        ref="section4"
        class="large-width"
      >
        <div class="divider-w-badge">
          <div>
            <svg
              class="divider-badge"
              width="221"
              height="221"
              viewBox="0 0 221 221"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M86.2489 196.379C38.6912 183.224 10.7032 133.831 23.8654 86.2479C37.0275 38.6646 86.4128 10.7022 133.971 23.8573C181.528 37.0124 209.516 86.4048 196.361 133.963C183.206 181.52 133.814 209.508 86.256 196.353L86.2489 196.379Z"
                fill="#578B8D"
              />
              <path
                d="M88.802 187.153C131.355 198.924 175.392 173.97 187.163 131.417C198.933 88.8648 173.98 44.8272 131.427 33.0567C88.8745 21.2861 44.837 46.2398 33.0664 88.7923C21.2958 131.345 46.2495 175.382 88.802 187.153Z"
                fill="#578B8D"
              />
              <path
                d="M88.802 187.153C131.355 198.924 175.392 173.97 187.163 131.417C198.933 88.8648 173.98 44.8272 131.427 33.0567C88.8745 21.2861 44.837 46.2398 33.0664 88.7923C21.2958 131.345 46.2495 175.382 88.802 187.153Z"
                fill="#578B8D"
              />
              <path
                d="M125.374 165.414L124.533 161.99L126.805 161.436L128.758 169.294L126.486 169.848L125.686 166.573L123.353 170.632L120.46 171.345L123.149 166.697L118.358 163.528L121.426 162.781L125.425 165.428L125.374 165.414Z"
                fill="#E2DDCB"
              />
              <path
                d="M114.742 168.746L114.525 163.762L116.812 163.651L117.183 171.759L114.568 171.861L111.077 167.677L111.259 171.991L109.03 172.09L108.66 163.982L110.637 163.896L114.756 168.695L114.742 168.746Z"
                fill="#E2DDCB"
              />
              <path
                d="M105.912 167.953C105.515 170.484 103.366 171.788 100.97 171.4C98.4896 171.017 96.9433 169.049 97.3196 166.594C97.71 164.089 99.8659 162.76 102.262 163.147C104.716 163.524 106.281 165.524 105.912 167.953ZM99.6646 166.968C99.5407 167.814 99.7913 168.599 100.487 169.066C100.722 169.214 100.97 169.31 101.291 169.343C102.527 169.548 103.391 168.714 103.574 167.554C103.764 166.369 103.14 165.343 101.955 165.153C100.744 164.956 99.855 165.783 99.6717 166.942L99.6646 166.968Z"
                fill="#E2DDCB"
              />
              <path
                d="M93.8699 169.821L86.1686 167.031L86.8521 165.157L89.5995 166.164L91.6783 160.439L93.8776 161.24L91.7989 166.965L94.5463 167.973L93.8628 169.847L93.8699 169.821Z"
                fill="#E2DDCB"
              />
              <path
                d="M79.4953 163.507L77.4999 162.267L81.8014 155.369L83.7969 156.609L79.4953 163.507Z"
                fill="#E2DDCB"
              />
              <path
                d="M74.7455 160.487L68.4694 155.23L69.7494 153.685L71.9797 155.568L75.8848 150.898L77.6676 152.409L73.7625 157.079L75.9929 158.961L74.7129 160.505L74.7455 160.487Z"
                fill="#E2DDCB"
              />
              <path
                d="M71.3478 150.084L69.6313 148.234L71.4887 146.492L73.2052 148.342L71.3549 150.059L71.3478 150.084Z"
                fill="#E2DDCB"
              />
              <path
                d="M95.4932 57.9455L96.3343 61.3694L94.0626 61.9239L92.1097 54.066L94.3814 53.5114L95.2067 56.7934L97.5399 52.7345L100.433 52.0217L97.7443 56.67L102.535 59.8384L99.4673 60.5854L95.4677 57.9385L95.4932 57.9455Z"
                fill="#E2DDCB"
              />
              <path
                d="M106.1 54.6069L106.317 59.5913L104.03 59.7016L103.66 51.5936L106.274 51.4914L109.766 55.676L109.558 51.3544L111.786 51.2555L112.157 59.3635L110.18 59.4494L106.06 54.651L106.1 54.6069Z"
                fill="#E2DDCB"
              />
              <path
                d="M114.929 55.3995C115.326 52.8685 117.475 51.5647 119.871 51.9524C122.351 52.3358 123.898 54.3041 123.521 56.7584C123.131 59.2639 120.975 60.5933 118.579 60.2056C116.124 59.8293 114.56 57.8283 114.929 55.3995ZM121.176 56.3849C121.3 55.5388 121.05 54.7542 120.354 54.2866C120.119 54.1393 119.871 54.043 119.55 54.0093C118.314 53.8048 117.45 54.6389 117.267 55.7987C117.076 56.984 117.701 58.0095 118.886 58.1998C120.122 58.4042 120.986 57.5702 121.169 56.4104L121.176 56.3849Z"
                fill="#E2DDCB"
              />
              <path
                d="M126.972 53.5316L134.674 56.3221L133.99 58.1963L131.243 57.1888L129.164 62.9136L126.99 62.1197L129.069 56.3949L126.321 55.3873L127.005 53.5131L126.972 53.5316Z"
                fill="#E2DDCB"
              />
              <path
                d="M141.348 59.8455L143.344 61.0852L139.042 67.9833L137.047 66.7436L141.348 59.8455Z"
                fill="#E2DDCB"
              />
              <path
                d="M146.098 62.8648L152.374 68.1222L151.068 69.6593L148.838 67.7769L144.933 72.4463L143.15 70.9353L147.055 66.2658L144.825 64.3834L146.13 62.8463L146.098 62.8648Z"
                fill="#E2DDCB"
              />
              <path
                d="M149.491 73.2677L151.207 75.1181L149.357 76.8346L147.615 74.9772L149.465 73.2607L149.491 73.2677Z"
                fill="#E2DDCB"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M126.368 91.8226C125.731 95.4155 127.732 99.0226 129.9 100.833C131.608 100.425 132.869 99.6458 134.943 99.3115C137.565 98.8814 138.588 99.6595 141.085 99.8825C144.3 100.194 148.451 98.8115 152.222 99.0018C149.361 88.857 134.211 89.4255 126.368 91.8226Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M94.7234 116.109C95.9435 118.263 100.549 120.609 103.37 122.545C107.322 125.262 107.476 127.092 110.218 129.611C113.282 129.276 117.794 127.883 118.945 124.818C116.948 120.799 112.454 117.85 108.099 114.995C101.858 110.903 104.113 114.388 94.7234 116.109Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M77.1449 95.4281C77.1449 95.4281 77.5136 95.0899 77.5364 95.2063C77.5592 95.3226 77.8371 95.0143 77.9023 94.9773C77.9746 94.9148 78.1704 94.8039 78.2682 94.7484C83.9551 90.5994 81.429 92.0739 88.8128 88.7519C90.4277 83.3114 90.6577 83.375 93.2976 79.401C86.948 78.3874 72.7703 82.0035 73.4248 88.787C73.7048 91.753 74.6112 93.8469 77.1705 95.4351L77.1449 95.4281Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M135.688 113.327C140.107 113.862 145.526 112.968 149.401 112.086C157.908 110.175 153.873 108.949 158.327 101.598C154.275 101.33 148.169 102.419 144.299 103.082C140.669 103.674 140.475 103.18 139.101 106.954C137.678 110.907 137.859 110.352 135.655 113.346L135.688 113.327Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M93.879 88.8328C104.896 91.7702 110.168 97.5751 115.807 91.7073C113.199 87.712 111.352 84.6426 105.353 82.4605C101.809 81.1501 100.385 80.7287 97.994 82.7084C96.1492 84.2063 94.4875 85.8374 93.8975 88.8654L93.879 88.8328Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M77.7798 112.826C77.4384 110.778 76.1329 109.729 75.5664 106.904C74.9928 104.104 75.6578 102.197 75.5203 99.7109C74.5101 97.3957 72.8653 100.159 70.4719 91.9046L69.9978 90.5355C69.9978 90.5355 69.8641 90.2234 69.7972 90.0673C66.1721 96.4098 62.5474 109.713 69.3841 112.346C72.3915 113.508 75.1797 114.17 77.7798 112.826Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M115.176 115.577C116.096 117.922 118.187 117.922 121.404 121.508C129.297 130.267 129.148 125.136 137.645 124.653L140.929 124.02C137.285 121.279 135.74 118.514 129.931 116.439C124.422 114.475 119.415 114.576 115.184 115.551L115.176 115.577Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M113.172 132.959C119.515 139.171 125.74 140.535 133.815 138.394C133.487 137.093 133.765 138.078 133.282 137.037C129.194 128.148 132.653 131.058 122.218 127.209C119.968 130.768 116.247 130.894 113.172 132.959Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M132.967 129.329C134.289 131.51 136.266 133.515 137.449 135.603C138.65 137.723 139.027 140.441 140.717 142.587C145.287 139.092 149.072 141.321 151.316 140.567C150.093 136.735 148.538 133.306 145.572 130.504C142.499 127.591 136.225 126.103 132.974 129.303L132.967 129.329Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M82.9749 95.1426C85.4151 98.1559 94.2864 102.783 98.6438 104.236C100.301 99.4399 101.643 99.2611 103.336 96.1254C96.1591 94.2228 90.2897 87.0972 82.9678 95.1681L82.9749 95.1426Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M158.694 111.109C161.288 111.579 172.344 110.098 174.268 109.309C176.65 105.071 174.957 103.833 177.15 99.4874C174.379 99.6565 168.218 100.648 165.458 101.178C163.105 101.627 162.377 102.471 161.448 105.13C160.314 108.338 160.334 108.564 158.727 111.09L158.694 111.109Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M145.224 116.048C144.532 120.341 144.101 119.809 142.025 122.838C145.444 124.802 147.438 127.637 150.3 129.722C154.695 125.27 156.778 122.215 156.188 114.404L145.25 116.055L145.224 116.048Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M178.518 108.559C179.374 108.548 180.873 108.302 182.599 107.927L183.378 97.8535C182.873 97.9889 182.437 98.171 182.06 98.3417C178.255 100.26 181.199 104.238 178.525 108.533L178.518 108.559Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M53.9513 75.6423C56.7085 77.808 62.6106 83.6222 66.0262 84.4019C71.0481 83.4527 69.1603 80.7297 74.6819 79.8636C74.1305 79.2709 65.7725 72.8875 64.821 72.3492C60.251 69.8746 60.4799 74.1195 53.9513 75.6423Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M48.6502 71.0398C50.5352 72.5791 52.5242 73.0467 55.1961 71.1448C58.621 68.7084 56.6185 70.0802 60.442 68.6894C57.6206 66.2584 55.6089 64.3814 54.1582 62.9623L48.6502 71.0398Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M79.1915 103.34L81.4804 110.878C85.6475 112.223 87.2151 112.822 91.0119 114.312L99.3184 109.843C94.6984 107.052 87.1929 102.857 81.5371 102.916L79.1915 103.34Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M69.5617 116.274C70.3196 118.905 82.787 134.898 88.5605 118.999L81.3062 116.084C77.4354 118.342 75.1838 117.83 69.5617 116.274Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M86.2417 128.783C92.4705 131.029 100.208 129.51 104.05 126.859C102.665 124.11 95.8842 120.776 92.3527 119.222C91.1678 127.285 88.8641 125.767 86.2417 128.783Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M50.0849 111.795C55.0882 112.106 57.7508 114.713 58.917 118.255C61.4432 118.073 63.5496 116.923 65.3847 115.56C61.5733 107.16 64.0803 112.915 62.4759 107.08C62.1981 106.095 62.3133 106.374 61.9692 105.729C56.887 106.001 53.4402 109.312 50.0849 111.795Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M118.424 109.102C131.791 116.569 133.259 112.16 136.3 104.446C123.144 104.768 129.217 104.495 122.479 107.17C120.653 107.903 119.489 107.636 118.424 109.102Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M47.2813 120.042C48.4171 121.704 48.6536 122.54 50.4277 123.884C51.8686 122.852 54.4361 121.526 55.6128 120.256C52.7741 114.904 51.0167 114.693 44.9384 115.185C45.1162 115.537 45.3136 116.912 45.8796 117.949C46.3162 118.757 46.7609 119.238 47.2813 120.042Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M145.473 152.238C147.394 151.559 152.499 149.615 153.972 148.069C151.216 143.511 145.31 143.28 142.202 146.959C143.986 148.663 144.573 150.421 145.473 152.238Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M39.8717 130.62L43.9486 127.319L39.1324 118.971L37.393 119.591C37.393 119.591 37.5229 126.779 39.8972 130.627L39.8717 130.62Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M159.397 157.602C158.806 155.761 158.079 155.505 157.005 153.915L148.641 158.396L150.27 163.248L159.404 157.577L159.397 157.602Z"
                fill="#303A3E"
              />
              <path
                fill-rule="evenodd"
                clip-rule="evenodd"
                d="M105.652 96.9868C104.149 99.2395 102.588 101.201 101.965 104.55C110.347 108.657 120.472 106.863 125.891 102.09C124.708 99.5068 123.729 98.273 123.281 95.3157L122.902 92.7075C116.38 96.2954 112.886 97.8874 105.652 96.9868Z"
                fill="#303A3E"
              />
              <path
                d="M90.1804 182.17C50.4424 171.178 27.0575 129.909 38.0495 90.1712C49.0416 50.4333 90.3291 27.081 130.041 38.0659C169.754 49.0509 193.164 90.327 182.172 130.065C171.18 169.803 129.911 193.188 90.1733 182.196L90.1804 182.17ZM129.207 41.0814C91.1305 30.5489 51.5905 52.954 41.0579 91.0309C30.5254 129.108 52.9306 168.648 91.0074 179.18C129.084 189.713 168.624 167.308 179.157 129.231C189.689 91.154 167.284 51.614 129.207 41.0814Z"
                fill="#E2DDCB"
              />
            </svg>

            <div class="divider dark"></div>
            <div class="divider dark"></div>
          </div>
        </div>
        <div class="spacer medium"></div>
        <div class="testimonial-carousel-container swiper-container">
          <testimonial />
        </div>
        <div class="spacer"></div>
        <div class="divider dark"></div>
        <div class="spacer x-small"></div>
        <div class="divider dark"></div>
        <div class="spacer medium"></div>

        <div class="homepage-articles-container padding-bottom-0">
          <h2 class="size-2">{{ blok.insights_headline }}</h2>
          <ArticlesBlock />
        </div>

        <!-- BACK TO TOP LINK -->
        <BackToTop />
      </section>
    </div>
  </div>
</template>

<script>
import VueScrollTo from "vue-scrollto";
import inView from "in-view";
import animejs from "animejs";
import FaqAccordion from "~/components/AboutFaqAccordion.vue";
import BackToTop from "~/components/BackToTop.vue";
import Testimonial from "~/storyblok/Testimonial.vue";
import ArticlesBlock from "~/components/ArticlesBlock.vue";
import _ from "lodash";

export default {
  name: "HeroCarousel",
  components: {
    FaqAccordion,
    BackToTop,
    Testimonial,
    ArticlesBlock,
  },
  data() {
    return {
      videoSource: null,
      reel: null,
      currentSlideIndex: 0,
      scrolledDownOnLastSlide: false,
      direction: "vertical",
      hasScrolledToVideoSection: false,
    };
  },
  mounted() {
    window.addEventListener("scroll", this.handleScroll);

    this.reel = this.$refs.reel;
    this.reel.classList.add("intro-playing");
    this.videoSource = this.computedVideoSource;

    // this.splitTextToWords(this.$refs.wordize);
    this.splitTextToWords(this.$refs.wordizeSlide3);

    this.reel.addEventListener("play", () => {
      this.reel.classList.remove("paused");
    });

    this.reel.addEventListener("pause", () => {
      document.querySelector(".play-btn").style.display = "flex";
      this.reel.classList.add("paused");
    });

    this.addSlideOneIntersectionObserver();

    const options = {
      threshold: 0.5, // Trigger when video is halfway in the viewport
    };
    const observer = new IntersectionObserver(
      this.handleVideoIntersection,
      options
    );
    observer.observe(this.$refs.reel);

    animejs
      .timeline({ loop: false })
      .add({
        targets: ".wordize span",
        translateY: [-50, 0],
        opacity: [0, 1],
        easing: "easeOutExpo",
        duration: 200,
        delay: animejs.stagger(100),
      })
      .add({
        targets: ".slide-1 svg",
        opacity: [0, 1],
        duration: 2000,
      });

    animejs.timeline({ loop: false }).add({
      targets: ".video-section",
      translateY: [100, 0],
      easing: "easeOutExpo",
      duration: 1100,
      delay: 1500,
    });

    let slide3AnimationDone = false;

    const runSlide3Animation = () => {
      if (!slide3AnimationDone) {
        slide3AnimationDone = true;

        document.querySelector(".slide-3").style.opacity = "1";

        animejs
          .timeline({ loop: false })
          .add({
            targets: ".slide-3 .wordize span",
            translateY: [-50, 0],
            opacity: [0, 1],
            easing: "easeOutExpo",
            duration: 300,
            delay: animejs.stagger(150),
          })
          .add({
            targets: ".slide-3 h3",
            translateX: [-5000, 0],
            opacity: [0, 1],
            easing: "linear",
            duration: 300,
          })
          .add({
            targets: ".slide-3 .col.right",
            translateX: [5000, 0],
            opacity: [0, 1],
            easing: "linear",
            duration: 300,
          })
          .add({
            targets: ".divider",
            translateX: [-5000, 0],
            duration: 300,
            easing: "linear",
            delay: (el, i) => 150 * i,
          });
      }
    };

    if (
      document.readyState === "complete" ||
      (document.readyState !== "loading" && !document.documentElement.doScroll)
    ) {
      runSlide3Animation();
    } else {
      document.addEventListener("DOMContentLoaded", runSlide3Animation);
    }
  },

  created() {
    this.debouncedScrollToVideoSection = _.debounce(
      this.scrollToVideoSection,
      1000
    );
  },

  beforeDestroy() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  beforeUnmount() {
    window.removeEventListener("scroll", this.handleScroll);
  },

  computed: {
    computedVideoSource() {
      return this.getVideoSource();
    },
  },
  watch: {
    computedVideoSource(newSrc) {
      if (this.reel) {
        this.reel.src = newSrc;
        this.reel.load();
      }
    },
  },

  methods: {
    getVideoSource() {
      if (!this.reel) {
        return null; // or return a default video source if needed
      }
      return this.reel.classList.contains("intro-playing")
        ? "https://danny-petrilli.s3.amazonaws.com/designscout/DS_Sizzle_F6.mp4"
        : "https://danny-petrilli.s3.amazonaws.com/designscout/DS_Sizzle_F6_subtitle.mp4";
    },

    isVideo(filename) {
      return filename.endsWith(".mp4");
    },

    splitTextToWords(element) {
      const words = [];
      element.childNodes.forEach((node) => {
        if (node.nodeType === Node.TEXT_NODE) {
          words.push(
            ...node.textContent
              .split(/\s+/)
              .map((word) => document.createTextNode(word))
          );
        } else if (node.nodeType === Node.ELEMENT_NODE) {
          words.push(node.cloneNode(true));
        }
      });

      element.innerHTML = "";

      words.forEach((word) => {
        if (word.nodeType === Node.TEXT_NODE) {
          const span = document.createElement("span");
          span.textContent = word.textContent + " ";
          element.appendChild(span);
        } else {
          element.appendChild(word);
        }
      });
    },
    addSlideOneIntersectionObserver() {
      this.$nextTick(() => {
        const navbar = document.querySelector(".navbar");
        const slideOne = document.querySelector(".slide-3");

        if (!navbar || !slideOne) {
          console.error("Navbar or slide-3 element not found");
          return;
        }

        const observer = new IntersectionObserver(
          (entries) => {
            entries.forEach((entry) => {
              if (entry.isIntersecting) {
                navbar.classList.add("top-of-page");
              } else {
                navbar.classList.remove("top-of-page");
              }
            });
          },
          {
            root: null,
            threshold: 0,
          }
        );

        observer.observe(slideOne);
      });
    },

    handleVideoIntersection(entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !this.hasScrolledToVideoSection) {
          this.debouncedScrollToVideoSection();
          this.hasScrolledToVideoSection = true;
          setTimeout(() => {
            this.reel.play();
          }, 2000);
        }
      });
    },
    scrollToVideoSection() {
      // VueScrollTo.scrollTo(".video-section", 1000, {
      //   easing: "easeInOutCubic",
      // });
    },
    toggleVideo() {
      this.getVideoSource();
      this.reel.classList.remove("intro-playing");
      this.reel.src =
        "https://danny-petrilli.s3.amazonaws.com/designscout/DS_Sizzle_F6_subtitle.mp4";
      let videoOverlay = document.querySelector(".video-overlay");
      if (videoOverlay) {
        videoOverlay.style.display = "none";
      }
      let playBtn = document.querySelector(".play-btn");
      if (playBtn) {
        playBtn.style.display = "none";
        playBtn.style.opacity = "0";
      }
      if (this.reel.paused) {
        this.reel.play();
      } else {
        this.reel.pause();
      }
    },
    handleScroll() {
      const navbar = document.querySelector(".navbar");
      const videoSection = document.querySelector(".video-section");
      const slideOne = document.querySelector(".slide-3");
      const slideTwo = document.querySelector(".slide-2");

      const videoRect = videoSection.getBoundingClientRect();
      const slideOneRect = slideOne.getBoundingClientRect();
      const navBarHeight = navbar.offsetHeight;

      if (videoRect.top <= navBarHeight && videoRect.bottom >= navBarHeight) {
        navbar.classList.add("in-video");
        navbar.classList.remove("scrolling");
        navbar.classList.remove("top-of-page");
        slideTwo.classList.add("video-playing");
      } else {
        navbar.classList.remove("in-video");
        navbar.classList.add("scrolling");
        slideTwo.classList.remove("video-playing");
      }

      if (
        slideOneRect.top <= navBarHeight &&
        slideOneRect.bottom >= navBarHeight
      ) {
        navbar.classList.add("top-of-page");
      } else {
        navbar.classList.remove("top-of-page");
      }
    },
  },
};
</script>
