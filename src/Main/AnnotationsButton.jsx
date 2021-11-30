import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, ToggleButton, Tooltip } from '@mui/material'
import { annotationsIconDataUri } from 'itk-viewer-icons'
import '../style.css'

function AnnotationsButton(props) {
  const { service } = props
  const annotationsButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.annotationsButtonLabel = annotationsButton.current
  }, [])

  return(
    <Tooltip
      ref={ annotationsButton }
      title='Annotations'
      PopperProps={{
        anchorEl: annotationsButton.current,
        disablePortal: true,
        keepMounted: true,
      }}
    >
      <ToggleButton
        size='small'
        className='toggleButton'
        value='annotations'
        selected={ state.context.main.annotationsEnabled }
        onChange={() => { send('TOGGLE_ANNOTATIONS') }}
      >
        <Icon>
          <img src={ annotationsIconDataUri } />
        </Icon>
      </ToggleButton>
    </Tooltip>
  )
}

export default AnnotationsButton