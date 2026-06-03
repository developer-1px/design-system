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
import {
  ContentAssembly,
  ShellInspector,
} from '../../design-system/primitives/primitives'
import {
  areaContent,
  deltaNode,
  itemSection,
  sectionPairBlock,
  statusSectionBlock,
} from '../../design-system/composition/assembly'
import { progress } from '../data/demo'

export function Inspector() {
  return (
    <ShellInspector aria-label="Progress inspector">
      <ContentAssembly
        content={areaContent({
          blocks: [
            statusSectionBlock({
              icon: <Clock3 />,
              items: progress.map((item) => ({
                done: item.done,
                label: item.label,
              })),
              title: '진행 상황',
            }),
            sectionPairBlock(
                itemSection({
                  icon: <Settings />,
                  items: [
                    {
                      icon: Database,
                      label: '변경 사항',
                      value: deltaNode('+25,037', '-4,875'),
                    },
                    { icon: Monitor, label: '로컬', value: 'Vite' },
                    { icon: GitBranch, label: 'feat/cli-work', value: 'starter' },
                    { icon: Inbox, label: '풀 리퀘스트 만들기', value: '준비' },
                  ],
                  title: '환경',
                }),
                itemSection({
                  icon: <Globe2 />,
                  items: [
                    { icon: Lock, label: '워크스페이스 파일' },
                    { icon: Globe2, label: '웹 검색' },
                    {
                      icon: MessageSquare,
                      label: '사용자 레퍼런스 이미지',
                      muted: true,
                    },
                  ],
                  title: '출처',
                }),
            ),
          ],
        })}
      />
    </ShellInspector>
  )
}
