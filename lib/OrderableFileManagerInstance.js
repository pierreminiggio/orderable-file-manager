const Ajax = require('ajax-as-promise')

const className = 'orderable-file-manager'

class OrderableFileManager
{

	constructor(element, customParams)
	{
		this.element = element
		this.customParams = customParams
		this.listUrl = this.element.dataset.list
		this.files = {}
		this.nodeNames = {
			fileBlockIdPrefix: className + '-file-',
			fileContainerClass: className + '-file-container',
			fileName: className + '-file-name',
			fileThumb: className + '-file-thumb'
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
		newElement.innerHTML = '<div class="' + instance.nodeNames.fileThumb + '"></div><div class="' + instance.nodeNames.fileName + '"></div>'
		instance.element.querySelector('.' + instance.nodeNames.fileContainerClass).appendChild(newElement)
		this.files[newFile.id] = {
			file: newFile,
			element: newElement
		}
		this.addClickListenner(newFile)
		this.fillFileInfos(newFile)
	}

	addClickListenner(file)
	{
		this.files[file.id].element.addEventListener('click', function(e) {
			window.open(this.dataset.url, '_blank')
		})
	}

	fillFileInfos(file)
	{
		this.updateFileElement(file, 'name', '.' + this.nodeNames.fileName)
		this.updateFileElement(file, 'url', '.' + this.nodeNames.fileThumb)
		this.loadFileThumb(file, 'url', '.' + this.nodeNames.fileThumb + ' img')
		this.updateViewLink(file, 'url')
	}

	updateFileElement(file, field, querySelector)
	{
		let elementToEdit = this.files[file.id].element.querySelector(querySelector)
		if (elementToEdit.innerHTML !== this.templateForField(file, field)) {
			elementToEdit.innerHTML = this.templateForField(file, field)
		}
	}

	templateForField(file, field)
	{
		if (field === 'url') {
			return '<img src="" height=58>'
		}
		return file[field]
	}

	async loadFileThumb(file, field, querySelector)
	{
		let image = this.files[file.id].element.querySelector(querySelector)
		let url = file[field]
		let blob = await fetch(url).then(r => r.blob())
		let reader = new FileReader()
		reader.addEventListener('load', function () {
			if (reader.result.substring(0, 10) === 'data:image') {
				image.src = reader.result
			} else if (reader.result.substring(0, 20) === 'data:application/pdf') {
				image.src = 'https://as2.ftcdn.net/jpg/01/03/75/43/500_F_103754394_xSNhdDOKFusz9Vrb8ZZNLY8SXSwLfaIT.jpg'
			}
		}, false);
		reader.readAsDataURL(blob)
	}

	updateViewLink(file, field)
	{
		this.files[file.id].element.dataset.url = file[field]
	}
}

module.exports = OrderableFileManager