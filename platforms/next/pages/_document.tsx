import NextDocument, {
  Head,
  Html,
  Main,
  NextScript,
} from 'next/document'
import { Children } from 'react'
import { AppRegistry } from 'react-native'
import Script from 'next/script'

import Tamagui from '../tamagui.config'

export default class Document extends NextDocument {
  static async getInitialProps(ctx: any) {
    AppRegistry.registerComponent('Main', () => Main)
    const page = await ctx.renderPage()

    // @ts-ignore
    const { getStyleElement } = AppRegistry.getApplication('Main')
    const hidden = {overflow:"hidden"}

    /**
     * Note: be sure to keep tamagui styles after react-native-web styles like it is here!
     * So Tamagui styles can override the react-native-web styles.
     */
    const styles = [
      
      getStyleElement(),
      <style
        key="tamagui-css"
        dangerouslySetInnerHTML={{
          __html: Tamagui.getCSS({
            exclude: process.env.NODE_ENV === 'development' ? null : 'design-system',
           
          }),
        }}
      />,
    ]

    return { ...page, styles: Children.toArray(styles) }
  }

  render() {
    return (
   <div style={{overflow:"hidden"}}>
       <Html >
         <Head>
          <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
          <script src="/stockfish/stockfish.js"></script>
          <script src="/stockfish/chess.min.js"></script>
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
   </div>
    )
  }
}