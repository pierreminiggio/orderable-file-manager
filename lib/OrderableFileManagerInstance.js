const Ajax = require('ajax-as-promise')

class OrderableFileManager {

	constructor(element, customParams) {
		this.element = element
		this.customParams = customParams
		this.listUrl = this.element.dataset.list
		this.files = {}
		this.nodeNames = {
			fileContainerClass: 'orderable-file-manager-file-container',
			fileBlockIdPrefix: 'orderable-file-manager-file-',
			fileName: 'orderable-file-manager-file-name'
		}
		this.loadTemplate()
		this.loadList()
	}

	loadTemplate()
	{
		this.element.innerHTML = '<div class="' + this.nodeNames.fileContainerClass + '"></div>'
	}

	loadList() {
		Ajax.get(this.listUrl).then(data => {
			this.newList = data
			this.loadNewList()
		}).catch((error) => console.log(error))
	}

	loadNewList()
	{
		let newListElt = null
		let newIds = [];
		for (let i = 0; i < this.newList.length; i++) {
			newListElt = this.newList[i]
			if (this.files[newListElt.id] === undefined) {
				newIds.push(newListElt.id)
				this.appendNewFile(newListElt)
			}
		}
	}

	appendNewFile(newFile)
	{
		let instance = this
		let newElement = document.createElement('DIV')
		newElement.id = instance.nodeNames.fileBlockIdPrefix + newFile.id
		newElement.innerHTML = '<span class="' + instance.nodeNames.fileName + '">test</span>'
		instance.element.querySelector('.' + instance.nodeNames.fileContainerClass).appendChild(newElement)
		this.files[newFile.id] = {
			file: newFile,
			element: newElement
		}
	}
}

module.exports = OrderableFileManager