import { render, screen } from '@testing-library/react'
import { Introduction } from '@/components/Molecules/About/Introduction'

jest.mock('next/router', () => ({
  useRouter() {
    return {
      locale: 'en',
    }
  },
}))

describe('英語での表示テスト', () => {
  test('作者が英語で表示されているか', () => {
    render(<Introduction t={(key) => key} />)
    expect(screen.getByText('Ayu Nakata', { exact: false })).toBeInTheDocument()
  })
})
