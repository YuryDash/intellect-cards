import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { Header } from '@/components/ui/header/header'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Header,
  decorators: [story => <Provider store={store}>{story()}</Provider>],
  tags: ['autodocs'],
  title: 'Components/Header',
} satisfies Meta<typeof Header>

export default meta
type Story = StoryObj<typeof meta>

// @ts-ignore
export const DesktopHeaderStory: Story = () => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Header />
      </MemoryRouter>
    </Provider>
  )
}
