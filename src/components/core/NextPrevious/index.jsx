import { grid } from '/src/styles/utils.css'
import { css } from '/src/styles/stitches.config'
import { articleItem, projectItem } from '/src/components/core/CardItem'

const nextPrevious = css({
  marginBlockEnd: '$6',
  '& h2': {
    display: 'inline-block',
    backgroundColor: '$altBackground',
    padding: '$1 $2',
    marginBlockEnd: '$4',
    fontSize: '$small',
    '@tablet': {
      fontSize: '$smallDt',
    },
    '& span': {
      opacity: .85,
    },
  }
})

export default (content) => (
  <section className={grid(nextPrevious)}>
    { content.previous 
      ? (
        content.previous.categoryId === 3
          ? <div>
              <h2><span>Projet précédent</span></h2>
              {projectItem(content.previous)}
            </div>
          : <div>
              <h2><span>Article précédent</span></h2>
              {articleItem(content.previous)}
            </div>
      )
        : <div /> }
    { content.next 
      ? (
        content.next.categoryId === 3
          ? <div>
              <h2><span>Projet suivant</span></h2>
              {projectItem(content.next)}
            </div>
          : <div>
              <h2><span>Article suivant</span></h2>
              {articleItem(content.next)}
            </div>
      )
        : <div /> }
  </section>
)
