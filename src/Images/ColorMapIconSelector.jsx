import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import ColorMapPresetIcons from '../ColorMapPresetIcons'
import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

const colorMapIcons = Array.from(ColorMapPresetIcons).map(([name, icon]) => ({
  name,
  icon
}))

function ColorMapIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const send = service.send
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const selectedActorContext = useSelector(service, (state) =>
    state.context.images.actorContext.get(selectedName)
  )
  const imagesLookupTableProxies = useSelector(
    service,
    (state) => state.context.images.lookupTableProxies
  )

  const currentColorMap = () => {
    if (selectedActorContext) {
      const component = selectedActorContext.selectedComponent
      const lookupTableProxies = imagesLookupTableProxies
      if (lookupTableProxies) {
        return lookupTableProxies.get(component).getPresetName()
      }
    }
    return ''
  }

  const name = currentColorMap()
  const index =
    colorMapIcons
      .map(function (e) {
        return e.name
      })
      .indexOf(name) > 0
      ? colorMapIcons
          .map(function (e) {
            return e.name
          })
          .indexOf(name)
      : 0
  const icon = colorMapIcons[index].icon

  const handleChange = (colorMap, colorMapIcon) => {
    const name = selectedName
    const componentIndex = selectedActorContext.selectedComponent
    send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component: componentIndex, colorMap }
    })
  }

  return (
    <OverlayTrigger
      transition={false}
      overlay={<Tooltip>{currentColorMap()}</Tooltip>}
    >
      <Navbar
        bg="light"
        variant="light"
        ref={iconSelector}
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
