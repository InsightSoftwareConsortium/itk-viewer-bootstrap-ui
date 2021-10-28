import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, Slider, Tooltip } from '@material-ui/core'
import { sampleDistanceIconDataUri } from 'itk-viewer-icons'
import applyContrastSensitiveStyleToElement from '../applyContrastSensitiveStyleToElement'
import '../style.css'

function SampleDistanceSlider(props) {
  const { service } = props
  const spacingDiv = useRef(null)
  const spacingElement = useRef(null)
  const [ state, send ] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)

  useEffect(() => {
    applyContrastSensitiveStyleToElement(
        state.context, 'invertibleButton', spacingDiv.current)
    state.context.images.volumeSampleDistanceDiv = spacingDiv.current
    state.context.images.volumeSampleDistanceSlider = spacingElement.current
  }, [])

  const spacingChanged = (val) => {
    send({
      type: 'IMAGE_VOLUME_SAMPLE_DISTANCE_CHANGED',
      data: {
        name: state.context.images.selectedName,
        volumeSampleDistance: val,
      },
    })
  }

  return(
    <div className='iconWithSlider'>
      <Tooltip ref={ spacingDiv } title='Volume sample distance'>
        <Icon
          className='sampleDistanceButton'
          style={{ margin: '0 10px 15px 0' }}
        >
          <img src={ sampleDistanceIconDataUri } />
        </Icon>
      </Tooltip>
      <Slider
        ref={ spacingElement }
        className='slider'
        min={ 0 }
        max={ 1 }
        value={ actorContext.volumeSampleDistance }
        step={ 0.01 }
        onChange={(_e, val) => { spacingChanged(val) }}
      />
    </div>
  )
}

export default SampleDistanceSlider