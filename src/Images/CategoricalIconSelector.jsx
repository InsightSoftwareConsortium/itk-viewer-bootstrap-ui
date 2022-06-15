import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import CategoricalPresetIcons from '../CategoricalPresetIcons'
import '../style.css'
import Navbar from 'react-bootstrap/Navbar'
import Container from 'react-bootstrap/Container'
import NavDropdown from 'react-bootstrap/NavDropdown'
import Image from 'react-bootstrap/Image'
import Form from 'react-bootstrap/Form'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger'
import Tooltip from 'react-bootstrap/Tooltip'

function CategoricalIconSelector(props) {
  const { service } = props
  const iconSelector = useRef(null)
  const [state, send] = useActor(service)

  let categoricalPresetIcons = []
  CategoricalPresetIcons.forEach((value, key) => {
    categoricalPresetIcons.push({
      name: key,
      icon: value
    })
  })

  useEffect(() => {
    state.context.images.labelImageIconSelector = iconSelector
  }, [])

  const currentCategoricalPreset = () => {
    const name = state.context.images.selectedName
    if (state.context.images.actorContext) {
      const actorContext = state.context.images.actorContext.get(name)
      return actorContext.lookupTable
    }
    return ''
  }

  const handleChange = (lut) => {
    const name = state.context.images.selectedName
    send({
      type: 'LABEL_IMAGE_LOOKUP_TABLE_CHANGED',
      data: { name, lookupTable: lut }
    })
  }

  // return (
  //   <Navbar
  //     bg="light"
  //     variant="light"
  //     ref={iconSelector}
  //     className="categoricalMenu"
  //     style={{ width: '154px', margin: '0 5px' }}
  //   >
  //     <NavDropdown
  //       title="Dropdown"
  //       id="basic-nav-dropdown"
  //       className="form-control"
  //       value={currentCategoricalPreset()}
  //       onChange={(e) => {
  //         handleChange(e.target.value)
  //       }}
  //     >
  //       {categoricalPresetIcons.map((preset, idx) => (
  //         <NavDropdown.Item key={idx} style={{ minWidth: '100%' }}>
  //           <Container>
  //             <Navbar.Brand>
  //               <Image alt="" src={preset.icon} className="colorMapIcon" />
  //             </Navbar.Brand>
  //           </Container>
  //         </NavDropdown.Item>
  //       ))}
  //     </NavDropdown>
  //   </Navbar>
  // )

  return (
    <Form.Control
      as="select"
      ref={iconSelector}
      className="categoricalMenuForm"
      // style={{ width: '20px !important' }}
      onChange={(e) => {
        handleChange(e.target.value)
      }}
      value={currentCategoricalPreset()}
    >
      {categoricalPresetIcons.map((preset, idx) => (
        <option key={idx} style={{ minWidth: '100%' }} value={preset.value}>
          {preset.name}
          {/* <Image className="colorMapIcon" src={preset.icon} /> */}
        </option>
      ))}
    </Form.Control>
  )
}

export default CategoricalIconSelector
