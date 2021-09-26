import React from 'react';
import { useActor } from '@xstate/react';
import { Icon, IconButton, Tooltip } from "@material-ui/core";
import { screenshotIconDataUri } from 'itk-viewer-icons'

function ScreenshotButton(props) {
  const { service } = props
  const [, send ] = useActor(service)

  return(
    <Tooltip title='Screenshot'>
      <IconButton onClick={() => { send('TAKE_SCREENSHOT') }}>
        <Icon><img src={ screenshotIconDataUri }/></Icon>
      </IconButton>
    </Tooltip>
  );
}

export default ScreenshotButton