import plugin from 'tailwindcss/plugin'

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

module.exports = plugin.withOptions(function () {
  return function ({
    addVariant,
    e
  }) {

    // Collapse
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

    // Tab
    addVariant('fc-tab-active', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.active.${e(`fc-tab-active${separator}${className}`)}`
      })
    }])

    // Dropdown
    addVariant('fc-dropdown-open', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-dropdown.open.${e(`fc-dropdown-open${separator}${className}`)}`
      })
    }, ({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-dropdown.open .${e(`fc-dropdown-open${separator}${className}`)}`
      })
    }])

    // Modal
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

    // Theme Switcher
    addVariant('fc-theme-light', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-theme.light-theme.${e(`fc-theme-light${separator}${className}`)}`
      })
    },])
    addVariant('fc-theme-dark', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-theme.dark-theme.${e(`fc-theme-dark${separator}${className}`)}`
      })
    },])
    addVariant('fc-theme-system', [({
      modifySelectors,
      separator
    }) => {
      modifySelectors(({ className }) => {
        return `.fc-theme.system-theme.${e(`fc-theme-system${separator}${className}`)}`
      })
    },])

    // Offcanvas
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
  const colorEnabled = typeof options.colors == 'boolean' ? options.colors : options.colors?.enable ?? false
  return colorEnabled ? colorConfig : {}
})
