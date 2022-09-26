import React, { useEffect, useRef } from 'react'
import { useSelector } from '@xstate/react'
import Container from 'react-bootstrap/Container'
import Nav from 'react-bootstrap/Nav'
import Row from 'react-bootstrap/Row'
import { Collapse } from 'react-bootstrap'

function Panel(props) {
  const { children, service } = props
  const uiPanel = useRef(null)
  const uiDrawer = useRef(null)
  const uiCollapsed = useSelector(service, (state) => state.context.uiCollapsed)

  useEffect(() => {
    service.state.context.uiPanel = uiPanel.current
    service.state.context.uiDrawer = uiDrawer.current
  }, [uiPanel, uiDrawer, service.state.context])

  return (
    <div ref={uiPanel}>
      <Collapse in={!uiCollapsed}>
        <Container fluid>
          <Row>
            <Nav onSelect={(selectedKey) => alert(`selected ${selectedKey}`)}>
              <Nav.Item ref={uiDrawer}>
                {React.Children.map(children, (child) => {
                  return React.cloneElement(child, { service })
                })}
              </Nav.Item>
            </Nav>
          </Row>
        </Container>
      </Collapse>
    </div>
  )
}

export default Panel
