import React from 'react'
import { useActor } from '@xstate/react'
import { annotationsIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function AnnotationsButton(props) {
  const { service } = props
  const [state, send] = useActor(service)

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Toggle Annotations</Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: state.context.main.annotationsEnabled
        })}
        onClick={() => send('TOGGLE_ANNOTATIONS')}
        variant="secondary"
      >
        <Image src={annotationsIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default AnnotationsButton
