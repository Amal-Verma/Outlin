export const animationAttributes = {
  'animation-name': {
    'default': 'none',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"animationName":"${value}",`,
    }
  },
  'animation-duration': {
    'default': '0s',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"animationDuration":"${value}",`,
    }
  },
  'animation-timing-function': {
    'default': 'ease',
    'ui': {
      'type': 'select',
      'options': ['ease', 'linear', 'ease-in', 'ease-out', 'ease-in-out'],
    },
    'react': {
      'code': (value: string) => `"animationTimingFunction":"${value}",`,
    }
  },
  'animation-delay': {
    'default': '0s',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"animationDelay":"${value}",`,
    }
  },
  'animation-iteration-count': {
    'default': '1',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"animationIterationCount":"${value}",`,
    }
  },
  'animation-direction': {
    'default': 'normal',
    'ui': {
      'type': 'select',
      'options': ['normal', 'reverse', 'alternate', 'alternate-reverse'],
    },
    'react': {
      'code': (value: string) => `"animationDirection":"${value}",`,
    }
  },
  'animation-fill-mode': {
    'default': 'none',
    'ui': {
      'type': 'select',
      'options': ['none', 'forwards', 'backwards', 'both'],
    },
    'react': {
      'code': (value: string) => `"animationFillMode":"${value}",`,
    }
  },
  'transition-property': {
    'default': 'all',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"transitionProperty":"${value}",`,
    }
  },
  'transition-duration': {
    'default': '0s',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"transitionDuration":"${value}",`,
    }
  }
};
