import React from 'react'
import { useActor } from '@xstate/react'
import { viewPlanesIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function ViewPlanesToggle(props) {
  const { service } = props
  const [state, send] = useActor(service)
  const { slicingPlanes } = state.context.main

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
        className={cn('icon-button', {
          checked: state.context.main.viewPlanesEnabled
        })}
        onClick={handleToggle}
        variant="secondary"
      >
        <Image src={viewPlanesIconDataUri}></Image>
      </Button>
    </OverlayTrigger>
  )
}

export default ViewPlanesToggle
