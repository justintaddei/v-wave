module.exports = function (...args) {
  return import('./index.mjs').then((m) => m.default.call(this, ...args))
}
const _meta = (module.exports.meta = require('./meta.json'))
module.exports.getMeta = () => Promise.resolve(_meta)
