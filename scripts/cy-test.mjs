import { spawn } from 'node:child_process'

const PORT = 3009
const SERVER_URL = `http://127.0.0.1:${PORT}`
const STARTUP_TIMEOUT_MS = 60_000

function runCommand(command, args, options = {}) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      stdio: 'inherit',
      shell: process.platform === 'win32',
      ...options,
    })

    child.on('error', reject)
    child.on('exit', (code, signal) => {
      if (code === 0) {
        resolve()
        return
      }

      reject(
        new Error(
          `${command} ${args.join(' ')} failed with ${signal ? `signal ${signal}` : `exit code ${code}`}`
        )
      )
    })
  })
}

function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}

async function isServerReady() {
  try {
    const response = await fetch(SERVER_URL, { redirect: 'manual' })
    return response.status < 500
  } catch {
    return false
  }
}

async function waitForServer() {
  const startedAt = Date.now()

  while (Date.now() - startedAt < STARTUP_TIMEOUT_MS) {
    if (await isServerReady()) {
      return
    }

    await sleep(1_000)
  }

  throw new Error(`Timed out waiting for ${SERVER_URL}`)
}

function collectPidsFromText(text) {
  const pids = new Set()

  for (const line of text.split(/\r?\n/)) {
    if (!line.includes(`:${PORT}`)) {
      continue
    }

    const matches = line.match(/\b(\d+)\b/g)
    if (!matches || matches.length === 0) {
      continue
    }

    pids.add(matches[matches.length - 1])
  }

  return [...pids]
}

async function execForOutput(command, args) {
  return new Promise((resolve, reject) => {
    const child = spawn(command, args, {
      shell: process.platform === 'win32',
      windowsHide: true,
    })
    let stdout = ''
    let stderr = ''

    child.stdout.on('data', (data) => {
      stdout += data.toString()
    })

    child.stderr.on('data', (data) => {
      stderr += data.toString()
    })

    child.on('error', reject)
    child.on('exit', (code) => {
      resolve({ code, stdout, stderr })
    })
  })
}

async function killProcessOnPort() {
  const lookup =
    process.platform === 'win32'
      ? await execForOutput('netstat', ['-ano'])
      : await execForOutput('lsof', ['-ti', `tcp:${PORT}`])

  const pids =
    process.platform === 'win32'
      ? collectPidsFromText(lookup.stdout)
      : lookup.stdout
          .split(/\r?\n/)
          .map((line) => line.trim())
          .filter(Boolean)

  for (const pid of pids) {
    const killCommand = process.platform === 'win32' ? 'taskkill' : 'kill'
    const killArgs = process.platform === 'win32' ? ['/F', '/PID', pid] : ['-9', pid]

    try {
      await runCommand(killCommand, killArgs, { stdio: 'ignore' })
    } catch {
      // 競合しやすいので、既に終了していた場合は握りつぶす
    }
  }
}

async function main() {
  await killProcessOnPort()
  await runCommand('yarn', ['build'])

  const serverProcess = spawn('yarn', ['next', 'start', '--port', String(PORT)], {
    stdio: 'inherit',
    shell: process.platform === 'win32',
  })

  const cleanup = async () => {
    serverProcess.kill(process.platform === 'win32' ? undefined : 'SIGTERM')
    await killProcessOnPort()
  }

  try {
    await waitForServer()
    await runCommand('yarn', ['exec', 'cypress', 'run', '--browser', 'chrome'])
  } finally {
    await cleanup()
  }
}

main().catch(async (error) => {
  console.error(error)
  await killProcessOnPort()
  process.exit(1)
})
