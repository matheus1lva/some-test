import { atom } from 'jotai'
import { OsType, StorageCapacitySort } from '@/pages/home/constants'

export const filtersAtom = atom({
  osType: OsType.All,
  sortBy: StorageCapacitySort.StorageCapacityDesc,
  search: ''
})
