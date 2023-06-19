<script setup>
defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
  }
);

const caseStudies = ref(null);
const storyblokApi = useStoryblokApi();
const { data } = await storyblokApi.get("cdn/stories", {
  version: "draft",
  starts_with: "case-studies",
  is_startpage: false,
});

if (data && data.stories) {
  caseStudies.value = data.stories;
}

const industryOptions = computed(() => {
  const industries = new Set();
  caseStudies.value?.forEach((caseStudy) => {
    const industry = caseStudy.content.industry;
    if (industry && industry.trim() !== "") {
      industries.add(industry);
    }
  });
  return Array.from(industries);
});

const projectTypeOptions = computed(() => {
  const projectTypes = new Set();
  caseStudies.value?.forEach((caseStudy) => {
    caseStudy.content.services?.content?.forEach((serviceItem) => {
      if (serviceItem.type === "list_item") {
        serviceItem.content?.forEach((listItem) => {
          listItem.content?.forEach((textItem) => {
            if (
              textItem.type === "text" &&
              textItem.text &&
              textItem.text !== ""
            ) {
              projectTypes.add(textItem.text);
            }
          });
        });
      }
    });
  });
  return Array.from(projectTypes);
});

const filterCriteriaIndustry = ref(null);

function filterCaseStudiesIndustry() {
  if (!filterCriteriaIndustry.value) {
    return caseStudies.value;
  }
  return caseStudies.value.filter((caseStudy) => {
    return caseStudy.content.industry === filterCriteriaIndustry.value;
  });
}

const filterCriteriaProjectType = ref(null);

function filterCaseStudiesProjectType() {
  if (!filterCriteriaProjectType.value) {
    return caseStudies.value;
  }
  return caseStudies.value.filter((caseStudy) => {
    return caseStudy.content.services?.includes(
      filterCriteriaProjectType.value
    );
  });
}

function filteredCaseStudies() {
  let filtered = caseStudies.value;

  if (filterCriteriaIndustry.value) {
    filtered = filtered.filter((caseStudy) => {
      return caseStudy.content.industry === filterCriteriaIndustry.value;
    });
  }

  if (filterCriteriaProjectType.value) {
    filtered = filtered.filter((caseStudy) => {
      return caseStudy.content.services === filterCriteriaProjectType.value;
    });
  }

  // Add this block to filter out the gallery case study by its slug
  filtered = filtered.filter((caseStudy) => {
    return caseStudy.full_slug !== "case-studies/gallery";
  });

  return filtered;
}

const serviceOptions = computed(() => {
  const services = new Set();
  caseStudies.value?.forEach((study) => {
    if (
      study.content &&
      study.content.services &&
      study.content.services.content
    ) {
      study.content.services.content.forEach((serviceContent) => {
        if (serviceContent.type === "list_item") {
          const serviceText = serviceContent.content[0].content[0].text;
          if (serviceText) {
            services.add(serviceText);
          }
        }
      });
    }
  });
  return Array.from(services);
});
</script>

