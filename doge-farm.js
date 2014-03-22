// Generated by CoffeeScript 1.4.0
(function() {
  var cache, data, dataAsTextArray, fs, header, i, j, knapsackSize, lookbackX, lookbackY, lookupValue, minCost, numberOfItems, previousValue, rawData, sortedData, textToColumns, value, weight, x, y, _i, _j, _k, _l;

  fs = require("fs");

  rawData = fs.readFileSync(process.argv[2], "ascii");

  textToColumns = function(text) {
    var asString;
    asString = text.split(' ');
    return [+asString[0], +asString[1]];
  };

  dataAsTextArray = rawData.split('\n');

  value = function(touple) {
    return touple[0];
  };

  weight = function(touple) {
    return touple[1];
  };

  header = textToColumns(dataAsTextArray.slice(0, 1)[0]);

  knapsackSize = header[0];

  numberOfItems = header[1];

  data = dataAsTextArray.slice(1, -1).map(textToColumns);

  sortedData = data.sort(function(a, b) {
    var result;
    result = weight(a) - weight(b);
    if (result === 0) {
      result = value(a) - value(b);
    }
    return result;
  });

  minCost = sortedData.map(function(ele, i) {
    return weight(ele);
  })[0];

  console.log("Min Cost: " + minCost);

  sortedData.unshift([0, minCost]);

  cache = [];

  for (i = _i = 0; 0 <= numberOfItems ? _i <= numberOfItems : _i >= numberOfItems; i = 0 <= numberOfItems ? ++_i : --_i) {
    cache[i] = [];
    for (j = _j = minCost; minCost <= knapsackSize ? _j <= knapsackSize : _j >= knapsackSize; j = minCost <= knapsackSize ? ++_j : --_j) {
      cache[i][j] = 0;
    }
  }

  previousValue = null;

  for (y = _k = 0; 0 <= numberOfItems ? _k <= numberOfItems : _k >= numberOfItems; y = 0 <= numberOfItems ? ++_k : --_k) {
    console.log("Computing Items Up To: " + y);
    for (x = _l = minCost; minCost <= knapsackSize ? _l <= knapsackSize : _l >= knapsackSize; x = minCost <= knapsackSize ? ++_l : --_l) {
      if (y - 1 < 0) {
        lookbackY = 0;
      } else {
        lookbackY = y - 1;
      }
      if (x - weight(sortedData[y]) < 0) {
        lookbackX = 0;
      } else {
        lookbackX = x - weight(sortedData[y]);
      }
      lookupValue = cache[lookbackY][lookbackX];
      if (weight(sortedData[y]) <= x) {
        if (value(sortedData[y]) + lookupValue > cache[lookbackY][x]) {
          cache[y][x] = value(sortedData[y]) + lookupValue;
        } else {
          cache[y][x] = cache[lookbackY][x];
        }
      } else {
        cache[y][x] = cache[lookbackY][x];
      }
    }
  }

  console.log("Best Value Possible: " + cache[numberOfItems][knapsackSize]);

}).call(this);