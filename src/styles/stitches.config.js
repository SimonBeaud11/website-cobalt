import { createCss } from '@stitches/core'

export const { styled, css, global, keyframes, getCssString, theme } = createCss({
  theme: {
    colors: {
      background: 'hsl(0deg 0% 71.8%)',
      altBackground: 'hsl(0deg 0% 6%)',
      text: 'hsl(0deg 0% 100%)',
      accent: 'hsl(52deg 100% 70%)',
    },
    space: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
      7: '256px',
    },
    fontSizes: {
      'small': '16px',
      'body': '18px',
      1: '23px',
      2: '35px',

      'smallDt': '18px',
      'bodyDt': '21px',
      '1Dt': '27px',
      '2Dt': '54px',
    },
    fonts: {},
    fontWeights: {
      1: '500', // medium
      2: '600', // semi bold
      3: '900', // black
    },
    lineHeights: {
      small: '1.3',
      big: '1.7',
    },
    letterSpacings: {},
    sizes: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
      7: '256px',
    },
    borderWidths: {},
    borderStyles: {},
    radii: {
      1: '4px',
      2: '8px',
      3: '16px',
      4: '32px',
      5: '64px',
      6: '128px',
      7: '256px',
    },
    shadows: {},
    zIndices: {},
    transitions: {
      'fade': 'ease .2s',
    },
  },
  media: {
    tablet: '(min-width: 768px)',
    desktop: '(min-width: 1024px)',
  },
  utils: {},
  insertionMethod: 'append',
})
