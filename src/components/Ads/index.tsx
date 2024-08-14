import React from 'react'
import { AdsProvider } from '../../context/AdsContext'
import AdList from './List'
import AddAdForm from './Create'
import EditAdForm from './Edit'

const App: React.FC = () => {
  return (
    <AdsProvider>
      <div className='App'>
        <h1>Real Estate Listings</h1>
        <AddAdForm />
        <AdList />
        {/* <EditAdForm /> */}
      </div>
    </AdsProvider>
  )
}

export default App
