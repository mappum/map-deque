var test = require('tape')
var MapDeque = require('../lib')

test('constructor', function (t) {
  t.test('normal constructor', function (t) {
    var md = new MapDeque()
    t.ok(md instanceof MapDeque, 'got MapDeque')
    t.equal(md.length, 0, 'md has length 0')
    t.equal(md.shift(), undefined, 'shift returns undefined')
    t.equal(md.pop(), undefined, 'pop returns undefined')
    t.end()
  })
  t.test('constructor without "new"', function (t) {
    var md = MapDeque()
    t.ok(md instanceof MapDeque, 'got MapDeque')
    t.equal(md.length, 0, 'md has length 0')
    t.equal(md.shift(), undefined, 'shift returns undefined')
    t.equal(md.pop(), undefined, 'pop returns undefined')
    t.end()
  })
})

test('push/unshift', function (t) {
  t.test('push', function (t) {
    var md = new MapDeque()
    t.test('simple push', function (t) {
      md.push('foo', 'bar')
      t.equal(md.length, 1, 'md has length 1')
      t.end()
    })
    t.test('duplicate push', function (t) {
      try {
        md.push('foo', 'bar2')
        t.fail('show have thrown error')
      } catch (err) {
        t.ok(err, 'error thrown')
        t.equal(err.message, 'A value with the key "foo" already exists', 'correct error message')
      }
      t.equal(md.length, 1, 'md has length 1')
      t.equal(md.get('foo'), 'bar', 'correct value')
      t.end()
    })
    t.test('second push', function (t) {
      md.push('foo2', 'bar2')
      t.equal(md.length, 2, 'md has length 2')
      t.equal(md.get('foo2'), 'bar2', 'correct value')
      t.equal(md.get('foo'), 'bar', 'correct existing value')
      t.equal(md.shift(), 'bar', 'correct insertion order')
      t.equal(md.shift(), 'bar2', 'correct insertion order')
      t.end()
    })
    t.test('push with nonstring key', function (t) {
      md.push(5, 'baz')
      t.equal(md.length, 1, 'md has length 2')
      t.equal(md.get(5), 'baz', 'correct value')
      t.equal(md.get('5'), 'baz', 'correct value')
      t.end()
    })
    t.end()
  })
  t.test('unshift', function (t) {
    var md = new MapDeque()
    t.test('simple unshift', function (t) {
      md.unshift('foo', 'bar')
      t.equal(md.length, 1, 'md has length 1')
      t.end()
    })
    t.test('duplicate unshift', function (t) {
      try {
        md.unshift('foo', 'bar2')
        t.fail('show have thrown error')
      } catch (err) {
        t.ok(err, 'error thrown')
        t.equal(err.message, 'A value with the key "foo" already exists', 'correct error message')
      }
      t.equal(md.length, 1, 'md has length 1')
      t.equal(md.get('foo'), 'bar', 'correct value')
      t.end()
    })
    t.test('second unshift', function (t) {
      md.unshift('foo2', 'bar2')
      t.equal(md.length, 2, 'md has length 2')
      t.equal(md.get('foo2'), 'bar2', 'correct value')
      t.equal(md.get('foo'), 'bar', 'correct existing value')
      t.equal(md.shift(), 'bar2', 'correct insertion order')
      t.equal(md.shift(), 'bar', 'correct insertion order')
      t.end()
    })
    t.end()
  })
})

test('shift/pop', function (t) {
  t.test('shift', function (t) {
    var md = new MapDeque()
    md.push('foo', 'bar')
    md.push('foo2', 'bar2')
    t.test('simple shift', function (t) {
      var value = md.shift()
      t.equal(value, 'bar', 'correct value')
      t.equal(md.length, 1, 'correct length')
      t.end()
    })
    t.test('entry shift', function (t) {
      var entry = md.shift(true)
      t.equal(entry.value, 'bar2', 'correct value')
      t.equal(entry.key, 'foo2', 'correct key')
      t.equal(md.length, 0, 'correct length')
      t.end()
    })
    t.test('shift when empty', function (t) {
      var value = md.shift()
      t.equal(value, undefined, 'correct value')
      t.equal(md.length, 0, 'correct length')
      t.end()
    })
    t.test('entry shift when empty', function (t) {
      var entry = md.shift(true)
      t.equal(entry, undefined, 'correct value')
      t.equal(md.length, 0, 'correct length')
      t.end()
    })
    t.end()
  })
  t.test('pop', function (t) {
    var md = new MapDeque()
    md.push('foo', 'bar')
    md.push('foo2', 'bar2')
    t.test('simple pop', function (t) {
      var value = md.pop()
      t.equal(value, 'bar2', 'correct value')
      t.equal(md.length, 1, 'correct length')
      t.end()
    })
    t.test('entry pop', function (t) {
      var entry = md.pop(true)
      t.equal(entry.value, 'bar', 'correct value')
      t.equal(entry.key, 'foo', 'correct key')
      t.equal(md.length, 0, 'correct length')
      t.end()
    })
    t.test('pop when empty', function (t) {
      var value = md.pop()
      t.equal(value, undefined, 'correct value')
      t.equal(md.length, 0, 'correct length')
      t.end()
    })
    t.test('entry pop when empty', function (t) {
      var entry = md.pop(true)
      t.equal(entry, undefined, 'correct value')
      t.equal(md.length, 0, 'correct length')
      t.end()
    })
    t.end()
  })
})

test('has/get', function (t) {
  var md = new MapDeque()
  md.push('foo', 'bar')
  md.push('foo2', 'bar2')
  t.test('has', function (t) {
    t.test('existing has', function (t) {
      t.equal(md.has('foo'), true, 'correct value')
      t.end()
    })
    t.test('nonexisting has', function (t) {
      t.equal(md.has('foobar'), false, 'correct value')
      t.end()
    })
    t.end()
  })
  t.test('get', function (t) {
    t.test('existing get', function (t) {
      t.equal(md.get('foo'), 'bar', 'correct value')
      t.end()
    })
    t.test('nonexisting get', function (t) {
      t.equal(md.get('foobar'), undefined, 'correct value')
      t.end()
    })
    t.end()
  })
  t.test('after removal', function (t) {
    md.shift()
    t.equal(md.get('foo'), undefined, 'correct get value')
    t.equal(md.get('foo2'), 'bar2', 'correct get value')
    t.equal(md.has('foo'), false, 'correct has value')
    t.equal(md.has('foo2'), true, 'correct has value')
    t.end()
  })
})
