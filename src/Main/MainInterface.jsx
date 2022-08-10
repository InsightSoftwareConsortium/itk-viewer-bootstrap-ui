import { useSelector } from '@xstate/react'
import React, { useRef } from 'react'
import AnnotationsButton from './AnnotationsButton'
import AxesButton from './AxesButton'
import BackgroundColorButton from './BackgroundColorButton'
import FullscreenButton from './FullscreenButton'
import PlaneSliders from './PlaneSliders'
import ResetCameraButton from './ResetCameraButton'
import RotateButton from './RotateButton'
import ScreenshotButton from './ScreenshotButton'
import ViewModeButtons from './ViewModeButtons'
import ViewPlanesToggle from './ViewPlanesToggle'
import '../style.css'

const STYLE = { width: '20%' }

function MainInterface(props) {
  const { service } = props
  const mainUIGroup = useRef(null)

  let use2D = useSelector(service, (state) => state.context.use2D)

  return (
    <div>
      <div ref={mainUIGroup} className="uiGroup">
        <div className="mainUIRow">
          <ScreenshotButton {...props} />
          <FullscreenButton {...props} />
          {!use2D && <RotateButton {...props} />}
          <AnnotationsButton {...props} />
          <AxesButton {...props} />
          {!use2D && <ViewPlanesToggle {...props} />}
          <BackgroundColorButton {...props} />
          {use2D && <ResetCameraButton {...props} />}
        </div>
        {!use2D && (
          <div className="mainUIRow">
            <ViewModeButtons {...props} />
            <ResetCameraButton style={STYLE} {...props} />
          </div>
        )}
      </div>
      <PlaneSliders {...props} />
    </div>
  )
}

export default MainInterface
