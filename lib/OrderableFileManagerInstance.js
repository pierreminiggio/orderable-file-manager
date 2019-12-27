const Ajax = require('ajax-as-promise')

class OrderableFileManager {

	constructor(element, customParams) {
		this.element = element
		this.customParams = customParams
		this.listUrl = this.element.dataset.list
		this.loadList()
	}

	loadList() {
		Ajax.get(this.listUrl).then(data => {
			this.element.innerHTML = data
		}).catch((error) => console.log(error))
	}
}

module.exports = OrderableFileManager