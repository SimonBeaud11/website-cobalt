import Header from '/src/components/core/Header'
import { Router } from 'hyperstatic'
import Footer from '/src/components/core/Footer'
import { css } from '/src/styles/stitches.config'

const accentBg = css({
  backgroundColor: '$accent',
  color: '$background',
})

const App = (state) => {
  if (state.location.route === '/contact' || state.location.route === '/articles/:id') {
    document.documentElement.classList.add(accentBg)
  } else {
    document.documentElement.classList.remove(accentBg)
  }

  return (
    <main>
      {Header(state)}
      <Router />
      {Footer(state)}
    </main>
  )
}

export default App