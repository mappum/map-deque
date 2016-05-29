'use strict'

const old = require('old')

class MapDeque {
  constructor () {
    this.queue = []
    this.map = {}
    this.length = 0
  }

  _put (key, value, push) {
    key = this._convertKey(key)
    if (this.has(key)) {
      throw new Error(`A value with the key "${key}" already exists`)
    }
    this.map[key] = value
    this.queue[push ? 'push' : 'unshift']({ key, value })
    return this
  }
  push (key, value) { return this._put(key, value, true) }
  unshift (key, value) { return this._put(key, value, false) }

  _get (shift) {
    if (this.queue.length === 0) return
    var { key, value } = this.queue[shift ? 'shift' : 'pop']()
    delete this.map[key]
    return value
  }
  shift () { return this._get(true) }
  pop () { return this._get(false) }

  has (key) {
    key = this._convertKey(key)
    return this.map.hasOwnProperty(key)
  }

  _convertKey (key) {
    return key + ''
  }
}

module.exports = old(MapDeque)
