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
      fadeViolet1: '#591CE61A',
      fadeViolet2: '#9432C51A',
      fadeViolet3: '#B13DB51A',
      gradient: 'linear-gradient(48deg, var(--colors-violet1), var(--colors-violet2), var(--colors-violet3), var(--colors-orange1), var(--colors-orange2), var(--colors-orange3))',
      gradientBlue: 'linear-gradient(48deg, var(--colors-violet1), var(--colors-violet2), var(--colors-violet3))',
      gradientOrange: 'linear-gradient(48deg, var(--colors-orange1), var(--colors-orange2), var(--colors-orange3))',
      gradientSection: 'linear-gradient(14deg, rgba(89, 28, 230, 0.6) 13.28%, rgba(93, 30, 228, 0.6) 18.72%, rgba(106, 34, 221, 0.6) 24.15%, rgba(126, 42, 209, 0.6) 29.59%, rgba(155, 53, 193, 0.6) 35.03%, rgba(193, 68, 172, 0.6) 40.46%, rgba(238, 85, 147, 0.6) 45.9%, rgba(249, 89, 141, 0.6) 47.26%, rgba(250, 102, 130, 0.6) 52.02%, rgba(250, 122, 112, 0.6) 62.21%, rgba(251, 135, 101, 0.6) 71.73%, rgba(251, 139, 97, 0.6) 81.24%);',
      creme1: '#FDF9F6',
      creme2: '#F9F0E6',
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
      '1Dt': '3.4rem',
      '2Dt': '2.4rem',
    },
    fonts: {},
    fontWeights: {
      1: '400', // Regular
      2: '700', // Bold
      3: '800', // Heavy
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
