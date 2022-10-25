import React from 'react'
import { useSelector } from '@xstate/react'
import { ColorMapIcons, CategoricalColorIcons } from 'itk-viewer-color-maps'
import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'
import getSelectedImageContext from './getSelectedImageContext'

const colorMapIcons = Array.from(ColorMapIcons)
  .concat(
    Array.from(CategoricalColorIcons).filter(
      ([name]) => !name.startsWith('modulate')
    )
  )
  .map(([name, icon]) => ({
    name,
    icon
  }))

const selectColorMap = (state) => {
  const actorContext = getSelectedImageContext(state)
  if (actorContext) {
    const component = actorContext.selectedComponent
    return actorContext.colorMaps?.get(component) ?? ''
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
      <Navbar bg="light" variant="light" className="categoricalMenuForm">
        <NavDropdown
          title=""
          className="form-control categoricalDropDown base-color-map-selector"
        >
          <Container className="categoricalColContainer">
            {colorMapIcons.map((preset) => (
              <Col xs={3} className="categoricalCol" key={preset.name}>
                <NavDropdown.Item
                  onClick={() => handleChange(preset.name, preset.icon)}
                  className="colorMapGradientItem"
                >
                  <OverlayTrigger
                    transition={false}
                    overlay={<Tooltip>{preset.name}</Tooltip>}
                  >
                    <Image src={preset.icon} />
                  </OverlayTrigger>
                </NavDropdown.Item>
              </Col>
            ))}
          </Container>
        </NavDropdown>
        <Image src={icon} className="overlayImage"></Image>
      </Navbar>
    </OverlayTrigger>
  )
}

export default ColorMapIconSelector
