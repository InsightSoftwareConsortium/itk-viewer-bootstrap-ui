import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import { AppBar, Icon, IconButton, Toolbar, Typography } from '@mui/material'
import { toggleIconDataUri } from 'itk-viewer-icons'
import toggleUICollapsed from './toggleUICollapsed'
import './Panel.css'

function AppToolbar(props) {
  const { service } = props
  const send = service.send
  const collapseUIButton = useRef(null)
  let contextCollapseUIButton = useSelector(
    service,
    (state) => state.context.collapseUIButton
  )
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
    contextCollapseUIButton = collapseUIButton.current
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
    <AppBar className="appBar">
      <Toolbar>
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
        <Typography variant="h5" noWrap>
          ITK Viewer
        </Typography>
      </Toolbar>
    </AppBar>
  )
}

export default AppToolbar
