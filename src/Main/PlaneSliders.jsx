import React from 'react'
import { useActor } from '@xstate/react'
import { Chip, Icon, IconButton, Slider, Tooltip } from '@material-ui/core'
import { visibleIconDataUri, invisibleIconDataUri, pauseIconDataUri, playIconDataUri } from 'itk-viewer-icons'
import '../style.css'

function PlaneSliders(props) {
  const { service } = props
  const [ state, send ] = useActor(service)
  const planes = ['x', 'y', 'z']
  const { slicingPlanes, viewMode } = state.context.main

  const toggleVisibility = (plane) => {
    slicingPlanes[`${plane}`].visible = !slicingPlanes[`${plane}`].visible
    send({ type: 'SLICING_PLANES_CHANGED', data: slicingPlanes })
  }

  const togglePlay = (plane) => {
    slicingPlanes[`${plane}`].scroll = !slicingPlanes[`${plane}`].scroll
    if (slicingPlanes[`${plane}`].scroll && 
          !slicingPlanes[`${plane}`].visible) {
        toggleVisibility(plane)
    }
    send({ type: 'SLICING_PLANES_CHANGED', data: slicingPlanes })
  }

  const handleSliderChange = (plane, val) => {
    send({
      type: `${plane.toUpperCase()}_SLICE_CHANGED`,
      data: val
    })
  }

  const sliderVisible = (plane) => {
    const isVolume = viewMode === 'Volume'
    const planeVisible = viewMode ===`${plane.toUpperCase()}Plane`
    if (!isVolume && !planeVisible) {
      return 'hidden'
    }
    return ''
  }

  return(
    <div className={`${state.context.uiCollapsed ? 'hidden' : 'uiSlidersGroup'}`}>
      {planes.map((plane) => {
        return(
          state.context.main[`${plane}Slice`] &&
            (<div key={ plane.toUpperCase() } className={`planeSliders ${ sliderVisible(plane) }`}>
              <Tooltip title={`${plane.toUpperCase()} Plane Visibility`}>
                <IconButton
                  size='small'
                  className={`sliderIcons ${viewMode !== 'Volume' ? 'hidden' : ''}`}
                  onClick={(_e) => { toggleVisibility(plane) }}
                >
                  <Icon>
                    {slicingPlanes[`${plane}`].visible
                      ? <img src={ visibleIconDataUri }/>
                      : <img className='toggledOffIcon' src={ invisibleIconDataUri }/>
                    }
                  </Icon>
                </IconButton>
              </Tooltip>
              <Tooltip title={`${plane} Plane Toggle Scroll`}>
                <IconButton
                  size='small'
                  className='sliderIcons'
                  onClick={(_e) => { togglePlay(plane) }}
                >
                  <Icon>
                    {slicingPlanes[`${plane}`].scroll
                      ? <img src={ pauseIconDataUri }/>
                      : <img className='toggledOffIcon' src={ playIconDataUri }/>
                    }
                  </Icon>
                </IconButton>
              </Tooltip>
              <Chip
                className='sliderIcons'
                size='small'
                label={`${plane.toUpperCase()}: ${state.context.main[`${plane}Slice`].toFixed(3)}`}
                color="secondary"
              />
              <Slider
                min={slicingPlanes[`${plane}`].min}
                max={slicingPlanes[`${plane}`].max}
                step={slicingPlanes[`${plane}`].step}
                value={ state.context.main[`${plane}Slice`] }
                onChange={ (_e, val) => {handleSliderChange(plane, val)} }
              />
            </div>)
        )
      })}
    </div>
  )
}

export default PlaneSliders
