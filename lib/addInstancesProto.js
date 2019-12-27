var addInstancesProto = function (obj) {
    let instanceProto = obj.__proto__

    // Instances
    instanceProto.loadedInstances = []

    // Getter All
    instanceProto.getAll = function () {
        return this.loadedInstances
    }

    // Getter
    instanceProto.get = function (id) {
        if (this.loadedInstances[id] !== undefined) {
            return this.loadedInstances[id]
        }
        return null
    }

    // Création des identifiants des instances, basées sur les ID
    instanceProto.lastId = 1
    instanceProto.createInstanceIdentifier = function (jquerySelector, prefix = 'no-id-') {
        let singleton = this

        let identifier = ''

        // Il a un id, on l'utilise
        if ($(jquerySelector).attr('id') !== undefined && $(jquerySelector).attr('id') !== '') {
            identifier = $(jquerySelector).attr('id')
        }

        // Sinon, on récupère le dernier premier numéro disponible
        else {
            Object.keys(singleton.loadedInstances).forEach(function (entry) {
                if (entry.startsWith(prefix)) {
                    currentId = parseInt(entry.substring(prefix.length))
                    if (currentId >= singleton.lastId) {
                        singleton.lastId = currentId+1
                    }
                }
            })
            identifier = prefix+singleton.lastId
        }

        return identifier
    }

    return obj
}

module.exports = addInstancesProto