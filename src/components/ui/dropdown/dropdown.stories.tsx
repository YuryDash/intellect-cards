import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { Dropdown, DropdownProps } from '@/components/ui/dropdown/dropdown'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Dropdown,
  tags: ['autodocs'],
  title: 'Components/Dropdown',
} satisfies Meta<typeof Dropdown>

export default meta
type Story = StoryObj<typeof meta>

const user = {
  avatar: 'https://ionicframework.com/docs/img/demos/avatar.svg',
  created: '2024-01-06',
  email: 'IvanMain@gmail.com',
  id: '1',
  isEmailVerified: false,
  name: 'Ivan Pizdorvan',
  updated: '2024-01-06',
}

export const DropdownWithAvatar: Story = (args: DropdownProps) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Dropdown {...args} />
      </MemoryRouter>
    </Provider>
  )
}

export const DropdownWithoutAvatar: Story = (args: DropdownProps) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Dropdown {...args} />
      </MemoryRouter>
    </Provider>
  )
}

DropdownWithAvatar.args = {
  align: 'center',
  story: true,
  userData: user,
}
DropdownWithoutAvatar.args = {
  align: 'center',
  story: true,
}
