import React from 'react'
import { useActor } from '@xstate/react'
import { Icon, IconButton, Tooltip } from '@material-ui/core'
import { resetCameraIconDataUri } from 'itk-viewer-icons'
import './style.css'

function ResetCamerButton(props) {
  const { service } = props
  const [, send ] = useActor(service)

  return(
    <Tooltip title='Reset camera [r]'>
      <IconButton onClick={() => { send('RESET_CAMERA') }}>
        <Icon>
          <img src={ resetCameraIconDataUri } />
        </Icon>
      </IconButton>
    </Tooltip>
  )
}

export default ResetCamerButton