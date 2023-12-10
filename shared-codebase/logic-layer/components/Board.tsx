/* eslint-disable react/jsx-key */
"use client"
  
import React, { useCallback, useRef, useState,useEffect } from 'react'
import { View, StyleSheet, Dimensions } from 'react-native'
import { Chess } from 'chess.js'
import useScreenSize from '../../helper/screenSize'
import Background from './Background'
import Piece from './Piece'
import { SIZE } from '../../../shared-codebase/ui-layer/chessboard/Notation'
import { isWeb } from 'tamagui'

const { width } = Dimensions.get('window')

const styles = StyleSheet.create({
  container: {
    width,
    height: width,
  },
})


function useConst<T>(initialValue: T | (() => T)): T {
  const ref = useRef<{ value: T }>()
  if (ref.current === undefined) {
    // Box the value in an object so we can tell if it's initialized even if the initializer
    // returns/is undefined
    ref.current = {
      value:
        typeof initialValue === 'function'
          ? (initialValue as Function)()
          : initialValue,
    }
  }
  return ref.current.value
}

const Board = () => {
  const chess = useConst(() => new Chess())
  const [state, setState] = useState({
    player: 'w',
    board: chess.board(), 
  })

  const {newHeight,newWidth}=useScreenSize()
const width = newWidth ? newWidth:Dimensions.get('window').width
const height = newHeight ? newHeight:Dimensions.get('window').height
  
  


  console.log(width,height)

const webBoard = useRef( StyleSheet.create({
  container: {
    width:"100vh",
    height: "100vh",
  } as any,
}))


 
// Changing style  respective to screen size for web
  

  useEffect(()=>{
    
   if (isWeb) {
     let unit =  height < width ? "100vh":"100vw"
      webBoard.current= StyleSheet.create({
       container: {
         width:unit,
         height: unit,
        } as any,
      })
    }  

  },[width,height])

  const onTurn = useCallback(() => {
    setState({
      player: state.player === 'w' ? 'b' : 'w',
      board: chess.board(),
    })
  }, [chess, state.player])
  return (
    <View style={isWeb?webBoard.current?.container: styles.container}>
      <Background />
      {state.board.map((row, i) =>
        row.map((square, j) => {
          if (square === null) {
            return null
          }
          return (
            // <div key={square.square}>
              <Piece
              enabled={state.player === square.color}
              onTurn={onTurn}
              chess={chess}
              position={{ x: j * SIZE, y: i * SIZE }}
              id={`${square.color}${square.type}` as const}
             />
            // </div>
          )
        })
      )}
    </View>
  )
}

export default Board
