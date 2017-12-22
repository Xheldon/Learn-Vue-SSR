module.exports = {
    getSomething (params) {
        return new Promise((resolve, reject) => {
            setTimeout(function () {
                resolve('this is a something that i get, params is :', params);
            }, 2000)
        });
    }
};