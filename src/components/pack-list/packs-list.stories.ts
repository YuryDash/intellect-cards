import picture from '@/assets/picture.png'
import { PacksList } from '@/components/pack-list/packs-list'
import { Meta, StoryObj } from '@storybook/react'

const meta = {
  component: PacksList,
  tags: ['autodocs'],
  title: 'Сomponents/Pack-List',
} satisfies Meta<typeof PacksList>

export default meta
type Story = StoryObj<typeof meta>

export const AddPack: Story = {
  args: {
    isPack: true,
    nameButton: 'Add New Pack',
    title: 'Add New Pack',
  },
}

export const AddPackWithPicture: Story = {
  args: {
    img: picture,
    isPack: true,
    nameButton: 'Add New Pack',
    title: 'Add New Pack',
  },
}

export const EditPack: Story = {
  args: {
    isPack: true,
    nameButton: 'Save Changes',
    title: 'Edit Pack',
  },
}

export const DeletePack: Story = {
  args: {
    deletePack: true,
    isPack: true,
    nameButton: 'Delete Pack',
    title: 'Delete Pack',
  },
}

export const AddNewCard: Story = {
  args: {
    nameButton: 'Add New Card',
    title: 'Add New Card',
  },
}

export const AddCardWithPicture: Story = {
  args: {
    img: picture,
    nameButton: 'Add New Card',
    title: 'Add New Card',
  },
}

export const EditCard: Story = {
  args: {
    nameButton: 'Edit Card',
    title: 'Save Changes',
  },
}

export const DeleteCard: Story = {
  args: {
    deletePack: true,
    nameButton: 'Delete Card',
    title: 'Delete Card',
  },
}
