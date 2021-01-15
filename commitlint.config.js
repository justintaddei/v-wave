module.exports = {
  extends: ['@commitlint/config-conventional'],
  rules: {
    'body-max-length': [0],
    'body-max-line-length': [0]
  },
  ignores: [
    (commit) => {
      return /^WIP(:\s(.|\n)+)?$/.test(commit.trim())
    }
  ]
}
