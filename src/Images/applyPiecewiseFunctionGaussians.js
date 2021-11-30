function applyPiecewiseFunctionGaussians(context, event) {
  const gaussians = event.data.gaussians

  const transferFunctionWidget = context.images.transferFunctionWidget
  if (transferFunctionWidget) {
    transferFunctionWidget.setGaussians(gaussians)
  }
}

export default applyPiecewiseFunctionGaussians
