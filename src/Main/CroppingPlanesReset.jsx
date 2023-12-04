import React from 'react'
import { resetCropIconDataUri } from '@itk-viewer/icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function CroppingPlanesReset({ service: { send } }) {
  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>Reset Cropping Planes</Tooltip>}
    >
      <Button
        className={cn('icon-button')}
        onClick={() => {
          send('RESET_CROPPING_PLANES')
          send('CROPPING_PLANES_CHANGED_BY_USER')
        }}
        variant="secondary"
      >
        <Image src={resetCropIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default CroppingPlanesReset
