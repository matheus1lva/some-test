import { Home } from '@/pages/home/Home'
import { QueryClientProvider } from '@tanstack/react-query'
import { Toaster } from '@/components/ui/toaster'
import { queryClient } from '@/utils/queryClient'

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <Home />
      <Toaster />
    </QueryClientProvider>
  )
}

export default App
