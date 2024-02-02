import { PackFilters } from '@/feature/packs-list/pack-filters'
import { PackTable } from '@/feature/packs-list/pack-table'

export const PacksList = () => {
  return (
    <div>
      <PackFilters sliderLabel={'Number of cards'} switcherLabel={'Show packs cards'} />
      <PackTable />
    </div>
  )
}
