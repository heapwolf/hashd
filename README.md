# SYNOPSIS
hash all the files recursively from a specified path, appreciate .ignore files. uses `sha1` by default.

# USAGE

### Use as a lib
```js
var hashd = require('hashd')
var hash = hashd('./path/to/files', { algorithm: 'md5', ignore: ['.gitignore', '.npmignore'] })
console.log(hash)
```

### Use from the cli
```bash
npm install hashd -g
hashd ./path/to/files --algorithm sha1 --ignore '.gitignore .npmignore'
```
