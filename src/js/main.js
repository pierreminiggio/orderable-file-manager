import addInstancesProto from '@pierreminiggio/add-instance-proto'
import OrderableFileManagerInstance from './OrderableFileManagerInstance.js'

let OrderableFileManagerSingleton = (function () {
    let buildInstance = function () {

        this.load = function (querySelector = '.orderable-file-manager', customParams = {}) {
            let singleton = this
            let elements = document.querySelectorAll(querySelector)
            if (elements.length > 0) {
                let element = null
                for (let i = 0; i < elements.length; i++) {
                    element = elements[i]
                    if (element.dataset.loaded === undefined) {
                        let identifier = singleton.createInstanceIdentifier(element)
                        singleton.loadedInstances[identifier] = new OrderableFileManagerInstance(element, customParams)
                        singleton.loadedInstances[identifier].load()
                        element.dataset.loaded = 1
                    }
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

const OrderableFileManager = OrderableFileManagerSingleton.getInstance()
addInstancesProto(OrderableFileManager)

export default OrderableFileManager
