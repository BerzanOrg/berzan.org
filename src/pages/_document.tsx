import { Html, Head, Main, NextScript } from 'next/document'

export default function Document() {
  return (
    <Html lang="en">
      <Head />
      <body className='flex flex-col items-center text-neutral-950 bg-gradient-to-tl from-yellow-300/90 to-yellow-200/90'>
        <Main />
        <NextScript />
      </body>
    </Html>
  )
}
