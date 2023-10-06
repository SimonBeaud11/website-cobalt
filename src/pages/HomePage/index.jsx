import { loadStatic, Link } from 'hyperstatic'
import { css } from '/src/styles/stitches.config'
import { objByProperty } from '/src/lib/Data'
import { container, grid, card, fullWidthContainer, section } from '/src/styles/utils.css'
import { articleItem, projectItem } from '/src/components/core/CardItem'
import { ParallaxProvider, Parallax } from 'react-scroll-parallax'


import AOS from 'aos'
import 'aos/dist/aos.css'
AOS.init()

// actions
const HandleHomeContents = (state, data) => ({
  ...state,
  articlelist: data.articles,
  projectlist: data.projects,
  contents: {
    ...state.contents,
    home: data.contents,
  },
})

// Fetch articles and projects
export const init = (state) => [
  {
    ...state,
    articlelist: state.articlelist ?? [],
    projectlist: state.projectlist ?? [],
    contents: {
      ...state.contents,
      home: [],
    },
  },
  loadStatic({
    loader: async () => {
      const response = await fetch(`https://wp.azur-marketing.ch/graphql`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          query: `
            query ($articlesID: Int!, $projectsID: Int!, $contentsID: Int!) {
              articles: posts(first: 999, where: {categoryId: $articlesID}) {
                nodes {
                  slug
                  date
                  title
                  excerpt
                }
              }
              projects: posts(first: 999, where: {categoryId: $projectsID}) {
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
                  tags {
                    nodes {
                      databaseId
                    }
                  }
                  featuredImage {
                    node {
                      mediaItemUrl
                      altText
                    }
                  }
                }
              }
            }`,
          variables: {
            'articlesID': 2,
            'projectsID': 3,
            'contentsID': 11,
          },
        }),
      })
        .then((res) => res.json())
      const simplifiedArticles = response.data.articles.nodes.map((post) => {
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
      const simplifiedProjects = response.data.projects.nodes.map((post) => ({
        slug: post.slug,
        title: post.title,
        featuredImage: post.featuredImage.node,
      }))
      const simplifiedContents = response.data.contents.nodes
      const simplified = {
        articles: simplifiedArticles,
        projects: simplifiedProjects,
        contents: simplifiedContents,
      }
      return simplified
    },
    action: HandleHomeContents,
    error: (state) => state,
  })
]

// View
const articleList = css({
  [`& .${card}`]: {
    '@tablet': {
      gridColumnStart: 2,
    },
  },
})
const header = css({
  color: '$background',
  paddingBlock: 'calc($6 - $4)',
  background: 'center no-repeat',
  backgroundSize: 'cover',
  minHeight: '100vh',
  display: 'flex',
  alignItems: 'center',
  '@tablet': {
    minHeight: '80vh',
  },
  '& .linkWrapper': {
    marginBlockStart: '$4',
    backgroundColor: '$background',
    color: '$text',
    width: 'max-content',
    transition: '$fade',
    '&:hover': {
      backgroundColor: '$accent',
      color: '$background',
    },
    '& a': {
      opacity: 1,
    }
  },
})
const offsetDiv = css({
  display: 'none',
  '@tablet': {
    display: 'initial',
  },
})
const bgVideo = css({
  position: 'absolute',
  top: '0',
  left: '0',
  width: '100%',
  height: 'auto',
  maxHeight: '80vh',
  minHeight: '80vh',
  zIndex: '-2',
  objectFit: 'cover',
})
const bgVideoColor = css({
  width: '100%',
  height: '100%',
  maxHeight: '80vh',
  backgroundColor: '#081636C7',
  position: 'absolute',
  zIndex: '-1',
})

function HomePage(state) {
  document.title = 'azur marketing & communication sàrl - Votre agence à Bulle';
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)

  const contents = state.contents.home
  const headings = contents.filter(headings => headings.tags.nodes.find(objByProperty('databaseId', 12))).map(heading => (
    <x innerHTML={heading.content} />
  ))
  const bgImage = {
    backgroundImage: `url(${state.contents.home.find(objByProperty('databaseId', 91)).featuredImage.node.mediaItemUrl})`,
  }

  return (
    <div>
      <header className={header} style={bgImage}>
        <div className={container}>
          {headings[state.currentHeadingIndex]}
          <span className="linkWrapper button">
            <Link href="/agence">Découvrir l'agence <span className="rightArr">↑</span></Link>
          </span>
        </div>
      </header>

      <div className={section}>
        <div className={fullWidthContainer}>
          <h2>Projets récents</h2>
          <Link href="/projets">Tous les projets <span className="rightArr">↑</span></Link>
        </div>

        <div className={container}>
          <div className={grid}>
            <div className={offsetDiv} />
            {state.projectlist.slice(0, 3).map((project) => projectItem(project))}
          </div>
        </div>
      </div>

      <div className={section + ' articles'}>
        <div className={fullWidthContainer}>
          <h2>Articles Cobalt</h2>
          <Link href="/articles">Tous les articles <span className="rightArr">↑</span></Link>
        </div>


      <div className={container}>
          <div className={grid(articleList)}>
            {state.articlelist.slice(0, 2).map((article) => articleItem(article))}
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage


/* <header className={header}>
        <div className={container}>
          {headings[state.currentHeadingIndex]}
          <span className="linkWrapper button">
            <Link href="/agence">Découvrir l'agence <span className="rightArr">↑</span></Link>
          </span>
        </div>
        <div className={bgVideoColor}></div>
        <video autoplay muted loop className={bgVideo}>
          <source src="https://jobby-sarl.ch/wp-content/uploads/2022/09/site-jobby-ae-480.mp4" type="video/mp4"></source>
        </video>
      </header> */

/* <header className={header} style={bgImage}>
        <div className={container}>
          {headings[state.currentHeadingIndex]}
          <span className="linkWrapper button">
            <Link href="/agence">Découvrir l'agence <span className="rightArr">↑</span></Link>
          </span>
        </div>
      </header> */
