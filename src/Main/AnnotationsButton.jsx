import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, Tooltip } from '@material-ui/core'
import { ToggleButton } from '@material-ui/lab'
import { annotationsIconDataUri } from 'itk-viewer-icons'
import './style.css'

function AnnotationsButton(props) {
  const { service } = props
  const annotationsButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.annotationsButtonLabel = annotationsButton.current
  }, [])

  return(
    <Tooltip ref={ annotationsButton } title='Annotations'>
      <ToggleButton
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