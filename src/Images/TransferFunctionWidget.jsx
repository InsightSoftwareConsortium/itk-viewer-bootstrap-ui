import React, { useEffect, useRef } from 'react'
import { useActor, useSelector } from '@xstate/react'

import vtkMouseRangeManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseRangeManipulator'
import vtkItkPiecewiseGaussianWidget from '../vtk/ItkPiecewiseGaussianWidget'
import macro from '@kitware/vtk.js/macros'

import '../style.css'

function TransferFunctionWidget(props) {
  const { service } = props
  const send = service.send
  const piecewiseWidgetContainer = useRef(null)
  const context = useRef(null)
  const [state] = useActor(service)
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const lut = useSelector(
    service,
    (state) => state.context.images.lookupTableProxies
  )
  const component = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .selectedComponent
  )
  const dataRange = useSelector(service, (state) =>
    state.context.images.actorContext
      .get(state.context.images.selectedName)
      .colorRanges.get(
        state.context.images.actorContext.get(state.context.images.selectedName)
          .selectedComponent
      )
  )
  const getInteractorStyle2D = useSelector(service, (state) =>
    state.context.itkVtkView.getInteractorStyle2D()
  )
  const getInteractorStyle3D = useSelector(service, (state) =>
    state.context.itkVtkView.getInteractorStyle3D()
  )
  const use2D = useSelector(service, (state) => state.context.use2D)
  const windowMotionScale = useSelector(
    service,
    (state) => state.context.images.transferFunctionManipulator
  )
  const lookupTableProxies = useSelector(
    service,
    (state) => state.context.images.lookupTableProxies
  )

  useEffect(() => {
    // Create range manipulator
    const rangeManipulator = vtkMouseRangeManipulator.newInstance({
      button: 1,
      alt: true
    })
    service.machine.context.images.transferFunctionManipulator = {
      rangeManipulator: null,
      windowMotionScale: 150.0,
      levelMotionScale: 150.0,
      windowGet: null,
      windowSet: null,
      levelGet: null,
      levelSet: null
    }
    service.machine.context.images.transferFunctionManipulator.rangeManipulator =
      rangeManipulator

    // Add range manipulator
    getInteractorStyle2D.addMouseManipulator(rangeManipulator)
    getInteractorStyle3D.addMouseManipulator(rangeManipulator)
  }, [])

  useEffect(() => {
    if (!context.current) {
      const transferFunctionWidget = vtkItkPiecewiseGaussianWidget.newInstance({
        numberOfBins: 256,
        size: [400, 150]
      })
      transferFunctionWidget.setEnableRangeZoom(true)
      let iconSize = 20
      if (use2D) {
        iconSize = 0
      }
      transferFunctionWidget.updateStyle({
        backgroundColor: 'rgba(255, 255, 255, 0.2)',
        histogramColor: 'rgba(30, 30, 30, 0.6)',
        strokeColor: 'rgb(0, 0, 0)',
        activeColor: 'rgb(255, 255, 255)',
        handleColor: 'rgb(70, 70, 150)',
        buttonDisableFillColor: 'rgba(255, 255, 255, 0.5)',
        buttonDisableStrokeColor: 'rgba(0, 0, 0, 0.5)',
        buttonStrokeColor: 'rgba(0, 0, 0, 1)',
        buttonFillColor: 'rgba(255, 255, 255, 1)',
        strokeWidth: 2,
        activeStrokeWidth: 3,
        buttonStrokeWidth: 1.5,
        handleWidth: 2,
        zoomControlHeight: 20,
        zoomControlColor: 'rgba(50, 50, 100, 1)',
        iconSize, // Can be 0 if you want to remove buttons (dblClick for (+) / rightClick for (-))
        padding: 10
      })
      transferFunctionWidget.setContainer(piecewiseWidgetContainer.current)
      transferFunctionWidget.bindMouseListeners()
      transferFunctionWidget.onAnimation(onAnimationChange)
      transferFunctionWidget.onOpacityChange(() => {
        const range = transferFunctionWidget.getOpacityRange(dataRange)
        const nodes = transferFunctionWidget.getOpacityNodes(dataRange)
        send({
          type: 'IMAGE_PIECEWISE_FUNCTION_CHANGED',
          data: {
            name,
            component,
            range,
            nodes
          }
        })
      })
      transferFunctionWidget.onZoomChange(macro.throttle(onZoomChange, 150))
      context.current = { transferFunctionWidget }
    }

    return () => {
      if (context.current) {
        const { transferFunctionWidget } = context.current
        transferFunctionWidget.delete()
        context.current = null
      }
    }
  }, [piecewiseWidgetContainer])

  useEffect(() => {
    if (context.current) {
      const { transferFunctionWidget } = context.current
      service.machine.context.images.transferFunctionWidget =
        transferFunctionWidget

      // Window
      const windowGet = () => {
        const gaussian = transferFunctionWidget.getGaussians()[0]
        return (
          gaussian.width *
          state.context.images.transferFunctionManipulator.windowMotionScale
        )
      }
      service.machine.context.images.transferFunctionManipulator.windowGet =
        windowGet
      const windowSet = (value) => {
        const gaussians = transferFunctionWidget.getGaussians()
        const newGaussians = gaussians.slice()
        newGaussians[0].width =
          value /
          state.context.images.transferFunctionManipulator.windowMotionScale
        // const name = state.context.images.selectedName
        // const component = state.context.images.selectedComponent
        send({
          type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
          data: { name, component, gaussians: newGaussians }
        })
      }
      service.machine.context.images.transferFunctionManipulator.windowSet =
        windowSet

      // Level
      const levelGet = () => {
        const gaussian = transferFunctionWidget.getGaussians()[0]
        return (
          gaussian.position *
          service.machine.context.images.transferFunctionManipulator
            .levelMotionScale
        )
      }
      service.machine.context.images.transferFunctionManipulator.levelGet =
        levelGet
      const levelSet = () => {
        const gaussians = transferFunctionWidget.getGaussians()
        const newGaussians = gaussians.slice()
        // const name = state.context.images.selectedName
        // const component = state.context.images.selectedComponent
        send({
          type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
          data: { name, component, gaussians: newGaussians }
        })
      }
      service.machine.context.images.transferFunctionManipulator.levelSet =
        levelSet

      const pwfRangeManipulator = vtkMouseRangeManipulator.newInstance({
        button: 3, // Right mouse
        alt: true
      })
      const pwfRangeManipulatorShift = vtkMouseRangeManipulator.newInstance({
        button: 1, // Left mouse
        shift: true, // For the macOS folks
        alt: true
      })
      const pwfMotionScale = 200.0
      const pwfGet = () => {
        const gaussian = transferFunctionWidget.getGaussians()[0]
        return gaussian.height * pwfMotionScale
      }
      const pwfSet = (value) => {
        const gaussians = transferFunctionWidget.getGaussians()
        const newGaussians = gaussians.slice()
        newGaussians[0].height = value / pwfMotionScale
        // const name = state.context.images.selectedName
        // const component = state.context.images.selectedComponent
        send({
          type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
          data: { name, component, gaussians: newGaussians }
        })
      }
      pwfRangeManipulator.setVerticalListener(
        0,
        pwfMotionScale,
        1,
        pwfGet,
        pwfSet
      )
      pwfRangeManipulatorShift.setVerticalListener(
        0,
        pwfMotionScale,
        1,
        pwfGet,
        pwfSet
      )
      getInteractorStyle3D.addMouseManipulator(pwfRangeManipulator)
      getInteractorStyle3D.addMouseManipulator(pwfRangeManipulatorShift)
    }
  }, [context])

  useEffect(() => {
    if (lut && lut.size === 1) {
      const componentIndex = actorContext.selectedComponent
      send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: { name, component: componentIndex, colorMap: 'Grayscale' }
      })
    }
  }, [lookupTableProxies])

  // Manage update when opacity changes
  const onAnimationChange = (start) => {
    if (start) {
      send({
        type: 'REQUEST_ANIMATION',
        data: 'transferFunctionWidget'
      })
    } else {
      send({
        type: 'CANCEL_ANIMATION',
        data: 'transferFunctionWidget'
      })
    }
  }

  const onZoomChange = (zoom) => {
    const component = useSelector(
      service,
      (state) =>
        state.context.images.actorContext.get(state.context.images.selectedName)
          .selectedComponent
    )
    const fullRange = useSelector(service, (state) =>
      state.context.images.actorContext
        .get(state.context.images.selectedName)
        .colorRanges.get(
          state.context.images.actorContext.get(
            state.context.images.selectedName
          ).selectedComponent
        )
    )
    const diff = fullRange[1] - fullRange[0]
    const colorRange = new Array(2)
    colorRange[0] = fullRange[0] + zoom[0] * diff
    colorRange[1] = fullRange[0] + zoom[1] * diff
    send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: { name, component, range: colorRange }
    })
  }

  return (
    <div className="uiRow" style={{ background: 'rgba(127, 127, 127, 0.5)' }}>
      <div className="piecewiseWidget" ref={piecewiseWidgetContainer} />
    </div>
  )
}

export default TransferFunctionWidget
