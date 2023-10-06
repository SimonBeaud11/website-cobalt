import Loader from '/src/components/core/Loader'

import { loadStatic } from 'hyperstatic'

import { container, contentDetails, constrained } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'
import NextPrevious from '/src/components/core/NextPrevious'

const HandleProject = (state, data) => ({
  ...state,
  projects: {
    ...state.projects,
    [data.slug]: data
  }
})

// Fetch projects details
export const init = (state, location) => [
  {
    ...state,
    projects: state.projects ?? {}
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
                title
                excerpt
                content
                featuredImage {
                  node {
                    mediaItemUrl
                    altText
                  }
                }

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
      const simplified = () => ({
        slug: response.data.post.slug,
        title: response.data.post.title,
        excerpt: response.data.post.excerpt,
        excerptRaw: response.data.post.excerpt.replaceAll(/<[^>]*>/g, ''),
        content: response.data.post.content,
        featuredImage: response.data.post.featuredImage.node,
        previous: previousSimplified,
        next: nextSimplified
      })
      return simplified()
    },
    action: HandleProject,
    error: (state) => state
  }),
]

// View
const wrapper = css({
  marginBlockEnd: '$6',
  '& img': {
    maxHeight: 'calc(100vh - $5)',
    objectFit: 'cover',
  },
  '& > * > h2, > img': {
    marginBlockEnd: '$4',
    '@tablet': {
      marginBlockEnd: '$5',
    },
  },
  '& x': {
    maxWidth: 'min(1200px, 100%)', // because container in container
    '& > :first-child': {
      marginBlockEnd: '$5',
      '@tablet': {
        marginBlockEnd: '$6',
      },
      '& > :first-child': {
        lineHeight: '$small',
        '& h2': {
          marginBlockEnd: '$1',
        },
      },
      '& > :last-child': {
        '@media (max-width: 599px)': {
          marginBlockStart: '$3',
        },
      },
    },
  },
})

const ProjectDetails = (state) => {
  const project = state.projects[state.location.params.id]
  
  // seo
  document.title = project.title + ' — azur marketing & communication sàrl'
  document.querySelector('[property="og:title"]').setAttribute('content', project.title + ' — azur marketing & communication sàrl')
  document.querySelector('[name="description"]').setAttribute('content', project.excerptRaw)
  document.querySelector('[property="og:description"]').setAttribute('content', project.excerptRaw)
  document.querySelector('[property="og:image"]').setAttribute('content', project.featuredImage.mediaItemUrl)
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)

  if (!project) {
    return (
      <Loader />
    )
  }

  return (
    <div>
      <div className={wrapper}>
        <div className={container}>
          <h1 className={constrained} innerHTML={project.title} />
        </div>
        
        <img src={project.featuredImage.mediaItemUrl} alt={project.featuredImage.altText}/>

        <article className={container}>
          <x className={container(contentDetails)} innerHTML={project.content} />
        </article>
      </div>
      
      <div className={container}>
        {NextPrevious(project)}
      </div>
    </div>
  )
}
export default ProjectDetails
