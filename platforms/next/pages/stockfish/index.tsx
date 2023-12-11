import React, { useEffect } from 'react'
// import StockfishWeb from '../../../../shared-codebase/data-layer/engine-mgmt/stockfish/StockfishSingleThreaded_Web'


export default function Page() {

  const [isMounted, setIsMounted] = React.useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null; // Don't render on the server side
  }

  return (
    <>
        {/* <StockfishWeb /> */}
        {/* <LazyComponent /> */}
    </>
  )
}
