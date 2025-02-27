export const colorAttributes = {
  'color': {
    'default': '#000000',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"color":"${value}",`,
    }
  },

  'background-color': {
    'default': '#ffffff',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"backgroundColor":"${value}",`,
    }
  },

  'border-color': {
    'default': '#000000',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"borderColor":"${value}",`,
    }
  },

  'border-top-color': {
    'default': '#000000',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"borderTopColor":"${value}",`,
    }
  },
  'border-right-color': {
    'default': '#000000',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"borderRightColor":"${value}",`,
    }
  },
  'border-bottom-color': {
    'default': '#000000',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"borderBottomColor":"${value}",`,
    }
  },
  'border-left-color': {
    'default': '#000000',
    'ui': {
      'type': 'colorPicker',
    },
    'react': {
      'code': (value: string) => `"borderLeftColor":"${value}",`,
    }
  }
};
