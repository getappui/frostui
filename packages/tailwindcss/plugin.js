const plugin = require('tailwindcss/plugin')
const colors = require('tailwindcss/colors')

const colorConfig = {
  theme: {
    extend: {
      colors: {
        primary: {
          ...colors.blue,
          'DEFAULT': '#3073F1',
        },
        secondary: {
          ...colors.stone,
          DEFAULT: '#68625D'
        },
        success: {
          ...colors.green,
          DEFAULT: '#1CB454'
        },
        warning: {
          ...colors.yellow,
          DEFAULT: '#E2A907'
        },
        info: {
          ...colors.sky,
          DEFAULT: '#0895D8'
        },
        danger: {
          ...colors.red,
          DEFAULT: '#E63535'
        },
      },
    },
  },
}

module.exports = plugin.withOptions(function (options = {}) {
  return function ({
    addVariant,
    e
  }) {

    addVariant('fc-collapse-open', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-collapse.open .${e(`fc-collapse-open${separator}${className}`)}`
      })
    }, ({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-collapse.open.${e(`fc-collapse-open${separator}${className}`)}`
      })
    }])
    addVariant('fc-tab-active', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.active.${e(`fc-tab-active${separator}${className}`)}`
      })
    }])

    addVariant('fc-dropdown-open', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-dropdown.open.${e(`fc-dropdown-open${separator}${className}`)}`
      })
    }])

    addVariant('fc-modal-open', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-modal.open .${e(`fc-modal-open${separator}${className}`)}`
      })
    }, ({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-modal.open.${e(`fc-modal-open${separator}${className}`)}`
      })
    }])
    addVariant('fc-offcanvas-open', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-offcanvas.open .${e(`fc-offcanvas-open${separator}${className}`)}`
      })
    }, ({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-offcanvas.open.${e(`fc-offcanvas-open${separator}${className}`)}`
      })
    }])
  }
}, function (options = {}) {
  const colors = options.colors ?? true
  if (colors) {
    return colorConfig
  }
  return {}
})
