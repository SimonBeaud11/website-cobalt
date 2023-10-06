import { Link } from 'hyperstatic'
import { objByProperty } from '/src/lib/Data'

import { css } from '/src/styles/stitches.config'
import { container, constrained } from '/src/styles/utils.css'

import Logo from '/src/components/core/Logo'
import { Nav } from '/src/components/core/Nav'

const footer = css({
  paddingBlock: '$3 $4',
  backgroundColor: '$accent',
  color: '$background',
  fontSize: '$small',
  '@tablet': {
    paddingBlockEnd: '$5',
    fontSize: '$smallDt',
  },
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
  '& small': {
    fontSize: 'inherit',
    '& span': {
      fontWeight: '$2',
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

const Cta = (state, contents) => {
  if (state.location.route === '/contact') return ''

  return (
    <div className={cta}>
      <x innerHTML={contents.find(objByProperty('databaseId', 361)).content} />
      <Link href="/contact">Discutons-en <span className="rightArr">↑</span></Link>
    </div>
  )
}

const Footer = (state) => {
  const contents = state.contents.everywhere

  if (!state.contents.everywhere.length) {
    return ''
  }

  return (
    <footer className={footer}>
      <div className={container}>
        {Cta(state, contents)}

        <div className={elements}>
          <div className="logo">
            {Logo(state, 'black')}
          </div>
          <nav>
            <ul>
              <li><Link href='/'>Accueil</Link></li>
              {Nav(state)}
            </ul>
          </nav>
          <div>
            <h2>Social</h2>
            <x innerHTML={contents.find(objByProperty('databaseId', 132)).content}></x>
          </div>
          <div>
            <h2>Newsletter</h2>
            <form action="https://azur-marketing.us7.list-manage.com/subscribe/post" method="POST">
              <input type="hidden" name="u" value="b3297ce46a6189c413b2d5127" />
              <input type="hidden" name="id" value="680706f5ea" />

              <label>
                Votre email
                <input className={input} type="email" name="MERGE0" id="MERGE0" placeholder="exemple@email.ch" required />
              </label>

              <button className="link" type="submit">
                S'inscrire <span className="rightArr">↑</span>
              </button>
            </form>
          </div>
          <div>
            <small>
              <span>
                azur marketing & <br />
                communication sàrl <br />
                rue de la Condémine 54 <br />
                1630 Bulle
              </span> <br />
              © {new Date().getFullYear()}
            </small>
          </div>
        </div>
      </div>
    </footer>
  )
}

export default Footer
