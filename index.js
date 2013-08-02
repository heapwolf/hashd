var crypto = require('crypto')
var fs = require('fs')
var path = require('path')
var uniq = require('uniq')
var Minimatch = require("minimatch").Minimatch

function hashd(p, opts) {

  var shasum = crypto.createHash(opts.algorithm || 'sha1')
  var rules = []

  if (opts.ignores && !Array.isArray(opts.ignores)) {
    opts.ignores = opts.ignores.split(' ')
  }

  if (opts.ignores) {
    opts.ignores.forEach(function(file) {

      var set

      try {
        set = fs.readFileSync(path.join(p, file)).toString().split(/\r?\n/)
      }
      catch (ex) {
        return
      }

      set = set.filter(function (s) {
        s = s.trim()
        return s && !s.match(/^#/)
      })

      set.forEach(function(r) {
        rules.push(r)
      })
    })

    rules = uniq(rules)
  }

  var mmopt = { matchBase: true, dot: true, flipNegate: true }

  var mm = {}

  rules.map(function (s) {
    if (s[s.length] === '/') {
      s = s.slice(0, -1)
    }
    mm[s] = new Minimatch(s, mmopt)
  })

  function read(p) {

    var items = fs.readdirSync(p)

    items.forEach(function(item) {

      var d = path.join(p, item)

      if (Object.keys(mm).some(function(m) {
        if (m.match(item)) {
          return true
        }
      })) {
        return true
      }

      var stat = fs.statSync(d)

      if (stat.isDirectory()) {
        return read(d)
      }
      shasum.update(fs.readFileSync(d, { encoding: 'utf8' }))
    })
  }

  read(p)
  return shasum.digest('hex')
}

module.exports = hashd
