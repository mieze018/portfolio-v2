/** 引数。エクスプローラーからD&Dで受け取る。
 * 例: WIndows `C:\Users\Public\Documents\Git\user\repo\components\Molecules\About\EventHistory.tsx`
 * or Mac `/Users/user/Documents/Git/repo/components/Molecules/About/EventHistory.tsx`
 * @type {string} */
const fullPath = process.argv[2]
if (!fullPath) {
  console.error('コンポーネントのパスを引数として渡してください。')
  process.exit(1)
}
console.log('fullPath', fullPath)
/** コンポーネントが格納されているディレクトリの相対パス。
 * @type {string} */
const componentsDir = 'components'

/** ファイル名を取得する。
 * 例: `EventHistory`
 * @type {string} */
const splitChar = process.platform === 'win32' ? '\\' : '/'
const componentName = fullPath.split(splitChar).pop().replace('.tsx', '')

/** fullPathから`componentsDir`以降のディレクトリを取得する。
 * 例: `Molecules/About/`
 * @type {string} */
const relativeDir = fullPath
  .split(componentsDir)
  .pop()
  .replace(componentName + '.tsx', '')

const fs = require('fs')
const path = require('path')

// ディレクトリが存在しなければ中止
if (!fs.existsSync(componentsDir)) {
  console.error('コンポーネントが格納されているディレクトリが存在しません。')
  process.exit(1)
}
// テンプレートの作成
const createStoryTemplate = () => `
import { expect } from '@storybook/jest'
import { userEvent, waitFor, within } from '@storybook/testing-library'
import type { Meta, StoryObj } from '@storybook/react'
import { ${componentName} } from './${componentName}'

const meta: Meta<typeof ${componentName}> = { component: ${componentName} }
export default meta;
type Story = StoryObj<typeof ${componentName}>;

export const Default:Story = { args: { children: '${componentName}' } }
Default.play = async ({ canvasElement }) => {
  const canvas = within(canvasElement)
  const body =  within(canvasElement.parentNode as HTMLElement) // 内容がPortalなのでルートの親から探す
};

export const Hover= { ...Default, parameters: { pseudo: { hover: true } } }
export const Focus= { ...Default, parameters: { pseudo: { focus: true } } }
export const Active= { ...Default, parameters: { pseudo: { active: true } } }
export const FocusVisible= { ...Default, parameters: { pseudo: { focusVisible: true } } }
`

const createMdxTemplate = () => `
import { Meta, ArgsTable } from '@storybook/blocks'
import { ${componentName} } from './${componentName}'
import * as ${componentName}Stories from './${componentName}.stories'

<Meta of={${componentName}} />

# ${componentName}

<ArgsTable of={${componentName}} />
`

const storiesPath = path.join(componentsDir, relativeDir, `${componentName}.stories.tsx`)
const mdxPath = path.join(componentsDir, relativeDir, `${componentName}.mdx`)

// Storiesファイルを作成する
const createStories = () => fs.writeFileSync(storiesPath, createStoryTemplate(componentName))

// MDXファイルを作成する
const createMdx = () => fs.writeFileSync(mdxPath, createMdxTemplate(componentName))

//作成したファイルを開く

const openFile = () => {
  const exec = require('child_process').exec
  exec(`code ${storiesPath} ${mdxPath}`)
}
//ファイルが既に存在する場合は中止
if (fs.existsSync(storiesPath)) {
  console.error('storiesファイルが既に存在します。')
} else createStories()
if (fs.existsSync(mdxPath)) {
  console.error('mdxファイルが既に存在します。')
} else createMdx()

openFile()
