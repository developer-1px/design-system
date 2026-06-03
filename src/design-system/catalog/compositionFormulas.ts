export type CompositionFormula = {
  formula: string
  name: string
  output: string
  parts: readonly string[]
  previewKey: string
}

export type CompositionFormulaGroup = {
  detail: string
  title: string
  items: readonly CompositionFormula[]
}

export const compositionFormulaGroups: readonly CompositionFormulaGroup[] = [
  {
    title: 'Section sets',
    detail: 'Place one or more sections with consistent spacing and column rhythm.',
    items: [
      {
        name: 'Single-section block',
        previewKey: 'SectionBlock',
        formula: 'sectionBlock(section)',
        output: 'area block',
        parts: ['section'],
      },
      {
        name: 'Section stack block',
        previewKey: 'SectionStackBlock',
        formula: 'sectionStackBlock(sections)',
        output: 'area block',
        parts: ['section[]'],
      },
      {
        name: 'Two-section block',
        previewKey: 'SectionPairBlock',
        formula: 'sectionPairBlock(first, second)',
        output: 'area block',
        parts: ['section', 'section'],
      },
      {
        name: 'Three-section block',
        previewKey: 'SectionTrioBlock',
        formula: 'sectionTrioBlock(first, second, third)',
        output: 'area block',
        parts: ['section', 'section', 'section'],
      },
      {
        name: 'Section grid block',
        previewKey: 'SectionGridBlock',
        formula: 'sectionGridBlock(columns, sections)',
        output: 'area block',
        parts: ['columns', 'section[]'],
      },
    ],
  },
  {
    title: 'Section variants',
    detail: 'Render repeated row structures without app-specific names.',
    items: [
      {
        name: 'Status section block',
        previewKey: 'StatusSectionBlock',
        formula: 'statusSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'status rows'],
      },
      {
        name: 'Key-value section block',
        previewKey: 'ValueSectionBlock',
        formula: 'valueSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'key-value rows'],
      },
      {
        name: 'Record section block',
        previewKey: 'RecordSectionBlock',
        formula: 'recordSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'record rows'],
      },
      {
        name: 'Metric section block',
        previewKey: 'MetricSectionBlock',
        formula: 'metricSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'metric cells'],
      },
      {
        name: 'Item section block',
        previewKey: 'ItemSectionBlock',
        formula: 'itemSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'icon rows'],
      },
      {
        name: 'Marked-code section block',
        previewKey: 'CodeSectionBlock',
        formula: 'codeSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'marked rows'],
      },
      {
        name: 'Delta section block',
        previewKey: 'DeltaSectionBlock',
        formula: 'deltaSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'delta rows'],
      },
      {
        name: 'Meter section block',
        previewKey: 'MeterSectionBlock',
        formula: 'meterSectionBlock(spec)',
        output: 'area block',
        parts: ['title', 'meter rows'],
      },
    ],
  },
  {
    title: 'Content blocks',
    detail: 'Wrap free content, tables, trees, grids, and metadata as area blocks.',
    items: [
      {
        name: 'Surface block',
        previewKey: 'SurfaceBlock',
        formula: 'surfaceBlock(spec)',
        output: 'area block',
        parts: ['title', 'content'],
      },
      {
        name: 'Text block',
        previewKey: 'TextBlock',
        formula: 'textBlock(spec)',
        output: 'area block',
        parts: ['body'],
      },
      {
        name: 'Meta block',
        previewKey: 'MetaBlock',
        formula: 'metaBlock(spec)',
        output: 'area block',
        parts: ['icon', 'label', 'action'],
      },
      {
        name: 'Table block',
        previewKey: 'TableBlock',
        formula: 'tableBlock(spec)',
        output: 'area block',
        parts: ['columns', 'rows'],
      },
      {
        name: 'Tree block',
        previewKey: 'TreeBlock',
        formula: 'treeBlock(spec)',
        output: 'area block',
        parts: ['root icon', 'nested rows'],
      },
      {
        name: 'Grid block',
        previewKey: 'GridBlock',
        formula: 'gridBlock(spec)',
        output: 'area block',
        parts: ['title', 'items'],
      },
    ],
  },
  {
    title: 'Card containers',
    detail: 'Compose neutral surfaces into card stacks, pairs, and grids.',
    items: [
      {
        name: 'Card block',
        previewKey: 'CardBlock',
        formula: 'cardBlock(spec)',
        output: 'area block',
        parts: ['title', 'body', 'actions'],
      },
      {
        name: 'Card pair block',
        previewKey: 'CardPairBlock',
        formula: 'cardPairBlock(title, first, second)',
        output: 'area block',
        parts: ['title', 'card', 'card'],
      },
      {
        name: 'Card stack block',
        previewKey: 'CardStackBlock',
        formula: 'cardStackBlock(title, cards)',
        output: 'area block',
        parts: ['title', 'card[]'],
      },
      {
        name: 'Card grid block',
        previewKey: 'CardGridBlock',
        formula: 'cardGridBlock(spec)',
        output: 'area block',
        parts: ['title', 'columns', 'card[]'],
      },
    ],
  },
  {
    title: 'Form containers',
    detail: 'Assemble fields, choice groups, and actions inside neutral form surfaces.',
    items: [
      {
        name: 'Form block',
        previewKey: 'FormBlock',
        formula: 'formBlock(spec)',
        output: 'area block',
        parts: ['title', 'fields', 'actions'],
      },
      {
        name: 'Field stack',
        previewKey: 'FieldStack',
        formula: 'fieldStack(fields)',
        output: 'node',
        parts: ['field[]'],
      },
      {
        name: 'Field grid',
        previewKey: 'FieldGrid',
        formula: 'fieldGrid(columns, fields)',
        output: 'node',
        parts: ['columns', 'field[]'],
      },
      {
        name: 'Text input field',
        previewKey: 'TextInputField',
        formula: 'textInputField(spec)',
        output: 'node',
        parts: ['label', 'input', 'trailing'],
      },
      {
        name: 'Choice field group',
        previewKey: 'ChoiceFieldGroup',
        formula: 'choiceFieldGroup(spec)',
        output: 'node',
        parts: ['legend', 'choice[]'],
      },
      {
        name: 'Form actions',
        previewKey: 'FormActions',
        formula: 'formActions(actions)',
        output: 'node',
        parts: ['action[]'],
      },
    ],
  },
  {
    title: 'Area assembly',
    detail: 'Bind structural blocks into page areas and navigation surfaces.',
    items: [
      {
        name: 'Content stack',
        previewKey: 'ContentStack',
        formula: 'contentStack(...blocks)',
        output: 'area content',
        parts: ['block[]'],
      },
      {
        name: 'Content slots',
        previewKey: 'ContentSlots',
        formula: 'contentSlots(spec)',
        output: 'page content props',
        parts: ['rail', 'main', 'secondary', 'tertiary', 'aside'],
      },
      {
        name: 'Page with named areas',
        previewKey: 'PageLayout',
        formula: 'PageLayout(contentSlots)',
        output: 'page',
        parts: ['rail', 'main', 'aside'],
      },
      {
        name: 'Named area grid',
        previewKey: 'AreaGrid',
        formula: 'AreaGrid(areas)',
        output: 'layout region',
        parts: ['area names', 'content'],
      },
      {
        name: 'Navigation section',
        previewKey: 'Navigation',
        formula: 'navigation(items)',
        output: 'navigation props',
        parts: ['items', 'groups', 'variant'],
      },
    ],
  },
] as const

export const compositionFormulas = compositionFormulaGroups.flatMap(
  (group) => group.items,
)
