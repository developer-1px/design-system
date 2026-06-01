import {
  Clock3,
  Database,
  GitBranch,
  Globe2,
  Inbox,
  Lock,
  MessageSquare,
  Monitor,
  Settings,
} from 'lucide-react'
import { DeltaPair } from '../design-system/primitives'
import { molecule } from '../design-system/molecules'
import { progress } from '../data/demo'

export function Inspector() {
  return (
    <aside className="inspector" aria-label="Progress inspector">
      <molecule.Root>
        <molecule.Header icon={Clock3} title="진행 상황" />
        <molecule.List as="ol">
          {progress.map((item) => (
            <molecule.StatusRow done={item.done} key={item.label}>
              {item.label}
            </molecule.StatusRow>
          ))}
        </molecule.List>
      </molecule.Root>

      <molecule.Root>
        <molecule.Header icon={Settings} title="환경" />
        <molecule.List>
          <molecule.FactRow
            icon={Database}
            label="변경 사항"
            value={<DeltaPair positive="+25,037" negative="-4,875" />}
          />
          <molecule.FactRow icon={Monitor} label="로컬" value="Vite" />
          <molecule.FactRow icon={GitBranch} label="feat/cli-work" value="starter" />
          <molecule.FactRow icon={Inbox} label="풀 리퀘스트 만들기" value="준비" />
        </molecule.List>
      </molecule.Root>

      <molecule.Root>
        <molecule.Header icon={Globe2} title="출처" />
        <molecule.List>
          <molecule.SourceRow icon={Lock}>워크스페이스 파일</molecule.SourceRow>
          <molecule.SourceRow icon={Globe2}>웹 검색</molecule.SourceRow>
          <molecule.SourceRow icon={MessageSquare} muted>
            사용자 레퍼런스 이미지
          </molecule.SourceRow>
        </molecule.List>
      </molecule.Root>
    </aside>
  )
}
