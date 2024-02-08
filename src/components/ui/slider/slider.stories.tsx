import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'

import { Slider, SliderPropsType } from '@/components/ui/slider/slider'
import { store } from '@/services/store'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: Slider,
  tags: ['autodocs'],
  title: 'Components/Slider',
} satisfies Meta<typeof Slider>

export default meta
type Story = StoryObj<typeof meta>

export const SliderStory: Story = (args: SliderPropsType) => {
  return (
    <Provider store={store}>
      <MemoryRouter>
        <Slider {...args} />
      </MemoryRouter>
    </Provider>
  )
}
SliderStory.args = {
  handleCardsCountChange: () => {},
  max: 10,
  min: 0,
  values: [0, 10],
}
