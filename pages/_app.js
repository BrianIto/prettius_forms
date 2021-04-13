import { Provider } from 'react-redux'
import Store from '../src/redux/store'
import '../styles/globals.css'
import 'semantic-ui-css/semantic.min.css'
import '@fortawesome/fontawesome-free/css/all.css'

function MyApp({ Component, pageProps }) {
  return (
  <Provider store={Store}>
    <Component {...pageProps} />
  </Provider>)
}

export default MyApp
