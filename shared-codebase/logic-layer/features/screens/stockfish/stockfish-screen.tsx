import React from 'react'

import { StockfishSingleThreaded } from '../../../../../shared-codebase/data-layer/engine-mgmt/stockfish/StockfishSingleThreaded'

export function StockfishScreen() {
  const positions = [
    {
      fen: 'position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1',
      depth: 2,
      multipv: 1,
    },
    {
      fen: 'position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 2',
      depth: 3,
      multipv: 1,
    },
    {
      fen: 'position fen rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 3',
      depth: 5,
      multipv: 1,
    }
  ];
  return <StockfishSingleThreaded positions={positions} />;
}
