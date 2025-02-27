export const positioningAttributes = {
  'position': {
    'default': 'static',
    'ui': {
      'type': 'select',
      'options': ['static', 'relative', 'absolute', 'fixed', 'sticky'],
    },
    'react': {
      'code': (value: string) => `"position":"${value}",`,
    }
  },
  'top': {
    'default': 'auto',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"top":"${value}",`,
    }
  },
  'right': {
    'default': 'auto',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"right":"${value}",`,
    }
  },
  'bottom': {
    'default': 'auto',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"bottom":"${value}",`,
    }
  },
  'left': {
    'default': 'auto',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"left":"${value}",`,
    }
  },
  // ...additional attributes...
};
