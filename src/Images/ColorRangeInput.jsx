import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, TextField, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { interpolationIconDataUri } from 'itk-viewer-icons'
import ColorMapIconSelector from './ColorMapIconSelector'
import '../style.css'

function ColorRangeInput(props) {
  const { service } = props
  const colorRangeInput = useRef(null)
  const [ state, send ] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    state.context.images.colorRangeInputRow = colorRangeInput.current
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
      data: state.context.images.selectedName
    })
  }

  const currentRange = () => {
    let range = [0, 0]
    if (actorContext) {
      if (actorContext.colorRanges.size) {
        range = actorContext.colorRanges.get(
          actorContext.selectedComponent
        )
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
    send({
      type: 'IMAGE_COLOR_RANGE_CHANGED',
      data: {
        name,
        component: actorContext.selectedComponent,
        range: [minVal, maxVal],
      },
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

  return(
    actorContext && actorContext.colorRanges.size
    ? (<div
        ref={ colorRangeInput }
        className='uiRow'
        style={{background: 'rgba(127, 127, 127, 0.5)'}}
      >
        <label data-tooltip-left data-tooltip='Interpolation'>
          <ToggleButton
						size='small'
            className='interpolationButton toggleButton'
            value='interpolation'
            selected={ interpolate() }
            onChange={() => { toggleInterpolate() }}
          >
            <Icon>
              <img src={ interpolationIconDataUri }/>
            </Icon>
          </ToggleButton>
        </label>
        <TextField
          className='numberInput'
          type='number'
          label='Min'
          variant='outlined'
          size='small'
          defaultValue={ currentRangeMin() }
          onBlur={(e) => { rangeMinChanged(e.target.value) }}
        />
        <ColorMapIconSelector { ...props }/>
        <TextField
          className='numberInput'
          type='number'
          label='Max'
          variant='outlined'
          size='small'
          defaultValue={ currentRangeMax() }
          onBlur={(e) => { rangeMaxChanged(e.target.value) }}
        />
      </div>)
    : <div />
  )
}

export default ColorRangeInput