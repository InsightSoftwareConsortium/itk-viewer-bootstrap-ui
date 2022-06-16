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

function ColorMapIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const send = service.send
  const selectedName = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  const actorContextName = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const actorContext = useSelector(
    service,
    (state) => state.context.images.actorContext
  )
  const imagesLookupTableProxies = useSelector(
    service,
    (state) => state.context.images.lookupTableProxies
  )
  let colorMapIcons = []
  ColorMapPresetIcons.forEach((value, key) => {
    colorMapIcons.push({
      name: key,
      icon: value,
      ref: useRef(null)
    })
  })

  useEffect(() => {
    service.machine.context.images.iconSelector = iconSelector.current
  }, [])

  const currentColorMap = () => {
    if (actorContext) {
      const actorContext = actorContextName
      const component = actorContext.selectedComponent
      const lookupTableProxies = imagesLookupTableProxies
      if (lookupTableProxies) {
        return lookupTableProxies.get(component).getPresetName()
      }
    }
    return ''
  }

  const [icon, setIcon] = useState(colorMapIcons[0].icon)
  const [nameColor, setNameColor] = useState(colorMapIcons[0].name)

  const handleChange = (colorMap, colorMapIcon) => {
    setIcon(colorMapIcon)
    setNameColor(colorMap)
    const name = selectedName
    const actorContext = actorContextName
    const componentIndex = actorContext.selectedComponent
    send({
      type: 'IMAGE_COLOR_MAP_CHANGED',
      data: { name, component: componentIndex, colorMap }
    })
  }

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>{nameColor}</Tooltip>}>
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
          value={currentColorMap()}
          style={{ height: '40px' }}
        >
          <Container>
            <Row xs={4} md={4}>
              {colorMapIcons.map((preset, idx) => (
                <Container key={idx} className="categoricalColContainer">
                  <Col className="categoricalCol">
                    <NavDropdown.Item
                      key={idx}
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
