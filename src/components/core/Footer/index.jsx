import { Link } from 'hyperstatic'
import { objByProperty } from '/src/lib/Data'

import { css } from '/src/styles/stitches.config'
import { container, constrained } from '/src/styles/utils.css'

import Logo from '/src/components/core/Logo'
import { Nav } from '/src/components/core/Nav'

const footer = css({
  paddingBlock: '$3 $4',
  backgroundColor: '$creme1',
  color: '$altBackground',
  fontSize: '$small',
  '@tablet': {
    paddingBlockEnd: '$5',
    fontSize: '$smallDt',
  },
})

const footerUp = css({
  paddingLeft: '$5',
  paddingRight: '$5',
  paddingTop: '$5'
  
})

const footerDown = css({
  marginBlockStart: '$4',
  paddingLeft: '$5',
  paddingRight: '$5',
  fontSize: '10px',
  color: '#888888'
})

const cta = css({
  marginBlockEnd: '$5',
  '@tablet': {
    marginBlockEnd: '$6',
  },
  '& p': {
    fontSize: '$body',
    '@tablet': {
      fontSize: '$bodyDt'
    },
  },
  '& h2, a': {
    fontWeight: '$3',
    fontSize: '$2',
    '@tablet': {
      fontSize: '$2Dt'
    },
  },
})
const elements = css({
  display: 'flex',
  alignItems: 'flex-start',
  justifyContent: 'space-between',
  flexWrap: 'wrap',
  '& > *:not(:first-child)': {
    marginBlockStart: '$3',
    '@tablet': {
      marginInlineStart: '$3',
      marginBlockStart: 0,
    },
  },
  '& > *': {
    width: '100%',
    '@tablet': {
      width: 'initial',
    },
  },
  '& .wp-block-social-links': {
    '& li, a': {
      padding: '0 !important',
      opacity: 1,
    },
  },
  '& nav, h2': {
    textTransform: 'uppercase',
    fontWeight: '$2',
    fontSize: 'inherit',
  },
  '& nav': {
    display: 'none',
    '@desktop': {
      display: 'initial',
    }
  },
  '& h2': {
    marginBlockEnd: '$2',
  },
  '& contact': {
    fontSize: '15px',
    '& span': {
      fontWeight: '$1',
    },
  },

})






const input = css({
  border: 'none',
  padding: '0 0 $1 0 !important',
  '@tablet': {
    width: '16ch !important', // width of the placeholder
  },
  '@desktop': {
    width: '20ch !important', // arbitrary width
  }
})






const Footer = (state) => {
  const contents = state.contents.everywhere

  if (!state.contents.everywhere.length) {
    return ''
  }
  return (
    <footer className={footer}>
      <div className={footerUp}>
        <div className={elements}>
        <div>   
              <span>
                <contact>
                  Cobalt Technologies Sàrl <br />
                  Rue Pierre-Alex 11<br />
                  1630 Bulle<br />
                </contact>              
              </span> 
              <br />
              <br />
              <span>
                <contact>
                  Cobalt Valais<br />
                  Rue de la Dixence 47C<br />
                  1950 Sion<br />
                </contact>
              </span> 
       </div>
          <nav>
            <ul>
              {Nav(state)}
            </ul>
          </nav>
          <div>
            <small>
              <span>
                contact@cobalt-it.ch<br />
                +41 76 573 87 00<br />
              </span> 
            </small>
          </div>
          <div>
            <x innerHTML={contents.find(objByProperty('databaseId', 132)).content}></x>
            <div className="logo">
            {Logo(state, 'black')}
          </div>
          </div>
        </div>
      </div>

      <div className={footerDown}> 
        <hr/>
          <div className={elements}>
            <div>
                © {new Date().getFullYear()} - Cobalt Technologies Sàrl
            </div>
            <div>
              <Link href="/Contact">Conditions générales de vente</Link>
            </div>
            <div>
              <Link href="/Contact">Term of use</Link>
            </div>
            <div>
              <Link href="/Contact">Privacy Policy</Link>
            </div>
          </div>
          <div>
            <br/>
            <p>
                 This website is owned and operated by Cobalt Technologies Sàrl Registered address at 11 Rue Pierre-Alex 1630 Bulle (Switzerland). The information on this site is directed at residents of Switzerland and is not intended
                 for distribution to, or use by, any person in any country or jurisdiction where such distribution or use would be contrary to local law or regulation. The content of any publication on this website is for informational purposes only.
            </p>
          </div>
      </div>
    </footer>
  )
}
export default Footer
