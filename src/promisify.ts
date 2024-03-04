export default <R = any>(fn: Function) => {
    return (...args: any[]) => {
        return new Promise<R>((resolve, reject) => {
            try{
                fn(...args, (err: any, result: any) => {
                    if(err) return reject(err)
                    return resolve(result)
                })
            }catch(err){
                reject(err)
            }
        })
    }
}