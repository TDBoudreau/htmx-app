class utils {
  static elementWrapper = (content, element, attributes = "", classes = "", styles = "") => {
    return `<${element}${attributes ? ' ' + attributes : ''}${classes ? ' class="' + classes + '"' : ''}>${content}</${element}>`
  }
}

module.exports = utils