import React, { useEffect, useRef } from 'react';
import { useActor } from '@xstate/react';
import { Icon, IconButton, Tooltip } from "@mui/material";
import { screenshotIconDataUri } from 'itk-viewer-icons'

function ScreenshotButton(props) {
  const { service } = props
  const screenshotButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.screenshotButton = screenshotButton.current
  }, [])

  return(
    <Tooltip
      ref={ screenshotButton }
      title="Screenshot"
      PopperProps={{
        anchorEl: screenshotButton.current,
        disablePortal: true,
        keepMounted: true,
      }}
    >
      <IconButton size='small' onClick={() => { send('TAKE_SCREENSHOT') }}>
        <Icon><img src={ screenshotIconDataUri }/></Icon>
      </IconButton>
    </Tooltip>
  );
}

export default ScreenshotButton