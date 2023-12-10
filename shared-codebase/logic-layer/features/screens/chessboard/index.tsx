import React from 'react';
import Board from '../../../components/Board';
import { Text, View } from 'tamagui';


export function ChessBoard() {
  return(
    <View style={{flex: 1, backgroundColor: 'white', alignItems: 'center', justifyContent: 'center'}}>
        <Board />
    </View>
  )
}
