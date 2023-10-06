import { global } from './stitches.config'

const globalStyles = global({
  // Fonts
  '@import': 'url("https://fonts.googleapis.com/css2?family=Work+Sans:ital,wght@0,500..900;1,500..900&display=swap")',

  'html': {
    fontFamily: "'Work Sans', sans-serif",
    fontWeight: '$1',
    lineHeight: '$small',
    color: '$text',
    backgroundColor: '$background',
    scrollBehavior: 'smooth',
  },

  'body': {
    fontSize: '$body',
    '@tablet': {
      fontSize: '$bodyDt',
    },
  },

  // Text selection styling
  '::selection': {
    background: '$altBackground',
    color: '$accent',
  },

  // Keyboard focus styles
  ':focus-visible': {
    outlineOffset: 2,
    outline: '2px dashed $accent'
  },

  // Typography
  'h1, .h1, h2, .h2, h3, .h3, h4, .h4, h5, .h5, h6, .h6': {
    margin: 0,
    fontWeight: '$2',
    fontSize: '$1',
    '@tablet': {
      fontSize: '$1Dt'
    }
  },
  'h1, .h1': {
    fontSize: '$2',
    fontWeight: '$3',
    '@tablet': {
      fontSize: '$2Dt'
    }
  },
  'h2, .h2': {
    fontWeight: '$1',
  },

  '.cardTitle' : {
    fontSize: '$2',
    fontWeight: '$3'
  },

  'p, .paragraph': {
    marginBlock: '0 $3',
    '&:last-child': {
      margin: 0,
    },
  },

  'a, .link': {
    padding: 'initial',
    textDecoration: 'none',
    color: 'inherit',
    opacity: .7,
    transition: '$fade',
    '& > .rightArr': {
      transition: '$fade',
    },
    '&:hover': {
      opacity: 1,
      '& > .rightArr': {
        marginInlineStart: '$1'
      },
    },
    '&[aria-current]': {
      opacity: 1
    },
  },

  'address': {
    fontStyle: 'inherit',
  },

  // Buttons
  'button, .button': {
    cursor: 'pointer',
    padding: '$2',
    border: 'none',
  },

  // Wordpress Buttons
  '.wp-block-columns a.wp-block-button__link' : {
    borderRadius: '0',
    textDecoration: 'none',
  },

  // Forms
  'input:not([type="radio"]):not([type="checkbox"]):not([type="color"]), select, textarea': {
    display: 'block',
    width: '100%',
    padding: '$2',
    borderColor: '$text',
    '&:focus': {
      outline: 'none',
      borderColor: '$accent',
    },
  },

  'textarea': {
    minHeight: '2.625rem',
  },

  'select': {
    paddingRight: '1.25rem',
  },

  // Misc
  'img': {
    width: '100%',
  },

  'code': {
    display: 'inline-block',
    backgroundColor: '$background',
    fontSize: '85%',
    borderRadius: '0.25rem',
    padding: '0.2em 0.4em',
  },

  'pre code': {
    display: 'block',
    padding: '1em',
  },

  'hr': {
    margin: '1rem 0',
    border: 'none',
    height: 1,
    backgroundColor: '$altBackground',
  },

  'blockquote': {
    margin: '1em 0',
    padding: '0.5em 2em',
    '& > *:first-child': {
      marginBlockStart: 0,
    },
    '& > *:last-child': {
      marginBlockEnd: 0,
    },
  },

  'details': {
    margin: '1rem 0',
    border: '1px solid $altBackground',
    borderRadius: '0.25rem',
    padding: '0.5rem 1rem',
  },

  'summary': {
    cursor: 'pointer',
    fontWeight: 'bold',
    margin: '-0.5rem -1rem',
    padding: '0.5rem 1rem',
    '&:focus': {
      outline: 'none',
    },
  },

  'table': {
    '& caption': {
      padding: '0.375rem 0.75rem',
    },
    '& th, td': {
      padding: '0.375rem 0.75rem',
      border: '1px solid $altBackground',
    },
    '& th': {
      fontWeight: 600,
    },
  },
  'ul, ol': {
    margin: 0,
  },
  'nav': {
    '& a': {
      opacity: 1,
    },
  },

  // Arrows: always use upward arrows except for downward arrows
  '.leftArr': {
    display: 'inline-block',
    transform: 'rotate(-90deg)',
  },
  '.rightArr': {
    display: 'inline-block',
    transform: 'rotate(90deg)',
  },
})

export default globalStyles
