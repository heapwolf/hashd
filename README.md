# SYNOPSIS
recursively hash all the files in a specified path. Ensure hashing happens 
in a predictable order. Appreciate `.ignore` glob `files` & `patterns`.

# USAGE
Uses `sha1` by default; use `openssl list-message-digest-algorithms`
for a list of supported algorithms.

### Use as a lib
```js
var hashd = require('hashd')
var opts = { algorithm: 'md5', files: ['.gitignore', '.npmignore'], patterns: ['*.txt'] }
var hash = hashd('./path', opts)
console.log(hash)
```

### Use from the cli
```bash
npm install hashd -g
hashd ./path --algorithm sha1 --files '.gitignore .npmignore' --patterns '*.gz'
```

## OPTIONS
CLI options and api options are the same. First argument is a path.
