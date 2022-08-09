import React, { useEffect, useRef, useState, useCallback } from 'react'
import { useActor } from '@xstate/react'

import vtkMouseRangeManipulator from '@kitware/vtk.js/Interaction/Manipulators/MouseRangeManipulator'
import vtkItkPiecewiseGaussianWidget from '../vtk/ItkPiecewiseGaussianWidget'
import macro from '@kitware/vtk.js/macros'

import '../style.css'

function TransferFunctionWidget(props) {
  const { service } = props
  const piecewiseWidgetContainer = useRef(null)
  const context = useRef(null)
  const [state, send] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    // Create range manipulator
    const rangeManipulator = vtkMouseRangeManipulator.newInstance({
      button: 1,
      alt: true
    })
    state.context.images.transferFunctionManipulator = {
      rangeManipulator: null,
      windowMotionScale: 150.0,
      levelMotionScale: 150.0,
      windowGet: null,
      windowSet: null,
      levelGet: null,
      levelSet: null
    }
    state.context.images.transferFunctionManipulator.rangeManipulator =
      rangeManipulator

    // Add range manipulator
    state.context.itkVtkView
      .getInteractorStyle2D()
      .addMouseManipulator(rangeManipulator)
    state.context.itkVtkView
      .getInteractorStyle3D()
      .addMouseManipulator(rangeManipulator)
  }, [])

  useEffect(() => {
    if (!context.current) {
      const transferFunctionWidget = vtkItkPiecewiseGaussianWidget.newInstance({
        numberOfBins: 256,
        size: [400, 150]
      })
      transferFunctionWidget.setEnableRangeZoom(true)
      let iconSize = 20
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
        const name = state.context.images.selectedName
        const actorContext = state.context.images.actorContext.get(name)
        const component = actorContext.selectedComponent
        const dataRange = actorContext.colorRanges.get(component)
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
      state.context.images.transferFunctionWidget = transferFunctionWidget

      // Window
      const windowGet = () => {
        const gaussian = transferFunctionWidget.getGaussians()[0]
        return (
          gaussian.width *
          state.context.images.transferFunctionManipulator.windowMotionScale
        )
      }
      state.context.images.transferFunctionManipulator.windowGet = windowGet
      const windowSet = (value) => {
        const gaussians = transferFunctionWidget.getGaussians()
        const newGaussians = gaussians.slice()
        newGaussians[0].width =
          value /
          state.context.images.transferFunctionManipulator.windowMotionScale
        const name = state.context.images.selectedName
        const component = state.context.images.selectedComponent
        send({
          type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
          data: { name, component, gaussians: newGaussians }
        })
      }
      state.context.images.transferFunctionManipulator.windowSet = windowSet

      // Level
      const levelGet = () => {
        const gaussian = transferFunctionWidget.getGaussians()[0]
        return (
          gaussian.position *
          state.context.images.transferFunctionManipulator.levelMotionScale
        )
      }
      state.context.images.transferFunctionManipulator.levelGet = levelGet
      const levelSet = () => {
        const gaussians = transferFunctionWidget.getGaussians()
        const newGaussians = gaussians.slice()
        const name = state.context.images.selectedName
        const component = state.context.images.selectedComponent
        send({
          type: 'IMAGE_PIECEWISE_FUNCTION_GAUSSIANS_CHANGED',
          data: { name, component, gaussians: newGaussians }
        })
      }
      state.context.images.transferFunctionManipulator.levelSet = levelSet

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
        const name = state.context.images.selectedName
        const component = state.context.images.selectedComponent
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
      state.context.itkVtkView
        .getInteractorStyle3D()
        .addMouseManipulator(pwfRangeManipulator)
      state.context.itkVtkView
        .getInteractorStyle3D()
        .addMouseManipulator(pwfRangeManipulatorShift)
    }
  }, [context])

  useEffect(() => {
    const lut = state.context.images.lookupTableProxies
    if (lut) {
      const componentIndex = actorContext.selectedComponent
      send({
        type: 'IMAGE_COLOR_MAP_CHANGED',
        data: {
          name,
          component: componentIndex,
          colorMap: actorContext.colorMaps.get(actorContext.selectedComponent)
        }
      })
    }
  }, [actorContext.selectedComponent, state.context.images.lookupTableProxies])

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
    const name = state.context.images.selectedName
    const actorContext = state.context.images.actorContext.get(name)
    const component = actorContext.selectedComponent
    const fullRange = actorContext.colorRanges.get(component)
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
