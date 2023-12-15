import type { ISourceOptions } from 'tsparticles-engine'

const options: ISourceOptions = {
  name: 'Images',
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'bubble'
      }
    },
    modes: {
      bubble: {
        distance: 200,
        duration: 2,
        opacity: 0.8,
        size: 100
      },
      push: {
        quantity: 2
      }
    }
  },
  particles: {
    color: {
      value: '#fff'
    },
    move: {
      enable: true,
      speed: 4
    },
    number: {
      density: {
        enable: true
      },
      limit: 0,
      value: 20
    },
    opacity: {
      value: 0.9
    },
    rotate: {
      animation: {
        enable: true,
        speed: 5,
        sync: false
      },
      direction: 'random',
      value: {
        min: 0,
        max: 360
      }
    },
    shape: {
      options: {
        image: [
          {
            name: 'apple'
          },
          {
            name: 'avocado'
          },
          {
            name: 'banana'
          },
          {
            name: 'berries'
          },
          {
            name: 'cherry'
          },
          {
            name: 'grapes'
          },
          {
            name: 'lemon'
          },
          {
            name: 'orange'
          },
          {
            name: 'peach'
          },
          {
            name: 'pear'
          },
          {
            name: 'pepper'
          },
          {
            name: 'plum'
          },
          {
            name: 'star'
          },
          {
            name: 'strawberry'
          },
          {
            name: 'watermelon'
          },
          {
            name: 'watermelon_slice'
          }
        ]
      },
      type: 'image'
    },
    size: {
      value: 80
    }
  },
  background: {
    color: { value: ['#3ABA9A'] }
  },
  preload: [
    {
      src: require('@/assets/image/汤羹.png'),
      name: 'apple',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/梅菜扣肉.png'),
      name: 'avocado',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/小龙虾.png'),
      name: 'banana',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/番茄炒蛋.png'),
      name: 'berries',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/水煮牛肉.png'),
      name: 'cherry',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/酸菜鱼.png'),
      name: 'grapes',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/黑椒牛柳.png'),
      name: 'lemon',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/蛋炒饭.png'),
      name: 'orange',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/锅包肉.png'),
      name: 'peach',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/凉粉.png'),
      name: 'pear',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/剁椒鱼头.png'),
      name: 'pepper',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/大盘鸡.png'),
      name: 'plum',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/毛血旺.png'),
      name: 'star',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/烧麦.png'),
      name: 'strawberry',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/麻婆豆腐.png'),
      name: 'watermelon',
      width: 32,
      height: 32
    },
    {
      src: require('@/assets/image/鱼香肉丝.png'),
      name: 'watermelon_slice',
      width: 32,
      height: 32
    }
  ]
}
export default options
