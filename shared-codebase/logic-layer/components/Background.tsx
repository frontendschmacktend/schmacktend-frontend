import React from "react";
import { View } from "tamagui";
import Row from "./Row";

interface BackgroundProps {}

const Background = () => {
  return (
    <View style={{flex: 1}}>
        {
            new Array(8).fill(0).map((_, row) => <Row key={row} row={row} />)
        }
    </View>
  );
};

export default Background;
