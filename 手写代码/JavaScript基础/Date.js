// function  getDaysBetween(dateString1,dateString2){
//     const  startDate = Date.parse(dateString1);
//     console.log(startDate);
//     const  endDate = Date.parse(dateString2);
//     console.log(endDate);

//     if (startDate>endDate){
//         return 0;
//     }
//     if (startDate==endDate){
//         return 1;
//     }
//     const time=endDate-startDate
//     const days=time/1000/60/60/24
//     console.log(time);
//     console.log((days));
// }
// let date = getDaysBetween(2022-12-13,2022-12-12)
// console.log(date);

const getDays=function (){
    let startTime = new Date('2022-12-12')
    let endTime = new Date('2022-12-15')

    let usedTime=endTime-startTime
    let days=Math.floor(usedTime/(24*3600*1000))
    return days
}
let date=getDays()
console.log(date);