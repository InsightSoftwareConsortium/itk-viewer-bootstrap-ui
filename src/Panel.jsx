import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { Drawer } from '@mui/material'
import './Panel.css'

function Panel(props) {
  const { children, service } = props
  const uiPanel = useRef(null)
  const uiDrawer = useRef(null)
  let stateContextUIDrawer = useSelector(
    service,
    (state) => state.context.uiDrawer
  )
  let stateContextUIPanel = useSelector(
    service,
    (state) => state.context.uiPanel
  )
  const uiCollapsed = useSelector(service, (state) => state.context.uiCollapsed)

  useEffect(() => {
    stateContextUIPanel = uiPanel.current
    stateContextUIDrawer = uiDrawer.current
  }, [])

  return (
    <div ref={uiPanel} className="root">
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={!uiCollapsed}
      >
        <div ref={uiDrawer}>
          {React.Children.map(children, (child) => {
            return React.cloneElement(child, { service })
          })}
        </div>
      </Drawer>
    </div>
  )
}

export default Panel
