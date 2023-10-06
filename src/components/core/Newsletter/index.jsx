import { css } from '/src/styles/stitches.config'
import { objByProperty } from '/src/lib/Data'
import { container, constrained, grid } from '/src/styles/utils.css'


const wrapper = css({
  marginBlockEnd: '$6',
  maxWidth: 'min(1200px, 100%)', // because container in container
  '& .formUi': {
    gap: '$2 $4',
    alignItems: 'end',
    marginBlockStart: '$4',
    '& .label': {
      fontSize: '$small',
      textTransform: 'uppercase',
      marginBlockEnd: '$2',
      '@tablet': {
        fontSize: '$smallDt',
      },
      '&.noSpam': {
        opacity: .7,
        textTransform: 'initial',
        marginBlockStart: '$3',
        '@tablet': {
          marginBlockStart: 0,
        },
      },
    },
    '& button': {
      width: '100%',
      border: 'solid 1px $text',
      textAlign: 'start',
      display: 'flex',
      justifyContent: 'space-between',
      transition: '$fade',
      '&:hover': {
        background: '$accent',
        color: '$background',
        borderColor: '$accent',
        '& .rightArr': {
          color: 'inherit'
        }
      },
      '& .rightArr': {
        color: '$accent',
      },
    },
  },
})

const Newsletter = (state) => {
  const contents = state.contents.everywhere

  return (
    <div className={container(wrapper)}>
      <x className={constrained} innerHTML={contents.find(objByProperty('databaseId', 442)).content} />
      <form action="https://azur-marketing.us7.list-manage.com/subscribe/post" method="POST">
        <input type="hidden" name="u" value="b3297ce46a6189c413b2d5127" />
        <input type="hidden" name="id" value="680706f5ea" />

        <div className={grid + ' formUi'}>
          <label>
            <div className="label">Votre email</div>
            <input type="email" name="MERGE0" id="MERGE0" placeholder="exemple@email.ch" required />
          </label>

          <div>
            <div class='label noSpam'>Pas de spam, désinscription à tout moment</div>
            <button type="submit">
              <div>S'inscrire à la newsletter</div>
              <div className="rightArr">↑</div>
            </button>
          </div>
        </div>
      </form>
    </div>
  )
}

export default Newsletter
