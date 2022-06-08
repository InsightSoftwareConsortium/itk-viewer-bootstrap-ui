import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { Icon, IconButton } from '@mui/material'
import { toggleIconDataUri } from 'itk-viewer-icons'
import toggleUICollapsed from './toggleUICollapsed'
import './Panel.css'

function CollapseUIButton(props) {
  const { service } = props
  const collapseUIButton = useRef(null)
  const [state, send] = useActor(service)
  const uiContainer = useSelector(service, (state) => state.context.uiContainer)
  const uiCollapsed = useSelector(service, (state) => state.context.uiCollapsed)

  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )

  const use2D = useSelector(service, (state) => state.context.use2D)

  const planeUIGroup = useSelector(
    service,
    (state) => state.context.planeUIGroup
  )

  const viewMode = useSelector(service, (state) => state.context.viewMode)
  const mainPlaneUIGroup = useSelector(
    service,
    (state) => state.context.main.planeUIGroup
  )

  useEffect(() => {
    state.context.main.collapseUIButton = collapseUIButton.current
  }, [])

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
    toggleUICollapsed(
      uiContainer,
      uiCollapsed,
      selectedName,
      service,
      use2D,
      planeUIGroup,
      viewMode,
      mainPlaneUIGroup
    )
  }

  return (
    <div className="appBar">
      <IconButton
        size="small"
        ref={collapseUIButton}
        color="inherit"
        onClick={handleToggle}
        edge="start"
      >
        <Icon>
          <img src={toggleIconDataUri} alt="toggle" />
        </Icon>
      </IconButton>
    </div>
  )
}

export default CollapseUIButton
