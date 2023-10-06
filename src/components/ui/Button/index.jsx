import { css } from '/src/styles/stitches.config'

const button = css({
  backgroundColor: '$text',
  color: '$background',
  '& + &': {
    marginInlineStart: '0.5rem',
  },
})

const Button = ({ type = 'button', ...rest }, children) => (
  <button className={button} type={type} {...rest} >{children}</button>
)

export default Button
