import React from 'react'
import { useSelector } from '@xstate/react'
import { cropIconDataUri } from '@itk-viewer/icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function CroppingPlanesToggle({ service }) {
  const croppingPlanesEnabled = useSelector(
    service,
    (state) => state.context.main.croppingPlanesEnabled
  )

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Cropping Planes</Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: croppingPlanesEnabled
        })}
        onClick={() => service.send('TOGGLE_CROPPING_PLANES')}
        variant="secondary"
      >
        <Image src={cropIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default CroppingPlanesToggle
