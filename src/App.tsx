import { Provider } from 'react-redux'

import { Router } from '@/router'
import { store } from '@/services/store'

export const App = () => {
  return (
    <>
      <Provider store={store}>
        <Router />
      </Provider>
    </>
  )
}
