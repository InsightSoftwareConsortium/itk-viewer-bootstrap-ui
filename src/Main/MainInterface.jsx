import { useActor } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
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
import './style.css'

function MainInterface(props) {
  const { service } = props
  const [ state ] = useActor(service)

  const mainUIGroup = useRef(null)
  useEffect(() => {
    state.context.uiGroups.set('main', mainUIGroup.current)
  }, [])

  return (
    <div>
      <div ref={ mainUIGroup } className='uiGroup'>
        <div className='mainUIRow'>
          <ScreenshotButton {...props}/>
          <FullscreenButton {...props}/>
          {!state.context.use2D && <RotateButton {...props}/>}
          <AnnotationsButton {...props}/>
          <AxesButton {...props}/>
          <ViewPlanesToggle {...props} />
          <BackgroundColorButton {...props}/>
          {state.context.use2D && <ResetCameraButton {...props}/>}
        </div>
        <div className='mainUIRow'>
          <ViewModeButtons {...props}/>
          {!state.context.use2D && <ResetCameraButton {...props}/>}
        </div>
      </div>
      <PlaneSliders {...props} />
    </div>
  )
}

export default MainInterface
