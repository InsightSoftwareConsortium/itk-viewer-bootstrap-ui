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
    state.context.images.actorContext.get(name)
  )

  const imageType = actorContext.image.imageType.componentType

  useEffect(() => {
    service.machine.context.images.colorRangeInputRow = colorRangeInput.current
  }, [service.machine.context.images])

  const toggleInterpolate = () => {
    send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: name
    })
  }

  const currentRange = () => {
    let range = [0, 1]
    // if (imageType === 'float32') {
    //   range = [0, 1]
    // } else if (imageType === 'uint8') {
    //   range = [0, 255]
    //   console.log(`this is uint8, range=${range}`)
    // } else if (imageType === 'uint16') {
    //   range = [0, 65535]
    // } else if (imageType === 'int8') {
    //   range = [-128, 127]
    // } else if (imageType === 'int16') {
    //   range = [-32767, 32767]
    // } else {
    //   range = [0, 0]
    //   console.log(`imageType=${imageType} not recognized`)
    // }
    if (colorRanges.size) {
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

  const [minIntent, setminIntent] = useState(currentRangeMin())
  const [maxIntent, setmaxIntent] = useState(currentRangeMax())
  const [prevMinVal, setPrevMinVal] = useState(currentRangeMin())
  const [prevMaxVal, setPrevMaxVal] = useState(currentRangeMax())

  const rangeChanged = (minVal, maxVal) => {
    const bounds = boundsSelected
    const step =
      imageType.slice(0, 3) === 'int' || imageType.slice(0, 3) === 'uin'
        ? 1
        : (bounds[1] - bounds[0]) / 1000.0

    if (!isNaN(minVal) && !isNaN(maxVal)) {
      let rangeMax = maxVal >= bounds[1] ? bounds[1] : maxVal
      let rangeMin = minVal <= bounds[0] ? bounds[0] : minVal

      // if have maxVal and minVal not respecting signs,
      // display the numbers but do not send them up
      if (minVal >= maxVal || maxVal <= minVal) {
        if (maxVal <= bounds[0]) {
          setmaxIntent(bounds[0] + step)
        } else if (maxVal === maxIntent || isNaN(prevMaxVal)) {
          setmaxIntent(maxVal)
        } else {
          setmaxIntent(maxIntent + maxVal - prevMaxVal)
        }
        if (minVal >= bounds[1]) {
          setminIntent(bounds[1] - step)
        } else if (minVal === minIntent || isNaN(prevMinVal)) {
          setminIntent(minVal)
        } else {
          setminIntent(minIntent + minVal - prevMinVal)
        }
      } else {
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
      }
    } else {
      if (isNaN(minVal)) {
        setminIntent('')
      }
      if (isNaN(maxVal)) {
        setmaxIntent('')
      }
    }
    setPrevMaxVal(maxVal)
    setPrevMinVal(minVal)
  }

  const rangeMinChanged = (val) => {
    const maxVal = currentRangeMax()
    rangeChanged(parseFloat(val), maxVal)
  }

  const rangeMaxChanged = (val) => {
    const minVal = currentRangeMin()
    rangeChanged(minVal, parseFloat(val))
  }
  console.log(`colorRangesSelected=${colorRangesSelected}`)

  return (
    colorRanges.size &&
    colorRangesSelected !== undefined && ( // not sure if 2nd cond needed
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
            value={
              imageType.slice(0, 5) === 'float'
                ? Number.parseFloat(minIntent).toExponential(2)
                : minIntent
            }
            onChange={(e) => {
              rangeMinChanged(e.target.value)
            }}
          />
        </OverlayTrigger>
        <ColorMapIconSelector {...props} />
        <OverlayTrigger transition={false} overlay={<Tooltip>Max</Tooltip>}>
          <Form.Control
            className={cn('numberInput', {
              invalidNumber: maxIntent <= minIntent
            })}
            type="number"
            value={
              imageType.slice(0, 5) === 'float'
                ? Number.parseFloat(maxIntent).toExponential(2)
                : maxIntent
            }
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
