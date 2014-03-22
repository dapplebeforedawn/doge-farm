fs = require "fs"

rawData = fs.readFileSync process.argv[2], "ascii"
textToColumns = (text)->
  asString = text.split(' ')
  [+asString[0], +asString[1]]
dataAsTextArray = rawData.split('\n')

value = (touple)-> touple[0]
weight = (touple)-> touple[1]

header = textToColumns(dataAsTextArray.slice(0, 1)[0])
knapsackSize = header[0]
numberOfItems = header[1]

data = dataAsTextArray.slice(1, -1).map textToColumns
sortedData = data.sort (a,b)->
  result = weight(a) - weight(b)
  if result == 0
    result = value(a) - value(b)
  result

minCost = sortedData.map((ele, i)-> weight(ele))[0]
console.log "Min Cost: #{minCost}"
sortedData.unshift [0, minCost] #put an empty at 0

#initialize the cache table
cache = []
for i in [0..numberOfItems]
  cache[i] = []
  for j in [minCost..knapsackSize]
    cache[i][j] = 0

#allowed to use the first `y` items
#must be able to fit in an `x` sized sack
previousValue = null
for y in [0..numberOfItems]
  console.log "Computing Items Up To: #{y}"
  for x in [minCost..knapsackSize]

    if y-1 < 0
      lookbackY = 0
    else
      lookbackY = y-1
    if x - weight(sortedData[y]) < 0
      lookbackX = 0
    else
      lookbackX = x - weight(sortedData[y])

    lookupValue = cache[lookbackY][lookbackX]
    if weight(sortedData[y]) <= x #then it can be part of the solution

      if value(sortedData[y]) + lookupValue > cache[lookbackY][x]
        cache[y][x] = value(sortedData[y]) + lookupValue
      else
        cache[y][x] = cache[lookbackY][x]

    else #use the previous value
      cache[y][x] = cache[lookbackY][x]

console.log "Best Value Possible: #{cache[numberOfItems][knapsackSize]}"
