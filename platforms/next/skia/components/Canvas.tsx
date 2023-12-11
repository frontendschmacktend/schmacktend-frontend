import Head from 'next/head'
import dynamic from 'next/dynamic'
import React, { useEffect } from 'react'

// const SkiaComponent = dynamic(
//   () => import('../../skia/CanvasHelper').then((mod) => mod.default),
//   {
//     loading: () => <div></div>,
//     ssr: false, // Disable server-side rendering for this component
//   }
// )

const LazyComponent = dynamic(() => import('../../skia/CanvasHelper'), {
  loading: () => <div></div>,
  ssr: false, // Disable server-side rendering for this component
})

export default function CanvasPage() {
  const [isMounted, setIsMounted] = React.useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  if (!isMounted) {
    return null // Don't render on the server side
  }

  return (
    <>
      <Head>
        <title>Schmacktend - Canvas</title>
      </Head>
      <LazyComponent />
    </>
  )
}
