# SYNOPSIS
recursively hash all the files in a specified path. Sync to ensure 
hashing happens in the same order every time.

# USAGE
Uses `sha1` by default, use `openssl list-message-digest-algorithms`
for a list of supported algorithms. Appreciates `.ignore` files/globs.

### Use as a lib
```js
var hashd = require('hashd')
var opts = { algorithm: 'md5', ignore: ['.gitignore', '.npmignore'] }
var hash = hashd('./path/to/files', opts)
console.log(hash)
```

### Use from the cli
```bash
npm install hashd -g
hashd ./path/to/files --algorithm sha1 --ignore '.gitignore .npmignore'
```

## OPTIONS
CLI options and api options are the same. First argument is always a path.
