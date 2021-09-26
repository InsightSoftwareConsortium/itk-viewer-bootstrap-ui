import { useActor } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
import AnnotationsButton from './AnnotationsButton'
import AxesButton from './AxesButton'
import FullscreenButton from './FullscreenButton'
import RotateButton from './RotateButton'
import ScreenshotButton from './ScreenshotButton'
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
    <div ref={ mainUIGroup } className='uiGroup'>
      <div className='mainUIRow'>
        <ScreenshotButton {...props}/>
        <FullscreenButton {...props}/>
        {!state.context.use2D && <RotateButton {...props}/>}
        <AnnotationsButton {...props}/>
        <AxesButton {...props}/>
        <ViewPlanesToggle {...props} />
      </div>
      <div className='mainUIRow'></div>
    </div>
  )
}

export default MainInterface
