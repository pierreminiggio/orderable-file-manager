var addInstancesProto = require('./addInstancesProto.js')

let OrderableFileManagerSingleton = (function () {
    var buildInstance = function () {

        this.load = function (querySelector = '.orderable-file-manager', customParams = null) {
            let singleton = this
            let elements = document.querySelectorAll(querySelector)
            console.log(elements)
        }
    }

    var instance = null
    return new function () {
        this.getInstance = function () {
            if (instance == null) {
                instance = new buildInstance()
                instance.buildInstance = null
            }
            return instance
        }
    }
})()

let OrderableFileManager = OrderableFileManagerSingleton.getInstance()
addInstancesProto(OrderableFileManager)

module.exports = OrderableFileManager
