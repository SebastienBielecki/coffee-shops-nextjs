import '@/styles/globals.css'

export default function App({ Component, pageProps }) {
  //return <Component {...pageProps} />
  return <>
    <Component {...pageProps} />
    <footer>
      <p>Copyright 2023 Sebastien</p>
    </footer>
  </>
}
