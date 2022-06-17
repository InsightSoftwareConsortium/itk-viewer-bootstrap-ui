import React, { useEffect, useRef } from 'react'
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
import { ConstructionOutlined } from '@mui/icons-material'

function ColorRangeInput(props) {
  const { service } = props
  const colorRangeInput = useRef(null)
  const interpolationButton = useRef(null)
  const send = service.send
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
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
      .colorRanges.get(actorContext.selectedComponent)
  )

  useEffect(() => {
    service.machine.context.images.colorRangeInputRow = colorRangeInput.current
  }, [colorRangeInput.current])

  const interpolate = () => {
    if (actorContext) {
      return interpolationEnabled
    }
    return true
  }

  const toggleInterpolate = () => {
    send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: name
    })
  }

  if (!actorContext) {
    console.log(actorContext)
  }

  const currentRange = () => {
    let range = [0, 0]
    if (actorContext) {
      if (colorRanges.size) {
        range = colorRangesSelected
      }
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
    const bounds = actorContext.colorRangeBounds.get(
      actorContext.selectedComponent
    )
    const rangeMin = minVal < bounds[0] ? bounds[0] : minVal
    const rangeMax = maxVal > bounds[1] ? bounds[1] : maxVal
    send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name,
        component: actorContext.selectedComponent,
        range: [rangeMin, rangeMax]
      }
    })
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
    actorContext &&
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
            value={currentRangeMin()}
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
            value={currentRangeMax()}
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
