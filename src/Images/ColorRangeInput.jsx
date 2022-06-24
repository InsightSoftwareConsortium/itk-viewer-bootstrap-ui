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

  const colorRangesSelected = useSelector(service, (state) =>
    state.context.images.actorContext
      .get(state.context.images.selectedName)
      .colorRanges.get(
        state.context.images.actorContext.get(state.context.images.selectedName)
          .selectedComponent
      )
  )
  const boundsSelected = useSelector(service, (state) =>
    state.context.images.actorContext
      .get(state.context.images.selectedName)
      .colorRangeBounds.get(
        state.context.images.actorContext.get(state.context.images.selectedName)
          .selectedComponent
      )
  )

  const selectedComponent = useSelector(
    service,
    (state) =>
      state.context.images.actorContext.get(state.context.images.selectedName)
        .selectedComponent
  )

  const [minLocal, setMinLocal] = useState(
    colorRanges.size ? colorRangesSelected[0] : 0 // DOUBLE check
  )
  const [maxLocal, setMaxLocal] = useState(
    colorRanges.size ? colorRangesSelected[1] : 255
  )

  useEffect(() => {
    service.machine.context.images.colorRangeInputRow = colorRangeInput.current
  }, [colorRangeInput.current])

  const interpolate = () => {
    return interpolationEnabled
  }

  const toggleInterpolate = () => {
    send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: name
    })
  }

  const currentRange = () => {
    let range = [0, 1]
    if (
      colorRanges.size &&
      colorRangesSelected[1] - colorRangesSelected[0] > 0
    ) {
      range = colorRangesSelected
    }
    return range
  }

  const currentRangeMin = () => {
    const range = currentRange()
    return range[0]
  }

  const currentRangeMax = () => {
    const range = currentRange()
    return range[1]
  }

  const rangeChanged = (minVal, maxVal) => {
    const bounds = boundsSelected
    // // avoid range size < 1

    if (!isNaN(minVal) && !isNaN(maxVal)) {
      const rangeMaxAux = maxVal > bounds[1] ? bounds[1] : maxVal
      let rangeMax = rangeMaxAux <= minVal ? minVal + 1 : rangeMaxAux

      const rangeMinAux = minVal < bounds[0] ? bounds[0] : minVal
      let rangeMin = rangeMinAux >= maxVal - 1 ? maxVal - 1 : rangeMinAux

      if (minVal == maxVal) {
        rangeMin = minLocal
        rangeMax = maxLocal
      }
      setMinLocal(rangeMin)
      setMaxLocal(rangeMax)

      send({
        type: 'IMAGE_COLOR_RANGE_CHANGED',
        data: {
          name,
          component: selectedComponent,
          range: [rangeMin, rangeMax]
        }
      })
    } else if (!isNaN(maxVal)) {
      setMinLocal('')
    } else if (!isNaN(minVal)) {
      setMaxLocal('')
    }
  }

  const rangeMinChanged = (val) => {
    const maxVal = currentRangeMax()
    rangeChanged(parseFloat(val), maxVal)
  }

  const rangeMaxChanged = (val) => {
    const minVal = currentRangeMin()
    rangeChanged(minVal, parseFloat(val))
  }

  return (
    colorRanges.size && (
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
              checked: interpolate()
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
            className="numberInput"
            type="number"
            value={minLocal}
            onChange={(e) => {
              rangeMinChanged(e.target.value)
            }}
          />
        </OverlayTrigger>
        <ColorMapIconSelector {...props} />
        <OverlayTrigger transition={false} overlay={<Tooltip>Max</Tooltip>}>
          <Form.Control
            className="numberInput"
            type="number"
            value={maxLocal}
            onChange={(e) => {
              rangeMaxChanged(e.target.value)
            }}
          />
        </OverlayTrigger>
      </div>
    )
  )
}

export default ColorRangeInput
