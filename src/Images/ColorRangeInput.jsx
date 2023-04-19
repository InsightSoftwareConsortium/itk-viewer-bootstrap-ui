import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import { interpolationIconDataUri } from 'itk-viewer-icons'
import ColorMapIconSelector from './ColorMapIconSelector'
import WindowLevelReset from './WindowLevelReset'
import '../style.css'
import Button from 'react-bootstrap/Button'
import Form from 'react-bootstrap/Form'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'
import getSelectedImageContext from './getSelectedImageContext'

function ColorRangeInput(props) {
  const { service } = props
  const colorRangeInput = useRef(null)
  const interpolationButton = useRef(null)
  const [input1Tooltip, setInput1Tooltip] = useState('Color range min')
  const [input2Tooltip, setInput2Tooltip] = useState('Color range max')
  const send = service.send
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const interpolationEnabled = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .interpolationEnabled
  )

  const colorRanges = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .colorRanges
  )

  const colorRangeBounds = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .colorRangeBounds
  )

  const selectedComponent = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .selectedComponent
  )

  const windowLevelEnabled = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .windowLevelEnabled
  )

  const colorRangesSelected = useSelector(service, (state) =>
    state.context.images.actorContext
      .get(state.context.images.selectedName)
      .colorRanges.get(selectedComponent)
  )

  const boundsSelected = useSelector(service, (state) =>
    state.context.images.actorContext
      .get(state.context.images.selectedName)
      .colorRangeBounds.get(selectedComponent)
  )

  const actorContext = useSelector(service, (state) =>
    getSelectedImageContext(state)
  )

  const imageType = actorContext.image?.imageType.componentType

  useEffect(() => {
    service.machine.context.images.colorRangeInputRow = colorRangeInput.current
  }, [service.machine.context.images])

  useEffect(() => {
    setInput1Tooltip(windowLevelEnabled ? 'Window width' : 'Color range min')
    setInput2Tooltip(windowLevelEnabled ? 'Window level' : 'Color range max')
  }, [windowLevelEnabled])

  const toggleInterpolate = () => {
    send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: name
    })
  }

  const currentRange =
    colorRanges.size && colorRangesSelected ? colorRangesSelected : [0, 1]
  const currentRangeMin = currentRange[0]
  const currentRangeMax = currentRange[1]
  const currentBounds = colorRangeBounds.size ? boundsSelected : [0, 1]
  const currentWidth = currentBounds[1] - currentBounds[0]
  const currentLevel = (currentBounds[1] + currentBounds[0]) / 2

  let [rangeMin, rangeMax] = [0, 0]

  if (
    actorContext.componentVisibilities.length === 1 &&
    actorContext.selectedComponent
  ) {
    ;[rangeMin, rangeMax] =
      actorContext.image.scaleInfo[actorContext.loadedScale].ranges[
        actorContext.selectedComponent
      ]
  } else if (
    actorContext.componentVisibilities.length > 1 &&
    actorContext.colorRangeBounds.get(actorContext.selectedComponent)
  ) {
    ;[rangeMin, rangeMax] = actorContext.colorRangeBounds.get(
      actorContext.selectedComponent
    )
  }
  const rangeStep =
    imageType?.slice(0, 5) === 'float' ? (rangeMax - rangeMin) / 200 : 1
  const windowingStep =
    10 ** Math.ceil(Math.log((currentBounds[1] - currentBounds[0]) / 1000))
  const [minIntent, setminIntent] = useState(currentRangeMin)
  const [maxIntent, setmaxIntent] = useState(currentRangeMax)
  const [width, setWidth] = useState(currentWidth)
  const [level, setLevel] = useState(currentLevel)

  // update the initialized state for minIntent and maxIntent
  useEffect(() => {
    setminIntent(currentRangeMin)
  }, [currentRangeMin])
  useEffect(() => {
    setmaxIntent(currentRangeMax)
  }, [currentRangeMax])
  useEffect(() => {
    setWidth(currentWidth)
  }, [currentWidth])
  useEffect(() => {
    setLevel(currentLevel)
  }, [currentLevel])
  useEffect(() => {
    const [min, max] = currentRange
    setWidth(max - min)
    setLevel((max + min) / 2)
  }, [currentRange])

  const isValidBounds = (input1, input2) => {
    if (isNaN(input1) || isNaN(input2)) {
      return false
    }
    return isValidInput(input1, input2)
  }

  const isValidInput = () => {
    if (windowLevelEnabled) {
      return width > 0
    } else {
      return minIntent <= maxIntent
    }
  }

  const inputChanged = (input1, input2) => {
    if (isValidBounds(input1, input2)) {
      let rangeMin = minIntent
      let rangeMax = maxIntent
      if (windowLevelEnabled) {
        rangeMin = input2 - input1 / 2
        rangeMax = input2 + input1 / 2
        setWidth(input1)
        setLevel(input2)
      } else {
        const bounds = boundsSelected
        rangeMax = input2 >= bounds[1] ? bounds[1] : input2
        rangeMin = input1 <= bounds[0] ? bounds[0] : input1
        setmaxIntent(rangeMax)
        setminIntent(rangeMin)
      }
      send({
        type: 'IMAGE_COLOR_RANGE_CHANGED',
        data: {
          name,
          component: selectedComponent,
          range: [rangeMin, rangeMax]
        }
      })
    } else {
      if (windowLevelEnabled) {
        setWidth(input1)
        setLevel(input2)
      } else {
        setmaxIntent(input1)
        setminIntent(input2)
      }
    }
  }

  const input1Changed = (val) => {
    let input2 = windowLevelEnabled ? level : currentRangeMax
    inputChanged(parseFloat(val), input2)
  }

  const input2Changed = (val) => {
    let input1 = windowLevelEnabled ? width : currentRangeMin
    inputChanged(input1, parseFloat(val))
  }

  return (
    colorRanges.size !== 0 && (
      <div
        ref={colorRangeInput}
        className="uiRow"
        style={{ background: 'rgba(127, 127, 127, 0.5)' }}
      >
        <OverlayTrigger
          transition={false}
          overlay={<Tooltip>Interpolation</Tooltip>}
        >
          <Button
            className={cn('icon-button', {
              checked: interpolationEnabled
            })}
            onClick={() => {
              toggleInterpolate()
            }}
            variant="secondary"
            ref={interpolationButton}
          >
            <Image src={interpolationIconDataUri}></Image>
          </Button>
        </OverlayTrigger>
        <OverlayTrigger
          transition={false}
          overlay={<Tooltip>{input1Tooltip}</Tooltip>}
        >
          <Form.Control
            className={cn('numberInput', {
              invalidNumber: !isValidInput()
            })}
            type="number"
            value={windowLevelEnabled ? width : minIntent}
            onChange={(e) => {
              input1Changed(e.target.value)
            }}
            step={windowLevelEnabled ? windowingStep : rangeStep}
          />
        </OverlayTrigger>
        <ColorMapIconSelector {...props} />
        <OverlayTrigger
          transition={false}
          overlay={<Tooltip>{input2Tooltip}</Tooltip>}
        >
          <Form.Control
            className={cn('numberInput', {
              invalidNumber: !isValidInput()
            })}
            type="number"
            value={windowLevelEnabled ? level : maxIntent}
            onChange={(e) => {
              input2Changed(e.target.value)
            }}
            step={windowLevelEnabled ? windowingStep : rangeStep}
          />
        </OverlayTrigger>
        <WindowLevelReset {...props} />
      </div>
    )
  )
}

export default ColorRangeInput
