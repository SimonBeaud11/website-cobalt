import { css } from './stitches.config'
import maskSrc from '/src/assets/mask.svg'

// 100vw containers
export const fullWidthContainer = css({
  width: '100%',
  maxWidth: 'calc( 100% - 32px)',
  margin: '0 auto',
})

// Max-width containers
// https://www.joshwcomeau.com/css/full-bleed/
export const container = css({
  width: '100%',
  maxWidth: 'min(1200px, 100% - 32px)',
  margin: '0 auto',

  display: 'grid',
  gridTemplateColumns: '1fr min(65ch, 100%) 1fr',
  '& > *': {
    gridColumn: '1 / -1',
  },
})

// Ideal text line lenght (constrained) content
// This class must be applied on a children of .container
export const constrained = css({
  gridColumn: 2,
})

// Responsive Card grid
export const grid = css({
  display: 'grid',
  gridTemplateColumns: 'repeat(1, 1fr)',
  gridGap: '$5 $4',
  '@tablet': {
    gridTemplateColumns: 'repeat(2, 1fr)',
  },
})

export const flex = css({
  display: 'flex',
})

export const titleMargin = css({
  marginBottom: '50px',
})

export const card = css({
  display: 'block',
  textDecoration: 'none',
  opacity: 1,
  '&:hover': {
    color: 'inherit',
    '& .fade': {
      opacity: 1,
    },
    '& img': {
      transform: 'scale(1.02) rotate(-1deg)',
      '@desktop': {
        transform: 'scale(1.015) rotate(-1deg)',
      }
    },
  },
  '& img': {
    marginBlockEnd: '$2',
    height: '$7',
    objectFit: 'cover',
    '@supports (aspect-ratio: 1 / 1)': {
      height: 'initial',
      aspectRatio: '248 / 189',
      maskImage: `url(${maskSrc})`,
      maskSize: 'cover',
      '-webkit-mask-size': 'cover',
      transition: '$fade',
    },
  },
  '& p': {
    marginBlock: '$2',
  },
  '& .fade': {
    opacity: 0,
    transition: '$fade',
    '@media (hover: none)': {
      opacity: 1,
    },
    '& time': {
      marginInlineEnd: '$3',
    },
    '&:not(h2, h3, h4, h5)': {
      fontSize: '$small',
      '@tablet': {
        fontSize: '$smallDt',
      }
    }
  },
})

export const section = css({
  paddingBlock: '$3 $6',
  '& + .gradient': {
    backgroundColor: '$orange1',
    color: '$background',
  },
  '& + .testimonial': {
    backgroundColor: '$creme1',
    color: '$altBackground',
  },
  [`& .${fullWidthContainer}`]: {
    marginBlockEnd: '$5',
    '@tablet': {
      marginBlockEnd: 0,
    },
  },
})

export const contentDetails = css({
  '& p': {
    lineHeight: '$big',
  },
  '& a': {
    textDecoration: 'underline',
    '&:hover': {
      textDecoration: 'none',
      color: '$accent',
    },
  },
  '& h1, h2, h3, h4, h5, h6': {
    marginBlockEnd: '$2',
  },
  '& h2': {
    fontWeight: '$2',
    '&:not(figure + h2)': {
      marginBlockStart: '$4',
    },
  },
  '& h3, h4, h5, h6': {
    fontSize: '$body',
    '@tablet': {
      fontSize: '$bodyDt',
    },
    fontWeight: '$3',
    color: '$accent',
  },
  '& figure:not(:last-child)': {
    marginBlockEnd: '$4',
  },
  '& p + figure': {
    paddingBlockStart: '$5',
  },
  '& :not(figure)': {
    gridColumn: 2,
  },
  '& img': {
    maxHeight: 'calc(100vh - $5)',
    objectFit: 'cover',
  },
  '.wp-block-quote': {
    borderLeft: '2px solid $accent',
    padding: '$3 0 $3 $4',
    marginBlockStart: '$3',
    '& p': {
      fontWeight: '$2',
    },
    '& cite, footer': {
      fontSize: '$small',
      '@tablet': {
        fontSize: '$smallDt',
      },
    }
  },
  '& ul, ol': {
    paddingInlineStart: '$4',
    marginBlock: '$3 $4',
    '& li': {
      paddingInlineStart: '$3',
      '&:not(:last-child)': {
        marginBlockEnd: '$3',
      },
      '&::marker': {
        color: '$accent',
      },
    },
  },
})
