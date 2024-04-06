import type { Meta, StoryObj } from '@storybook/react'

import { DropDownItem, DropDownMenu } from './'

import { UserIcon, LogOutIcon } from '@/assets'
import { Avatar } from '@/components/ui'

const meta = {
  title: 'Components/DropDownMenu',
  component: DropDownMenu,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof DropDownMenu>

export default meta
type Story = StoryObj<typeof meta>

export const DropDown: Story = {
  render: args => {
    return <DropDownMenu {...args} />
  },
  args: {
    trigger: <Avatar avatar={'avatar'} />,
    children: (
      <>
        <DropDownItem>
          <Avatar avatar={'avatar'} />
          <div>
            <div>Ivan</div>
            <div>j&johnson@gmail.com</div>
          </div>
        </DropDownItem>
        <DropDownItem>
          <UserIcon />
          <div>My profile</div>
        </DropDownItem>
        <DropDownItem>
          <LogOutIcon />
          <div>SignOut</div>
        </DropDownItem>
      </>
    ),
    align: 'start',
  },
}
