export const customAttributes = {
  'data-custom-attr1': {
    'default': '',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"data-custom-attr1":"${value}",`,
    }
  },
  'data-custom-attr2': {
    'default': '',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"data-custom-attr2":"${value}",`,
    }
  },
  'data-testid': {
    'default': '',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"data-testid":"${value}",`,
    }
  },
  'data-tooltip': {
    'default': '',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"data-tooltip":"${value}",`,
    }
  },
  'data-analytics': {
    'default': '',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"data-analytics":"${value}",`,
    }
  },
  'data-section': {
    'default': '',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"data-section":"${value}",`,
    }
  }
  // ...additional attributes...
};
