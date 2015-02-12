var tickerTape = {
    //Array of recent numbers and operands
    recentNumsAndOps: [],
    //Running total of calc input
    runningTotal: 0.0,
    //How precise to be with floats
    precision: 0
}

function push(number, symbol) {
    if(tickerTape.recentNumsAndOps.length == 20) {
        tickerTape.recentNumsAndOps.shift(1);
    }
    tickerTape.recentNumsAndOps.push([number,symbol]);
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
    if (goodToGo(displayNum)) {
        push(displayNum,"+");
        tickerTape.runningTotal = parseFloat((tickerTape.runningTotal + displayNum).toFixed(tickerTape.precision));
        clear();
        createTable(tickerTape.recentNumsAndOps);
    }
}

function doMath(displayNum) {
    if (tickerTape.recentNumsAndOps.length == 0) {
        tickerTape.runningTotal = displayNum;
    } else {        
        var mathSymbol = tickerTape.recentNumsAndOps[tickerTape.recentNumsAndOps.length-1][1];
        if(mathSymbol == "+") {
            tickerTape.runningTotal = parseFloat((tickerTape.runningTotal + displayNum).toFixed(tickerTape.precision));
        } else if (mathSymbol == '-') {
            tickerTape.runningTotal = parseFloat((tickerTape.runningTotal - displayNum).toFixed(tickerTape.precision));
        } else if (mathSymbol == "X") {
            tickerTape.runningTotal = parseFloat((tickerTape.runningTotal * displayNum).toFixed(tickerTape.precision));
        } else if (mathSymbol == "/") {
            tickerTape.runningTotal = parseFloat((tickerTape.runningTotal / displayNum).toFixed(tickerTape.precision));
        }
    }
}

function doOp(mathSymbol) {
    var displayNum = getNumber(document.getElementById("calcDisplay").innerHTML);
    if (goodToGo(displayNum)) {
        doMath(displayNum);
        push(displayNum,mathSymbol);
        clear();
        createTable(tickerTape.recentNumsAndOps);
    }
}

function goodToGo(displayNum) {
    var tapeLength = tickerTape.recentNumsAndOps.length;
    var rtn = true;
    //If the last op was an equal
    if (tapeLength != 0) {
        var lastOp = tickerTape.recentNumsAndOps[tapeLength-1][1];
        if (lastOp == "=") {
            if(displayNum == 0) {
                rtn = false;   
            } else {
                resetTickerTape();
                createTable(tickerTape.recentNumsAndOps);
            }
        }
    }
    return rtn;
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
    } else if (lastOp == "=") {
        return;   
    }
    
    push(displayNum, "=");
    clear();
    createTable(tickerTape.recentNumsAndOps);
}

function clear() {
    document.getElementById("calcDisplay").innerHTML = "0";
}

function resetTickerTape() {
    tickerTape.recentNumsAndOps = [];
    tickerTape.runningTotal = 0;
    tickerTape.precision = 0;
}

function clearEverything() {
    //Get user confirmation
    //Clear out display
    clear();
    //Clear out tickerTape back to default
    resetTickerTape();
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
    //Update Running Total
    document.getElementById("runningTotal").innerHTML = "Running Total: " + tickerTape.runningTotal;
    
    //Update tape Table
    var table = $("#tape");
    table.empty();
    $.each(tableData, function(idx, val) {
        table.append("<tr><td>"+val[0]+"</td><td>"+val[1]+"</td></tr>");
    });
}