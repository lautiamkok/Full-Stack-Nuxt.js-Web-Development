'use strict'

import useF3tch from '@/composables/use-f3tch'

async function getItem (namespace, root, args) {
  const { data, error } = await useF3tch(`${namespace}${args.slug}`)
  return data
}

// Use offset-based pagination for projects.
async function getItems (namespace, root, args) {
  // Set default limit and currentPage if not provided.
  const limit = args.limit ? args.limit : 6
  const currentPage = args.page > 0 ? args.page : 1

  const query = {
    page_number: currentPage,
    posts_per_page: limit
  }

  const { data, error } = await useF3tch(`${namespace}`, {
    method: 'POST',

    // No need to use JSON.stringify to stringify user reactive object if using
    // `ofetch`.
    body: query
  })

  // Only two data to take from the result.
  const nodes = data.items
  const totalPages = data.total_pages

  // Populate pageInfo.
  const nextPage = currentPage + 1
  const previousPage = currentPage - 1
  const hasPreviousPage = previousPage > 0
  const hasNextPage = nextPage <= totalPages

  // Populate the node and cursor.
  const edges = nodes.map((edge) => {
    return {
      node: edge,
      cursor: edge.ID
    }
  })

  return {
    edges,
    pageInfo: {
       currentPage,
       previousPage,
       nextPage,
       hasPreviousPage,
       hasNextPage,
       totalPages
    },
  }
}

async function countItems (namespace, root, args) {
  const query = {
    count_only: true
  }

  const { data: total, error } = await useF3tch(`${namespace}`, {
    method: 'POST',
    body: query
  })

  return total
}

export {
  getItem,
  getItems,
  countItems
}
