import { loadStatic } from 'hyperstatic'
import { objByProperty } from '/src/lib/Data'
import { container, grid } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'

import Map from '/src/components/core/Map'

const HandleContactContents = (state, data) => ({
  ...state,
  contents: {
    ...state.contents,
    contact: data
  }
})

// Fetch contents
export const init = (state) => [
  {
    ...state,
    contents: {
      ...state.contents,
      contact: []
    }
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
            query($categoryID: Int!) {
              contents(where: {categoryId: $categoryID}) {
                nodes {
                  databaseId
                  content
                }
              }
            }`,
          variables: {
            'categoryID': 6 // agency ID
          },
        }),
      })
        .then((res) => res.json())
      const simplified = response.data.contents.nodes
      return simplified
    },
    action: HandleContactContents,
    error: (state) => state
  })
]

// View
const element = css({
  marginBlock: '$4 $6',
  display: 'block',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridGap: '$4',
  '@desktop': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
  '& h2': {
    fontSize: '$2',
    fontWeight: '$3',
  },
  '& address': {
    gridTemplateColumns: '1fr',
    gridGap: '$2 $4',
    '@tablet': {
      gridTemplateColumns: '1fr 1fr',
    },
    marginBlockEnd: '$3',
  },
  '& iframe': {
    gridColumn: '1 / -1',
    marginBlockStart: '$4',
    height: 'calc($7 + $7)',
    filter: 'grayscale(100%) contrast(105%)',
    zIndex: '-1',
  },
})

const Contact = (state) => {
  document.title = 'Contact — Cobalt Technologies Sàrl'
  document.querySelector('[property="og:title"]').setAttribute('content', "Contact — Cobalt Technologies Sàrl")
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://cobalt-it.ch/card.png');
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)

  const contents = state.contents.contact

  return (
    <div className={container}>
      <x innerHTML={contents.find( objByProperty('databaseId', 49) ).content} />
      <div className={element}>
        <x innerHTML={contents.find( objByProperty('databaseId', 52) ).content} />
        <div>
          <address className={grid} innerHTML={contents.find( objByProperty('databaseId', 54) ).content} />
          <x innerHTML={contents.find( objByProperty('databaseId', 56) ).content} />
        </div>
        <Map />
      </div>
    </div>
  )
}

export default Contact
