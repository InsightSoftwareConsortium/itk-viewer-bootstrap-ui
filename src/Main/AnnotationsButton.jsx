import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Icon, ToggleButton, Tooltip } from '@mui/material'
import { annotationsIconDataUri } from 'itk-viewer-icons'
import Button from 'react-bootstrap/Button';
import Image from 'react-bootstrap/Image';
import '../style.css'

function AnnotationsButton(props) {
  const { service } = props
  const annotationsButton = useRef(null)
  const [state, send] = useActor(service)

  useEffect(() => {
    state.context.main.annotationsButtonLabel = annotationsButton.current
  }, [])

  // return (
  //   <Tooltip
  //     ref={annotationsButton}
  //     title="Annotations"
  //     PopperProps={{
  //       anchorEl: annotationsButton.current,
  //       disablePortal: true,
  //       keepMounted: true
  //     }}
  //   >
  //     <ToggleButton
  //       size="small"
  //       className="toggleButton"
  //       value="annotations"
  //       selected={state.context.main.annotationsEnabled}
  //       onChange={() => {
  //         send('TOGGLE_ANNOTATIONS')
  //       }}
  //     >
  //       <Icon>
  //         <img src={annotationsIconDataUri} />
  //       </Icon>
  //     </ToggleButton>
  //   </Tooltip>
  // )

  return (
    <Button size="sm"><Image style={{width: "1.2rem"}} src={annotationsIconDataUri}></Image></Button>
  )
}

export default AnnotationsButton
