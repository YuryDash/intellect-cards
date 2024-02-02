import { PacksList } from '@/feature/packs-list/packs-list'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: PacksList,
  tags: ['autodocs'],
  title: 'Feature/PacksList',
} satisfies Meta<typeof PacksList>

export default meta
type Story = StoryObj<typeof meta>

export const Default: Story = {
  args: {},
}
