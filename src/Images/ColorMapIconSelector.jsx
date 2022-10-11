import React, { useRef } from 'react'
import { useSelector } from '@xstate/react'
import { ColorMapIcons } from 'itk-viewer-color-maps'
import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import getSelectedImageContext from './getSelectedImageContext'

const colorMapIcons = Array.from(ColorMapIcons).map(([name, icon]) => ({
  name,
  icon
}))

const selectColorMap = (state) => {
  const actorContext = getSelectedImageContext(state)
  if (actorContext) {
    const component = actorContext.selectedComponent
    return (
      actorContext.colorMaps
        ?.get(component) ?? ''
    )
  }
  return ''
}

function ColorMapIconSelector({ service }) {
  const { send } = service
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )

  const actorContext = useSelector(service, (state) =>
    getSelectedImageContext(state)
  )

  const colorMap = useSelector(service, selectColorMap)

  const { icon } =
    colorMapIcons.find(({ name }) => colorMap === name) ?? colorMapIcons[0]

  const handleChange = (colorMap) => {
    const name = selectedName
    const componentIndex = actorContext.selectedComponent
    send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component: componentIndex, colorMap }
    })
  }

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>{colorMap}</Tooltip>}>
      <Navbar
        bg="light"
        variant="light"
        className="categoricalMenuForm"
        style={{ width: 'auto', margin: '0 5px' }}
      >
        <NavDropdown
          title=""
          id="basic-nav-dropdown"
          className="form-control categoricalDropDown"
          style={{ height: '40px' }}
        >
          <Container>
            <Row xs={4} md={4}>
              {colorMapIcons.map((preset, name) => (
                <Container key={name} className="categoricalColContainer">
                  <Col className="categoricalCol">
                    <NavDropdown.Item
                      style={{ minWidth: '100%' }}
                      onClick={() => handleChange(preset.name, preset.icon)}
                      className="navItem"
                    >
                      <Image src={preset.icon} className="colorMapIcon" />
                    </NavDropdown.Item>
                  </Col>
                </Container>
              ))}
            </Row>
          </Container>
        </NavDropdown>
        <Image src={icon} className="overlayImage"></Image>
      </Navbar>
    </OverlayTrigger>
  )
}

export default ColorMapIconSelector
