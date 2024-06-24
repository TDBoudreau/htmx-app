class utils {
  static elementWrapper = (content, element, attributes = "", classes = "", styles = "") => {
    const attribs = attributes ? ' ' + attributes : '';
    const cssClasses = classes ? ' class="' + classes + '"' : '';

    return `<${element}${attribs}${cssClasses}>${content}</${element}>`
  }
}

module.exports = utils