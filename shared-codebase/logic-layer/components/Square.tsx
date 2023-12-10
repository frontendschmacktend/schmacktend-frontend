import React from 'react'
import { Text, View } from 'tamagui'
import { RowProps } from './Row'
import { isWeb } from 'tamagui'
interface SquareProps extends RowProps {
  col: number
}

const Square = ({ row, col }: SquareProps) => {
  const offSet = row % 2 === 0 ? 1 : 0
  const backgroundColor = (col + offSet) % 2 === 0 ? '#e5e9c5' : '#628443'
  const color = (col + offSet) % 2 !== 0 ? '#e5e9c5' : '#628443'
  return (
    <View
      style={{
        flex: 1,
        backgroundColor: backgroundColor,
        padding: 4,
        justifyContent: 'space-between',
      }}
    >
      <Text style={{ color: color, fontWeight: '500', opacity: (isWeb ? row : col) === 0 ? 1 : 0 }}>{8 - (isWeb ? col : row)}</Text>
      <Text style={{ color: color, fontWeight: '500', alignSelf: 'flex-end', opacity: (isWeb ? col : row) === 7 ? 1 : 0 }}>
        {String.fromCharCode('a'.charCodeAt(0) + (isWeb ? row : col))}
      </Text>
    </View>
  )
}

export default Square
