import {
  accordionDefinition,
  breadcrumbDefinition,
  buttonDefinition,
  checkboxDefinition,
  disclosureDefinition,
  linkDefinition,
  listboxDefinition,
  menuButtonDefinition,
  meterDefinition,
  radioGroupDefinition,
  reducePatternData,
  sliderDefinition,
  spinbuttonDefinition,
  switchDefinition,
  tabsDefinition,
  toolbarDefinition,
  tooltipDefinition,
  windowSplitterDefinition,
  type PatternData,
  type PatternDefinition,
  type PatternEvent,
  type PatternOptions,
  useAccordionPattern,
  useBreadcrumbPattern,
  useButtonPattern,
  useCheckboxPattern,
  useDisclosurePattern,
  useLinkPattern,
  useListboxPattern,
  useMenuButtonPattern,
  useMeterPattern,
  useRadioGroupPattern,
  useSliderPattern,
  useSpinbuttonPattern,
  useSwitchPattern,
  useTabsPattern,
  useToolbarPattern,
  useTooltipPattern,
  useWindowSplitterPattern,
} from '@interactive-os/aria/react'
import { ChevronDown, GripVertical, Minus, Plus } from 'lucide-react'
import {
  Button,
  Cluster,
  ControlRow,
  Description,
  FieldGroup,
  IconButton,
  InlineCode,
  MeterBar,
  RowStack,
  Section,
  TabRow,
  ChoiceRow,
  TextStack,
} from '../../design-system/primitives/primitives'
import { useCallback, useMemo, useState, type ReactNode } from 'react'

type ApgItem = {
  checked?: boolean | 'mixed'
  content?: ReactNode
  current?: boolean | 'page'
  disabled?: boolean
  href?: string
  key: string
  label: string
  max?: number
  min?: number
  pressed?: boolean
  value?: number
  valueText?: string
  variant?: string
}

type PatternEventHandler = (event: PatternEvent) => void

function useReducedPatternData(
  definition: PatternDefinition,
  initialData: PatternData,
  onEvent?: PatternEventHandler,
) {
  const [data, setData] = useState(initialData)

  const emit = useCallback(
    (event: PatternEvent) => {
      setData((current) => reducePatternData(definition, current, event))
      onEvent?.(event)
    },
    [definition, onEvent],
  )

  return [data, emit] as const
}

function keysFor(items: readonly ApgItem[]) {
  return items.map((item) => item.key)
}

function itemMapFor(items: readonly ApgItem[]) {
  return Object.fromEntries(
    items.map((item) => {
      const patternItem: Record<string, string> = { label: item.label }

      if (item.href !== undefined) patternItem.href = item.href
      if (item.variant !== undefined) patternItem.variant = item.variant

      return [item.key, patternItem]
    }),
  )
}

function disabledKeysFor(items: readonly ApgItem[]) {
  return items.filter((item) => item.disabled).map((item) => item.key)
}

function checkedByKeyFor(items: readonly ApgItem[]) {
  const checkedByKey: Record<string, boolean | 'mixed'> = {}

  items.forEach((item) => {
    if (item.checked !== undefined) checkedByKey[item.key] = item.checked
  })

  return checkedByKey
}

function pressedByKeyFor(items: readonly ApgItem[]) {
  const pressedByKey: Record<string, boolean> = {}

  items.forEach((item) => {
    if (item.pressed !== undefined) pressedByKey[item.key] = item.pressed
  })

  return pressedByKey
}

function valueByKeyFor(items: readonly ApgItem[]) {
  const valueByKey: Record<string, number> = {}

  items.forEach((item) => {
    if (item.value !== undefined) valueByKey[item.key] = item.value
  })

  return valueByKey
}

function rangeItemMapFor(items: readonly ApgItem[]) {
  return Object.fromEntries(
    items.map((item) => {
      const patternItem: Record<string, string | number> = { label: item.label }

      if (item.min !== undefined) patternItem.valuemin = item.min
      if (item.max !== undefined) patternItem.valuemax = item.max
      if (item.valueText !== undefined) patternItem.valuetext = item.valueText

      return [item.key, patternItem]
    }),
  )
}

