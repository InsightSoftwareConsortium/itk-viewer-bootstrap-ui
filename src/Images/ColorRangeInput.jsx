import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { Icon, TextField, ToggleButton, Tooltip } from '@mui/material'
import { interpolationIconDataUri } from 'itk-viewer-icons'
import ColorMapIconSelector from './ColorMapIconSelector'
import '../style.css'

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

  useEffect(() => {
    service.machine.context.images.colorRangeInputRow = colorRangeInput.current
  }, [colorRangeInput.current])

  const interpolate = () => {
    if (actorContext) {
      return actorContext.interpolationEnabled
    }
    return true
  }

  const toggleInterpolate = () => {
    send({
      type: 'TOGGLE_IMAGE_INTERPOLATION',
      data: name
    })
  }

  const currentRange = () => {
    let range = [0, 0]
    if (actorContext) {
      if (actorContext.colorRanges.size) {
        range = actorContext.colorRanges.get(actorContext.selectedComponent)
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

  return actorContext && actorContext.colorRanges.size ? (
    <div
      ref={colorRangeInput}
      className="uiRow"
      style={{ background: 'rgba(127, 127, 127, 0.5)' }}
    >
      <Tooltip
        ref={interpolationButton}
        title="Interpolation"
        PopperProps={{
          anchorEl: interpolationButton.current,
          disablePortal: true,
          keepMounted: true
        }}
      >
        <ToggleButton
          size="small"
          className="interpolationButton toggleButton"
          value="interpolation"
          selected={interpolate()}
          onChange={() => {
            toggleInterpolate()
          }}
        >
          <Icon>
            <img src={interpolationIconDataUri} />
          </Icon>
        </ToggleButton>
      </Tooltip>
      <TextField
        className="numberInput"
        type="number"
        label="Min"
        variant="outlined"
        size="small"
        value={currentRangeMin()}
        onChange={(e) => {
          rangeMinChanged(e.target.value)
        }}
      />
      <ColorMapIconSelector {...props} />
      <TextField
        className="numberInput"
        type="number"
        label="Max"
        variant="outlined"
        size="small"
        value={currentRangeMax()}
        onChange={(e) => {
          rangeMaxChanged(e.target.value)
        }}
      />
    </div>
  ) : (
    <div />
  )
}

export default ColorRangeInput
