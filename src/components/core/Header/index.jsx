import Logo from '/src/components/core/Logo'
import { Nav } from '/src/components/core/Nav'

import { css } from '/src/styles/stitches.config'
import { fullWidthContainer } from '/src/styles/utils.css'

// Actions
const ToggleNav = (state) => ({
  ...state,
  navOpen: !state.navOpen,
})

// View
const header = css({
  marginBlock: '$3 $5',
})
const absolute = css({
  width: '100%',
  position: 'absolute',
  top: 0,
  zIndex: 2,
})
const inner = css({
  display: 'flex',
  alignItems: 'center',
  // transform: 'translateZ(0)', // for it to be in the forground
  '& a:first-child': {
    marginInlineEnd: 'auto',
  },
  '& a:not(:first-child)': {
    marginInlineStart: '1rem',
  },
  '& nav': {
    '& li': {
      display: 'inline',
      marginInlineStart: 16,
    },
  },
  '& button': {
    position: 'fixed',
    top: '1rem',
    right: '1rem',
    fontSize: '$small',
    width: 'calc($6 - $4 - $3)',
    height: 'calc($6 - $4 - $3)',
    borderRadius: '$6',
    backgroundColor: '$background',
    color: '$text',
    transition: '$fade',
    zIndex: '1',
    '&.invert': {
      backgroundColor: '$accent',
      borderColor: '$background',
      color: '$background',
    },
    '&:hover': {
      backgroundColor: '$accent',
      borderColor: '$background',
      color: '$background',
      '&.invert': {
        borderColor: '$text',
        backgroundColor: '$background',
        color: '$text',
      },
    },
    '@tablet': {
      fontSize: '$smallDt',
    },
  },
})
const nav = css({
  position: 'fixed',
  top: 0,
  bottom: 0,
  left: 0,
  right: 0,
  backgroundColor: '$accent',
  color: '$background',
  zIndex: 2,
  padding: '$3',
  '& nav': {
    minHeight: '100%',
    textAlign: 'center',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    textTransform: 'uppercase',
    '& a': {
      opacity: .7,
      transition: '$fade',
      '&:hover': {
        opacity: 1,
      },
      '&[aria-current]': {
        opacity: 1,
      }
    },
  },
})
const hidden = css({
  display: 'none',
})

const Header = (state) => (
  <header className={`${header} ${state.location.route === '/' ? absolute : ''}`}>
    <div className={fullWidthContainer}>
      <div className={`${nav} ${state.navOpen ? '' : hidden}`}>
        <div className={inner} onclick={ToggleNav} >
          {Logo(state, 'black')}
          <button className="invert">
            Retour
          </button>
        </div>
        <nav>
          <ul className="h1" onclick={ToggleNav}>
            {Nav(state)}
          </ul>
        </nav>
      </div>
      <div className={inner}>
        {Logo(state)}
        <button onclick={ToggleNav}>
          Menu
        </button>
      </div>
    </div>
  </header>
)

export default Header
