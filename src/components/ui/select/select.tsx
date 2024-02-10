import { ComponentPropsWithoutRef, ElementRef, ReactNode, forwardRef } from 'react'

import { SelectItem } from '@/components/ui/select/selectItem'
import { Typography } from '@/components/ui/typography'
import { ArrowMiniDownIcon } from '@/icons/icon-components/arrow-mini-down-icon'
import {
  Content,
  Group,
  Icon,
  Portal,
  Root,
  Trigger,
  Value,
  Viewport,
} from '@radix-ui/react-select'
import { clsx } from 'clsx'

import s from './select.module.scss'

export type ItemsType = string[]

export type SelectVariant = 'default' | 'fullWidth' | 'pagination'

export type SelectProps = {
  className?: string
  disabled?: boolean
  items: string[]
  label?: string
  placeholder?: ReactNode
  variant?: SelectVariant
} & ComponentPropsWithoutRef<typeof Root>

export const Select = forwardRef<ElementRef<typeof Root>, SelectProps>(
  (
    {
      children,
      className,
      disabled,
      items,
      label,
      onValueChange,
      open,
      placeholder = '10',
      value,
      variant = 'default',
      ...rest
    },
    ref
  ) => {
    const classNames = {
      content: clsx(s.content),
      icon: clsx(s.icon),
      label: clsx(s.label, disabled && s.disabled),
      placeholder: clsx(s.placeholder),
      trigger: clsx(s.trigger, s[variant], s[`${variant}Paddings`], className),
      viewport: clsx(s.fullWidth),
    }

    return (
      <Root disabled={disabled} onValueChange={onValueChange} open={open} value={value} {...rest}>
        {label && (
          <Typography as={'label'} className={classNames.label} variant={'body2'}>
            {label}
          </Typography>
        )}
        <Trigger className={classNames.trigger} ref={ref}>
          <Value className={classNames.placeholder} placeholder={items[0]} />
          <Icon asChild className={classNames.icon}>
            <ArrowMiniDownIcon disabled={disabled} />
          </Icon>
        </Trigger>
        <Portal>
          <Content className={classNames.content} position={'popper'} ref={ref}>
            <Viewport className={classNames.viewport}>
              <Group>
                {items.map(item => (
                  <SelectItem key={item} title={item} value={item} variant={variant}>
                    {item}
                  </SelectItem>
                ))}
              </Group>
            </Viewport>
          </Content>
        </Portal>
      </Root>
    )
  }
)
