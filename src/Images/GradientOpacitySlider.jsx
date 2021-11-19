import React, { useEffect, useRef, useState } from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton, Slider, Tooltip } from '@mui/material'
import { gradientIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function GradientOpacitySlider(props) {
  const { service } = props
  const sliderEntry = useRef(null)
  const gradientOpacitySlider = useRef(null)
  const gradientOpacityScaleSlider = useRef(null)
  const [ vertSlider, setVertSlider ] = useState(false)
  const [ state, send ] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
        state.context, 'invertibleButton', sliderEntry.current)
    state.context.images.gradientOpacitySlider = gradientOpacitySlider.current
    state.context.images.gradientOpacityScaleSlider = 
        gradientOpacityScaleSlider.current
  }, [])

  const opacityScaleSliderChanged = (value) => {
    send({
      type: 'IMAGE_GRADIENT_OPACITY_SCALE_CHANGED',
      data: {
        name: state.context.images.selectedName,
        gradientOpacityScale: value,
      },
    })
  }

  const opacitySliderChanged = (value) => {
    send({
      type: 'IMAGE_GRADIENT_OPACITY_CHANGED',
      data: {
        name: state.context.images.selectedName,
        gradientOpacity: value,
      },
    })
  }

  return(
    <div className='iconWithSlider'>
      <Tooltip
        ref={ sliderEntry }
        title='Gradient opacity scale'
        PopperProps={{
          anchorEl: sliderEntry.current,
          disablePortal: true,
          keepMounted: true,
        }}
      >
        <IconButton size='small' onClick={() => { setVertSlider(!vertSlider) }}>
          <Icon className='sliderEntry'><img src={ gradientIconDataUri }/></Icon>
        </IconButton>
      </Tooltip>
      <div className='gradientOpacityScale'>
        <Slider
          ref={ gradientOpacitySlider }
          className={ `slider gradientOpacityInput ${vertSlider ? '' : 'hidden'}` }
          orientation='vertical'
          min={ 0 }
          max={ 1 }
          value={ actorContext.gradientOpacity }
          step={ 0.01 }
          onChange={(_e, val) => { opacitySliderChanged(val) }}
        />
      </div>
      <Slider
        ref={ gradientOpacityScaleSlider }
        className='slider'
        min={ 0 }
        max={ 0.99 }
        value={ actorContext.gradientOpacityScale }
        step={ 0.01 }
        onChange={(_e, val) => { opacityScaleSliderChanged(val) }}
      />
    </div>
  )
}

export default GradientOpacitySlider