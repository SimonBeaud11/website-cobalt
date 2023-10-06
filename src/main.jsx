// external imports
import '/src/styles/external.css'
import globalStyles from '/src/styles/base.css'
globalStyles()

// subs
import { every, HeadingIndexLoop, scrollTop } from '/src/subs'

// Hyperstatic runtime
import { hyperstatic, loadStatic } from 'hyperstatic'

// Root view
import Loader from '/src/components/core/Loader'
import App from '/src/components/core/App'

const routes = {
  '/': import('./pages/HomePage'),
  '/agence': import('./pages/Agency'),
  '/projets': import('./pages/ProjectList'),
  '/projets/:id': import('./pages/ProjectDetails'),
  '/articles': import('./pages/ArticleList'),
  '/articles/:id': import('./pages/ArticleDetails'),
  '/contact': import('./pages/Contact'),
  '/:splat*': import('./pages/NotFoundPage')
}

// All of these are optional
const options = {
  baseUrl: '/', // Path prefix
  loader: Loader, // Custom loading indicator in case of slow networks
  fastClicks: import.meta.env.PROD, // Enabled only in production to facilitate inspecting in the dev tools
  eagerLoad: true
}

// init state
const HandleApi = (state, data) => ({
  ...state,
  menus: data.menus,
  contents: {
    ...state.contents,
    everywhere: data.contents
  },
})

const state = [
  {
    currentHeadingIndex: 0,

    menus: [],
    contents: {
      everywhere: []
    },
  },
  loadStatic({
    path: 'globalFetch', // unique id string
    loader: async () => {
      const response = await fetch(`https://wp.azur-marketing.ch/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
          query($categoryID: Int!) {
              menus {
                nodes {
                  slug
                  menuItems {
                    nodes {
                      url
                      label
                    }
                  }
                }
              }
              contents(where: {categoryId: $categoryID}) {
                nodes {
                  databaseId
                  content
                }
              }
            }`,
          variables: {
            'categoryID': 13 // everywhere ID
          },
        }),
      })
        .then((res) => res.json())
      const simplifiedMenus = response.data.menus.nodes
      const simplifiedContents = response.data.contents.nodes
      const simplified = {
        menus: simplifiedMenus,
        contents: simplifiedContents,
      }
      return simplified
    },
    action: HandleApi,
    error: (state) => state
  })
]

hyperstatic({
  routes,
  options,
  init: state,
  view: App,
  subscriptions: () => [
    // loop through the headings on the homepage
    every(5000, HeadingIndexLoop),
    // check if url has changed. If so, set scroll position to top
    every(50, scrollTop)
  ],
})
