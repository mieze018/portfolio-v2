module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    textColor: {
      primary: '#888',
      secondary: '#797979',
      darkest: '#222',
    },
    fontFamily: {
      kakugo: [
        'Hiragino Kaku Gothic ProN',
        'ヒラギノ角ゴ ProN W3',
        'Meiryo',
        'メイリオ',
        'ＭＳ ゴシック',
        'MS Gothic',
        'sans-serif',
      ],
      meiryo: [
        'Meiryo',
        'メイリオ',
        'Hiragino Kaku Gothic ProN',
        'ヒラギノ角ゴ ProN W3',
        'ＭＳ ゴシック',
        'MS Gothic',
        'sans-serif',
      ],
      mincho: ['HGS明朝E', 'ヒラギノ明朝 Pro W3', 'Hiragino Mincho Pro', 'ＭＳ Ｐ明朝', 'serif'],
      serif: [
        'Baskerville Old Face',
        'Baskerville',
        'Times New Roman',
        'Times',
        'Georgia',
        'Palatino',
        'Palatino Linotype',
        'HGS明朝E',
        'ヒラギノ明朝 Pro W3',
        'Hiragino Mincho Pro',
        'ＭＳ Ｐ明朝',
        '游明朝',
        'YuMincho',
        'ヒラギノ明朝 ProN W3',
        'Hiragino Mincho ProN',
        'MS PMincho',
        'serif',
      ],
      sans: ['Merriweather', 'serif'],
    },

    extend: {
      spacing: {
        square: 'calc((92vh + 92vw) /2)',
        golden61vw: '61.8vw',
        golden61vh: '61.8vh',
        golden38vw: '38.2vw',
        golden38vh: '38.2vh',
        golden23vw: '23.6vw',
        golden23vh: '23.6vh',
        golden14vw: '14.6vw',
        golden14vh: '14.6vh',
      },
      minHeight: {
        square: 'calc((92vh + 92vw) /2)',
        golden61vw: '61.8vw',
        golden61vh: '61.8vh',
        golden38vw: '38.2vw',
        golden38vh: '38.2vh',
        golden23vw: '23.6vw',
        golden23vh: '23.6vh',
        golden14vw: '14.6vw',
        golden14vh: '14.6vh',
      },
      minWidth: {
        square: 'calc((92vh + 92vw) /2)',
        golden61vw: '61.8vw',
        golden61vh: '61.8vh',
        golden38vw: '38.2vw',
        golden38vh: '38.2vh',
        golden23vw: '23.6vw',
        golden23vh: '23.6vh',
        golden14vw: '14.6vw',
        golden14vh: '14.6vh',
      },
      maxWidth: {
        square: 'calc((92vh + 92vw) /2)',
        golden61vw: '61.8vw',
        golden61vh: '61.8vh',
        golden38vw: '38.2vw',
        golden38vh: '38.2vh',
        golden23vw: '23.6vw',
        golden23vh: '23.6vh',
        golden14vw: '14.6vw',
        golden14vh: '14.6vh',
      },
      transitionProperty: {
        header: {
          'transition-property': 'all',
          'transition-timing-function': 'ease-in-out',
          'transition-duration': '2000ms',
        },
      },
      letterSpacing: {
        title: '0.2em',
      },
      blur: {
        '1px': '1px',
      },
      screens: {
        xs: '375px',
      },
      backgroundImage: {
        body: `linear-gradient(
          to bottom,
          rgb(245 245 245 / 100%) 0%,
          rgb(237 251 255 / 100%) 16%,
          rgb(237 245 247 / 100%) 24%,
          rgb(255 255 255 / 100%) 100%
        );`
      }
    },
  },
  // plugins: [require('@tailwindcss/aspect-ratio'), require('@tailwindcss/forms'), require('@tailwindcss/line-clamp'), require('@tailwindcss/typography')]
}
