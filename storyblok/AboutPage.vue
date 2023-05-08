<script setup>
const props = defineProps({ blok: Object });
const { slug } = useRoute().params;

const story = await useAsyncStoryblok(
  slug && slug.length > 0 && slug !== "/" ? slug.join("/") : "home",
  {
    version: useRoute().query._storyblok ? "draft" : "published",
  }
);
</script>

<template>
  <div
    v-editable="blok"
    class="container"
  >
    <img
      :src="story.content.hero_image_large.filename"
      :alt="story.content.hero_image_large.alt"
      :title="story.content.hero_image_large.title"
      class="about-hero large-only"
    >
    <img
      :src="story.content.hero_image_small.filename"
      :alt="story.content.hero_image_small.alt"
      :title="story.content.hero_image_small.title"
      class="about-hero small-only"
    >

    <div class="intro-wrapper large-width">
      <div class="logos small-only">
        <div
          v-for="(logo, index) in story.content.logos"
          :key="index"
          class="logo"
        >
          <img
            :src="logo.filename"
            :alt="logo.alt"
            :title="logo.title"
          >
        </div>
      </div>

      <div class="intro-section">
        <h2>{{ story.content.intro_headline_copy }}</h2>
        <h3>{{ story.content.intro_subheadline_copy }}</h3>
        <div class="spacer small"></div>
        <p>{{ story.content.intro_body_copy }}</p>
        <p>{{ story.content.intro_body_copy_2 }}</p>

        <div class="intro-images small-only">
          <div
            v-for="(image, index) in story.content.intro_images"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.title"
            >
          </div>
        </div>

        <div class="spacer large-only"></div>

        <div class="never-stop-wrapper large-only">
          <img
            :src="story.content.intro_badge.filename"
            :alt="story.content.intro_badge.alt"
            :title="story.content.intro_badge.title"
          >
          <div class="divider dark"></div>
          <div class="spacer x-small"></div>
          <div class="divider dark"></div>
        </div>

        <div class="quote-container">
          <div class="quote-icon">
            <SvgQuotes />
          </div>
          <div class="quote-copy">
            {{ story.content.testimonial_copy_beginning }}
            <h2 class="size-3 navy">{{ story.content.testimonial_copy_callout }}</h2>
            {{ story.content.testimonial_copy_end }}
          </div>
          <div class="spacer small"></div>
          <h3>{{ story.content.testimonial_author_name }}</h3>
          <h3>{{ story.content.testimonial_author_title }}</h3>
        </div>

        <div class="spacer medium small-only"></div>
        <div class="spacer medium small-only"></div>

        <div class="divider dark small-only"></div>
        <div class="spacer x-small small-only"></div>
        <div class="divider dark small-only"></div>
      </div>

      <div class="large-only">
        <div class="logos">
          <div
            v-for="(logo, index) in story.content.logos"
            :key="index"
            class="logo"
          >
            <img
              :src="logo.filename"
              :alt="logo.alt"
              :title="logo.title"
            >
          </div>
        </div>

        <div class="intro-images">
          <div
            v-for="(image, index) in story.content.intro_images"
            :key="index"
          >
            <img
              :src="image.filename"
              :alt="image.alt"
              :title="image.title"
            >
          </div>
        </div>
      </div>
    </div>

    <div class="gb-container gb-container-559343ab scouts-honor-container-wrapper">
      <div class="gb-inside-container">
        <div class="gb-container gb-container-52b5bf6b scouts-honor-container">
          <div class="gb-inside-container">
            <figure class="gb-block-image gb-block-image-410acc03"><img
                decoding="async"
                alt="Scout's Honor Badge"
                title="Scout's Honor Badge"
                class="scouts-honor-badge lazyloaded"
                src="~/assets/images/Scout_s-Honor-300x128.webp"
                sizes="(max-width: 300px) 100vw, 300px"
              ></figure>
            <figure class="gb-block-image gb-block-image-f2d5c801"><img
                decoding="async"
                alt="DesignScout troop photo"
                title="designscout_group"
                class="ds-af lazyloaded"
                src="~/assets/images/designscout_group.webp"
                sizes="(max-width: 2368px) 100vw, 2368px"
              ></figure>
            <figure class="gb-block-image gb-block-image-f53ff240"><img
                decoding="async"
                alt="Get Lost Badge"
                title="Get Lost Badge"
                class="get-lost-badge lazyloaded"
                src="~/assets/images/Get-Lost_Badge-300x300.webp"
                sizes="(max-width: 300px) 100vw, 300px"
              ></figure>
          </div>
        </div>
      </div>
    </div>

    <div class="good-company-container row large-width">
      <div class="col">
        <div class="row svg-wrapper">
          <svg
            class="badge-1"
            width="97"
            height="63"
            viewBox="0 0 97 63"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M40.4542 60.7658L41.8279 57.28H43.6517V62.6735H42.3964V58.5989L40.8095 62.6971H39.9331L38.3699 58.646V62.6971H37.1856V57.3035H39.0804L40.4542 60.7893V60.7658ZM47.8203 60.2476V62.6735H46.5176V57.28H47.8203V59.6117L50.3072 57.28H51.9888L49.2177 59.8708L52.1073 62.6735H50.3309L47.7966 60.2476H47.8203ZM54.2863 57.28H58.8338V58.3399H55.589V59.3055H57.5312V60.3889H55.589V61.543H59.1417V62.65H54.31V57.2564L54.2863 57.28ZM0 59.9885C0 58.387 1.16057 57.2093 2.79484 57.2093C4.54754 57.2093 5.23441 58.4105 5.37652 59.0229H4.05016C3.93173 58.8109 3.55277 58.3634 2.79484 58.3634C1.89481 58.3634 1.35005 59.0935 1.35005 59.9885C1.35005 60.8835 1.89481 61.6137 2.79484 61.6137C3.60014 61.6137 3.93173 61.1662 4.05016 60.9542H5.37652C5.28178 61.4959 4.64228 62.7677 2.79484 62.7677C1.16057 62.7677 0 61.5901 0 59.965V59.9885ZM11.8426 60.5538H9.18983V62.6971H7.88714V57.3035H9.18983V59.4233H11.8426V57.3035H13.1452V62.6971H11.8426V60.5538ZM16.0111 57.28H17.3138V62.6735H16.0111V57.28ZM78.9662 59.9885C78.9662 58.387 80.1268 57.2093 81.761 57.2093C83.5137 57.2093 84.2006 58.4105 84.3427 59.0229H83.0163C82.8979 58.8109 82.519 58.3634 81.761 58.3634C80.861 58.3634 80.3162 59.0935 80.3162 59.9885C80.3162 60.8835 80.861 61.6137 81.761 61.6137C82.5663 61.6137 82.8979 61.1662 83.0163 60.9542H84.3427C84.248 61.4959 83.6085 62.7677 81.761 62.7677C80.1268 62.7677 78.9662 61.5901 78.9662 59.965V59.9885ZM90.8087 60.5538H88.156V62.6971H86.8533V57.3035H88.156V59.4233H90.8087V57.3035H92.1114V62.6971H90.8087V60.5538ZM94.9773 57.28H96.28V62.6735H94.9773V57.28ZM24.7036 59.4468C24.5615 59.4468 24.443 59.4939 24.3246 59.5881C24.2299 59.6824 24.1825 59.8237 24.1825 59.965C24.1825 60.1063 24.2299 60.2241 24.3246 60.3418C24.4194 60.436 24.5615 60.4831 24.7036 60.4831H28.0905L26.8352 61.8021C26.8352 61.8021 26.6931 62.0376 26.6931 62.1789C26.6931 62.3203 26.7642 62.438 26.8589 62.5322C26.9537 62.6264 27.0958 62.6735 27.2379 62.6735C27.38 62.6735 27.4984 62.6029 27.5932 62.5087L29.6538 60.3183C29.8432 60.1063 29.8432 59.8001 29.6538 59.6117L27.5932 57.492C27.5932 57.492 27.3563 57.3271 27.2379 57.3271C27.0247 57.3271 26.8352 57.4449 26.7405 57.6333C26.6694 57.8217 26.6931 58.0572 26.8589 58.1985L28.0905 59.4468H24.7273H24.7036ZM66.9105 59.4468C66.7683 59.4468 66.6499 59.4939 66.5315 59.5881C66.4368 59.6824 66.3894 59.8237 66.3894 59.965C66.3894 60.1063 66.4368 60.2241 66.5315 60.3418C66.6262 60.436 66.7683 60.4831 66.9105 60.4831H70.2974L69.0421 61.8021C69.0421 61.8021 68.9 62.0376 68.9 62.1789C68.9 62.3203 68.9711 62.438 69.0658 62.5322C69.1605 62.6264 69.3027 62.6735 69.4448 62.6735C69.5869 62.6735 69.7053 62.6029 69.8 62.5087L71.8606 60.3183C72.0501 60.1063 72.0501 59.8001 71.8606 59.6117L69.8 57.492C69.8 57.492 69.5632 57.3271 69.4448 57.3271C69.2316 57.3271 69.0421 57.4449 68.9474 57.6333C68.8763 57.8217 68.9 58.0572 69.0658 58.1985L70.2974 59.4468H66.9341H66.9105ZM18.6876 46.9639H0V43.9256L8.97666 35.4938C11.2978 33.2563 12.5768 31.7489 12.5768 29.4643C12.5768 27.1797 11.1794 25.6017 8.66875 25.6017C6.15813 25.6017 4.71334 27.3446 4.71334 29.7705V31.2543H0.0710553V29.6528C0.0710553 24.9893 3.19749 21.3622 8.64507 21.3622C14.0926 21.3622 17.3375 24.6596 17.3375 29.323C17.3375 33.2799 14.9927 35.6351 11.8662 38.5557L7.38976 42.7716H18.6876V46.9168V46.9639ZM45.2623 30.6891V38.1317C45.2623 44.067 41.5911 47.435 35.9777 47.435C30.3643 47.435 26.6931 44.067 26.6931 38.1317V30.6891C26.6931 24.8716 30.2933 21.3858 35.9777 21.3858C41.6621 21.3858 45.2623 24.8951 45.2623 30.6891ZM40.5726 38.061V30.7597C40.5726 27.7921 39.0094 25.6253 35.9777 25.6253C32.946 25.6253 31.3828 27.7921 31.3828 30.7597V38.061C31.3828 41.0287 32.8749 43.1955 35.9777 43.1955C39.0804 43.1955 40.5726 41.0287 40.5726 38.061ZM71.1975 30.6891V38.1317C71.1975 44.067 67.5263 47.435 61.9129 47.435C56.2995 47.435 52.6283 44.067 52.6283 38.1317V30.6891C52.6283 24.8716 56.2285 21.3858 61.9129 21.3858C67.5973 21.3858 71.1975 24.8951 71.1975 30.6891ZM66.5078 38.061V30.7597C66.5078 27.7921 64.9446 25.6253 61.9129 25.6253C58.8812 25.6253 57.318 27.7921 57.318 30.7597V38.061C57.318 41.0287 58.8101 43.1955 61.9129 43.1955C65.0156 43.1955 66.5078 41.0287 66.5078 38.061ZM86.806 47.4114C80.3162 47.4114 77.5924 43.3839 77.3082 39.9688H82.0452C82.3295 41.4291 83.7506 43.2191 86.806 43.2191C89.8613 43.2191 91.543 41.8766 91.543 39.6155C91.543 37.3545 90.0508 36.1062 87.4454 36.1062H82.6847V32.008H87.3033C89.4824 32.008 90.7851 30.901 90.7851 28.8284C90.7851 26.7558 89.1745 25.531 86.6638 25.531C83.9637 25.531 82.7795 27.0855 82.4953 28.6164H77.8293C77.9477 25.2484 80.7426 21.4329 86.6165 21.4329C92.4904 21.4329 95.5221 24.2357 95.5221 28.5222C95.5221 31.4663 93.5562 33.115 92.064 33.6803C93.9589 34.2455 96.3037 36.0591 96.3037 39.9217C96.3037 44.4203 92.822 47.435 86.806 47.435V47.4114ZM25.2483 6.97158C25.4615 7.51329 26.0536 7.6546 26.9537 7.44263C27.4747 7.30131 27.8774 7.18355 28.4458 7.04224C30.1275 6.57118 31.6433 6.73605 32.3065 8.43184C32.8749 9.8921 32.117 11.423 29.8196 12.2945C27.1668 13.3072 25.5799 12.3651 24.822 11.3288L26.48 10.6929C26.9063 11.1168 27.83 11.5643 29.3222 10.9755C30.5775 10.5045 31.0512 9.77434 30.7907 9.11487C30.4827 8.33763 29.8196 8.31408 28.9432 8.52605L27.4274 8.92645C25.7457 9.3975 24.2772 9.06776 23.7088 7.6075C23.1404 6.14724 24.1351 4.78118 26.0773 4.0275C28.6353 3.03829 30.0801 3.88618 30.7196 4.82829L29.1327 5.44066C28.73 5.13447 27.9248 4.80474 26.5747 5.32289C25.4615 5.74684 25.0115 6.35921 25.2483 6.94803V6.97158ZM34.5566 1.62513L36.1909 1.29539L37.9909 9.82145L36.3567 10.1512L34.5566 1.62513ZM49.9756 8.73802L48.6729 8.80868L43.0359 2.37882L43.3438 9.02066L41.7332 9.09131L41.3305 0.376842L43.249 0.282632L48.2229 6.05303L47.9387 0.0706579L49.5256 0L49.9282 8.73802H49.9756ZM52.9126 4.475C53.2915 1.95487 55.3995 0.282632 57.9338 0.659474C60.6102 1.05987 61.4866 2.99118 61.5576 4.05105L59.876 3.81553C59.6865 3.32092 59.0944 2.37882 57.7206 2.16684C56.0864 1.93132 54.8547 3.1325 54.6179 4.73408C54.381 6.35921 55.2337 7.84303 56.868 8.07855C58.3601 8.29053 59.1654 7.53684 59.4496 7.11289L61.1076 7.34842C60.776 8.21987 59.426 9.96276 56.6548 9.56237C54.1205 9.18552 52.5573 6.99513 52.9362 4.475H52.9126ZM66.0578 2.44947L72.737 4.82829L72.2633 6.17079L67.1473 4.33368L66.4604 6.19434L69.5158 7.27776L69.0184 8.62026L65.9631 7.53684L65.1341 9.79789L70.7238 11.7999L70.2264 13.1659L63.0735 10.6222L66.0341 2.42592L66.0578 2.44947Z"
              fill="#706D5F"
            ></path>
          </svg>
          <svg
            class="badge-2"
            width="73"
            height="72"
            viewBox="0 0 73 72"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <g clip-path="url(#clip0_1648_3520)">
              <path
                d="M30.5242 37.437C31.0291 37.2615 31.4818 36.8929 31.8823 36.3488C32.2827 35.8047 32.6832 34.9798 33.0836 33.8741H34.4765L32.5091 40.719H19.625L20.4259 37.7002L25.2487 34.6288C27.5121 33.1896 29.201 31.8031 30.3327 30.4517C31.4644 29.1003 32.0216 27.7313 32.0216 26.3097C32.0216 25.3444 31.7256 24.5897 31.1162 24.0456C30.5068 23.5016 29.6363 23.2207 28.4871 23.2207C27.1813 23.2207 26.1715 23.5542 25.4576 24.2211C24.7612 24.8881 24.2389 25.8358 23.9081 27.0644H22.5152C22.759 25.1689 23.438 23.642 24.5349 22.4661C25.6318 21.2901 27.251 20.7285 29.3751 20.7285C31.064 20.7285 32.4917 21.1322 33.6582 21.9395C34.8247 22.7469 35.3993 23.993 35.3993 25.6779C35.3993 26.8889 35.1033 27.9946 34.4939 29.0125C33.9019 30.0305 32.9966 31.0133 31.8126 31.9786C30.6287 32.9439 29.0617 33.997 27.1117 35.1729L22.9679 37.6827H28.4871C29.3403 37.6827 30.0193 37.5949 30.5242 37.4019V37.437Z"
                fill="#706D5F"
              ></path>
              <path
                d="M38.953 39.4378C37.8561 38.3145 37.3164 36.6823 37.3164 34.5235C37.3164 32.5578 37.6646 30.5044 38.3436 28.3632C39.0227 26.222 40.0499 24.3967 41.408 22.94C42.766 21.4657 44.3678 20.7461 46.2308 20.7461C48.0067 20.7461 49.4344 21.3077 50.5313 22.431C51.6282 23.5542 52.1679 25.1865 52.1679 27.3452C52.1679 29.3109 51.8197 31.3644 51.1407 33.5056C50.4616 35.6643 49.4344 37.4721 48.0763 38.9288C46.7183 40.4031 45.1165 41.1227 43.2535 41.1227C41.3906 41.1227 40.0499 40.561 38.953 39.4378ZM47.4495 36.3664C48.3375 35.4713 48.9991 34.3656 49.417 33.0493C49.8348 31.7505 50.0438 30.4693 50.0438 29.2407C50.0438 27.7489 49.6433 26.5203 48.825 25.555C48.0067 24.5897 46.8576 24.1159 45.3602 24.1159C44.0196 24.1159 42.9053 24.5722 42.0173 25.4673C41.1294 26.3624 40.4678 27.4681 40.0499 28.7844C39.6321 30.0832 39.4231 31.3644 39.4231 32.5929C39.4231 34.0848 39.8236 35.3133 40.6419 36.2786C41.4428 37.2439 42.6093 37.7178 44.1067 37.7178C45.4473 37.7178 46.5616 37.2615 47.4495 36.3664Z"
                fill="#706D5F"
              ></path>
              <path
                d="M27.9318 54.2861H26.835V51.8992L24.293 48.5996H25.651L27.4095 50.9163L29.1506 48.5996H30.3694L27.9144 51.8816V54.2861H27.9318Z"
                fill="#706D5F"
              ></path>
              <path
                d="M32.0234 48.5996H35.1748C36.411 48.5996 37.1074 49.1788 37.1074 50.302C37.1074 51.0743 36.7244 51.6184 35.9931 51.8465L37.3163 54.3036H36.1846L34.9136 51.9694H33.0855V54.3036H32.0234V48.6172V48.5996ZM33.0855 49.5474V51.0041H35.0878C35.6971 51.0041 36.0105 50.7584 36.0105 50.2845C36.0105 49.758 35.6971 49.5474 35.0878 49.5474H33.0855Z"
                fill="#706D5F"
              ></path>
              <path
                d="M40.0661 50.0913C40.0661 50.4774 40.3969 50.7056 40.9889 50.7758C41.3371 50.8109 41.5982 50.846 41.9813 50.8811C43.0956 50.9864 43.9835 51.4427 43.9835 52.6186C43.9835 53.6365 43.1826 54.3912 41.5808 54.3912C39.7527 54.3912 39.0214 53.4435 38.8125 52.6361H39.9442C40.1009 53.0047 40.5536 53.4786 41.5808 53.4786C42.434 53.4786 42.8866 53.1451 42.8866 52.6888C42.8866 52.1447 42.4862 51.9692 41.9116 51.899L40.9192 51.7937C39.8049 51.6884 39.004 51.1443 39.004 50.1264C39.004 49.1084 39.9094 48.4941 41.2674 48.4941C43.0433 48.4941 43.705 49.3366 43.8617 50.0737H42.7822C42.6081 49.7929 42.2076 49.4068 41.2674 49.4068C40.5014 49.4068 40.0835 49.67 40.0835 50.0913H40.0661Z"
                fill="#706D5F"
              ></path>
            </g>
            <g clip-path="url(#clip1_1648_3520)">
              <path
                d="M43.7581 71.215C42.7533 71.215 41.7234 70.8882 40.7186 70.2095C37.8047 68.2739 35.0667 68.299 32.1528 70.2095C29.5403 71.944 26.8022 71.3659 25.0187 68.6761C23.0594 65.7099 20.3967 64.3021 16.8799 64.4027L15.85 64.453C13.112 64.6038 11.027 62.6682 10.8261 60.0036C10.5246 56.0318 8.5904 53.3421 4.92292 51.7584C3.69205 51.2305 2.76261 50.2753 2.28534 49.0938C1.80806 47.9123 1.8583 46.58 2.41094 45.3231C4.0186 41.7033 3.59157 38.4354 1.12983 35.3434C0.250636 34.2373 -0.126161 32.9805 0.024558 31.7236C0.175277 30.4415 0.90375 29.2349 2.05926 28.33C4.59636 26.3441 5.80211 23.8303 5.72675 20.6378C5.72675 20.1853 5.65139 19.7328 5.57603 19.2804C5.29971 17.747 5.57603 16.3644 6.27938 15.3086C7.00786 14.2528 8.21361 13.5489 9.77103 13.2976C12.5593 12.8199 14.6192 11.4374 16.0761 9.04928C16.5031 8.34542 16.8297 7.51588 17.0809 6.78688C18.0354 4.02172 20.5977 2.71456 23.3357 3.61952C27.0534 4.85127 30.2437 4.14741 33.0822 1.43253C35.0918 -0.503079 37.8047 -0.477942 39.8394 1.43253C42.6528 4.12227 45.8179 4.85127 49.5105 3.61952C50.8921 3.16704 52.2235 3.24245 53.379 3.82062C54.5345 4.39879 55.3634 5.42944 55.8156 6.81202C57.0213 10.4821 59.458 12.5937 63.251 13.2976C66.2403 13.8506 67.848 16.1633 67.3456 19.2049C66.7176 22.9505 67.848 25.9167 70.8121 28.3048C73.2738 30.2656 73.6004 33.0307 71.6662 35.4942C69.33 38.5108 68.9281 41.653 70.4102 45.122C71.6411 47.9877 70.6111 50.5769 67.7475 51.8589C64.2558 53.4175 62.4221 56.0067 62.0955 59.7773C61.8443 62.7687 59.7845 64.5787 56.8204 64.453L56.0417 64.4027C52.4998 64.3273 49.7868 65.7601 47.8526 68.7013C46.9985 70.0336 45.8682 70.8631 44.6122 71.1145C44.3358 71.1648 44.0344 71.1899 43.7581 71.1899V71.215ZM17.1814 61.914C21.4015 61.914 24.7424 63.724 27.1037 67.3187C28.1336 68.8521 29.2891 69.1286 30.7712 68.1482C34.5391 65.6596 38.3322 65.6596 42.1002 68.1482C42.8287 68.6258 43.5069 68.8269 44.1098 68.7013C44.7126 68.5756 45.2653 68.1231 45.7677 67.3689C48.1792 63.6988 51.6457 61.914 56.1422 61.9392L56.9711 61.9895C58.5285 62.0649 59.458 61.2353 59.6087 59.6265C60.0106 54.9257 62.397 51.5573 66.7427 49.6217C68.3504 48.8927 68.8025 47.7866 68.1243 46.1778C66.2654 41.8541 66.7929 37.7566 69.7068 34.0111C70.787 32.6285 70.6363 31.4219 69.2547 30.3159C65.5621 27.3747 64.1051 23.5035 64.8838 18.853C65.1601 17.1688 64.4819 16.1381 62.824 15.8365C58.1015 14.9818 54.9615 12.2166 53.4543 7.6667C53.2031 6.93771 52.8012 6.40981 52.2486 6.1333C51.6959 5.85678 51.0428 5.83164 50.3144 6.08302C45.7174 7.59129 41.6229 6.66119 38.1313 3.31786C37.0762 2.31235 35.8956 2.31235 34.8406 3.31786C31.3238 6.68633 27.179 7.61643 22.557 6.08302C21.1503 5.6054 19.9697 6.23385 19.4673 7.69184C19.1658 8.54652 18.789 9.55204 18.2364 10.457C16.4027 13.4233 13.6897 15.2332 10.2232 15.8365C9.344 15.9873 8.716 16.3141 8.36433 16.8169C8.01265 17.3196 7.91217 18.0235 8.06289 18.9033C8.16337 19.4815 8.23873 20.0596 8.26385 20.6378C8.33921 24.6347 6.78178 27.9026 3.64181 30.3661C3.01381 30.8689 2.63702 31.4471 2.56166 32.0755C2.4863 32.6537 2.68725 33.257 3.13941 33.8351C6.1789 37.6812 6.73154 41.9044 4.74708 46.404C4.47076 47.0325 4.44564 47.6609 4.67172 48.2391C4.8978 48.7921 5.32483 49.2446 5.95283 49.496C10.4995 51.4567 13.0115 54.9509 13.3632 59.8527C13.4636 61.1599 14.4182 62.0649 15.7998 61.9895H16.2519C16.4529 61.9392 16.6539 61.9392 16.8548 61.9392C16.9804 61.9392 17.106 61.9392 17.2065 61.9392L17.1814 61.914Z"
                fill="#706D5F"
              ></path>
            </g>
            <defs>
              <clipPath id="clip0_1648_3520">
                <rect
                  width="32.5236"
                  height="33.6451"
                  fill="white"
                  transform="translate(19.625 20.7461)"
                ></rect>
              </clipPath>
              <clipPath id="clip1_1648_3520">
                <rect
                  width="72.8976"
                  height="71.2154"
                  fill="white"
                ></rect>
              </clipPath>
            </defs>
          </svg>
          <svg
            class="badge-3"
            width="77"
            height="64"
            viewBox="0 0 77 64"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M6.78978 59.7752C6.78978 57.3862 8.4998 55.5756 10.8888 55.5756C13.4035 55.5756 14.4597 57.2605 14.6861 58.2161H13.1018C12.8503 57.7886 12.1965 56.9839 10.8888 56.9839C9.35481 56.9839 8.37407 58.2664 8.37407 59.7752C8.37407 61.2841 9.35481 62.5666 10.8888 62.5666C12.2971 62.5666 12.9257 61.7619 13.1269 61.3344H14.6861C14.51 62.1894 13.5041 63.9749 10.8888 63.9749C8.4998 63.9749 6.78978 62.1391 6.78978 59.7752ZM24.1666 63.8491H17.6031V55.7014H19.1371V62.466H24.1666V63.8491ZM26.8574 55.7014H28.4165V63.8491H26.8574V55.7014ZM31.8114 55.7014H38.4V57.0342H33.3454V58.8951H36.3631V60.2279H33.3454V62.466H38.8526V63.824H31.7862V55.6762L31.8114 55.7014ZM49.2134 63.8743H48.0063L43.0523 57.6377V63.8491H41.5686V55.7014H43.354L47.7297 61.2841V55.7014H49.2134V63.8743ZM51.9041 55.7014H59.901V57.0845H56.657V63.8491H55.123V57.0845H51.879V55.7014H51.9041ZM63.7988 57.8389C63.7988 58.3921 64.2766 58.7191 65.1316 58.8196C65.6346 58.8699 66.0118 58.9202 66.565 58.9705C68.1745 59.1214 69.457 59.7752 69.457 61.4601C69.457 62.9187 68.3002 64 65.9866 64C63.3462 64 62.29 62.642 61.9882 61.4853H63.6228C63.8491 62.0134 64.5029 62.6923 65.9866 62.6923C67.2189 62.6923 67.8727 62.2145 67.8727 61.5607C67.8727 60.7811 67.2943 60.5297 66.4644 60.4291L65.031 60.2782C63.4216 60.1273 62.2648 59.3477 62.2648 57.8892C62.2648 56.4306 63.5725 55.5505 65.534 55.5505C68.099 55.5505 69.0546 56.7576 69.2809 57.8138H67.7218C67.4703 57.4114 66.8919 56.8582 65.534 56.8582C64.4275 56.8582 63.824 57.2354 63.824 57.8389H63.7988ZM30.0259 18.7851H47.6291V23.0601H34.7536V29.4727C35.7847 28.4417 37.4695 27.5112 40.0346 27.5112C44.7623 27.5112 48.6601 30.8306 48.6601 36.4637V36.7654C48.6601 42.1721 44.8377 46.0699 38.6766 46.0699C31.912 46.0699 28.8943 41.8452 28.6931 37.7462H33.6723C33.8735 39.2299 35.1811 41.5937 38.6515 41.5937C41.644 41.5937 43.6055 39.5568 43.6055 36.7906V36.514C43.6055 33.5969 41.6692 31.7108 38.6515 31.7108C35.6338 31.7108 34.653 33.3705 34.3513 33.9489H30.0008V18.7851H30.0259ZM10.0841 46.2963C3.19371 46.2963 0.301768 41.9961 0 38.3497H5.02947C5.33124 39.9088 6.84008 41.82 10.0841 41.82C13.3281 41.82 15.1136 40.3866 15.1136 37.9725C15.1136 35.5583 13.5293 34.2255 10.7631 34.2255H5.70845V29.8499H10.6122C12.9257 29.8499 14.3088 28.668 14.3088 26.455C14.3088 24.242 12.5988 22.9344 9.9332 22.9344C7.0664 22.9344 5.80904 24.5941 5.50727 26.2287H0.578389C0.704126 22.6326 3.67151 18.5587 9.90806 18.5587C16.1446 18.5587 19.3635 21.5513 19.3635 26.1281C19.3635 29.2715 17.2762 31.0318 15.6919 31.6354C17.7037 32.2389 20.1933 34.1752 20.1933 38.2994C20.1933 43.1026 16.4967 46.3214 10.1092 46.3214L10.0841 46.2963ZM76.2216 28.4668V36.4134C76.2216 42.7505 72.3238 46.3466 66.3638 46.3466C60.4039 46.3466 56.5061 42.7505 56.5061 36.4134V28.4668C56.5061 22.2554 60.3285 18.5336 66.3638 18.5336C72.3992 18.5336 76.2216 22.2805 76.2216 28.4668ZM71.2424 36.3379V28.5422C71.2424 25.3737 69.5827 23.0601 66.3638 23.0601C63.145 23.0601 61.4853 25.3737 61.4853 28.5422V36.3379C61.4853 39.5065 63.0695 41.82 66.3638 41.82C69.6581 41.82 71.2424 39.5065 71.2424 36.3379ZM18.3576 6.86523C17.8295 4.47623 19.2377 2.36385 21.6016 1.83576C23.9654 1.30766 26.1532 2.61532 26.6813 5.00432C27.2094 7.36817 25.8012 9.5057 23.4373 10.0338C21.0483 10.5619 18.8857 9.25422 18.3576 6.86523ZM25.1473 5.33124C24.8204 3.8224 23.4876 2.8165 21.9033 3.19371C20.3191 3.57092 19.5646 5.00432 19.8916 6.51316C20.2436 8.04715 21.5261 9.0279 23.1104 8.67583C24.6947 8.32377 25.4743 6.86523 25.1222 5.35639L25.1473 5.33124ZM34.1501 8.39921L32.6161 8.4998L28.4668 0.603536L30.2271 0.4778L33.2951 6.51316L35.4829 0.100589L37.0672 0L34.1752 8.39921H34.1501ZM40.613 0.125737L47.1764 0.628684L47.0758 1.96149L42.0464 1.58428L41.8955 3.44519L44.888 3.67151L44.7874 5.00432L41.7949 4.778L41.6189 7.01611L47.101 7.44361L47.0004 8.80157L39.9843 8.27348L40.613 0.176031V0.125737ZM51.2754 1.20707L55.7265 2.21297C57.4617 2.61532 58.2664 3.62122 57.9143 5.2055C57.6629 6.28684 56.9587 6.91552 55.8523 6.99096L56.9587 10.8385L55.3745 10.4864L54.3183 6.81493L51.7532 6.23654L51.024 9.5057L49.5151 9.17878L51.3006 1.23222L51.2754 1.20707ZM52.4825 2.8668L52.0299 4.90373L54.8464 5.53242C55.7014 5.7336 56.2295 5.48212 56.3804 4.82829C56.5312 4.09902 56.1792 3.69666 55.3242 3.49548L52.5077 2.8668H52.4825Z"
              fill="#706D5F"
            ></path>
          </svg>
        </div>
        <div class="spacer medium"></div>
        <h2>We're good <br />company.</h2>
        <a
          href="/services"
          class="btn dark large-only"
        >
          <SvgButtonArrow /> OUR SERVICES
        </a>
      </div>

      <div class="col">
        <h3>a promise from our founder</h3>
        <p>At DesignScout, we blend your real story with our one-of-a-kind creative perspective. This means evergreen, bespoke branding that builds culture and confidence in your company.</p>
        <p>You can trust that you are partnering with a creative firm that shares your values. We are a collective of creatives who value fostering work days worth living, building a more sustainable planet, and making space for diverse and minority entrepreneurship.</p>
        <p>It’s these values that nurture the well-rested, inspired, and motivated team of thinkers who are ready to build your amazing brand. Good companies produce better work. That’s DSAF.</p>
        <div class="scout-signature">
          <SvgScoutSignature />
        </div>
        <div class="spacer medium small-only"></div>
        <a
          href="/services"
          class="btn dark small-only"
        >
          <SvgButtonArrow /> OUR SERVICES
        </a>
      </div>
    </div>

    <div
      id="wp-block-themeisle-blocks-advanced-columns-8bf111e0"
      class="wp-block-themeisle-blocks-advanced-columns has-2-columns has-desktop-equal-layout has-tablet-equal-layout has-mobile-collapsedRows-layout has-vertical-unset sticker-container"
    >
      <div class="wp-block-themeisle-blocks-advanced-columns-overlay"></div>
      <div
        id="wp-block-themeisle-blocks-advanced-column-1f8cc5f6"
        class="wp-block-themeisle-blocks-advanced-column sticker-container-left-col"
      >
        <figure class="gb-block-image gb-block-image-8f2c15b6"><img
            decoding="async"
            alt="Rigby, Our favorite pooch"
            title="rigby"
            class="lazyloaded"
            src="~/assets/images/rigby.webp"
            sizes="(max-width: 1082px) 100vw, 1082px"
          ></figure>
        <div class="true-north-pennant">
          <div class="gb-inside-container">
            <figure class="gb-block-image gb-block-image-4ef428f0"><img
                decoding="async"
                alt="True North Pennant"
                title="True North Pennant"
                class="lazyloaded"
                src="~/assets/images/True-North_Pennant-300x121.webp"
                sizes="(max-width: 300px) 100vw, 300px"
              ></figure>
          </div>
        </div>
      </div>
      <div
        id="wp-block-themeisle-blocks-advanced-column-8de909fc"
        class="wp-block-themeisle-blocks-advanced-column sticker-container-right-col"
      >
        <div
          style="color:#ddd"
          class="wp-block-genesis-blocks-gb-spacer spacer gb-block-spacer gb-divider-solid gb-divider-size-1"
        >
        </div>
        <div class="gb-container gb-container-e0a2e451 swing-break-badge">
          <div class="gb-inside-container">
            <figure class="gb-block-image gb-block-image-f9504443"><img
                decoding="async"
                alt="Swing Break Badge"
                title="Swing Break Badge"
                class="lazyloaded"
                src="~/assets/images/Swing-Break_Badge-300x300.webp"
                sizes="(max-width: 300px) 100vw, 300px"
              ></figure>
          </div>
        </div>
        <figure class="gb-block-image gb-block-image-bb48548a"><img
            decoding="async"
            alt="Scout and Dana"
            title="scout_and_dana"
            class="lazyloaded"
            src="~/assets/images/scout_and_dana.webp"
            sizes="(max-width: 1694px) 100vw, 1694px"
          ></figure>
        <div class="gb-container gb-container-b19d7f12 keep-going-badge">
          <div class="gb-inside-container">
            <figure class="gb-block-image gb-block-image-5e58cec6"><img
                decoding="async"
                alt="Keep Going Badge"
                title="Keep Going Badge"
                class="lazyloaded"
                src="~/assets/images/Keep-Going_Badge-300x300.webp"
                sizes="(max-width: 300px) 100vw, 300px"
              ></figure>
          </div>
        </div>
      </div>
    </div>

    <div class="is-layout-constrained wp-block-group work-life-container out-of-sight">
      <div class="is-nowrap is-layout-flex wp-container-4 wp-block-group two-cols">
        <div class="is-vertical is-layout-flex wp-container-2 wp-block-group col left-col">
          <div class="gb-container gb-container-1c637f9d">
            <div class="gb-inside-container">
              <div class="gb-container gb-container-156b4540 headline-grid">
                <div class="gb-inside-container flex-col">
                  <h3 class="gb-headline gb-headline-f7f69639 gb-headline-text top">NO #RISEANDGRIND<br>PLATITUDES HERE.</h3>
                  <h2 class="gb-headline gb-headline-2e3b77a6 gb-headline-text no-pad-btm">Strong <br><span
                      ref="strike"
                      class="strike-animate"
                    >work</span> rest <br>ethic.</h2>
                  <h3 class="gb-headline gb-headline-1d3468b2 gb-headline-text bottom">VALUE TIME OFF<br>AND WORK TO LIVE.</h3>
                  <div class="spacer xsmall small-only"></div>
                  <svg
                    class="small-only"
                    width="25"
                    height="2"
                    viewBox="0 0 25 2"
                    fill="none"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <line
                      x1="25"
                      y1="0.75"
                      y2="0.75"
                      stroke="#303A3E"
                      stroke-width="1.5"
                    />
                  </svg>
                  <div class="spacer xsmall small-only"></div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <a
              href="/camp-diary"
              class="btn dark large-only"
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
              CAMP DIARY
            </a>
          </div>
        </div>
        <div class="is-vertical is-layout-flex wp-container-3 wp-block-group right-col">
          <p>At DesignScout, we are actively working to end the culture of toxicity and burnout that is endemic to our industry. We value work as much as we value rest because a well-rested team produces better, more inspired work for you. Full stop.</p>
          <div class="spacer">
          </div>
          <a
            href="/camp-diary"
            class="btn dark small-only"
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
            CAMP DIARY
          </a>
        </div>
      </div>
    </div>

    <div class="spacer medium small-only"></div>
    <div class="divider dark small-only"></div>

    <TheTroop />
    <div class="faq-container large-width">
      <h2>Why us?</h2>
      <faq-accordion :faqs="faqs" />
    </div>

    <div class="spacer"></div>

    <form
      name="about_page_contact_form"
      id="about_page_form"
      @submit.prevent="submitForm"
      class="compact-width"
    >
      <h2>Ready to go?</h2>
      <input
        type="hidden"
        name="form-name"
        value="about_page_contact_form"
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

    <BackToTop />
  </div>
