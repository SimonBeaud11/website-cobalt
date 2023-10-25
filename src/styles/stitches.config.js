import { createCss } from '@stitches/core'

export const { styled, css, global, keyframes, getCssString, theme } = createCss({
  theme: {
    colors: {
      violet1: '#591CE6',
      violet2: '#9432C5',
      violet3: '#B13DB5',
      orange1: '#FB8B61',
      orange2: '#FA7277',
      orange3: '#F9598D',
      gradient: 'linear-gradient(48deg, var(--colors-violet1), var(--colors-violet2), var(--colors-violet3), var(--colors-orange1), var(--colors-orange2), var(--colors-orange3))',
      gradientBlue: 'linear-gradient(48deg, var(--colors-violet1), var(--colors-violet2), var(--colors-violet3))',
      gradientOrange: 'linear-gradient(48deg, var(--colors-orange1), var(--colors-orange2), var(--colors-orange3))',
      creme1: 'FDF9F6',
      creme2: 'F9F0E6',
      background: '#ffffff',
      altBackground: '#010101',
      text: '#151515',
      accent: 'var(--colors-orange1)',
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
