export const borderAttributes = {
  'border-width': {
    'default': '1',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"borderWidth":"${value}px",`,
    }
  },
  'border-style': {
    'default': 'solid',
    'ui': {
      'type': 'select',
      'options': ['none', 'solid', 'dotted', 'dashed', 'double', 'groove', 'ridge', 'inset', 'outset'],
    },
    'react': {
      'code': (value: string) => `"borderStyle":"${value}",`,
    }
  },
  'border-radius': {
    'default': '0',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"borderRadius":"${value}px",`,
    }
  },
  'border-top-width': {
    'default': '1',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"borderTopWidth":"${value}px",`,
    }
  },
  'border-right-width': {
    'default': '1',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"borderRightWidth":"${value}px",`,
    }
  },
  'border-top-left-radius': {
    'default': '0',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"borderTopLeftRadius":"${value}px",`,
    }
  },
  'border-top-right-radius': {
    'default': '0',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"borderTopRightRadius":"${value}",`,
    }
  }
  // ...additional attributes...
};
