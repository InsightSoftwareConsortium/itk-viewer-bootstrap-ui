function applyContrastSensitiveStyleToElement(context, cssClass, element) {
  if (element) {
    const uiDarkMode = context.uiDarkMode
    const addPostFix = uiDarkMode ? 'DarkBG' : 'BrightBG'
    const removePostFix = !uiDarkMode ? 'DarkBG' : 'BrightBG'
    const removeClass = `${cssClass}${removePostFix}`
    if (element.classList.contains(removeClass)) {
      element.classList.remove(removeClass)
    }
    element.classList.add(`${cssClass}${addPostFix}`)
  }
}

export default applyContrastSensitiveStyleToElement
