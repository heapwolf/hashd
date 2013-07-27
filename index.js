var crypto = require('crypto')
var fs = require('fs')
var path = require('path')
var ignore = require('fstream-ignore')

function hashd(path, opts, callback) {

  var shasum = crypto.createHash(opts.algorithm || 'sha1')

  if (opts.ignores && !Array.isArray(opts.ignores)) {
    opts.ignores = opts.ignores.split(' ')
  }

  ignore({ path: path, ignoreFiles: opts.ignores })
    .on('child', function (child) {
      if (child.type !== 'Directory') {
        shasum.update(fs.readFileSync(child.path).toString('utf8'))
      }
    })
    .on('error', function(err) {
      console.log(err)
    })
    .on('end', function() {
      callback(null, shasum.digest('hex'))
    })
  ;
}

module.exports = hashd
