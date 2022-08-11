import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import { interpolationIconDataUri } from 'itk-viewer-icons'
import ColorMapIconSelector from './ColorMapIconSelector'
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

  const selectedComponent = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .selectedComponent
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

  const toggleInterpolate = () => {
    send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: name
    })
  }

  const currentRange = colorRanges.size ? colorRangesSelected : [0, 1]
  const currentRangeMin = currentRange[0]
  const currentRangeMax = currentRange[1]

  let [rangeMin, rangeMax] = [0, 0]

  if (
    actorContext.componentVisibilities.length === 1 &&
    actorContext.selectedComponent
  ) {
    ;[rangeMin, rangeMax] =
      actorContext.image.scaleInfo[actorContext.renderedScale].ranges[
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
  const step =
    imageType?.slice(0, 5) === 'float' ? (rangeMax - rangeMin) / 200 : 1
  const [minIntent, setminIntent] = useState(currentRangeMin)
  const [maxIntent, setmaxIntent] = useState(currentRangeMax)

  // update the initialized state for minIntent and maxIntent
  useEffect(() => {
    setminIntent(currentRangeMin)
  }, [currentRangeMin])
  useEffect(() => {
    setmaxIntent(currentRangeMax)
  }, [currentRangeMax])

  const isValidBounds = (minVal, maxVal) => {
    if (minVal < maxVal) {
      return true
    } else {
      return false
    }
  }

  const rangeChanged = (minVal, maxVal) => {
    const bounds = boundsSelected

    if (!isNaN(minVal) && !isNaN(maxVal)) {
      let rangeMax = maxVal >= bounds[1] ? bounds[1] : maxVal
      let rangeMin = minVal <= bounds[0] ? bounds[0] : minVal

      if (isValidBounds(rangeMin, rangeMax)) {
        setmaxIntent(rangeMax)
        setminIntent(rangeMin)
        send({
          type: 'IMAGE_COLOR_RANGE_CHANGED',
          data: {
            name,
            component: selectedComponent,
            range: [rangeMin, rangeMax]
          }
        })
      } else {
        setmaxIntent(maxVal)
        setminIntent(minVal)
      }
    } else {
      if (isNaN(minVal)) {
        setminIntent('')
      }
      if (isNaN(maxVal)) {
        setmaxIntent('')
      }
    }
  }

  const rangeMinChanged = (val) => {
    const maxVal = currentRangeMax
    rangeChanged(parseFloat(val), maxVal)
  }

  const rangeMaxChanged = (val) => {
    const minVal = currentRangeMin
    rangeChanged(minVal, parseFloat(val))
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
        <OverlayTrigger transition={false} overlay={<Tooltip>Min</Tooltip>}>
          <Form.Control
            className={cn('numberInput', {
              invalidNumber: minIntent >= maxIntent
            })}
            type="number"
            value={minIntent}
            onChange={(e) => {
              rangeMinChanged(e.target.value)
            }}
            step={step}
          />
        </OverlayTrigger>
        <ColorMapIconSelector {...props} />
        <OverlayTrigger transition={false} overlay={<Tooltip>Max</Tooltip>}>
          <Form.Control
            className={cn('numberInput', {
              invalidNumber: maxIntent <= minIntent
            })}
            type="number"
            value={maxIntent}
            onChange={(e) => {
              rangeMaxChanged(e.target.value)
            }}
            step={step}
          />
        </OverlayTrigger>
      </div>
    )
  )
}

export default ColorRangeInput
