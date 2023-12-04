import React from 'react'
import { useSelector } from '@xstate/react'
import getSelectedImageContext from './getSelectedImageContext'
import Form from 'react-bootstrap/Form'
import { Image, OverlayTrigger, Tooltip } from 'react-bootstrap'
import { volumeScatteringIconDataUri } from '@itk-viewer/icons'

function CinematicParameters({ service }) {
  const scatteringBlend = useSelector(service, (state) => {
    const actorContext = getSelectedImageContext(state)
    return actorContext.cinematicParameters.scatteringBlend
  })

  const isCinematicPossible = useSelector(service, (state) => {
    const actorContext = getSelectedImageContext(state)
    return actorContext.cinematicParameters.isCinematicPossible
  })

  const handleScatteringBlendChanged = (value) => {
    service.send({
      type: 'SET_CINEMATIC_PARAMETERS',
      data: {
        name: service.machine.context.images.selectedName,
        params: { scatteringBlend: Number(value) }
      }
    })
  }

  const disabledReason = isCinematicPossible
    ? ''
    : ' only supported for 1 component images'
  const tooltipMessage = 'Volume Scattering' + disabledReason

  return (
    <div className="iconWithSlider">
      <OverlayTrigger
        transition={false}
        overlay={<Tooltip>{tooltipMessage}</Tooltip>}
      >
        <div className="icon-image">
          <Image src={volumeScatteringIconDataUri}></Image>
        </div>
      </OverlayTrigger>
      <Form.Control
        type="range"
        custom
        className="slider"
        min={0}
        max={1}
        step={0.01}
        value={scatteringBlend}
        onChange={(e) => {
          handleScatteringBlendChanged(e.target.value)
        }}
        disabled={!isCinematicPossible}
      />
    </div>
  )
}

export default CinematicParameters
