import React, { useEffect, useRef } from 'react'
import { useActor } from '@xstate/react'
import ColorRangeInput from './ColorRangeInput'
import '../style.css'

function ImagesInterface(props) {
  const { service } = props
  const [ state ] = useActor(service)
  const name = state.context.images.selectedName
  const actorContext = state.context.images.actorContext.get(name)
  const layersContext = state.context.layers.actorContext.get(name)

  const imagesUIGroup = useRef(null)
  useEffect(() => {
    state.context.images.imagesUIGroup = imagesUIGroup.current
    state.context.uiGroups.set('images', imagesUIGroup.current)
  }, [])

  const visible = () => {
    if (layersContext) {
      return layersContext.visible
    }
    return true
  }

  return(
    <div className={ visible() ? '' : 'hidden' } style={{ margin: '15px 5px' }}>
      {actorContext &&
        <div
          ref={ imagesUIGroup }
          className='uiGroup'
          style={{ maxWidth: '400px' }}
        >
          <ColorRangeInput {...props}/>
        </div>
      }
    </div>
  )
}

export default ImagesInterface
