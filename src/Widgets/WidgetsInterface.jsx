import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import DistanceWidget from './DistanceWidget'
import '../style.css'

function WidgetsInterface(props) {
  const { service } = props
  const [ state ] = useActor(service)
  const widgetsUIGroup = useRef(null)

  useEffect(() => {
    state.context.widgets.widgetsUIGroup = widgetsUIGroup.current
  }, [])

  return(
    <div ref={ widgetsUIGroup } className='uiGroup'>
      <DistanceWidget className='uiRow' {...props} />
    </div>
  )
}

export default WidgetsInterface