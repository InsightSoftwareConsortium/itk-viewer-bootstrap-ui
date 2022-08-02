import React, { useEffect, useRef } from 'react'

function PointSetInterface(props) {
  const { service } = props
  const pointSetGroup = useRef(null)

  useEffect(() => {
    service.state.context.uiContainer = pointSetGroup.current
  }, [pointSetGroup, service.state.context])

  return <div ref={pointSetGroup}></div>
}

export default PointSetInterface
