import { AtlasMap } from '@/components/AtlasMap'
import { Breadcrumb } from '@/components/Breadcrumb'
import { FacetRail } from '@/components/FacetRail'
import { Inspector } from '@/components/Inspector'
import { Timeline } from '@/components/Timeline'

export default function AtlasPage() {
  return (
    <div className="atlas">
      <FacetRail />
      <div className="stage">
        <Breadcrumb />
        <AtlasMap />
      </div>
      <Inspector />
      <Timeline />
    </div>
  )
}
