let fs = require('fs')
// let csv = require('fast-csv')
//
// fs.createReadStream('key_value.csv')
//   .pipe(csv())
//   .on('data', function (data) {
//     console.log(data.length)
//   })
//   .on('end', function (data) {
//     console.log('Read done')
//   })

console.log('Started to read file..')

fs.readFile('./key_value.csv', 'utf8', function (err, data) {
  if (err) console.log(err)
  let initData = data.trim().split('\n')
  let output = initData.map(function (line) {
    return line.split(',')
  })
  let obj = output.reduce((all, line, ind) => {
    all[line[0]] = all[line[0]] || []
    all[line[0]].push(parseInt(line[1]))
    return all
  }, {})

  // sum of all numbers in array
  for (var ele in obj) {
    obj[ele] = obj[ele].reduce((all, item) => {
      return all + parseInt(item)
    })
  }

  // deleting additional object property
  delete obj.key

  // setting all obj values in array
  let resultArr = Object.keys(obj).map((key) => {
    return obj[key]
  })

  let minVal = Math.min.apply(null, resultArr)
  let maxVal = Math.max.apply(null, resultArr)
  let length = output.length - 1

  function getKey (val) {
    let key = Object.keys(obj).filter((key) => {
      return obj[key] === val
    })
    return parseInt(key[0])
  }

  let extension = length - getKey(minVal) * getKey(maxVal)

  console.log(getKey(minVal))
  console.log(getKey(maxVal))
  console.log('length: ', length)
  console.log('extension: ', extension)
})
