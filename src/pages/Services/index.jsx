import { container, grid, section, fullWidthContainer } from '/src/styles/utils.css'
import { objByProperty } from '/src/lib/Data'
import { loadStatic } from 'hyperstatic'
import { projectItem } from '/src/components/core/CardItem'

import { css } from '/src/styles/stitches.config'

import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

const HandleProjects = (state, data) => ({
  ...state,
  projectlist: data.projects,
  contents: {
    ...state.contents,
    projects: data.contents
  }
})

// Fetch projects
export const init = (state) => [
  {
    ...state,
    projectlist: state.projectlist ?? [],
    contents: {
      ...state.contents,
      projects: [],
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
            query ($servicesID: Int!, $contentsID: Int!) {
              posts(first: 999, where: {categoryId: $servicesID}) {
                nodes {
                  slug
                  title
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
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
            'servicesID': 16, // Remplacez par l'ID de la catégorie "services"
            'contentsID': 16, // Remplacez par l'ID de la catégorie "contents"
          },
        }),
      })
        .then((res) => res.json());
      const simplifiedProjects = response.data.posts.nodes.map((post) => ({
        slug: post.slug,
        title: post.title,
        featuredImage: post.featuredImage.node,
      }) )
      const simplifiedContents = response.data.contents.nodes
      const simplified = {
        projects: simplifiedProjects,
        contents: simplifiedContents
      }
      return simplified
    },
    action: HandleProjects,
    error: (state) => state
  })
]

// View
const sectionRefs = css({
  backgroundColor: '$accent',
  color: '$background',
})
const refs = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(4, 1fr)',
  gap: '$3',
  width: '100%',
  marginInlineStart: 'auto',
 '@tablet': {
    gap: '$4',
    width: 'calc(60% - $3)',
  },
  '& a': {
    opacity: 1,
    '&:hover': {
      '& img': {
        transform: 'scale(1.05) rotate(2deg)',              
      },
    },
  },
  '& img': {
    height: '100%',
    objectFit: 'contain',
    transition: '$fade',
  },
})
const h1 = css({
  marginBlockEnd: '$5',
  '& + *': {
    paddingBlockEnd: '$6',
  },
})

const Services = (state) => {
  const contents = state.contents.services
  document.title = 'Services — Cobalt Technologies Sàrl'
  document.querySelector('[property="og:title"]').setAttribute('content', "Cobalt Technologies Sàrl")
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)

  return (
    <div>


      <div className={section(sectionRefs)}>
        <div className={fullWidthContainer}>
          <h2>Services</h2>
        </div>
      </div>
    </div>
  )
}

export default Services
