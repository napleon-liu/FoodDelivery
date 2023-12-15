import type { ISourceOptions } from 'tsparticles-engine'

const options: ISourceOptions = {
  name: 'Font Awesome',
  interactivity: {
    events: {
      onClick: {
        enable: true,
        mode: 'push'
      },
      onHover: {
        enable: true,
        mode: 'repulse'
      }
    },
    modes: {
      push: {
        quantity: 4
      },
      repulse: {
        distance: 100,
        duration: 0.4
      }
    }
  },
  particles: {
    color: {
      value: ['#ECFFDC', '#7DF9FF', '#90EE90']
    },
    links: {
      blink: false,
      color: { value: ['#8A9A5B', '#98FB98', '#0FFF50'] },
      consent: false,
      distance: 150,
      enable: true,
      opacity: 0.4,
      shadow: {
        blur: 5,
        color: 'lime',
        enable: false
      },
      width: 2
    },
    move: {
      direction: 'none',
      enable: true,
      speed: 3
    },
    number: {
      density: {
        enable: true
      },
      limit: 0,
      value: 80
    },
    opacity: {
      animation: {
        enable: true,
        speed: 1,
        sync: false
      },
      value: {
        min: 0.1,
        max: 0.7
      }
    },
    shape: {
      options: {
        char: [
          {
            fill: false,
            font: '华光淡古印_CNKI',
            style: '',
            value: ['饿'],
            weight: '400'
          },
          {
            fill: true,
            font: '华文行楷',
            style: '',
            value: ['了'],
            weight: '800'
          },
          {
            fill: true,
            font: '幼圆',
            style: '',
            value: ['没'],
            weight: '600'
          }
        ]
      },
      type: 'char'
    },
    stroke: {
      color: {
        value: ['#ECFFDC', '#7DF9FF', '#90EE90']
      },
      width: 2
    },
    size: {
      value: 40
    }
  },
  pauseOnBlur: true,
  background: {
    color: '#2AAA8A',
    image: '',
    position: '50% 50%',
    repeat: 'no-repeat',
    size: 'cover'
  }
}

export default options
