<template>
  <div v-if="post">
    <h2>
      {{ post.post_title }}
    </h2>
    <div 
      v-html="post.post_content"
    />

    <h3>
      Post Carousels
    </h3>
    <ul>
      <li v-for="carousel in post.carousels" v-bind:key="carousel.id">
        <h3 v-if="carousel.title">
          {{ carousel.title }}
        </h3>
        <div
          v-if="carousel.description"
          v-html="carousel.description"
        />

        <ul>
          <li v-for="asset in carousel.assets" v-bind:key="asset.id">
            <img 
              :alt="asset.title || null" 
              :src="useAsset(asset.sizes.medium.url)"
            />
          </li>
        </ul>
      </li>
    </ul>

    <h3>
      Post Assets
    </h3>
    <ul>
      <li v-for="asset in post.assets" v-bind:key="asset.id">
        <img 
          :alt="asset.title || null" 
          :src="useAsset(asset.sizes.medium.url)"
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
        name: 'keywords',
        content: head.keywords
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
