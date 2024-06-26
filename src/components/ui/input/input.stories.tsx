import { useState } from 'react'

import type { Meta, StoryObj } from '@storybook/react'

import { Input } from './'

import { EyeIcon, SearchIcon } from '@/assets'

const meta = {
  title: 'Components/Input',
  component: Input,
  tags: ['autodocs'],
  argTypes: {},
} satisfies Meta<typeof Input>

export default meta
type Story = StoryObj<typeof meta>

export const InputStory: Story = {
  args: {
    placeholder: 'Input',
    type: 'text',
  },
}

export const InputStoryWithError: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input with something-wrong',
    errorMessage: 'Error',
    type: 'text',
  },
}

export const InputStoryWithEyeIcon: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input with password',
    inputIcon: `${EyeIcon}`,
    type: 'password',
  },
}

export const InputStoryWithSearchIcon: Story = {
  args: {
    label: 'Input',
    placeholder: 'Input with search',
    inputIcon: `${SearchIcon}`,
    type: 'search',
    value: 'asdasdasd',
  },
}

export const InputStoryDisabled: Story = {
  args: {
    label: 'Input',
    placeholder: 'Just Input',
    inputIcon: `${SearchIcon}`,
    type: 'text',
    disabled: true,
  },
}

export const InputStoryWithSearchIconWithUseState: Story = {
  render: () => {
    const [text, setText] = useState('')

    return (
      <>
        <Input
          value={text}
          onChange={e => setText(e.currentTarget.value)}
          onClearClick={() => setText('')}
          type={'search'}
          inputIcon={'SearchIcon'}
          placeholder={'Input with search'}
        />
      </>
    )
  },
  args: {},
}
