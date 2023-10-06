import { Link } from 'hyperstatic'

import { container } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'

const notFound = css({
  paddingBlockEnd: '$6',
})

document.title = 'Erreur 404 — azur marketing & communication sàrl'
document.querySelector('[property="og:image"]').setAttribute('content', 'https://azur-marketing.ch/card.png');
document.querySelector('[property="og:url"]').setAttribute('content', location.href)

const NotFoundPage = () => (
  <div className={container(notFound)}>
    <h1>404.</h1>
    <p>Page introuvable.</p>
    <Link href="/">Retourner à la page d'accueil</Link>
  </div>
)

export default NotFoundPage
