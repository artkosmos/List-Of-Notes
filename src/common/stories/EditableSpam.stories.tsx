import type { Meta, StoryObj } from '@storybook/react'
import { action } from '@storybook/addon-actions'
import { EditableSpan } from 'common/components/EditableSpan/EditableSpan'

const meta: Meta = {
  title: 'TODOLIST/EditableSpan',
  component: EditableSpan,
  tags: ['autodocs'],
  argTypes: {
    // описание пропсов
    oldTitle: { description: 'title from data' },
    callBack: { description: 'function which change new title in data' },
  },
  args: {
    // можно задавать начальные аргументы для всех историй
    oldTitle: 'JavaScript',
    callBack: action('update title'),
  },
}

export default meta
type Story = StoryObj<typeof meta>

export const EditableSpanStory: Story = {}
