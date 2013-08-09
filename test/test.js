var assert = require('assert')
var path = require('path')
var hashd = require('../index')

var basepath = path.join(__dirname, 'fixtures')
console.log('\nhasing %s', basepath)
var basehash = hashd(basepath)

var pathA = path.join(basepath, 'a')
console.log('\nhasing %s', pathA)
var hashA = hashd(pathA)

var pathB = path.join(basepath, 'b')
console.log('\nhasing %s', pathB)
var hashB = hashd(pathB)

assert.notEqual(basehash, hashA)
assert.notEqual(basehash, hashB)
assert.notEqual(hashB, hashA)

var ignorePattern1 = ["a", ".ignore-a", ".ignore-b"]
console.log('\nhashing %s (patterns: %j)', basepath, ignorePattern1)

var basehashIgnorePatternA = hashd(basepath, { patterns: ignorePattern1 })
assert.notEqual(basehash, basehashIgnorePatternA, 'The base hash should be different from the hash that excludes directory `A`.')
assert.equal(basehashIgnorePatternA, hashB, 'The hash excluding directory `A` should be the same as the hash on directory `B`.')

var ignorePattern2 = ["b", ".ignore-a", ".ignore-b"]
console.log('\nhashing %s (patterns: %j)', basepath, ignorePattern2)

var basehashIgnorePatternB = hashd(basepath, { patterns: ignorePattern2 })
assert.notEqual(basehash, basehashIgnorePatternB, 'The base hash should be different from the hash that excludes directory `B`.')
assert.equal(basehashIgnorePatternB, hashA, 'The hash excluding directory `B` should be the same as the hash on directory `A`.')

var ignoreFiles1 = ['.ignore-a']
var ignorePattern3 = ['.ignore-b', '.ignore-a'] // use a file's globs but also ignore the file itself
console.log('\nhashing %s (patterns: %j, files: %j)', basepath, ignoreFiles1, ignorePattern3)

var basehashIgnoreFileA = hashd(basepath, { files: ignoreFiles1, patterns: ignorePattern3 })
assert.notEqual(basehash, basehashIgnoreFileA, 'The base hash should be different from the hash that excludes directory `A`.')
assert.equal(basehashIgnoreFileA, hashB, 'The hash excluding directory `A` should be the same as the hash on directory `B`.')
