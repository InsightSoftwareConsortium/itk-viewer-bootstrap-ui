import MainInterface from './MainInterface'
import toggleBackgroundColor from './toggleBackgroundColor'
import toggleFullscreen from './toggleFullscreen'

const mainUIMachineOptions = {
  actions: {
    MainInterface,

    toggleFullscreen,

    toggleBackgroundColor
  }
}

export default mainUIMachineOptions
