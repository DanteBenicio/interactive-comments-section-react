import 'styled-components'; // import styled-components module

declare module 'styled-components' {
  export interface DefaultTheme { // override type definition DefaultTheme
    title: string
    primary: {
      moderateBlue: string
      softRed: string
      lightGrayishBlue: string
      paleRed: string
    },
    neutral: {
      darkBlue: string
      grayishBlue: string
      lightGray: string
      veryLightGray: string
      white: string
    },
  }
}
