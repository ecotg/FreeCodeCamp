var monthNames = ["january", "february", "march", "april", "may", "june",
  "july", "august", "september", "october", "november", "december"
];
var monthNames_2 = ["jan", "feb", "mar", "apr", "may", "june",
  "july", "aug", "sep", "oct", "nov", "dec"
];

var LetterDatExists = function(value){
	// assumes value has letters in it
	var d = new Date(value);

	var year = d.getFullYear();
	var month = d.getMonth();
	var day = d.getDate();

	var Month = [month + 1, monthNames[month], monthNames_2[month]]
	var onlyMonthVal = String(value.replace(year, '').replace(day, '')).toLowerCase();
	var indexOfMonth = (
		onlyMonthVal.indexOf(Month[0]) != -1 ||
		onlyMonthVal.indexOf(Month[1]) != -1 ||
		onlyMonthVal.indexOf(Month[2]) != -1
	)

	if (
		value.indexOf(year) != -1 &&
		value.replace(year, '').indexOf(day) != -1 &&
		indexOfMonth
	){
		return true;
	}
	return false;
}

var numDatEexists = function(value){
	// Assumes value is in all interger, no letters
	var d = new Date(value);
	var year = d.getFullYear();
	var month = d.getMonth() + 1;
	var day = d.getDate();

	if (
		value.indexOf(year) != -1 &&  //year
		value.replace(year, '').indexOf(month) != -1 &&  //month
		value.replace(year, '').replace(month, '').indexOf(day) != -1  //day of month
	){
		return true;
	}
	return false;
}

var isValid = function(value){
	var t = new RegExp(/[A-Z]/i);
	var parsed = value.trim().replace(' ', '').replace(/,/g, '');

	if (t.test(parsed)){
		// definitely a date-string, i.e: Dec 25,1976
		return LetterDatExists(value);
	} else {
		var dateDiff = Date.now() - parsed;

		// could be a date-string or microsecond, check
		if (dateDiff > 0 && parsed.length > 8){  // in a form like, i.e:1460249623405
			// definitely a msecond
			return true;
		} else if (dateDiff > 0 && parsed.length > 5){  // i.e: 20121005
			// definiely not a microsecond, in form i.e: 20121005
			// check that year/month/day determined by new Date is valid
			return numDatEexists(value)
		} else if (dateDiff > 0 && parsed.length < 6){
			return false;  //20161 is not a valid date
		} else if (isNaN(dateDiff)){ //might be a string, i.e: Dec 2, 1920 or 5446 or 'chuggy chuggy'
			return false; // since it's here, most likely, in a form like, i.e: 55446
		}
	}
}


module.exports.tstamp = function(path){
	var returnData = {unix: null, natural: null};
	if (!path){
		console.log('Nothing to check')
		return;
	}
	var _valid = isValid(path);
	console.log('Validity of ' + path + ' >> ' + _valid);
	if (_valid === true){
		// ensure timestamps parsed as intergers not strings
		var t = new RegExp(/[A-Z]/i);
		if (t.test(path) || new RegExp(/,/g).test(path)){
			var d = new Date(path)
		} else {
			var d = new Date(new Number(path));
		}

		if (d == 'Invalid Date'){
			console.log('invalid date ' + d)
			console.log(path);
			return returnData
		}

		// turn mseconds to unix then to seconds
		var unix_datetime = Date.UTC(d.getFullYear(), d.getMonth(), d.getDate())
		unix_datetime = Math.floor(unix_datetime/ 1000);
		var string_datetime =  d.toDateString();

		returnData['unix'] = unix_datetime;
		returnData['natural'] = string_datetime;

		return returnData
	} else {
		return returnData
	}
}