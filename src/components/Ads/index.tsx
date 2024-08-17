import React from 'react'
import { AdsProvider } from '../../context/AdsContext'
import AdList from './List'
import AddAdForm from './Create'

const App: React.FC = () => {
  return (
    <AdsProvider>
      <div>
        <AddAdForm />
        <AdList />
      </div>
    </AdsProvider>
  )
}

export default App