export function AccessibleButton({
  disabled = false,
  keyName = 'button',
  label = 'Button',
  onEvent,
  options,
  pressed,
}: {
  disabled?: boolean
  keyName?: string
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
  pressed?: boolean
}) {
  const initialData = useMemo(
    () =>
      ({
        items: { [keyName]: { label } },
        relations: { rootKeys: [keyName] },
        state: {
          activeKey: keyName,
          disabledKeys: disabled ? [keyName] : [],
          pressedByKey: pressed === undefined ? {} : { [keyName]: pressed },
        },
      }) satisfies PatternData,
    [disabled, keyName, label, pressed],
  )
  const [data, emit] = useReducedPatternData(
    buttonDefinition,
    initialData,
    onEvent,
  )
  const button = useButtonPattern(data, emit, options)

  if (!button.key) return null

  return <Button {...button.rootProps}>{button.label}</Button>
}

export function AccessibleBreadcrumb({
  items,
  label = 'Breadcrumb',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)
    const currentByKey: NonNullable<PatternData['state']>['currentByKey'] = {}

    items.forEach((item) => {
      if (!item.current) return
      currentByKey[item.key] = item.current === true ? 'page' : item.current
    })

    return {
      items: itemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        currentByKey,
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    breadcrumbDefinition,
    initialData,
    onEvent,
  )
  const breadcrumb = useBreadcrumbPattern(data, emit, options)

  return (
    <nav {...breadcrumb.rootProps}>
      <ol {...breadcrumb.listProps}>
        {breadcrumb.items.map((item) => (
          <li key={item.key}>
            <a {...item.crumbProps}>{item.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  )
}

export function AccessibleAccordion({
  items,
  label = 'Accordion',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const panelContentByKey = useMemo(
    () =>
      new Map(items.map((item) => [panelKeyFor(item.key), item.content])),
    [items],
  )
  const initialData = useMemo(() => {
    const headerKeys = keysFor(items)
    const panelItems = Object.fromEntries(
      items.map((item) => [
        panelKeyFor(item.key),
        { label: `${item.label} panel` },
      ]),
    )

    return {
      items: { ...itemMapFor(items), ...panelItems },
      refs: { label },
      relations: {
        controlsByKey: Object.fromEntries(
          items.map((item) => [item.key, [panelKeyFor(item.key)]]),
        ),
        ownerByKey: Object.fromEntries(
          items.map((item) => [panelKeyFor(item.key), item.key]),
        ),
        rootKeys: headerKeys,
      },
      state: {
        activeKey: headerKeys[0],
        disabledKeys: disabledKeysFor(items),
        expandedKeys: headerKeys[0] ? [headerKeys[0]] : [],
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    accordionDefinition,
    initialData,
    onEvent,
  )
  const accordion = useAccordionPattern(data, emit, options)

  return (
    <RowStack {...accordion.rootProps}>
      {accordion.renderItems.map((item) => (
        <RowStack key={item.key}>
          <ControlRow
            as="button"
            trailing={<ChevronDown />}
            {...item.headerProps}
          >
            {item.label}
          </ControlRow>
          {item.panelProps ? (
            <Section
              hidden={!item.state.expanded}
              {...item.panelProps}
              title={undefined}
            >
              <Description>
                {contentFor(panelContentByKey, item.panelKey)}
              </Description>
            </Section>
          ) : null}
        </RowStack>
      ))}
    </RowStack>
  )
}

export function AccessibleCheckboxGroup({
  items,
  label = 'Checkboxes',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: itemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: keys[0],
        checkedByKey: checkedByKeyFor(items),
        disabledKeys: disabledKeysFor(items),
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    checkboxDefinition,
    initialData,
    onEvent,
  )
  const checkbox = useCheckboxPattern(data, emit, options)

  return (
    <FieldGroup legend={label}>
      <RowStack {...checkbox.rootProps}>
        {checkbox.renderItems.map((item) => (
          <ChoiceRow
            checked={item.state.checked === true}
            key={item.key}
            role="checkbox"
            {...item.checkboxProps}
          >
            {item.label}
          </ChoiceRow>
        ))}
      </RowStack>
    </FieldGroup>
  )
}

export function AccessibleDisclosure({
  content,
  defaultOpen = true,
  label = 'Disclosure',
  onEvent,
  options,
}: {
  content?: ReactNode
  defaultOpen?: boolean
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(
    () =>
      ({
        items: {
          panel: { label: `${label} panel` },
          trigger: { label },
        },
        relations: {
          controlsByKey: { trigger: ['panel'] },
          ownerByKey: { panel: 'trigger' },
          rootKeys: ['trigger'],
        },
        state: {
          activeKey: 'trigger',
          expandedKeys: defaultOpen ? ['trigger'] : [],
        },
      }) satisfies PatternData,
    [defaultOpen, label],
  )
  const [data, emit] = useReducedPatternData(
    disclosureDefinition,
    initialData,
    onEvent,
  )
  const disclosure = useDisclosurePattern(data, emit, options)

  return (
    <RowStack>
      <ControlRow
        as="button"
        trailing={<ChevronDown />}
        {...disclosure.triggerProps}
      >
        {label}
      </ControlRow>
      <Section
        hidden={!disclosure.expanded}
        {...disclosure.panelProps}
        title={undefined}
      >
        <Description>{content}</Description>
      </Section>
    </RowStack>
  )
}

export function AccessibleLink({
  disabled = false,
  href = '#',
  keyName = 'link',
  label = 'Link',
  onEvent,
  options,
  variant = 'anchor',
}: {
  disabled?: boolean
  href?: string
  keyName?: string
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
  variant?: 'anchor' | 'spanRole'
}) {
  const initialData = useMemo(
    () =>
      ({
        items: { [keyName]: { href, label, variant } },
        relations: { rootKeys: [keyName] },
        state: {
          activeKey: keyName,
          disabledKeys: disabled ? [keyName] : [],
        },
      }) satisfies PatternData,
    [disabled, href, keyName, label, variant],
  )
  const [data, emit] = useReducedPatternData(
    linkDefinition,
    initialData,
    onEvent,
  )
  const link = useLinkPattern(data, emit, options)

  if (!link.key) return null

  if (link.variant === 'spanRole') {
    return (
      <ControlRow as="div" {...link.linkProps}>
        {link.label}
      </ControlRow>
    )
  }

  return (
    <ControlRow
      as="a"
      href={link.href}
      {...link.linkProps}
      onClick={(event) => {
        event.preventDefault()
        link.linkProps.onClick?.(event)
      }}
    >
      {link.label}
    </ControlRow>
  )
}

export function AccessibleListbox({
  items,
  label = 'Options',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: itemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: keys[0],
        disabledKeys: disabledKeysFor(items),
        selectedKeys: keys[0] ? [keys[0]] : [],
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    listboxDefinition,
    initialData,
    onEvent,
  )
  const listbox = useListboxPattern(data, emit, options)

  return (
    <RowStack {...listbox.rootProps}>
      {listbox.renderItems.map((item) => (
        <ControlRow as="div" key={item.key} {...item.optionProps}>
          {item.label}
        </ControlRow>
      ))}
    </RowStack>
  )
}

export function AccessibleMeter({
  items,
  label = 'Meters',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: rangeItemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: { valueByKey: valueByKeyFor(items) },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    meterDefinition,
    initialData,
    onEvent,
  )
  const meter = useMeterPattern(data, emit, options)

  return (
    <RowStack {...meter.rootProps}>
      {meter.renderItems.map((item) => (
        <TextStack
          detail={
            <MeterBar
              max={item.max}
              min={item.min}
              value={item.value}
              {...item.meterProps}
            >
              {item.valueText ?? item.value}
            </MeterBar>
          }
          key={item.key}
          title={`${item.label} ${item.valueText ?? item.value}`}
        />
      ))}
    </RowStack>
  )
}

export function AccessibleToolbar({
  items,
  label = 'Toolbar',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: itemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: keys[0],
        disabledKeys: disabledKeysFor(items),
        pressedByKey: pressedByKeyFor(items),
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    toolbarDefinition,
    initialData,
    onEvent,
  )
  const toolbar = useToolbarPattern(data, emit, options)

  return (
    <Cluster {...toolbar.rootProps}>
      {toolbar.renderItems.map((item) => (
        <Button
          key={item.key}
          variant={item.state.pressed ? 'primary' : 'default'}
          {...item.itemProps}
        >
          {item.label}
        </Button>
      ))}
    </Cluster>
  )
}

export function AccessibleSlider({
  items,
  label = 'Slider',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: rangeItemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: keys[0],
        disabledKeys: disabledKeysFor(items),
        valueByKey: valueByKeyFor(items),
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    sliderDefinition,
    initialData,
    onEvent,
  )
  const slider = useSliderPattern(data, emit, options)

  return (
    <RowStack {...slider.rootProps}>
      {slider.renderItems.map((item) => (
        <ControlRow as="div" key={item.key} {...item.sliderProps}>
          <TextStack
            detail={
              <span
                onPointerDown={(event) => {
                  event.currentTarget.setPointerCapture?.(event.pointerId)
                  item.updateFromPointer(event)
                }}
                onPointerMove={(event) => {
                  if (event.buttons !== 1) return
                  item.updateFromPointer(event)
                }}
                style={{
                  background: 'var(--ds-border-subtle)',
                  blockSize: 'var(--ds-space-2)',
                  borderRadius: 'var(--ds-radius-pill)',
                  inlineSize: 'var(--ds-full)',
                  position: 'relative',
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    background: 'var(--ds-text)',
                    blockSize: 'var(--ds-full)',
                    borderRadius: 'inherit',
                    display: 'block',
                    inlineSize: `${item.position}%`,
                  }}
                />
              </span>
            }
            title={`${item.label} ${item.valueText ?? item.value}`}
          />
        </ControlRow>
      ))}
    </RowStack>
  )
}

export function AccessibleSpinbutton({
  items,
  label = 'Spinbuttons',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: rangeItemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: keys[0],
        disabledKeys: disabledKeysFor(items),
        valueByKey: valueByKeyFor(items),
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    spinbuttonDefinition,
    initialData,
    onEvent,
  )
  const spinbutton = useSpinbuttonPattern(data, emit, options)

  return (
    <FieldGroup legend={label}>
      <RowStack {...spinbutton.rootProps}>
        {spinbutton.renderItems.map((item) => (
          <Cluster key={item.key}>
            <IconButton
              icon={<Minus aria-hidden="true" />}
              label={`Decrease ${item.label}`}
              {...item.decrementButtonProps}
            />
            <ControlRow as="div" {...item.spinbuttonProps}>
              {item.label}: {item.value}
            </ControlRow>
            <IconButton
              icon={<Plus aria-hidden="true" />}
              label={`Increase ${item.label}`}
              {...item.incrementButtonProps}
            />
          </Cluster>
        ))}
      </RowStack>
    </FieldGroup>
  )
}

export function AccessibleTooltip({
  defaultOpen = false,
  label = 'Target',
  onEvent,
  options,
  tooltip = 'Tooltip',
}: {
  defaultOpen?: boolean
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
  tooltip?: string
}) {
  const initialData = useMemo(
    () =>
      ({
        items: {
          tooltip: { label: tooltip },
          trigger: { label },
        },
        relations: {
          controlsByKey: { trigger: ['tooltip'] },
          ownerByKey: { tooltip: 'trigger' },
          rootKeys: ['trigger'],
        },
        state: {
          activeKey: 'trigger',
          expandedKeys: defaultOpen ? ['trigger'] : [],
        },
      }) satisfies PatternData,
    [defaultOpen, label, tooltip],
  )
  const [data, emit] = useReducedPatternData(
    tooltipDefinition,
    initialData,
    onEvent,
  )
  const tooltipRuntime = useTooltipPattern(data, emit, options)

  return (
    <RowStack>
      <Button {...tooltipRuntime.triggerProps}>
        {tooltipRuntime.triggerLabel}
      </Button>
      <Section
        hidden={!tooltipRuntime.state.open}
        {...tooltipRuntime.tooltipProps}
        title={undefined}
      >
        <Description>{tooltipRuntime.tooltipLabel}</Description>
      </Section>
    </RowStack>
  )
}

export function AccessibleWindowSplitter({
  label = 'Resize panels',
  onEvent,
  options,
  value = 48,
}: {
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
  value?: number
}) {
  const initialData = useMemo(
    () =>
      ({
        items: {
          primary: { label: 'Primary panel' },
          separator: { label },
          secondary: { label: 'Secondary panel' },
        },
        refs: { label },
        relations: {
          controlsByKey: { separator: ['primary'] },
          rootKeys: ['separator'],
        },
        state: {
          activeKey: 'separator',
          valueByKey: { separator: value },
        },
      }) satisfies PatternData,
    [label, value],
  )
  const [data, emit] = useReducedPatternData(
    windowSplitterDefinition,
    initialData,
    onEvent,
  )
  const splitter = useWindowSplitterPattern(data, emit, options)

  if (!splitter.key) return null

  return (
    <div
      {...splitter.rootProps}
      style={{
        alignItems: 'stretch',
        display: 'flex',
        inlineSize: 'var(--ds-full)',
        minBlockSize: 'var(--ds-space-24)',
      }}
    >
      <Section
        id={
          splitter.controlledKey
            ? splitter.ids.forKey(splitter.controlledKey)
            : undefined
        }
        style={{ inlineSize: `${splitter.state.position}%` }}
        title="Primary"
      >
        <Description>Primary</Description>
      </Section>
      <div
        {...splitter.separatorProps}
        style={{
          alignItems: 'center',
          cursor: 'col-resize',
          display: 'flex',
          justifyContent: 'center',
          paddingInline: 'var(--ds-space-2)',
        }}
      >
        <GripVertical aria-hidden="true" />
      </div>
      <Section style={{ flex: 1 }} title="Secondary">
        <Description>Secondary</Description>
      </Section>
    </div>
  )
}

export function AccessibleRadioGroup({
  items,
  label = 'Options',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)
    const selectedKey =
      items.find((item) => item.checked === true)?.key ?? keys[0]

    return {
      items: itemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: selectedKey,
        disabledKeys: disabledKeysFor(items),
        selectedKeys: selectedKey ? [selectedKey] : [],
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    radioGroupDefinition,
    initialData,
    onEvent,
  )
  const radio = useRadioGroupPattern(data, emit, options)

  return (
    <FieldGroup legend={label}>
      <RowStack {...radio.rootProps}>
        {radio.renderItems.map((item) => (
          <ChoiceRow
            checked={item.state.checked}
            key={item.key}
            role="radio"
            {...item.radioProps}
          >
            {item.label}
          </ChoiceRow>
        ))}
      </RowStack>
    </FieldGroup>
  )
}

export function AccessibleMenuButton({
  defaultOpen = false,
  items,
  label = 'Actions',
  onEvent,
  options,
}: {
  defaultOpen?: boolean
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const itemKeys = keysFor(items)

    return {
      items: {
        menu: { label: `${label} menu` },
        trigger: { label },
        ...itemMapFor(items),
      },
      relations: {
        childrenByKey: { menu: itemKeys, trigger: ['menu'] },
        controlsByKey: { trigger: ['menu'] },
        ownerByKey: {
          menu: 'trigger',
          ...Object.fromEntries(items.map((item) => [item.key, 'menu'])),
        },
        rootKeys: ['trigger'],
      },
      state: {
        activeKey: itemKeys[0],
        disabledKeys: disabledKeysFor(items),
        expandedKeys: defaultOpen ? ['trigger'] : [],
      },
    } satisfies PatternData
  }, [defaultOpen, items, label])
  const [data, emit] = useReducedPatternData(
    menuButtonDefinition,
    initialData,
    onEvent,
  )
  const menu = useMenuButtonPattern(data, emit, options)

  return (
    <RowStack>
      <Button icon={<ChevronDown />} {...menu.triggerProps}>
        {label}
      </Button>
      {menu.expanded ? (
        <RowStack {...menu.menuProps}>
          {menu.items.map((item) => (
            <ControlRow as="div" key={item.key} {...item.itemProps}>
              {item.label}
            </ControlRow>
          ))}
        </RowStack>
      ) : null}
    </RowStack>
  )
}

export function AccessibleSwitch({
  items,
  label = 'Switches',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const initialData = useMemo(() => {
    const keys = keysFor(items)

    return {
      items: itemMapFor(items),
      refs: { label },
      relations: { rootKeys: keys },
      state: {
        activeKey: keys[0],
        checkedByKey: checkedByKeyFor(items),
        disabledKeys: disabledKeysFor(items),
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(
    switchDefinition,
    initialData,
    onEvent,
  )
  const toggle = useSwitchPattern(data, emit, options)

  return (
    <FieldGroup legend={label}>
      <RowStack {...toggle.rootProps}>
        {toggle.renderItems.map((item) => (
          <ChoiceRow
            checked={item.state.checked}
            key={item.key}
            role="switch"
            {...item.switchProps}
          >
            {item.label}
            <InlineCode>{item.state.checked ? 'on' : 'off'}</InlineCode>
          </ChoiceRow>
        ))}
      </RowStack>
    </FieldGroup>
  )
}

export function AccessibleTabs({
  items,
  label = 'Tabs',
  onEvent,
  options,
}: {
  items: readonly ApgItem[]
  label?: string
  onEvent?: PatternEventHandler
  options?: PatternOptions
}) {
  const panelContentByKey = useMemo(
    () =>
      new Map(items.map((item) => [panelKeyFor(item.key), item.content])),
    [items],
  )
  const initialData = useMemo(() => {
    const tabKeys = keysFor(items)
    const panelItems = Object.fromEntries(
      items.map((item) => [
        panelKeyFor(item.key),
        { label: `${item.label} panel` },
      ]),
    )

    return {
      items: { ...itemMapFor(items), ...panelItems },
      refs: { label },
      relations: {
        controlsByKey: Object.fromEntries(
          items.map((item) => [item.key, [panelKeyFor(item.key)]]),
        ),
        ownerByKey: Object.fromEntries(
          items.map((item) => [panelKeyFor(item.key), item.key]),
        ),
        rootKeys: tabKeys,
      },
      state: {
        activeKey: tabKeys[0],
        disabledKeys: disabledKeysFor(items),
        selectedKeys: tabKeys[0] ? [tabKeys[0]] : [],
      },
    } satisfies PatternData
  }, [items, label])
  const [data, emit] = useReducedPatternData(tabsDefinition, initialData, onEvent)
  const tabs = useTabsPattern(data, emit, options)
  const selectedPanelKey = tabs.selectedPanelKey
  const tablistProps = tabs.getTablistProps()

  return (
    <RowStack>
      <TabRow
        {...tablistProps}
        aria-label={String(tablistProps['aria-label'] ?? label)}
      >
        {tabs.tabs.map((key) => (
          <Button key={key} {...tabs.getTabProps(key)}>
            {data.items[key]?.label ?? key}
          </Button>
        ))}
      </TabRow>
      {selectedPanelKey ? (
        <Section {...tabs.getTabPanelProps(selectedPanelKey)} title={undefined}>
          <Description>
            {contentFor(panelContentByKey, selectedPanelKey)}
          </Description>
        </Section>
      ) : null}
    </RowStack>
  )
}

function panelKeyFor(key: string) {
  return `${key}-panel`
}

function contentFor(
  contentByKey: ReadonlyMap<string, ReactNode>,
  key: string | null | undefined,
) {
  if (!key) return null
  return contentByKey.get(key) ?? null
}

export function ApgEventLog({
  events,
}: {
  events: readonly PatternEvent[]
}) {
  return (
    <Cluster>
      {events.slice(-3).map((event, index) => (
        <Description key={`${event.type}-${index}`}>{event.type}</Description>
      ))}
    </Cluster>
  )
}
