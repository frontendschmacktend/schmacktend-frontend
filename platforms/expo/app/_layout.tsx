import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { UiProvider } from '../../../shared-codebase/ui-layer/tamagui/index'
import { Stack } from 'expo-router'

export default function Root() {
  return (
    <SafeAreaView style={{flex: 1}}>
      <UiProvider>
        <Stack screenOptions={{headerShown: false}} />
      </UiProvider>
    </SafeAreaView>
  )
}
