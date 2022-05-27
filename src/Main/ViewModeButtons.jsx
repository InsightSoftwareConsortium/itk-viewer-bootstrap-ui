import React, { useEffect } from 'react'
import { useActor, useSelector } from '@xstate/react'
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
  let dataNameLowerCase =
    props.dataName.charAt(0).toLowerCase() + props.dataName.slice(1)
  let enableButton = dataNameLowerCase + 'EnableButton'
  const selectCount = (state) => state.context.main[enableButton]
  const stateButtonEnabled = useSelector(props.service, selectCount)
  const send = props.service.send

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip> {props.title} </Tooltip>}
    >
      <Button
        className={cn('icon-button', {
          checked: stateButtonEnabled
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

const ViewModeButtons = React.memo(function ViewModeButtons(props) {
  const { service } = props

  const buttonList = [
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
  ]
  const listItems = buttonList.map(({ title, dataName, imageSrc }) => (
    <ViewButton
      key={title}
      title={title}
      dataName={dataName}
      imageSrc={imageSrc}
      service={service}
    ></ViewButton>
  ))
  return listItems
})

export default ViewModeButtons
