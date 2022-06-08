import React from 'react'
import { useSelector } from '@xstate/react'
import { viewPlanesIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function ViewPlanesToggle(props) {
  const { service } = props
  const stateSlicingPlanes = useSelector(service, (state) => state.context.main)
  const send = service.send
  const { slicingPlanes } = stateSlicingPlanes

  const planesVisible = () => {
    return (
      slicingPlanes.x.visible ||
      slicingPlanes.y.visible ||
      slicingPlanes.z.visible
    )
  }

  const toggleSlicingPlanes = () => {
    if (
      !slicingPlanes.x.visibile &&
      !slicingPlanes.y.visible &&
      !slicingPlanes.z.visible
    ) {
      slicingPlanes.x.visible = true
      slicingPlanes.y.visible = true
      slicingPlanes.z.visible = true
    } else {
      slicingPlanes.x.visible = false
      slicingPlanes.y.visible = false
      slicingPlanes.z.visible = false
    }
    return slicingPlanes
  }

  const handleToggle = () => {
    const planes = toggleSlicingPlanes()
    send({
      type: 'SLICING_PLANES_CHANGED',
      data: planes
    })
  }

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>View planes</Tooltip>}>
      <Button
        className={'icon-button'}
        onClick={handleToggle}
        variant="secondary"
      >
        <Image src={viewPlanesIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default ViewPlanesToggle
