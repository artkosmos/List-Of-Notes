import type { Meta, StoryObj } from "@storybook/react"
import AppRedux from "./AppRedux"
import { ReduxStoreProviderDecorator } from "./store/ReduxStoreProviderDecorator"

const meta: Meta = {
  title: "TODOLIST/AppRedux",
  component: AppRedux,
  tags: ["autodocs"],
  decorators: [ReduxStoreProviderDecorator],
}

export default meta
type Story = StoryObj<typeof meta>

export const AppReduxStory: Story = {}
