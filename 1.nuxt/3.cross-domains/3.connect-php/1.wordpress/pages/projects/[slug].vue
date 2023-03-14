<template>
  <div v-if="post">
    <h2>
      {{ post.post_title }}
    </h2>
    <div 
      v-html="post.post_content"
    />

    <ul>
      <li v-for="carousel in post.carousels" v-bind:key="carousel.id">
        <h3>
          {{ carousel.title }}
        </h3>
        <div 
          v-html="carousel.description"
        />

        <ul>
          <li v-for="image in carousel.images" v-bind:key="image.id">
            <img 
              :alt="image.title" 
              :src="useAsset(image.data.sizes.medium.url)"
            />
          </li>
        </ul>
      </li>
    </ul>

    <ul>
      <li v-for="image in post.images" v-bind:key="image.id">
        <img 
          :alt="image.title" 
          :src="useAsset(image.data.sizes.medium.url)"
        />
      </li>
    </ul>
  </div>

  <error-handler 
    v-else 
    v-bind:error="error" 
  />
</template>

<script setup>
const route = useRoute()
const slug = route.params.slug
const { data: post, error } = await useF3tch(`/wp-json/api/v1/project/${slug}`)

if (post.value) {
  const head = unref(post).head

  // Override the default head meta.
  useHead({
    title: head.title,
    meta: [
      {
        name: 'description',
        content: head.description
      },
      {
        property: 'og:title',
        content: head.og.title
      },
      {
        property: 'og:description',
        content: head.og.description
      },
      {
        property: 'og:image',
        content: head.og.image
      },
      {
        name: 'twitter:description',
        content: head.og.description
      },
    ],
  })
}
</script>
