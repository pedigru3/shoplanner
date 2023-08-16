import { render, screen } from '@testing-library/react-native'
import { Button } from '.'
import { ThemeProvider } from 'styled-components/native'
import theme from '@theme/index'

describe('Component: Button', () => {
  it('shold be render wihout Loading', async () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <Button title='Clique aqui' />
      </ThemeProvider>
    )
    const activityIndicator = screen.queryByTestId('activity-indicator')

    expect(activityIndicator).toBeNull()
  })

  it('shold be render with Loading', async () => {
    const { debug } = render(
      <ThemeProvider theme={theme}>
        <Button title='Clique aqui' isLoading />
      </ThemeProvider>
    )
    const activityIndicator = screen.queryByTestId('activity-indicator')

    expect(activityIndicator).toBeTruthy()
  })
})