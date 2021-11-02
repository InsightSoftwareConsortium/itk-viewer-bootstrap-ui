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
    <Tooltip ref={ screenshotButton } title='Screenshot'>
      <IconButton onClick={() => { send('TAKE_SCREENSHOT') }}>
        <Icon><img src={ screenshotIconDataUri }/></Icon>
      </IconButton>
    </Tooltip>
  );
}

export default ScreenshotButton