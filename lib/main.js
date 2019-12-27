let addInstancesProto = require('./addInstancesProto.js')

let OrderableFileManagerSingleton = (function () {
    let buildInstance = function () {

        this.load = function (querySelector = '.orderable-file-manager', customParams = null) {
            let singleton = this
            let elements = document.querySelectorAll(querySelector)
            if (elements.length > 0) {
            	for (let i = 0; i < elements.length; i++) {
            		console.log(elements[i])
            	}
            }
        }
    }

    let instance = null
    return new function () {
        this.getInstance = function () {
            if (instance === null) {
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
