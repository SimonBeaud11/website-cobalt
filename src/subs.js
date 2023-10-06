import { objByProperty } from '/src/lib/Data'

// interval
const interval = (dispatch, props) => {
  const id = setInterval(() => dispatch(props.action), props.delay)
  return () => clearInterval(id)
}

export const every = (delay, action) => [interval, { delay, action }]

// interval action subscribers
export const HeadingIndexLoop = (state) => {
  const headingsLength = state.contents.home.filter(headings => headings.tags.nodes.find(objByProperty('databaseId', 12))).length
  
  if (state.location.route !== '/') return state

  return {
    ...state,
    currentHeadingIndex: state.currentHeadingIndex >= headingsLength - 1 ? 0 : ++state.currentHeadingIndex
  }
}
export const scrollTop = (state) => {
  const currentHref = window.location.href
    .split('#')[0] // we don't care about the fragment identifier
    .split('?')[0] // we don't care about the query
  const lastCheckedHref = state.lastCheckedHref || currentHref

  if (currentHref !== lastCheckedHref) window.scrollTo(0, 0)

  return {
    ...state,
    lastCheckedHref: currentHref
  }
}