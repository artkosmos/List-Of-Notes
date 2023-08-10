/*
import type {Meta, StoryObj} from '@storybook/react';
import {action} from '@storybook/addon-actions'
import {Task} from './Task'

const meta: Meta = {
  title: 'TODOLIST/Task',
  component: Task,
  tags: ['autodocs'],
  argTypes: {},
  args: {},  // можно задавать начальные аргументы для всех историй
}

export default meta;
type Story = StoryObj<typeof meta>;

export const TaskIsDoneStory: Story = {
  args: {
    task: {id: 1, title: 'JavaScript', isDone: true},
    changeStatus: action('change status of checkbox'),
    removeTask: action('delete task'),
    updateTask: action('change title of task')
  },
}

export const TaskIsNotDoneStory: Story = {
  args: {
    ...TaskIsDoneStory.args,
    task: {id: 1, title: 'HTML/CSS', isDone: false},
  },
}

*/
