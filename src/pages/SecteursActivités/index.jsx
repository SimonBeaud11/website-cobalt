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
            query ($projectsID: Int!, $contentsID: Int!) {
              posts(first: 999, where: {categoryId: $projectsID}) {
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
            'projectsID': 3,
            'contentsID': 7
          },
        }),
      })
        .then((res) => res.json())
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

const ProjectList = (state) => {
  const contents = state.contents.projects
  document.title = 'Projets — azur marketing & communication sàrl'
  document.querySelector('[property="og:title"]').setAttribute('content', "Projets — azur marketing & communication sàrl")
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)

  return (
    <div>
      <div className={container}>
        <x className={h1} innerHTML={contents.find( objByProperty('databaseId', 70) ).content} />
        <div className={grid}>
          {state.projectlist.map((project) => projectItem(project))}
        </div>
      </div>

      <div className={section(sectionRefs)}>
        <div className={fullWidthContainer}>
          <h2>Secteurs d'Acivités</h2>
        </div>

        <div className={container}>
          <x className={refs} innerHTML={contents.find( objByProperty('databaseId', 65) ).content} />
        </div>
      </div>
    </div>
  )
}

export default ProjectList
