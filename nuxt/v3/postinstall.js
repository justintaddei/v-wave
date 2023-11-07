const fs = require('fs')
const path = require('path')

const pkg = require(path.join(process.env.INIT_CWD, 'package.json'))

const nuxtVersion = pkg.dependencies?.nuxt ?? pkg.devDependencies?.nuxt

if (!nuxtVersion || /2\.\d+\.\d+/.test(nuxtVersion)) {
  process.exit(0)
}

if (!fs.existsSync(path.join(process.env.INIT_CWD, 'plugins'))) {
  fs.mkdirSync(path.join(process.env.INIT_CWD, 'plugins'))
}

try {
  fs.copyFileSync(
    path.join(__dirname, 'v-wave.client.ts'),
    path.join(process.env.INIT_CWD, 'plugins', 'v-wave.client.ts'),
    fs.constants.COPYFILE_EXCL
  )
  fs.copyFileSync(
    path.join(__dirname, 'v-wave.server.ts'),
    path.join(process.env.INIT_CWD, 'plugins', 'v-wave.server.ts'),
    fs.constants.COPYFILE_EXCL
  )
} catch (e) {
  process.exit(0)
}
