import { TamaguiProvider } from 'tamagui'

import config from './tamagui.config'

export default function Tamagui({children}) {
  return (
    <TamaguiProvider config={config}>
      {children}
    </TamaguiProvider>
  )
}