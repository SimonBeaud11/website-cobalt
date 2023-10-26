import logoWhiteSrc from '/src/assets/logo-white.svg'
import logoBlackSrc from '/src/assets/logo-black.svg'
import logoBlackBaselineSrc from '/src/assets/logo-black-baseline.svg'

import { Link } from 'hyperstatic'

import { css } from '/src/styles/stitches.config'

const logo = css({
  display: 'block',
  width: 'calc($6 - $4 - $3)',
  opacity: 1,
  transition: '$fade',
  '&:hover': {
    transform: 'scale(1.05) rotate(-2deg)',
  },
})

const Logo = (state, color) => {
  const route = state.location.route
  const mustBeBlack = route === '/contact' || route === '/articles/:id'
  const logoSrc = (mustBeBlack || color === 'black') ? logoBlackSrc
    : logoWhiteSrc

  return (
    <Link href="/" className={logo}>
      <img src={logoSrc} alt="logo" width="80" height="71" />
    </Link>
  )
}

export default Logo
