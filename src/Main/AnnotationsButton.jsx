import React from 'react'
import { useSelector } from '@xstate/react'
import { annotationsIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function AnnotationsButton(props) {
  const { service } = props
  const stateAnnotationsEnabled = useSelector(
    service,
    (state) => state.context.main.annotationsEnabled
  )
  const send = service.send

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Toggle Annotations</Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: stateAnnotationsEnabled
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
