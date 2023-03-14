<template>
  <Layout>
    <h1 v-html="$page.post.title"></h1>
    <div v-html="$page.post.content">
    </div>
  </Layout>
</template>

<script>
export default {
  metaInfo () {
    return {
      title: this.$page.post.title
    }
  }
}
</script>

<page-query>
query ($id: ID!) {
  post(id: $id) {
    title
    content
  }
}
</page-query>
