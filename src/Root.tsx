import { useState } from 'react'
import Setup from './pages/Setup'
import App from './pages/App'

function Root() {
  const [view, setView] = useState<'setup' | 'app'>('setup')
  const [selectedCards, setSelectedCards] = useState<string[]>([])

  if (view === 'setup')
    return <Setup
      onFinish={(cards) => {
        setSelectedCards(cards)
        setView('app')
      }}
    />

  return <App selectedCards={selectedCards} />
}

export default Root
