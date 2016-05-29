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
    this.length++
    return this
  }
  push (key, value) { return this._put(key, value, true) }
  unshift (key, value) { return this._put(key, value, false) }

  _remove (shift, entry) {
    if (this.length === 0) return
    var { key, value } = this.queue[shift ? 'shift' : 'pop']()
    delete this.map[key]
    this.length--
    return entry ? { key, value } : value
  }
  shift (entry) { return this._remove(true, entry) }
  pop (entry) { return this._remove(false, entry) }

  has (key) {
    key = this._convertKey(key)
    return this.map.hasOwnProperty(key)
  }

  get (key) {
    key = this._convertKey(key)
    return this.map[key]
  }

  _convertKey (key) {
    return key + ''
  }
}

module.exports = old(MapDeque)