</template>

<script>
import FormSelect from "~/components/FormSelect.vue";
import { renderRichText } from "@storyblok/js";
import FaqAccordion from "~/components/AboutFaqAccordion.vue";
import BackToTop from "../components/BackToTop.vue";
import { createClient } from "@supabase/supabase-js";

const router = useRouter();

const supabase = createClient(
  "https://iczlbprulhvmcurwvlpc.supabase.co",
  "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImljemxicHJ1bGh2bWN1cnd2bHBjIiwicm9sZSI6ImFub24iLCJpYXQiOjE2NzcyMjY3OTMsImV4cCI6MTk5MjgwMjc5M30.wrsCth3lERjtxRycOFfScmkznIEp_cz2NF_oGuWojJ4"
);

export default {
  components: {
    FormSelect,
  },
  data() {
    return {
      pageName: "about",
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
  setup() {
    const pageTitle = ref("About Us");

    useHead({
      title: pageTitle.value,
    });

    return { pageTitle };
  },
  mounted() {
    this.handleScroll(); // Call handleScroll() to set the initial state of the navbar
    window.addEventListener("scroll", this.handleScroll);

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("strike-animate-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        rootMargin: "-50% 0px -50% 0px",
        threshold: 0,
      }
    );

    observer.observe(this.$refs.strike);
  },
  methods: {
    async submitForm() {
      console.log("Submitting...");
      if (!this.email) {
        return;
      }

      try {
        const { data, error } = await supabase.from("about_page_form").insert([
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
    handleScroll() {
      const el = document.querySelector(".about-hero");
      const navbar = document.querySelector(".navbar");
      const navbarHeight = window.innerWidth < 768 ? 94 : 104;
      const elRect = el.getBoundingClientRect();
      const navbarRect = navbar.getBoundingClientRect();

      if (
        navbarRect.bottom - navbarHeight / 2 > elRect.top &&
        navbarRect.top + navbarHeight / 2 < elRect.bottom &&
        navbarRect.right > elRect.left &&
        navbarRect.left < elRect.right
      ) {
        navbar.classList.remove("light");
        navbar.classList.remove("scrolling");
        navbar.classList.add("prevent-nav");
      } else {
        navbar.classList.add("light");
        if (window.scrollY > 0) {
          navbar.classList.add("scrolling");
        }
      }
    },
  },
  components: {
    FaqAccordion,
    BackToTop,
  },
  // Other properties and methods go here
};
</script>

  