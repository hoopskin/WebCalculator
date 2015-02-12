var tickerTape = {
    //Array of recent numbers and operands
    recentNumsAndOps: [],
    //Running total of calc input
    runningTotal: 0.0,
    //How precise to be with floats
    precision: 0
}

function addToCookie(value) {

}

function readFromCookie() {

}

function addNumber(num) {
    var currentText = document.getElementById("calcDisplay").innerHTML;
    if (currentText == "0") {
        if (num == ".") {
            document.getElementById("calcDisplay").innerHTML = "0.";   
        } else {
            document.getElementById("calcDisplay").innerHTML = num;               
        }
    } else {
    document.getElementById("calcDisplay").innerHTML = currentText + num;
    }
}

function add() {
    var displayNum = getNumber(document.getElementById("calcDisplay").innerHTML);
    tickerTape.recentNumsAndOps.push([displayNum,"+"]);
    tickerTape.runningTotal = parseFloat((tickerTape.runningTotal + displayNum).toFixed(tickerTape.precision));
    clear();
    createTable(tickerTape.recentNumsAndOps);
}

function subtract() {
    var displayNum = getNumber(document.getElementById("calcDisplay").innerHTML);
    tickerTape.recentNumsAndOps.push([displayNum, "-"]);
    tickerTape.runningTotal = parseFloat((tickerTape.runningTotal - displayNum).toFixed(tickerTape.precision));
    clear();
    createTable(tickerTape.recentNumsAndOps);
}

function divide() {
    var displayNum = getNumber(document.getElementById("calcDisplay").innerHTML);
    tickerTape.recentNumsAndOps.push([displayNum, "/"]);
    tickerTape.runningTotal = parseFloat((tickerTape.runningTotal / displayNum).toFixed(tickerTape.precision));
    clear();
    createTable(tickerTape.recentNumsAndOps);
}

function multiply() {
    var displayNum = getNumber(document.getElementById("calcDisplay").innerHTML);
    tickerTape.recentNumsAndOps.push([displayNum, "X"]);
    tickerTape.runningTotal = parseFloat((tickerTape.runningTotal * displayNum).toFixed(tickerTape.precision));
    clear();
    createTable(tickerTape.recentNumsAndOps);
}

function equals() {
    var curText = document.getElementById("runningTotal").innerHTML;
    var lastOp = tickerTape.recentNumsAndOps[tickerTape.recentNumsAndOps.length-1][1];
    var displayNum = getNumber(document.getElementById("calcDisplay").innerHTML);
    
    if (lastOp == "+") {
        tickerTape.runningTotal = parseFloat((tickerTape.runningTotal + displayNum).toFixed(tickerTape.precision));
    } else if (lastOp == "-") {
        tickerTape.runningTotal = parseFloat((tickerTape.runningTotal - displayNum).toFixed(tickerTape.precision));
    } else if (lastOp == "/") {
        tickerTape.runningTotal = parseFloat((tickerTape.runningTotal / displayNum).toFixed(tickerTape.precision));
    } else if (lastOp == "X") {
        tickerTape.runningTotal = parseFloat((tickerTape.runningTotal * displayNum).toFixed(tickerTape.precision));
    }
    
    tickerTape.recentNumsAndOps.push([displayNum, "="]);
    clear();
    createTable(tickerTape.recentNumsAndOps);
    document.getElementById("runningTotal").innerHTML = curText.substring(0,curText.indexOf(":")+2) + tickerTape.runningTotal;
}

function clear() {
    document.getElementById("calcDisplay").innerHTML = "0";
}

function clearEverything() {
    //Get user confirmation
    //Clear out display
    clear();
    //Clear out tickerTape back to default
}

function getNumber(input) {
    if(input.indexOf(".") == -1) {
        return parseInt(input);   
    } else {
        updatePrecision(input);
        return parseFloat(input);
    }
}

function updatePrecision(input) {
    tickerTape.precision = input.substring(input.indexOf(".")+1).length;
}

function createTable(tableData) {
    var table = $("#tape");
    table.empty();
    $.each(tableData, function(idx, val) {
        table.append("<tr><td>"+val[0]+"</td><td>"+val[1]+"</td></tr>");
    });
}

/*function createTable(tableData) {
  var table = document.createElement('table')
    , tableBody = document.createElement('tbody');

  tableData.forEach(function(rowData) {
    var row = document.createElement('tr');

    rowData.forEach(function(cellData) {
      var cell = document.createElement('td');
      cell.appendChild(document.createTextNode(cellData));
      row.appendChild(cell);
    });

    tableBody.appendChild(row);
  });

  table.appendChild(tableBody);
  document.body.appendChild(table);
}*/