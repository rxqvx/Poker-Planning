import 'bootstrap/dist/css/bootstrap.css'
import '../styles/configWebSite.css';

function MyApp({ Component, pageProps }) {
  return (
    // <Provider>
      <Component {...pageProps} />
    // </Provider>
    
  )
}

export default MyApp
