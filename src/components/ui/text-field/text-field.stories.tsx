import { Provider } from 'react-redux'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { TextField } from './text-field'

const withProvider = (Story: React.FC) => (
  <Provider store={store}>
    <Story />
  </Provider>
)

const meta = {
  component: TextField,
  decorators: [withProvider],
  tags: ['autodocs'],
  title: 'Components/TextField',
} satisfies Meta<typeof TextField>

export default meta

type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {
    label: 'Default',
    placeholder: 'Default',
  },
}

export const Error: Story = {
  args: {
    errorMessage: 'Error',
    label: 'Error',
    placeholder: 'Error',
    type: 'text',
  },
}
export const Password: Story = {
  args: {
    label: 'Password',
    placeholder: 'Password',
    type: 'password',
  },
}

export const Search: Story = {
  args: {
    label: 'Search',
    placeholder: 'Search . . . ',
    type: 'search',
  },
}

export const Disabled: Story = {
  args: {
    disabled: true,
    label: 'Disabled',
    placeholder: 'Disabled',
    type: 'text',
  },
}
