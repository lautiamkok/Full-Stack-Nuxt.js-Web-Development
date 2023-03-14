// This is where project configuration and plugin options are located.
// Learn more: https://gridsome.org/docs/config

// Changes here require a server restart.
// To restart press CTRL + C in terminal and run `gridsome develop`

module.exports = {
  siteName: 'Gridsome',
  plugins: [
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'data/posts/**/*.md',
        typeName: 'Post',
        remark: {
          //Config options can be added here
        }
      }
    },
    {
      use: '@gridsome/source-filesystem',
      options: {
        path: 'data/pages/**/*.md',

        // The "Page" type has been deserved by Gridsome for handling pages in /src/pages/.
        // So use a different unique type name instead.
        typeName: 'MainPage',
        remark: {
          //Config options can be added here
        }
      }
    }
  ],
  transformers: {
    remark: {
      //Config options can be added here
    }
  },
  templates: {
    Post: [
      {
        path: '/blog/:title',
        component: './src/templates/Post.vue'
      },
      // {
      //   name: 'reviews',
      //   path: '/product/:slug/reviews',
      //   component: './src/templates/ProductReviews.vue'
      // }
    ]
  }
}
