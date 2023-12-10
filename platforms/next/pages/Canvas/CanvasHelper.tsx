import {
    Paragraph,
  } from 'tamagui';
  import { WithSkiaWeb } from "@shopify/react-native-skia/lib/module/web";
  
  export default function CanvasHelper() {
  
    return (
      <>
         <WithSkiaWeb
         opts={{ locateFile: (file) => `https://cdn.jsdelivr.net/npm/canvaskit-wasm@0.38.0/bin/full/${file}` }}
         getComponent={() => import('../../../../shared-codebase/logic-layer/components/HelloWorld')}
         fallback={<Paragraph style={{display:"flex",justifyContent:"center"}}>Loading Skia...</Paragraph>} />
      </>
    )
    
  }
  