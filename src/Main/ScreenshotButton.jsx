import React, { useEffect, useRef } from 'react';
import { useActor } from '@xstate/react';
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { screenshotIconDataUri } from 'itk-viewer-icons'

function ScreenshotButton(props) {
  const { service } = props
  const screenshotButton = useRef(null)
  const [ state, send ] = useActor(service)

  useEffect(() => {
    state.context.main.screenshotButton = screenshotButton.current
  }, [])

  return(
    <label ref={ screenshotButton } data-tooltip-left data-tooltip="Screenshot">
      <IconButton size='small' onClick={() => { send('TAKE_SCREENSHOT') }}>
        <Icon><img src={ screenshotIconDataUri }/></Icon>
      </IconButton>
    </label>
  );
}

export default ScreenshotButton