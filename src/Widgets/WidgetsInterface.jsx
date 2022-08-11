import React, { useEffect, useRef } from 'react'

import DistanceWidget from './DistanceWidget'
import '../style.css'

function WidgetsInterface(props) {
  const { service } = props
  const widgetsUIGroup = useRef(null)

  useEffect(() => {
    service.machine.context.widgets.widgetsUIGroup = widgetsUIGroup.current
  }, [])

  return (
    <div ref={widgetsUIGroup} className="uiGroup">
      <DistanceWidget className="uiRow" {...props} />
    </div>
  )
}

export default WidgetsInterface
