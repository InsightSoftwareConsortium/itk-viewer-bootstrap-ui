import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import { Drawer } from '@mui/material'
import './Panel.css'

function Panel(props) {
  const { children, service } = props
  const uiPanel = useRef(null)
  const uiDrawer = useRef(null)
  const [state] = useActor(service)

  useEffect(() => {
    state.context.uiPanel = uiPanel.current
    state.context.uiDrawer = uiDrawer.current
  }, [])

  return (
    <div ref={uiPanel} className="root">
      <Drawer
        className="drawer"
        variant="persistent"
        anchor="left"
        open={!state.context.uiCollapsed}
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
