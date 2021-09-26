import { useActor } from '@xstate/react'
import React, { useEffect, useRef } from 'react'
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
      <div className='mainUIRow'></div>
      <div className='mainUIRow'></div>
    </div>
  )
}

export default MainInterface
