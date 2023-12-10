import React from 'react'
import { View, isWeb } from 'tamagui';
import Square from './Square';

export interface RowProps {
    row: number;
}

const Row = ({row}: RowProps) => {
  return (
    <View style={{flex: 1, flexDirection: isWeb ? 'column' : 'row'}} >
        {
            new Array(8).fill(0).map((_, col) => <Square key={col} row={row} col={col} />)
        }
    </View>
  )
}

export default Row;