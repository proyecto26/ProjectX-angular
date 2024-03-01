import type { Meta, StoryObj } from '@storybook/angular';
import { ThemeButtonComponent } from './theme-button.component';

import { within } from '@storybook/testing-library';
import { expect } from '@storybook/jest';

const meta: Meta<ThemeButtonComponent> = {
  component: ThemeButtonComponent,
  title: 'ThemeButtonComponent',
};
export default meta;
type Story = StoryObj<ThemeButtonComponent>;

export const Primary: Story = {
  args: {
    theme: 'light',
  },
};

export const Heading: Story = {
  args: {
    theme: 'light',
  },
  play: async ({ canvasElement }) => {
    const canvas = within(canvasElement);
    expect(canvas.getByText(/theme-button works!/gi)).toBeTruthy();
  },
};
