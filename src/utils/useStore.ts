import React from 'react'
import { MobXProviderContext } from 'mobx-react'
import RootStore from '../stores/rootStore'

function useStores(): RootStore {
  return React.useContext(MobXProviderContext) as RootStore
}

export default useStores
