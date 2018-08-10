node-csv-query [![Build Status](https://travis-ci.org/rdubigny/node-csv-query.svg?branch=master)](https://travis-ci.org/rdubigny/node-csv-query)
==============

Turn your CSV files to queryable objects.

Node-csv-query loads the entire CSV file in memory, thanks to *csv-parse*, then plug *lodash* manipulation functions on the loaded dataset.
This can be handy for demo project as your code will have a databsae ready syntax while your dataset is easily editable even for non developer.

> :warning:Warning:warning:: this library is not meant for performance!

## How to use

dataset.csv
```csv
id,firstName,lastName,amountOfBooks
1,Olivier,Kaisin,10
2,Emile-Victor,Portenart,2
3,Alex,Mapolice,42
4,Alex,Gaspy,2
```

#### Connect to your csv database

```javascript
'use strict';
    
var csvdb = require("node-csv-query").default;
var databaseConnection = null;


csvdb(__dirname + "/dataset.csv").then(function (db) {
  databaseConnection = db;
});
```

#### How to find the row with `firstName=Olivier`

```javascript
databaseConnection.findOne({ 
  firstName: "Olivier" 
}).then(function (record) {
  // Do some stuff
})
```

#### How to find the rows with `firstName=Alex`

```javascript
databaseConnection.find({ 
  firstName: "Alex" 
}).then(function (records) {
  // Do some stuff
})
```

#### How to find the rows with having an 'i' in their `firstName`

This lib use lodash for querying the dataset. All query format are listed [here](https://lodash.com/docs/4.17.10#filter).
node-csv-query will just pass the query param to lodash as the predicate argument.

```javascript
databaseConnection.find(function (record) {
  return record.firstName.indexOf('i') > -1;
}).then(function (records) {
  // Do some stuff
})
```

#### How to deal with different dataset format

This lib is based on csv-parse for parsing csv files. All available options for parsing the CSV are listed [here](http://csv.adaltas.com/parse/#parser-options).
node-csv-query will just pass these option to csv-parse with the exception of the columns option that will be overrided to true for internal mechanism to works.

dataset_custom.csv
```csv
# this dataset has comment & semi colon separator & space before separator
id;firstName   ;lastName ;amountOfBooks
1 ;Olivier     ;Kaisin   ;10
2 ;Emile-Victor;Portenart;2
3 ;Alex        ;Mapolice ;42
4 ;Alex        ;Gaspy    ;2
```

```javascript
'use strict';

var csvdb = require("node-csv-query").default;

csvdb(
  __dirname + "/dataset_custom.csv", { rtrim: true, delimiter: ';', comment: '#' }
).then(function (db) {
  return db.findOne({ 
    firstName: "Olivier" 
  });
}).then(function (record) {
  // Do some stuff
}).catch(function (error) {
  throw error;
});
```


## Compatibility

This lib has been packaged for Node >= v8.9 .

## License

MIT
