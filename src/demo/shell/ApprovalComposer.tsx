import {
  Clock3,
  FileText,
  Send,
  Trash2,
  Workflow,
} from 'lucide-react'
import {
  Badge,
  Button,
  ChoiceRow,
  CodeLine,
  FormSection,
  IconButton,
  InlineCode,
  RowStack,
} from '../../design-system/primitives/primitives'

export function ApprovalComposer() {
  return (
    <FormSection
      actions={
        <>
          <IconButton icon={<FileText />} label="첨부" />
          <IconButton icon={<Clock3 />} label="기록" />
          <IconButton icon={<Trash2 />} label="삭제" />
        </>
      }
      className="approval-dock"
      footer={
        <>
          <Button variant="ghost">건너뛰기</Button>
          <Button icon={<Send />} variant="primary">
            제출
          </Button>
        </>
      }
      floating
      icon={<Workflow />}
      title="진행 중인 목표 진단"
    >
      <p>
        sandbox에서 <InlineCode>.git/FETCH_HEAD</InlineCode> 쓰기가
        막혀 pull 확인이 실패했습니다. 원격 동기화를 위해{' '}
        <InlineCode>git pull --ff-only</InlineCode>를 허용할까요?
      </p>
      <CodeLine>git pull --ff-only</CodeLine>
      <RowStack
        aria-label="동기화 승인 선택"
        gap="tight"
        role="radiogroup"
      >
        <ChoiceRow checked prefix="1.">
          예
          <Badge tone="positive">추천</Badge>
        </ChoiceRow>
        <ChoiceRow checked={false} prefix="2.">
          네, 그리고 다음으로 시작하는 커맨드에 대해 다시 묻지 않기
        </ChoiceRow>
      </RowStack>
    </FormSection>
  )
}
