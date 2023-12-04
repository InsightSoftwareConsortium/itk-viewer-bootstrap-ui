import React from 'react'
import { toggleIconDataUri } from '@itk-viewer/icons'
import toggleUICollapsed from './toggleUICollapsed'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'

function AppToolbar(props) {
  const { service } = props
  const send = service.send

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
    toggleUICollapsed(service.machine.context)
  }

  return (
    <Button
      color="inherit"
      className="navbar-button"
      onClick={handleToggle}
      variant="secondary"
    >
      <Image src={toggleIconDataUri} alt="toggle" />
    </Button>
  )
}

export default AppToolbar
