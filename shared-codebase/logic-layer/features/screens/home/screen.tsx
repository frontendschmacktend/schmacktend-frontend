import {Text, View } from 'tamagui'
import {Link } from 'solito/link'
import { isWeb } from 'tamagui';
import React from 'react';

export function HomeScreen() {
  const navigate = () => {
    if (isWeb) {
      return '/myHome'
    } else {
      return '/user'
    }
  }
  return (
    <>
    <Link href={navigate()}>
      <View style={{width: 'auto', height: 30, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center'}} >
        <Text style={{color: 'white'}}>GO TO SKIA</Text>
      </View>
    </Link>
    <Link href={'/stockfish'}>
      <View style={{width: 'auto', height: 30, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', marginTop: 20}} >
        <Text style={{color: 'white'}}>GO TO Stockfish</Text>
      </View>
    </Link>
    <Link href={'/chessboard'}>
      <View style={{width: 'auto', height: 30, backgroundColor: 'black', alignItems: 'center', justifyContent: 'center', marginTop: 20}} >
        <Text style={{color: 'white'}}>GO TO ChessBoard</Text>
      </View>
    </Link>
        </>
  )
}
