type AppProps = {
  selectedCards: string[]
}

export default function App({ selectedCards }: AppProps) {
  return (
    <div>
      <h1>Selected Cards</h1>
      <pre>{JSON.stringify(selectedCards, null, 2)}</pre>
    </div>
  )
}
