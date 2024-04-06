import type { Meta, StoryObj } from '@storybook/react'

import { Header } from './'

import { Logo } from '@/assets'
import { Button } from '@/components/ui'
import { NameWithAvatar } from '@/components/ui/nameWithAvatar/nameWithAvatar.tsx'

const meta = {
  title: 'Components/Header',
  component: Header,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

export const HeaderWithButton: Story = {
  args: {
    isSignedIn: false,
    children: (
      <>
        <Logo />
        <Button variant={'primary'}>Sign In</Button>
      </>
    ),
  },
}

export const HeaderWithDropDownMenu: Story = {
  args: {
    isSignedIn: true,
    children: (
      <>
        <Logo />
        <NameWithAvatar name={'Ivan'} avatar={'avatar'} />
      </>
    ),
  },
}
