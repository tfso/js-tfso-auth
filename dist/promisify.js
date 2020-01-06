export default (fn) => {
    return (...args) => {
        return new Promise((resolve, reject) => {
            try {
                fn(...args, (err, result) => {
                    if (err)
                        return reject(err);
                    return resolve(result);
                });
            }
            catch (err) {
                reject(err);
            }
        });
    };
};
//# sourceMappingURL=promisify.js.map