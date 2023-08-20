Promise.myAllPromise = function(promises){
    return new Promise((resolve,reject) => {
        if(!Array.isArray()){
            throw new Error()
        }

        let resolvedCount = 0;
        let promiseNum = promises.length
        let resolvedValue = new Array(promiseNum)

        promises.forEach((p,index)=>{
            Promise.resolve(p).then(value=>{
                resolvedCount++;
                resolvedValue[index] = value

                if(resolvedCount === promiseNum){
                    return resolve(resolvedValue)
                }
            },
            error => reject(error))
        })
    })
}