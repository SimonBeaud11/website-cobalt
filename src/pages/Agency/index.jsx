import { loadStatic, Link } from 'hyperstatic'
import { objByProperty } from '/src/lib/Data'
import { container, constrained } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'

// Fetch contents
export const init = (state) => [
  {
    ...state,
    contents: {
      ...state.contents,
      agency: []
    },
    agencyIsReading: {},
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
            query($categoryID: Int!) {
              contents(first: 99, where: {categoryId: $categoryID}) {
                nodes {
                  databaseId
                  content
                  tags {
                    nodes {
                      databaseId
                    }
                  }
                }
              }
            }`,
          variables: {
            'categoryID': 4 // agency ID
          },
        }),
      })
        .then((res) => res.json())
      const simplified = response.data.contents.nodes
      return simplified
    },
    action: HandleAgencyContents,
    error: (state) => state
  })
]

// Actions
const HandleAgencyContents = (state, data) => ({
  ...state,
  contents: {
    ...state.contents,
    agency: data
  }
})

const ToggleReading = (state, payload) => ({
  ...state,
  agencyIsReading: {
    ...state.agencyIsReading,
    [payload]: !state.agencyIsReading[payload],
  },
})

// View
const summary = css({
  marginBlockEnd: '$6',
  '& h1': {
    fontSize: '$1',
    '@tablet': {
      fontSize: '$1Dt',
    },
    marginBlockEnd: '$3',
  },
})
const section = css({
  marginBlockEnd: '$5',
  maxWidth: 'min(1200px, 100%)', // because container in container
  '& h2': {
    marginBlockEnd: '$3',
  },
  '& button': {
    width: '100%',
    display: 'flex',
    justifyContent: 'space-between',
    '& .arr': {
      transition: '$fade',
      transform: 'rotate(-180deg)',
      color: '$accent',
    },
  },
  '&.hidden': {
    '& h2': {
      marginBlockEnd: 0,
    },
    '& x': {
      display: 'none',
    },
  },
  '&:not(.hidden)': {
    '& button': {
      opacity: 1,
      '&:hover': {
        opacity: .7,
      },
      '& .arr': {
        transform: 'rotate(0)',
      },
    },
  },
  '& .person:not(:last-child)': {
    marginBlockEnd: '$5',
  },
  '& .wp-block-group': {
    marginBlockEnd: '$3',
    '& p:first-child': {
      marginBlockEnd: 0,
      fontSize: '$1',
      '@tablet': {
        fontSize: '$1Dt',
      },
    },
  },
  '& h3': {
    marginBlockEnd: '$3',
  },
  '& .wp-block-columns': {
    marginBlockEnd: 0,
    '& .wp-block-column figure': {
      '@media (max-width: 599px)': {
        marginBlockEnd: '$3'
      },
      '& a': {
        opacity: 1,
        '& img': {
          transition: '$fade',
        },
        '& img:hover': {
          transform: 'scale(1.1)',
        },
      },
    },
  },
})
const modal = css({
  position: 'fixed',
  top: 0,
  bottom: 0,
  right: 0,
  left: 0,
  backgroundColor: '$accent',
  color: '$background',
  zIndex: 2,
  overflow: 'auto',
  '& .content': {
    padding: '$4 $3',
    maxHeight: '100%',
    '& .back': {
      marginBlockEnd: '$4',
      opacity: .7,
      transition: '$fade',
      '& .leftArr': {
        transition: '$fade',
      },
      '&:hover': {
        opacity: 1,
        '& .leftArr': {
          marginInlineEnd: '$1',
        }
      }
    },
    '& > :last-child': {
      paddingBlockEnd: "$4",
    },
  },
})

const Modal = (prestationId, contents) => (
  <div className={modal}>
    <div className={container + " content"}>
      <Link className="back" href="/agence"><span className="leftArr">↑</span> Retour</Link>
      <x className={constrained} innerHTML={contents.find(objByProperty('databaseId', prestationId)).content} />
    </div>
  </div>
)

const Agency = (state) => {
  document.title = "L'agence à Bulle — azur marketing & communication sàrl"
  document.querySelector('[property="og:title"]').setAttribute('content', "L'agence à Bulle — azur marketing & communication sàrl")
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)
  
  const contents = state.contents.agency
  if (!contents.length) return ''

  const hide = (id) => state.agencyIsReading[id] ? '' : ' hidden'

  // The links on the images of the prestations must be the databaseId of the associated "Contenus" content prefixed with '#'
  let prestationId = parseInt(window.location.hash.split('#')[1])
  if (!contents.find(objByProperty('databaseId', prestationId))) prestationId = false

  return (
    <article className={container}>
      <x className={constrained(summary)} innerHTML={contents.find(objByProperty('databaseId', 39)).content} />

      <section className={container(section) + hide(1)} id="1">
        <h2>
          <button className="link h1" onclick={[ToggleReading, 1]}>
            <div>Prestations</div>
            <div className="arr">↑</div>
          </button>
        </h2>
        <x className={constrained} innerHTML={contents.find(objByProperty('databaseId', 75)).content} />
      </section>

      <section className={container(section) + hide(2)} id="2">
        <h2>
          <button className="link h1" onclick={[ToggleReading, 2]}>
            <div>L'équipe</div>
            <div className="arr">↑</div>
          </button>
        </h2>
        {contents.filter(persons => persons.tags.nodes.find(objByProperty('databaseId', 9))).map(person => (
          <x className={constrained + ' person'} innerHTML={person.content} />
        ))}
      </section>

      <section className={container(section) + hide(3)} id="3">
        <h2>
          <button className="link h1" onclick={[ToggleReading, 3]}>
            <div>Valeurs</div>
            <div className="arr">↑</div>
          </button>
        </h2>
        <x className={constrained} innerHTML={contents.find(objByProperty('databaseId', 41)).content} />
      </section>

      {prestationId && Modal(prestationId, contents)}
    </article>
  )
}

export default Agency
