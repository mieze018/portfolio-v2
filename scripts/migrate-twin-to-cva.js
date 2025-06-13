#!/usr/bin/env node

/**
 * twin.macro → CVA + Tailwind 移行支援スクリプト
 *
 * 使用法:
 * node scripts/migrate-twin-to-cva.js [ファイルパス]
 */

const fs = require('fs')
const path = require('path')

// 移行パターンの定義
const migrationPatterns = [
  {
    // tw.div`classes` → cva + component pattern
    from: /import tw from 'twin\.macro'/g,
    to: `import { cva } from 'class-variance-authority'
import { cn } from 'libs/utils'`,
  },
  {
    // tw.element`classes` パターン
    from: /const\s+(\w+)\s*=\s*tw\.(\w+)`([^`]+)`/g,
    to: (match, componentName, element, classes) => {
      const variantName = componentName.toLowerCase() + 'Variants'
      return `const ${variantName} = cva('${classes.trim()}')

export const ${componentName} = ({ className, ...props }: React.HTMLAttributes<HTML${
        element.charAt(0).toUpperCase() + element.slice(1)
      }Element>) => (
  <${element} className={cn(${variantName}(), className)} {...props} />
)`
    },
  },
  {
    // tw="classes" → className pattern
    from: /tw="([^"]+)"/g,
    to: 'className="$1"',
  },
]

function migrateFile(filePath) {
  try {
    let content = fs.readFileSync(filePath, 'utf8')

    migrationPatterns.forEach((pattern) => {
      if (typeof pattern.to === 'function') {
        content = content.replace(pattern.from, pattern.to)
      } else {
        content = content.replace(pattern.from, pattern.to)
      }
    })

    fs.writeFileSync(filePath, content)
    console.log(`✅ 移行完了: ${filePath}`)
  } catch (error) {
    console.error(`❌ エラー: ${filePath}`, error.message)
  }
}

// コマンドライン引数の処理
const targetPath = process.argv[2]

if (!targetPath) {
  console.log('使用法: node scripts/migrate-twin-to-cva.js <ファイルパス>')
  process.exit(1)
}

if (fs.statSync(targetPath).isDirectory()) {
  // ディレクトリの場合、再帰的に処理
  const files = fs
    .readdirSync(targetPath, { recursive: true })
    .filter((file) => file.endsWith('.tsx') || file.endsWith('.ts'))
    .map((file) => path.join(targetPath, file))

  files.forEach(migrateFile)
} else {
  // 単一ファイルの場合
  migrateFile(targetPath)
}

console.log('🎉 移行スクリプト完了！')
