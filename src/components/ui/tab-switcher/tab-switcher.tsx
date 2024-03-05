import { ReactNode } from 'react'

import { TabContent } from '@/components/ui/tab-switcher/tab-content/tab-content'
import { TabValue } from '@/services/decks/decks.slice'
import { List, Root, Trigger } from '@radix-ui/react-tabs'

import s from './tab-switcher.module.scss'

export type TabItemType = {
  content?: ReactNode
  disabled?: boolean
  label: string
  value: string
}
type TabSwitcherType = {
  defaultValue?: string
  onValueChange?: (value: TabValue) => void
  tabs: TabItemType[]
  value?: TabValue
}
export const TabSwitcher = (props: TabSwitcherType) => {
  const { defaultValue, onValueChange, tabs, value } = props

  /** !!! TYPE CHANGE IN ROOT onValueChange !!! **/
  return (
    <Root
      className={s.root}
      defaultValue={defaultValue}
      onValueChange={onValueChange}
      value={value}
    >
      <List aria-label={'tabs'} className={s.list}>
        {tabs.map(tab => (
          <Trigger
            className={s.trigger}
            disabled={tab.disabled}
            key={tab.value}
            // onClick={() => onValueChange && onValueChange(tab.value as TabValue)}
            value={tab.value}
          >
            {tab.label}
          </Trigger>
        ))}
      </List>
      {tabs.map(tab => (
        <TabContent key={tab.value} value={tab.value}>
          {tab.content}
        </TabContent>
      ))}
    </Root>
  )
}
