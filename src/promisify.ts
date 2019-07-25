export default (fn: any) => {
    return (...args: any[]) => {
        return new Promise((resolve, reject) => {
            try{
                fn(...args, (err:any, result:any) => {
                    if(err) return reject(err)
                    return resolve(result)
                })
            }catch(err){
                reject(err)
            }
        })
    }
}