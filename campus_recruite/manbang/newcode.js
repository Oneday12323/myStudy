const rl = require("readline").createInterface({ input: process.stdin });
var iter = rl[Symbol.asyncIterator]();
const readline = async () => (await iter.next()).value;

void (async function () {
    // Write your code here
    let rowData = []

    while(line = await readline()){
        rowData.push(line);
    }

    for(let i = 0; i < rowData.length; i++){
        rowData[i] = rowData[i].split(" ");
    }

    const sum = (arr) => {
        let sum = 0;
        for(let i = 0; i < arr.length;i++){
            sum+=parseInt(arr[i])
        }
        return sum;
    }


    for(let i = 0; i < rowData.length;i++){
        console.log(sum(rowData[i]))
    }
})();