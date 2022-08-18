import React, { useEffect, useRef } from 'react'

import '../style.css'
import { setup } from './transferFunctionWidgetUtils'

function TransferFunctionWidget({ service }) {
  const transferFunctionWidgetContainer = useRef(null)
  const transferFunctionWidget = useRef(null)

  useEffect(() => {
    if (transferFunctionWidgetContainer.current) {
      transferFunctionWidget.current = setup(
        service.machine.context,
        transferFunctionWidgetContainer.current
      )
    }
  }, [transferFunctionWidgetContainer, service.machine.context])

  return (
    <div className="uiRow" style={{ background: 'rgba(127, 127, 127, 0.5)' }}>
      <div className="piecewiseWidget" ref={transferFunctionWidgetContainer} />
    </div>
  )
}

export default TransferFunctionWidget
