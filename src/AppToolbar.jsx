import React from 'react'
import { toggleIconDataUri } from 'itk-viewer-icons'
// import Navbar from 'react-bootstrap/Navbar'
import toggleUICollapsed from './toggleUICollapsed'
import Button from 'react-bootstrap/Button'
import Image from 'react-bootstrap/Image'
import './Panel.css'

function AppToolbar(props) {
  const { service } = props
  const send = service.send

  const handleToggle = () => {
    send('TOGGLE_UI_COLLAPSED')
    toggleUICollapsed(service.machine.context)
  }

  return (
    // <Navbar className="appBar" bg="primary" variant="dark">
      <Button
        color="inherit"
        className="navbar-button"
        onClick={handleToggle}
        variant="secondary"
      >
        <Image src={toggleIconDataUri} alt="toggle" />
      </Button>
      // <Navbar.Brand className="navbarTitle">ITK Viewer</Navbar.Brand>
    // </Navbar> 
  )
}

export default AppToolbar
