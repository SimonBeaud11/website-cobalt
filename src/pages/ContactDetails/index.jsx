import Loader from '/src/components/core/Loader'
import Newsletter from '/src/components/core/Newsletter'

import { loadStatic } from 'hyperstatic'

import { container, contentDetails } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'
import NextPrevious from '/src/components/core/NextPrevious'

const HandleContact = (state, data) => ({
  ...state,
  contacts: {
    ...state.contacts,
    [data.slug]: data
  }
})

// Fetch contacts details
export const init = (state, location) => [
  {
    ...state,
    contacts: state.contacts ?? {}
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
        }
      }
      return simplified()
    },
    action: HandleContact,
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

const ContactDetails = (state) => {
  const contact = state.contacts[state.location.params.id]

  // seo
  document.title = contact.title + ' — Cobalt - Creative IT Engineering';
  document.querySelector('[property="og:image"]').setAttribute('content', 'https://cobalt-it.ch/card.png');
  document.querySelector('[property="og:title"]').setAttribute('content', contact.title + ' — Cobalt - Creative IT Engineering')
  document.querySelector('[property="og:url"]').setAttribute('content', location.href);

  document.querySelector('[name="description"]').setAttribute('content', contact.excerptRaw)
  document.querySelector('[property="og:description"]').setAttribute('content', contact.excerptRaw)
  document.querySelector('[property="og:url"]').setAttribute('content', location.href)
  if (contact.featuredImage == undefined) {
    document.querySelector('[property="og:image"]').setAttribute('content', 'https://cobalt-it.ch/card.png');
  } else {
    document.querySelector('[property="og:image"]').setAttribute('content', contact.featuredImage);
  }


  if (!contact) {
    return (
      <Loader />
    )
  }

  return (
    <div className={wrapper}>
      <div className={container}>
        <header>
          <h1>Fiche de contact</h1>
        </header>
      </div>
        
      <div className='main'>
        <article className={container}>
          <x className={container(contentDetails)} innerHTML={contact.content} />
        </article>
      </div>
    </div>
  )
}
export default ContactDetails
