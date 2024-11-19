import { Refresh, Search } from '@/components/icons'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from '@/components/ui/select'
import { Button } from '@/components/ui/button'
import * as React from 'react'
import { useAtom } from 'jotai'
import { filtersAtom } from '@/pages/home/state'
import { queryClient } from '@/utils/queryClient'
import { QueryKeys } from '@/utils/constants'
import { OsType, StorageCapacitySort } from '@/pages/home/constants'

export function Filters() {
  const [filters, setFilters] = useAtom(filtersAtom)

  const handleSearchChange = (evt: React.ChangeEvent<HTMLInputElement>) => {
    setFilters((prev) => ({ ...prev, search: evt.target.value }))
  }

  const handleFilterByOsType = (value: OsType) => {
    setFilters((prev) => ({ ...prev, osType: value }))
  }

  const handleSortByChange = (value: StorageCapacitySort) => {
    setFilters((prev) => ({ ...prev, sortBy: value }))
  }

  async function onRefresh() {
    await queryClient.refetchQueries({ queryKey: [QueryKeys.GetDevices] })
  }

  return (
    <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center">
        <div className="relative flex-1">
          <Search className="absolute left-2.5 top-3 size-4 text-secondary" />
          <input
            className="max-h-[38px] w-full rounded-md border py-2 pl-8 pr-3 text-sm text-secondary"
            placeholder="Search"
            type="search"
            value={filters.search}
            onChange={handleSearchChange}
          />
        </div>
        <Select
          defaultValue="all"
          value={filters.osType}
          onValueChange={handleFilterByOsType}
        >
          <SelectTrigger className="w-full sm:w-[180px]">
            <SelectValue placeholder="Device Type" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={OsType.All}>All</SelectItem>
            <SelectItem value={OsType.Windows}>Windows</SelectItem>
            <SelectItem value={OsType.Mac}>Mac</SelectItem>
            <SelectItem value={OsType.Linux}>Linux</SelectItem>
          </SelectContent>
        </Select>
        <Select
          defaultValue="storage-desc"
          value={filters.sortBy}
          onValueChange={handleSortByChange}
        >
          <SelectTrigger className="w-full sm:w-[250px]">
            <SelectValue placeholder="Sort by" />
          </SelectTrigger>
          <SelectContent>
            <SelectItem value={StorageCapacitySort.StorageCapacityDesc}>
              HDD Capacity (Descending)
            </SelectItem>
            <SelectItem value={StorageCapacitySort.StorageCapacityAsc}>
              HDD Capacity (Ascending)
            </SelectItem>
            <SelectItem value={StorageCapacitySort.NameAsc}>
              Name (A-Z)
            </SelectItem>
            <SelectItem value={StorageCapacitySort.NameDesc}>
              Name (Z-A)
            </SelectItem>
          </SelectContent>
        </Select>
      </div>
      <Button size="icon" variant="ghost" onClick={onRefresh} data-testid="refresh-button">
        <Refresh className="size-4" />
      </Button>
    </div>
  )
}
