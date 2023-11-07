import { loadStatic, Link } from 'hyperstatic'
import { css } from '/src/styles/stitches.config'
import { objByProperty } from '/src/lib/Data'
import { container, grid, flex, titleMargin, card, fullWidthContainer, section } from '/src/styles/utils.css'
import cLogo from '/src/assets/logo/c.svg'
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';



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
  '& p': {
    fontWeight: '300',
    margin: '18px 0px 30px 0px',
  },
  '& .linkWrapper': {
    padding: '8px 20px 8px 20px',
    backgroundColor: 'transparent',
    color: '$background',
    width: 'max-content',
    transition: '$fade',
    border: '2px solid #FFFFFF',
    borderRadius: '9999px',
    fontSize: '1.2rem',
    fontStyle: 'normal',
    fontWeight: '400',
    '&:hover': {
      backgroundColor: '$gradient',
      color: '$background',
    },
    '& a': {
      opacity: 1,
    },
    '& a:after': {
      content: "→",
      marginLeft: '-10px',
      opacity: '0',
      transition: 'all .2s ease-in-out',
    },
    '&:hover a:after': {
      marginLeft: '8px',
      opacity: '1',
    },
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
const creme = css({
  background: '$creme2',
  padding: '20px 0'
})
const w70 = css({
  width: '65%',
  marginRight: '5%'
})
const w30 = css({
  width: '35%'
})
const presentationContainer = css({
  'h2': {
    marginBottom: '40px',
  },
  'p': {
    textAlign: 'justify',
  },
})
const serviceContainer = css({
  gap: '20px'
})
const fadeViolet1 = css({
  background: '$fadeViolet1',
  '.link-box' : {
    '&:after': {
      background: '$violet1',
    },
    'li a:hover': {
      color: '$violet1',
    },
    'li a:hover:after': {
      color: '$violet1',
    }
  },
})
const fadeViolet2 = css({
  background: '$fadeViolet2',
  '.link-box' : {
    '&:after': {
      background: '$violet2',
    },
    'li a:hover': {
      color: '$violet2',
    },
    'li a:hover:after': {
      color: '$violet2',
    }
  },
})
const fadeViolet3 = css({
  background: '$fadeViolet3',
  '.link-box' : {
    '&:after': {
      background: '$violet3',
    },
    'li a:hover': {
      color: '$violet3',
    },
    'li a:hover:after': {
      color: '$violet3',
    }
  },
})
const violet1 = css({
  background: '$violet1',
})
const violet2 = css({
  background: '$violet2',
})
const violet3 = css({
  background: '$violet3',
})
const orange1 = css({
  background: '$orange1',
})
const orange2 = css({
  background: '$orange2',
})
const orange3 = css({
  background: '$orange3',
})
const gradientOrange = css({
  backgroundImage: '$gradientOrange',
})
const service = css({
  width: '100%',
  borderRadius: '40px',
  position: 'relative',
  padding: '40px 40px 80px 40px',
  'h3': {
    marginBottom: '20px',
  },
  '.link-box': {
    opacity: '1',
    '&:after': {
      content: "→",
      color: '$background',
      display: 'flex',
      height: '52px',
      width: '52px',
      position: 'absolute',
      bottom: '0',
      right: '0',
      borderRadius: '0px 0px 32px 0px',
      alignItems: 'center',
      justifyContent: 'center',
      transition: 'all .3s ease',
    },
    '&:hover:after': {
      height: '72px',
      width: '72px',
      //width: '100%',
      //borderRadius: '0px 0px 32px 32px',
    },
  },
  'ul': {
    padding: '10px 0 0 0',
    listStyle: 'none',
  },
  'li': {
    margin: '8px 0 32px 0',
    fontWeight: '300',
    'a': {
      opacity: '1',
      '&:after': {
        content: "→",
        marginLeft: '6px',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all .2s ease',
      },
      '&:hover:after': {
        marginLeft: '12px',
        fontWeight: '500',
      },
    },
  },
})
const secteur = css({
  display: 'flex',
  width: '100%',
  alignItems: 'center',
})
const carreSecteur = css({
  width: '2.4rem',
  height: '2.4rem',
  marginRight: '20px',
})
const titleGradient = css({
  WebkitBackgroundClip: 'text',
  WebkitTextFillColor: 'transparent',
  width: 'fit-content'
})

function HomePage(state) {
  document.title = 'Cobalt - Creative IT Engineering';
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://cobalt-it.ch/card.png');
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

      <div className={section + ' ' + creme + ' ' + titleMargin}>
        <div className={container}>
          <h3>Service Monitoring</h3>
        </div>
      </div>

      <div className={section}>
        <div className={container + ' ' + flex}>
          <div className={w70 + ' ' + presentationContainer}>
            <h2>La technologie au service de votre organisation</h2>
            <p>
              Nous concevons et intégrons des solutions informatiques de pointe, incluant la migration vers le Cloud, le développement d'applications web et mobiles, ainsi que la création de sites internet sur mesure.
              <br></br>
              Située à Bulle, dans le canton de Fribourg, notre entreprise a tissé des liens solides dans la région tout en étendant son rayon d’action à travers les cantons romands. Vous pouvez compter sur notre approche innovante et notre expertise technologique pour relever tous vos défis digitaux !</p>
          </div>
          <div className={w30}>
            <img src={cLogo}></img>
          </div>
        </div>
      </div>

      <div className={section}>
        <div className={container}>
          <h2 className={titleMargin}>Nos services</h2>
        </div>

        <div className={container}>
          <div className={flex + ' ' + serviceContainer}>

            <div className={service + ' ' + fadeViolet1}>
              <Link className='link-box' href="/contact">
                <h3>Développement</h3>
                <ul>
                  <li><Link href="/services">Applications Web</Link></li>
                  <li><Link href="/services">Applications mobiles</Link></li>
                  <li><Link href="/services">API</Link></li>
                  <li><Link href="/services">Logiciels sur mesure</Link></li>
                </ul>
              </Link>
            </div>

            <div className={service + ' ' + fadeViolet2}>
              <Link className='link-box' href="/contact">
                <h3>Intégration</h3>
                <ul>
                  <li><Link href="/services">Transition Cloud</Link></li>
                  <li><Link href="/services">ERP/CRM</Link></li>
                  <li><Link href="/services">Business Intelligence (BI)</Link></li>
                  <li><Link href="/services">Suite Microsoft</Link></li>
                  <li><Link href="/services">Outils tiers</Link></li>
                </ul>
              </Link>
            </div>

            <div className={service + ' ' + fadeViolet3}>
              <Link className='link-box' href="/contact">
                <h3>Web</h3>
                <ul>
                  <li><Link href="/services">Site Internet</Link></li>
                  <li><Link href="/services">E-Commerce</Link></li>
                  <li><Link href="/services">Gestionnaire de contenus</Link></li>
                  <li><Link href="/services">Expérience utilisateur</Link></li>
                  <li><Link href="/services">Refonte d'outils existants</Link></li>
                </ul>
              </Link>
            </div>

          </div>
        </div>
      </div>

      <div className={section}>
        <div className={container}>
          <h1 className={titleMargin + ' ' + titleGradient + ' ' + gradientOrange}>Secteurs d'activités</h1>
        </div>

        <div className={container}>
          <div className={serviceContainer}>
            <div className={secteur + ' ' + titleMargin}>
              <div className={carreSecteur + ' ' + orange3}></div>
              <h2>Administration publique</h2>
            </div>
            <p>Nous proposons une gamme variée de solutions pour les administrations publiques. visant à catalyser leur transition vers le numérique.
              Nos solutions optimisent l'efficacité, réduisant les charges administratives et favorisant une organisation fluide.
              En offrant des outils adaptés aux besoins spécifiques des administrations, nous aidons à gagner un temps précieux, à améliorer la prestation de services et à renforcer la connectivité entre parties prenantes.
              Cette transition digitale permet d'exploiter pleinement les avantages de la technologie moderne pour créer des administrations plus agiles, réactives et orientées vers l'avenir.
            </p>

            <div className={secteur + ' ' + titleMargin}>
              <div className={carreSecteur + ' ' + orange2}></div>
              <h2>Gouvernance d'entreprise</h2>
            </div>
            <p>
              Nous offrons une gamme complète de solutions conçues spécialement pour les entreprises, visant à libérer leur potentiel en leur permettant de se concentrer sur leur coeur de métier.
              Notre approche sur mesure vise à améliorer l'efficacité opérationnelle, à réduire les charges administratives et à accroitre la rentabilité. 
              En founrissant des solutions adaptées aux besoins spécifiques de chaque entreprise, nous permettons à nos clients de gagner du temps précieux et de maximiser leur productivité tout en renforçant leur compétitivité.
            </p>

            <div className={secteur + ' ' + titleMargin}>
              <div className={carreSecteur + ' ' + orange1}></div>
              <h2>Association</h2>
            </div>
            <p>
              Nous proposons une palette de solutions dédiées aux associations, qu'il s'agisse d'organisations événementielles, de clubs sportifs ou encore d'associations caritatives. 
              Notre objectif est de vous aider à optimiser vos opérations en vous fournissant des outils sur mesure qui simplifient votre gestion quotidienne.
              En permettant de vous concentrer sur votre passion et votre missions, nos solutions contribuent à améliorer l'organisation interner et à renforcer la participation de vos membres.
              Grâce à cette approche, votre association peut consacrer plus de temps à son activité principale et offrir une expérience optimale à vos membres, contribuant ainsi à votre croissance et à votre réussite continue.
            </p>

          </div>
        </div>
      </div>

      <div className={section + ' testimonial'}>
          <div className={container}>
            <h2>Ils nous font confiance !</h2>
            
          </div>
      </div>

    

      <div className={section}>
        <div className={container}>
           <h2>Nos dernières réalisations</h2>
         </div>

        <div className={container}>
        <iframe
           src="https://igruyere.ch/api?commune=Echarlens&style=3"
          id="ifrm"
          scrolling="no"
          style={{ minWidth: '100%' }}
          >
        </iframe>
  </div>
</div>

      <div className={section + ' gradient'}>
        <div className={container}>
          <h2>Une idée de projet ?</h2>     
          <span className="linkWrapper button">
            <Link href="/contact">Contactez nous !</Link>
          </span> 
        </div>
      </div>

      <div>
        <x innerHTML={contents.find( objByProperty('databaseId', 1990) ).content} />
      </div>
    </div>
  )
}

export default HomePage
