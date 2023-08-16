import { capitalizeFirstLetter } from "./capitalizeFirstLetter"

describe('Utils: CapitalizeFirstLetter', () => {
  it('shold be return a Capitalized Letter', () => {
    const response = capitalizeFirstLetter('aRroz')

    expect(response).toBe('Arroz')
  })
})