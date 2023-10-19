import Loader from '/src/components/core/Loader'
import Newsletter from '/src/components/core/Newsletter'

import { loadStatic } from 'hyperstatic'

import { container, contentDetails } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'
import NextPrevious from '/src/components/core/NextPrevious'

const HandleArticle = (state, data) => ({
  ...state,
  articles: {
    ...state.articles,
    [data.slug]: data
  }
})

// Fetch articles details
export const init = (state, location) => [
  {
    ...state,
    articles: state.articles ?? {}
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
            query($slug: ID!) {
              post(id: $slug, idType: SLUG) {
                slug
                date
                title
                excerpt
                content

                next {
                  slug
                  title
                  excerpt
                  date
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                  categories {
                    nodes {
                      categoryId
                    }
                  }
                }
                
                previous {
                  slug
                  title
                  excerpt
                  date
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                  categories {
                    nodes {
                      categoryId
                    }
                  }
                }
              }
            }`,
          variables: {
            'slug': location.params.id,
          },
        }),
      })
        .then((res) => res.json())
      if (!response.data.post) {
        return window.location.href = '/404'
      }
      const nextPrevious = (nextprevious) => (response.data.post[nextprevious] && {
        slug: response.data.post[nextprevious].slug,
        title: response.data.post[nextprevious].title,
        excerpt: response.data.post[nextprevious].excerpt,
        time: response.data.post[nextprevious].date,
        get date() {
          return new Date(this.time).toLocaleDateString('fr-CH', { day: 'numeric', month: 'long', year: 'numeric' })
        },
        categoryId: response.data.post[nextprevious].categories.nodes[0].categoryId === 2 ? 2 : 3,
        get featuredImage() {
          return this.categoryId === 3 ? response.data.post[nextprevious].featuredImage.node : false
        }
      })
      const previousSimplified = nextPrevious('previous')
      const nextSimplified = nextPrevious('next')
      const simplified = () => {
        // date formatting
        const date = new Date(response.data.post.date)
        const dateOptions = { day: 'numeric', month: 'long', year: 'numeric' }

        return {
          slug: response.data.post.slug,
          time: response.data.post.date,
          date: date.toLocaleDateString('fr-CH', dateOptions),
          title: response.data.post.title,
          excerpt: response.data.post.excerpt,
          excerptRaw: response.data.post.excerpt.replaceAll(/<[^>]*>/g, ''),
          content: response.data.post.content,
          previous: previousSimplified,
          next: nextSimplified
        }
      }
      return simplified()
    },
    action: HandleArticle,
    error: (state) => state
  }),
]

// View
const wrapper = css({
  '& header': {
    paddingBlockEnd: '$6',
    '& > *:not(:last-child)': {
      marginBlockEnd: '$4',
    },
    '& p': {
      fontSize: '$1',
    },
  },
  '& .main': {
    paddingBlockStart: '$3',
    backgroundColor: '$background',
    color: '$text',
    '& x': {
      maxWidth: 'min(1200px, 100%)', // because container in container
      paddingBlockEnd: '$6',
    },
  }, 
  '& .newsletter, .nextPrevious': {
    backgroundColor: '$background',
    color: '$text',
  },
})

const ArticleDetails = (state) => {
  const article = state.articles[state.location.params.id]

  // seo
  document.title = article.title + ' — azur marketing & communication sàrl'
  document.querySelector('[property="og:title"]').setAttribute('content', article.title + ' — azur marketing & communication sàrl')
  document.querySelector('[name="description"]').setAttribute('content', article.excerptRaw)
  document.querySelector('[property="og:description"]').setAttribute('content', article.excerptRaw)
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)
  if (article.featuredImage == undefined) {
    document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
  } else {
    document.querySelector('[property="og:image"]').setAttribute('content', article.featuredImage);
  }


  if (!article) {
    return (
      <Loader />
    )
  }

  return (
    <div className={wrapper}>
      <div className={container}>
        <header>
          <h1>{article.title}</h1>
          <div>
            <x innerHTML={article.excerpt} />
          </div>
          <time dateTime={article.time}>{article.date}</time>
        </header>
      </div>
        
      <div className='main'>
        <article className={container}>
          <x className={container(contentDetails)} innerHTML={article.content} />
        </article>
      </div>

      <aside className='newsletter'>
        <div className={container}>
          {Newsletter(state)}
        </div>
      </aside>

      <div className=' nextPrevious'>
        <div className={container}>
          {NextPrevious(article)}
        </div>
      </div>      
    </div>
  )
}
export default ArticleDetails
