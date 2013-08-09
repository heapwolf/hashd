var crypto = require('crypto')
var fs = require('fs')
var path = require('path')
var uniq = require('uniq')
var Minimatch = require("minimatch").Minimatch

function hashd(p, opts) {

  var opts = opts || {}
  var shasum = crypto.createHash(opts.algorithm || 'sha1')
  var rules = []

  // todo, parse cmdline files as CSV?
  if (opts.files && !Array.isArray(opts.files)) {
    opts.files = opts.files.split(' ')
  }

  if (opts.files) {
    opts.files.forEach(function(file) {

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

  // todo, parse cmdline patterns as CSV?
  if (opts.patterns && !Array.isArray(opts.patterns)) {
    opts.patterns = opts.patterns.split(' ')
  }

  if (opts.patterns) {
    rules = rules.concat(opts.patterns)
    rules = uniq(rules)
  }

  var mmopt = { matchBase: true, dot: true, flipNegate: true }
  var mm = {}

  rules.map(function (s) {
    mm[s] = new Minimatch(s, mmopt)
  })

  function read(p) {

    var items = fs.readdirSync(p)

    items.forEach(function(item) {

      var d = path.join(p, item)
      var isDirectory = fs.statSync(d).isDirectory()

      if (Object.keys(mm).some(function(m) {

        if (isDirectory) {
          item = item + '/'
        }

        if (mm[m].match(item)) {
          return true
        }
      })) {
        return true
      }
      console.log(d)

      if (isDirectory) {
        return read(d)
      }
      shasum.update(fs.readFileSync(d, { encoding: 'utf8' }))
    })
  }

  read(p)
  return shasum.digest(opts.encoding || 'hex')
}

module.exports = hashd
