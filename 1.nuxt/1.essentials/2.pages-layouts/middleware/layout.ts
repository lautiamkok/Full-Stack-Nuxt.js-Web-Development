// https://nuxt.com/docs/guide/directory-structure/middleware
// https://nuxt.com/docs/api/utils/set-page-layout#setpagelayout

// Create a dummy data of your blog.
const posts = [
  {
    slug: 'post-1',
    layout: 'light'
  },
  {
    slug: 'post-2',
    layout: 'dark'
  },
  {
    slug: 'post-3',
  }
]

export default defineNuxtRouteMiddleware((to, from) => {
  let found = posts.find(post => post.slug === to.params.slug)
  if (!found) {
    return
  }
  setPageLayout(found.layout)
})
