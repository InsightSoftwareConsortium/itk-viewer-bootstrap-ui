import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton, Tooltip } from '@mui/material'
import { resetCameraIconDataUri } from 'itk-viewer-icons'
import '../style.css'

function ResetCamerButton(props) {
  const { service } = props
  const resetCameraButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.resetCameraButtonLabel = resetCameraButton.current
  }, [])

  return(
    <label ref={ resetCameraButton } data-tooltip-right data-tooltip='Reset camera [r]'>
      <IconButton size='small' onClick={() => { send('RESET_CAMERA') }}>
        <Icon>
          <img src={ resetCameraIconDataUri } />
        </Icon>
      </IconButton>
    </label>
  )
}

export default ResetCamerButton