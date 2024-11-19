import { Header } from '@/components/header/Header'
import { DevicesList } from '@/pages/home/components/DevicesList'
import { Filters } from '@/pages/home/components/Filters'
import { Toolbar } from '@/pages/home/components/Toolbar'

export function Home() {
  return (
    <div>
      <Header />
      <main className="w-full p-6">
        <div className="space-y-6">
          <Toolbar />
          <Filters />
          <DevicesList />
        </div>
      </main>
    </div>
  )
}
