import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, MenuItem, Select, Tooltip } from '@material-ui/core'
import { blendModeIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function BlendModeSelector(props) {
  const { service } = props
  const blendModeDiv = useRef(null)
  const blendModeSelector = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
        state.context, 'invertibleButton', blendModeDiv.current)
    state.context.images.blendModeDiv = blendModeDiv.current
    state.context.images.blendModeSelector = blendModeSelector.current
  }, [])

  const selectionChanged = (event) => {
    const value = parseInt(event.target.value)
    state.context.images.blendModeSelector.value = value
    let mode = 'blendmode'
    switch (value) {
      case 0:
        mode = 'Composite'
        break
      case 1:
        mode = 'Maximum'
        break
      case 2:
        mode = 'Minimum'
        break
      case 3:
        mode = 'Average'
        break
    }
    send({
      type: 'IMAGE_BLEND_MODE_CHANGED',
      data: {
        name: state.context.images.selectedName,
        blendMode: mode,
      },
    })
  }

  return(
    <div className='blendSelector'>
      <label ref={ blendModeDiv } data-tooltip-left data-tooltip='Blend mode'>
        <Icon className='blendModeButton'>
          <img src={ blendModeIconDataUri }/>
        </Icon>
      </label>
      <Select
        ref={ blendModeSelector }
        className='selector'
        defaultValue={ 0 }
        onChange={(event) => { selectionChanged(event) }}
      >
        <MenuItem value={ 0 }>Composite</MenuItem>
        <MenuItem value={ 1 }>Maximum</MenuItem>
        <MenuItem value={ 2 }>Minimum</MenuItem>
        <MenuItem value={ 3 }>Average</MenuItem>
      </Select>
    </div>
  )
}

export default BlendModeSelector