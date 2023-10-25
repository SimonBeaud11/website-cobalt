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
      const response = await fetch(`https://admin.cobalt-it.ch/graphql`, {
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
    minHeight: '100vh',
  },
  '& .linkWrapper': {
    padding: '8px 20px 8px 20px',
    backgroundColor: 'transparent',
    color: '$background',
    width: 'max-content',
    transition: '$fade',
    border: '3px solid #FFFFFF',
    borderRadius: '9999px',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: '400',
    '&:hover': {
      background: '$gradient',
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
  maxHeight: '100vh',
  minHeight: '100vh',
  zIndex: '-2',
  objectFit: 'cover',
})
const bgVideoColor = css({
  width: '100%',
  height: '100%',
  maxHeight: '100vh',
  backgroundColor: '#0000004d',
  position: 'absolute',
  zIndex: '-1',
})
const scroll = css({
})

function HomePage(state) {
  document.title = 'Cobalt - Creative IT Engineering';
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href);

  const contents = state.contents.home;

  // Récupération de la vidéo de fond
  var headerContent = contents.find(objByProperty('databaseId', 1969)).content;
  const parser = new DOMParser();
  const doc = parser.parseFromString(headerContent, "text/html");
  const videoElement = doc.querySelector("video");
  const videoHtml = videoElement ? videoElement.outerHTML : null;
  const videoSource = videoElement.getAttribute('src');

  
  const headings = contents.filter(headings => headings.tags.nodes.find(objByProperty('databaseId', 12))).map(heading => (
    <x innerHTML={heading.content} />
  ))
  const bgImage = {
    backgroundImage: `url(${state.contents.home.find(objByProperty('databaseId', 91)).featuredImage.node.mediaItemUrl})`,
  }

  return (
    <div>
      <header className={header}>
        <div className={container}>
          <h1>Creative<br></br>IT Engineering</h1>
          <p>Nous imaginons, concevons et intégrons vos outils informatiques</p>
          <span className="linkWrapper button">
            <Link href="/contact">Contactez nous !</Link>
          </span>
        </div>
        <div class={scroll}>
          <svg id="Calque_1" data-name="Calque 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200">
            <path d="M32.4,100c0-8.87,0-17.74,0-26.62A67.62,67.62,0,0,1,86.14,6.75c36.64-8,73.64,16.73,80.24,53.76a74.74,74.74,0,0,1,1.19,12.58q.18,26.94,0,53.88a67.62,67.62,0,0,1-56.11,66.76c-35,6.28-69.79-16.86-77.33-51.64a85.5,85.5,0,0,1-1.69-15.49C32.21,117.74,32.4,108.86,32.4,100Zm121.7.13c0-1.06,0-2.12,0-3.17-.12-9.93.43-19.92-.47-29.77-3-33-36-55.29-68-46.34A53.94,53.94,0,0,0,46,72.65c-.1,18.24-.06,36.49,0,54.73a59.78,59.78,0,0,0,.84,9.24c4.51,28.25,33,48.71,61.21,44,27.38-4.62,46.06-26.69,46.08-54.48Q154.12,113.1,154.1,100.11Z"/>
            <path d="M106.77,52.88c0,4.23,0,8.46,0,12.68S104,72.93,100.06,73s-6.79-3-6.8-7.29q0-13,0-26c0-4.29,2.87-7.32,6.8-7.29s6.69,3.08,6.71,7.4S106.77,48.52,106.77,52.88Z"/>
          </svg>
        </div>
        <div className={bgVideoColor}></div>
        <video autoplay muted loop className={bgVideo}>
          <source src={videoSource} type="video/mp4"></source>
        </video>
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
