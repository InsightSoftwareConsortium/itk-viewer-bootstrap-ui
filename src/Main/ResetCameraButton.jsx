import React from 'react'
import { useActor } from '@xstate/react'
import { resetCameraIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function ResetCamerButton(props) {
  const { service } = props
  const [state, send] = useActor(service)

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Reset camera [r]</Tooltip>}
     >
     <Button
        className={cn('icon-button', {
          checked:state.context.main.resetCameraEnabled
        })}
        onClick={() =>send('RESET_CAMERA')}
        variant='secondary'
     >
    <Image src={resetCameraIconDataUri}></Image>       
     </Button>  
     </OverlayTrigger>
    )
}

export default ResetCamerButton
