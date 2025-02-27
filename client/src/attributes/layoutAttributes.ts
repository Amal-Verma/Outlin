export const layoutAttributes = {
  'margin': {
    'default': '0',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"margin":"${value}",`,
    }
  },
  'padding': {
    'default': '0',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"padding":"${value}",`,
    }
  },
  'display': {
    'default': 'block',
    'ui': {
      'type': 'select',
      'options': ['block', 'inline', 'inline-block', 'flex', 'grid', 'none'],
    },
    'react': {
      'code': (value: string) => `"display":"${value}",`,
    }
  },
  'flex-direction': {
    'default': 'row',
    'ui': {
      'type': 'select',
      'options': ['row', 'row-reverse', 'column', 'column-reverse'],
    },
    'react': {
      'code': (value: string) => `"flexDirection":"${value}",`,
    }
  },
  'flex-wrap': {
    'default': 'nowrap',
    'ui': {
      'type': 'select',
      'options': ['nowrap', 'wrap', 'wrap-reverse'],
    },
    'react': {
      'code': (value: string) => `"flexWrap":"${value}",`,
    }
  },
  'justify-content': {
    'default': 'flex-start',
    'ui': {
      'type': 'select',
      'options': ['flex-start', 'flex-end', 'center', 'space-between', 'space-around'],
    },
    'react': {
      'code': (value: string) => `"justifyContent":"${value}",`,
    }
  },
  'align-items': {
    'default': 'stretch',
    'ui': {
      'type': 'select',
      'options': ['flex-start', 'flex-end', 'center', 'baseline', 'stretch'],
    },
    'react': {
      'code': (value: string) => `"alignItems":"${value}",`,
    }
  },
  'grid-template-columns': {
    'default': 'none',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"gridTemplateColumns":"${value}",`,
    }
  },
  'grid-gap': {
    'default': '0',
    'ui': {
      'type': 'text',
    },
    'react': {
      'code': (value: string) => `"gridGap":"${value}",`,
    }
  }
};
