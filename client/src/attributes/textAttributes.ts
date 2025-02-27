export const textAttributes = {
  'font-size': {
    'type': 'number',
    'default': 12,
    'ui' : {
      'type': 'slider',
      'min': 0,
      'max': 100,
      'step': 1,
    },
    'react': {
      'code': (value: number) => `"fontSize":"${value}px",`,
    }
  },

  'font-family': {
    'type': 'string',
    'default': 'Arial',
    'ui' : {
      'type': 'select',
      'options': ['Arial', 'Verdana', 'Helvetica', 'Tahoma', 'Trebuchet MS', 'Times New Roman', 'Georgia', 'Garamond', 'Courier New', 'Brush Script MT', 'Comic Sans MS'],
    },
    'react': {
      'code': (value: string) => `"fontFamily":"${value}",`,
    }
  },

  'font-weight': {
    'type': 'number',
    'default': 400,
    'ui' : {
      'type': 'slider',
      'min': 100,
      'max': 900,
      'step': 100,
    },
    'react': {
      'code': (value: number) => `"fontWeight":"${value}",`,
    }
  },

  'font-style': {
    'type': 'string',
    'default': 'normal',
    'ui' : {
      'type': 'select',
      'options': ['normal', 'italic', 'oblique'],
    },
    'react': {
      'code': (value: string) => `"fontStyle":"${value}",`,
    }
  },

  'text-align': {
    'type': 'string',
    'default': 'left',
    'ui' : {
      'type': 'select',
      'options': ['left', 'center', 'right', 'justify'],
    },
    'react': {
      'code': (value: string) => `"textAlign":"${value}",`,
    }
  },

  'text-decoration': {
    'type': 'string',
    'default': 'none',
    'ui' : {
      'type': 'select',
      'options': ['none', 'underline', 'overline', 'line-through'],
    },
    'react': {
      'code': (value: string) => `"textDecoration":"${value}",`,
    }
  },

  'text-transform': {
    'type': 'string',
    'default': 'none',
    'ui' : {
      'type': 'select',
      'options': ['none', 'capitalize', 'uppercase', 'lowercase'],
    },
    'react': {
      'code': (value: string) => `"textTransform":"${value}",`,
    }
  },

  'letter-spacing': {
    'type': 'number',
    'default': 0,
    'ui': {
      'type': 'slider',
      'min': -10,
      'max': 10,
      'step': 0.1,
    },
    'react': {
      'code': (value: number) => `"letterSpacing":"${value}px",`,
    }
  },
  'line-height': {
    'type': 'number',
    'default': 1.5,
    'ui': {
      'type': 'slider',
      'min': 1,
      'max': 3,
      'step': 0.1,
    },
    'react': {
      'code': (value: number) => `"lineHeight":"${value}",`,
    }
  },
  'text-shadow': {
    'type': 'string',
    'default': 'none',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"textShadow":"${value}",`,
    }
  },
  'text-overflow': {
    'type': 'string',
    'default': 'clip',
    'ui': {
      'type': 'select',
      'options': ['clip', 'ellipsis'],
    },
    'react': {
      'code': (value: string) => `"textOverflow":"${value}",`,
    }
  },
  'word-spacing': {
    'type': 'number',
    'default': 0,
    'ui': {
      'type': 'slider',
      'min': -10,
      'max': 20,
      'step': 1,
    },
    'react': {
      'code': (value: number) => `"wordSpacing":"${value}px",`,
    }
  },
  'word-break': {
    'type': 'string',
    'default': 'normal',
    'ui': {
      'type': 'select',
      'options': ['normal', 'break-all', 'keep-all', 'break-word'],
    },
    'react': {
      'code': (value: string) => `"wordBreak":"${value}",`,
    }
  },
  'white-space': {
    'type': 'string',
    'default': 'normal',
    'ui': {
      'type': 'select',
      'options': ['normal', 'nowrap', 'pre', 'pre-wrap', 'pre-line'],
    },
    'react': {
      'code': (value: string) => `"whiteSpace":"${value}",`,
    }
  }
};