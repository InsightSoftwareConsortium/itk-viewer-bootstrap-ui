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
    <Tooltip
      ref={ resetCameraButton }
      title='Reset camera [r]'
      PopperProps={{
        anchorEl: resetCameraButton.current,
        disablePortal: true,
        keepMounted: true,
      }}
    >
      <IconButton size='small' onClick={() => { send('RESET_CAMERA') }}>
        <Icon>
          <img src={ resetCameraIconDataUri } />
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default ResetCamerButton