import React from 'react'
import { useActor } from '@xstate/react'
import { rotateIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function RotateButton(props) {
const { service } = props	
const [state, send] = useActor(service)

console.log(state.context.main.rotateEnabled);

return ( 
  <OverlayTrigger 
    transition = {false}
    overlay={<Tooltip> Spin in 3D </Tooltip>}
  >
    <Button
      className={cn('icon-button', {
        checked: state.context.main.rotateEnabled
      })}
      onClick= {() => send('TOGGLE_ROTATE')}
      variant = "secondary"
    >
      <Image src={rotateIconDataUri}></Image>
    </Button>
  </OverlayTrigger>
  )
}

export default RotateButton

