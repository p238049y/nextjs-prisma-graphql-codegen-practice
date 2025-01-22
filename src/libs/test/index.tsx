import { MockedProvider } from '@apollo/client/testing'
import { FC, ReactElement, ReactNode } from 'react'
import { mocks } from './mock'
import { render } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import type { RenderOptions } from '@testing-library/react'

const AllTheProviders: FC<{ children: ReactNode }> = ({ children }) => {
  return <MockedProvider mocks={mocks}>{children}</MockedProvider>
}

const customRender = (
  ui: ReactElement,
  options?: Omit<RenderOptions, 'wrapper'>
) => ({
  user: userEvent.setup(),
  ...render(ui, { wrapper: AllTheProviders, ...options }),
})

export { customRender }