<template>
  <!-- START STORYBLOK CONTENT -->
  <div
    v-editable="blok"
    class="case-studies-page"
  >

    <Head>
      <Title>{{ blok.metatags.title }}</Title>
      <Meta
        name="description"
        :content="blok.metatags.description"
      />
      <Meta
        property="og:title"
        :content="blok.metatags.og_title"
      />
      <Meta
        property="og:image"
        :content="blok.metatags.og_image"
      />
      <Meta
        property="og:description"
        :content="blok.metatags.og_description"
      />
      <Meta
        property="og:url"
        :content="blok.metatags.og_url"
      />
      <Meta
        property="og:type"
        content="website"
      />
      <Meta
        name="twitter:card"
        content="summary_large_image"
      />
      <Meta
        name="twitter:title"
        :content="blok.metatags.og_title"
      />
      <Meta
        name="twitter:description"
        :content="blok.metatags.og_description"
      />
      <Meta
        name="twitter:image"
        :content="blok.metatags.og_image"
      />
    </Head>

    <div class="top-content">
      <h2>{{ blok.title }}</h2>

      <div class="filters-container">
        <ul class="category-filter">
          <li class="category-filter-label">Project Type
            <svg
              class="right-arrow large-only"
              width="30"
              height="16"
              viewBox="0 0 30 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.6152 8.70711C30.0057 8.31658 30.0057 7.68342 29.6152 7.29289L23.2512 0.928932C22.8607 0.538408 22.2275 0.538408 21.837 0.928932C21.4465 1.31946 21.4465 1.95262 21.837 2.34315L27.4938 8L21.837 13.6569C21.4465 14.0474 21.4465 14.6805 21.837 15.0711C22.2275 15.4616 22.8607 15.4616 23.2512 15.0711L29.6152 8.70711ZM0 9H28.9081V7L0 7L0 9Z"
                fill="#303A3E"
              />
            </svg>
          </li>
          <li><a
              href="#"
              @click.prevent="filterCriteriaProjectType = null"
            >All</a></li>
          <li
            v-for="service in serviceOptions"
            :key="service"
          >
            <a
              href="#"
              @click.prevent="filterCriteriaProjectType = service"
            >
              {{ service }}
            </a>
          </li>
        </ul>

        <ul class="category-filter">
          <li class="category-filter-label">Industry
            <svg
              class="right-arrow large-only"
              width="30"
              height="16"
              viewBox="0 0 30 16"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M29.6152 8.70711C30.0057 8.31658 30.0057 7.68342 29.6152 7.29289L23.2512 0.928932C22.8607 0.538408 22.2275 0.538408 21.837 0.928932C21.4465 1.31946 21.4465 1.95262 21.837 2.34315L27.4938 8L21.837 13.6569C21.4465 14.0474 21.4465 14.6805 21.837 15.0711C22.2275 15.4616 22.8607 15.4616 23.2512 15.0711L29.6152 8.70711ZM0 9H28.9081V7L0 7L0 9Z"
                fill="#303A3E"
              />
            </svg>
          </li>
          <li><a
              href="#"
              @click.prevent="filterCriteriaIndustry = null"
            >All</a></li>
          <li
            v-for="industry in industryOptions"
            :key="industry"
          >
            <a
              href="#"
              @click.prevent="filterCriteriaIndustry = industry"
            >
              {{ industry }}
            </a>
          </li>
        </ul>
      </div>
    </div>
    <div ref="grid">
      <div class="case-study-cards">
        <CaseStudyCard
          v-for="caseStudy in filteredCaseStudies()"
          :key="caseStudy.uuid"
          :caseStudy="caseStudy.content"
          :slug="caseStudy.full_slug"
        />

        <!-- <pre v-for="caseStudy in filteredCaseStudies()">
        <pre v-for="services in caseStudy.content.services.content">
          <pre v-for="listItems in services.content">
            <pre v-for="listItem in listItems.content">
            {{ listItem.content }}
          </pre>
        </pre>
        </pre>
        </pre> -->
      </div>
    </div>

    <div v-if="slug[1] != 'gallery'">
      <div class="contact-container container">
        <h2 class="size-2">{{ blok.contact_headline_copy }}</h2>
        <div
          v-for="(button, index) in story.content.contact_button"
          :key="index"
          class="single-button-wrapper"
        >
          <a
            :href="button.link.cached_url"
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
            {{ button.title }}
          </a>
        </div>
      </div>

      <div class="latest-article-container container">
        <h2 class="size-2">Latest Article</h2>
        <h2 class="size-5">Featured Article</h2>
        <FeaturedArticle />
      </div>
    </div>
  </div>

  <!-- END STORYBLOK CONTENT -->
</template>

<script>
import CaseStudyCard from "~/components/CaseStudyCard.vue";
import FeaturedArticle from "~/components/FeaturedArticle.vue";

export default {
  name: "Case Studies",

  components: {
    CaseStudyCard,
    FeaturedArticle,
  },
};
</script>
