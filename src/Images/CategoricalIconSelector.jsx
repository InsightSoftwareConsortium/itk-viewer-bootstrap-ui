import React, { useEffect, useRef, useState } from 'react'
import { useSelector } from '@xstate/react'
import { CategoricalColorIcons } from 'itk-viewer-color-maps'
import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Col from 'react-bootstrap/Col'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function CategoricalIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const send = service.send

  const actorContext = useSelector(
    service,
    (state) => state.context.images.actorContext
  )
  const actorContextName = useSelector(service, (state) =>
    state.context.images.actorContext.get(state.context.images.selectedName)
  )
  const name = useSelector(
    service,
    (state) => state.context.images.selectedName
  )
  let categoricalPresetIcons = []
  CategoricalColorIcons.forEach((value, key) => {
    categoricalPresetIcons.push({
      name: key,
      icon: value
    })
  })

  useEffect(() => {
    service.machine.context.images.labelImageIconSelector = iconSelector
  }, [])

  const currentCategoricalPreset = () => {
    if (actorContext) {
      const actorContext = actorContextName
      return actorContext.lookupTable
    }
    return ''
  }

  const [icon, setIcon] = useState(categoricalPresetIcons[0].icon)
  const [nameColor, setNameColor] = useState(categoricalPresetIcons[0].name)

  const handleChange = (lut) => {
    setIcon(lut.icon)
    setNameColor(lut.name)
    send({
      type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
      data: { name, lookupTable: lut.name }
    })
  }

  return (
    <OverlayTrigger transition={false} overlay={<Tooltip>{nameColor}</Tooltip>}>
      <Navbar
        bg="light"
        variant="light"
        ref={iconSelector}
        className="categoricalMenuForm"
        style={{ width: '154px', margin: '0 5px' }}
      >
        <NavDropdown
          title=""
          className="form-control categoricalDropDown"
          value={currentCategoricalPreset()}
        >
          <Container className="categoricalColContainer">
            {categoricalPresetIcons.map((preset) => (
              <Col xs={3} className="categoricalCol" key={preset.name}>
                <NavDropdown.Item
                  onClick={() => handleChange(preset)}
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

export default CategoricalIconSelector
