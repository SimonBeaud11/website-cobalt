import { container, grid } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'
import { objByProperty } from '/src/lib/Data'
import { loadStatic } from 'hyperstatic'
import Newsletter from '/src/components/core/Newsletter'
import { articleItem } from '/src/components/core/CardItem'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const HandleArticles = (state, data) => ({
  ...state,
  articlelist: data.articles,
  contents: {
    ...state.contents,
    articles: data.contents
  }
})

// Fetch articles
export const init = (state) => [
  {
    ...state,
    articlelist: state.articlelist ?? [],
    contents: {
      ...state.contents,
      articles: [],
    },
  },
  loadStatic({
    loader: async () => {
      const response = await fetch(`https://admin.cobalt-it.ch/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query ($articlesID: Int!, $contentsID: Int!) {
              posts(first: 999, where: {categoryId: $articlesID}) {
                nodes {
                  slug
                  date
                  title
                  excerpt
                }
              }
              contents(where: {categoryId: $contentsID}) {
                nodes {
                  databaseId
                  content
                }
              }
            }`,
          variables: {
            'articlesID': 2,
            'contentsID': 10
          },
        }),
      })
        .then((res) => res.json())
      const simplifiedArticles = response.data.posts.nodes.map((post) => {
        // date formatting
        const date = new Date(post.date)
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }

        return {
          slug: post.slug,
          time: post.date,
          date: date.toLocaleDateString('fr-CH', dateOptions),
          title: post.title,
          excerpt: post.excerpt,
        }
      })
      const simplifiedContents = response.data.contents.nodes
      const simplified = {
        articles: simplifiedArticles,
        contents: simplifiedContents
      }
      return simplified
    },
    action: HandleArticles,
    error: (state) => state
  })
]

// View
const h1 = css({
  marginBlockEnd: '$5',
  '& + *': {
    paddingBlockEnd: '$6',
  },
})

const ArticleList = (state) => {
  document.title = 'Articles — azur marketing & communication sàrl'
  document.querySelector('[property="og:title"]').setAttribute('content', "Articles — azur marketing & communication sàrl")
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://cobalt-it.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)

  const contents = state.contents.articles

  return (
    <div className={container}>
      <x className={h1} innerHTML={contents.find(objByProperty('databaseId', 83)).content} />
      <div className={grid}>
        {state.articlelist.map((article) => articleItem(article))}
      </div>
      <aside>{Newsletter(state)}</aside>
    </div>
  )
}

export default ArticleList
