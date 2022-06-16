import React, { useEffect } from 'react'
import { useSelector } from '@xstate/react'
import {
  volumeIconDataUri,
  redPlaneIconDataUri,
  yellowPlaneIconDataUri,
  greenPlaneIconDataUri
} from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import cn from 'classnames'

function ViewButton(props) {
  const stateButtonEnabled = useSelector(
    props.service,
    (state) => state.context.main.viewMode
  )
  const send = props.service.send

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> {props.title} </Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: stateButtonEnabled === props.dataName
        })}
        onClick={() => {
          send({ type: 'VIEW_MODE_CHANGED', data: props.dataName })
        }}
        variant="secondary"
      >
        <Image src={props.imageSrc}></Image>
      </Button>
    </OverlayTrigger>
  )
}

function ViewModeButtons(props) {
  const { service } = props

  return [
    {
      title: 'X plane [1]',
      dataName: 'XPlane',
      imageSrc: redPlaneIconDataUri
    },
    {
      title: 'Y plane [2]',
      dataName: 'YPlane',
      imageSrc: yellowPlaneIconDataUri
    },
    {
      title: 'Z plane [3]',
      dataName: 'ZPlane',
      imageSrc: greenPlaneIconDataUri
    },
    {
      title: 'Volume [4]',
      dataName: 'Volume',
      imageSrc: volumeIconDataUri
    }
  ].map(({ title, dataName, imageSrc }) => (
    <ViewButton
      key={title}
      title={title}
      dataName={dataName}
      imageSrc={imageSrc}
      service={service}
    ></ViewButton>
  ))
}

export default ViewModeButtons
