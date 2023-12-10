import type { SkiaMutableValue, SkMatrix, SkRect } from '@shopify/react-native-skia'
import { StyleSheet } from 'react-native'
import { Skia, useSharedValueEffect } from '@shopify/react-native-skia'
import React from 'react'
import { Gesture, GestureDetector } from 'react-native-gesture-handler'
import Animated, {
  useAnimatedStyle,
  useSharedValue,
  withDelay,
  withRepeat,
  withTiming,
  runOnJS,
} from 'react-native-reanimated'
import { Matrix4, multiply4, toMatrix3, identity4 } from 'react-native-redash'

export const GestureHandler = ({
  matrix: skMatrix,
  width,
  height,
  debug,
  handlemousemove,
  handleclick,
  handlemousedown,
  children,
}: any) => {
  const sv = useSharedValue(0)
  const matrix = useSharedValue(identity4)

  useSharedValueEffect(() => {
    skMatrix.current = Skia.Matrix(toMatrix3(matrix.value) as any)
  }, matrix)

  const wrapper = (arg1, arg2) => {
    handlemousemove(arg1, arg2)
  }

  const wrapper2 = () => {
    handleclick()
  }

  const wrapper3 = (arg1, arg2) => {
    handlemousedown(arg1,arg2)
  }


  const pan = Gesture.Pan()
    .onChange((e) => {
      runOnJS(wrapper)(e.x, e.y)
    }).onEnd((e)=>{
      runOnJS(wrapper2)()
    })

  const down = Gesture.Tap().onTouchesDown((e: any) => {
    runOnJS(wrapper3)(e.allTouches[0].x,e.allTouches[0].y)
  })

  const up = Gesture.Tap().onTouchesUp((e) => {
    runOnJS(wrapper2)()
  })

  const styles = StyleSheet.create({
    box: {
      height: height,
      width: '100%',
      backgroundColor: 'red',
    },
  })

  return (
    <GestureDetector gesture={Gesture.Race(pan, down,up)}>
      <Animated.View style={[styles.box]}>{children}</Animated.View>
    </GestureDetector>
  )
}
