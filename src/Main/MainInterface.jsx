import { useActor } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
import FullscreenButton from './FullscreenButton'
import ScreenshotButton from './ScreenshotButton'
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
        <ScreenshotButton {...props} />
        <FullscreenButton {...props} />
      </div>
      <div className='mainUIRow'></div>
    </div>
  )
}

export default MainInterface
