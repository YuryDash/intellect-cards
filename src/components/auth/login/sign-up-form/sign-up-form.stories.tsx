import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

import { FormValues, SignUp } from './sign-up'

const meta = {
  component: SignUp,
  tags: ['autodocs'],
  title: 'Auth/Sign-Up',
} satisfies Meta<typeof SignUp>

export default meta
type Story = StoryObj<typeof meta>

export const SignUpStory: Story = (args: any) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <SignUp {...args} />
      </MemoryRouter>
    </Provider>
  )
}
SignUpStory.args = {
  isSubmitting: false,
  onSubmit: async (data: FormValues) => {
    alert(`
    email: ${data.email},
    password: ${data.password},
    confirmPassword: ${data.confirmPassword}
    `)
  },
}
