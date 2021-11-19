import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, ToggleButton, Tooltip } from '@mui/material'
import { viewPlanesIconDataUri } from 'itk-viewer-icons'

function ViewPlanesToggle(props) {
  const { service } = props
  const viewPlanesButton = useRef(null)
  const [ state, send ] = useActor(service)
  const { slicingPlanes } = state.context.main

  useEffect(() => {
    state.context.main.viewPlanesButtonLabel = viewPlanesButton.current
  }, [])

  const planesVisible = () => {
    return (
      slicingPlanes.x.visible ||
      slicingPlanes.y.visible ||
      slicingPlanes.z.visible
    )
  }

  const toggleSlicingPlanes = () => {
    if (
      !slicingPlanes.x.visibile &&
      !slicingPlanes.y.visible &&
      !slicingPlanes.z.visible
    ) {
      slicingPlanes.x.visible = true
      slicingPlanes.y.visible = true
      slicingPlanes.z.visible = true
    } else {
      slicingPlanes.x.visible = false
      slicingPlanes.y.visible = false
      slicingPlanes.z.visible = false
    }
    return slicingPlanes
  }

  const handleToggle = () => {
    const planes = toggleSlicingPlanes()
    send({
      type: 'SLICING_PLANES_CHANGED',
      data: planes,
    })
  }

  return(
    <label ref={ viewPlanesButton } data-tooltip-right data-tooltip='View planes [s]'>
      <ToggleButton
        size='small'
        className='toggleButton'
        value='visiblePlanes'
        selected={ planesVisible() }
        onChange={ handleToggle }
      >
        <Icon>
          <img src={ viewPlanesIconDataUri } />
        </Icon>
      </ToggleButton>
    </label>
  )
}

export default ViewPlanesToggle