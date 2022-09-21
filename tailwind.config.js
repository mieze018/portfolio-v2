module.exports = {
  content: ['./pages/**/*.{js,ts,jsx,tsx}', './components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    colors: {
      transparent: 'transparent',
      black: '#000',
      white: '#fff',
      primary: '#888',
      secondary: '#797979',
      darkest: '#222',
      main: '#FF7F00', // rgb(255 124 0)
      Water: '#EBF4FA',
      Snow: '##FFFAFA',
      WhiteSmoke: '#F5F5F5',
      GhostWhite: '#F8F8FF',
      AliceBlue: '#F0F8FF',
      MintCream: '#F5FFFA',
      Azure: '#F0FFFF',
      HoneyDew: '#F0FFF0',
      LightCyan: '#E0FFFF',
    },
    backgroundImage: {
      body: `linear-gradient(
      to top,
        WhiteSmoke 0%,
        #EBF4FA 61.8%,
        AliceBlue 76.4%,
        azure 85.4%,
        MintCream 100%
      )`,
      modal: `linear-gradient(
      to bottom,
        WhiteSmoke 0%,
        #EBF4FA 61.8%,
        AliceBlue 85.4%,
        GhostWhite 100%
      )`,
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
        'g-61vw': '61.8vw',
        'g-61vh': '61.8vh',
        'g-38vw': '38.2vw',
        'g-38vh': '38.2vh',
        'g-23vw': '23.6vw',
        'g-23vh': '23.6vh',
        'g-14vw': '14.6vw',
        'g-14vh': '14.6vh',
        'g-85': '85.4134%', //'calc(100% - (100% * 0.618 * 0.618 * 0.618 * 0.618))',
        'g-76': '76.3971%', //'calc(100% - (100% * 0.618 * 0.618 * 0.618))',
        'g-100-38': '61.8076%', //'calc(100% * 0.618)',
        'g-61': '61.8033%', //'calc(100% * 0.618)',
        'g-38': '38.1924%', //'calc(100% * 0.618 * 0.618)',
        'g-23': '23.6029032%', //'calc(100% * 0.618 * 0.618 * 0.618)',
        'g-14': '14.58659418%', //'calc(100% * 0.618 * 0.618 * 0.618 * 0.618)',
      },
      minHeight: {
        'g-61vh': '61.8vh',
      },
      minWidth: {
        screen: '100vw',
        'g-61vh': '61.8vh',
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
    },
  },
}
