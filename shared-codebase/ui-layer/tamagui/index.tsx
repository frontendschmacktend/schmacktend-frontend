import Tamagui from '../tamagui/tamagui';

export function UiProvider({ children }: { children: React.ReactNode }) {
  return (
      <Tamagui>{children}</Tamagui>
  )
}
