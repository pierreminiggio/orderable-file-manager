const Ajax = require('ajax-as-promise')

class OrderableFileManager
{

	constructor(element, customParams)
	{
		this.element = element
		this.customParams = customParams
		this.listUrl = this.element.dataset.listfiles
		this.saveUrl = this.element.dataset.savefile
		this.files = {}
		this.className = 'orderable-file-manager'
		this.nodeNames = {
			classes: {
				fileBlockPrefix: this.className + '-file-',
				fileContainer: this.className + '-file-container',
				fileDeleteLink: this.className + '-file-delete-link',
				fileName: this.className + '-file-name',
				fileThumb: this.className + '-file-thumb',
				newFileInput: this.className + '-new-file-input'
			}
		}
	}

	load()
	{
		this.loadCustomParams()
		this.loadMainTemplate()
		this.loadList()
		this.newFileListenners()
	}

	loadCustomParams()
	{
		if (this.customParams.listUrl !== undefined) {
			this.listUrl = this.customParams.listUrl
		}
		if (this.customParams.saveUrl !== undefined) {
			this.saveUrl = this.customParams.saveUrl
		}
	}

	loadMainTemplate()
	{
		this.element.innerHTML = '<input type="file" class="' + this.nodeNames.classes.newFileInput + '"><div class="' + this.nodeNames.classes.fileContainer + '"></div>'
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
		newElement.classList.add(instance.nodeNames.classes.fileBlockPrefix + newFile.id)
		newElement.innerHTML = '<div class="' + instance.nodeNames.classes.fileThumb + '"></div><div class="' + instance.nodeNames.classes.fileName + '"></div><a href="javascript:;" class="' + instance.nodeNames.classes.fileDeleteLink + '">Supprimer</a>'
		instance.element.querySelector('.' + instance.nodeNames.classes.fileContainer).appendChild(newElement)
		this.files[newFile.id] = {
			file: newFile,
			element: newElement
		}
		this.addClickListenners(newFile)
		this.fillFileInfos(newFile)
	}

	addClickListenners(file)
	{
		let instance = this
		let clickElements = [this.files[file.id].element.querySelector('.' + this.nodeNames.classes.fileName), this.files[file.id].element.querySelector('.' + this.nodeNames.classes.fileThumb)]
		clickElements.forEach(clickElement => {
			clickElement.addEventListener('click', function(e) {
				window.open(instance.files[file.id].element.dataset.url, '_blank')
			})
		})

		this.files[file.id].element.querySelector('.' + this.nodeNames.classes.fileDeleteLink).addEventListener('click', function(e) {
			e.preventDefault()
			Ajax.callDataUrlPost(this).then(data => {
				instance.loadList()
			})
		})
		
	}

	fillFileInfos(file)
	{
		this.updateFileElement(file, 'name', '.' + this.nodeNames.classes.fileName)
		this.updateFileElement(file, 'url', '.' + this.nodeNames.classes.fileThumb)
		this.loadDeleteLink(file, 'delete_url', '.' + this.nodeNames.classes.fileDeleteLink)
		this.loadFileThumb(file, 'url', '.' + this.nodeNames.classes.fileThumb + ' img')
		this.updateViewLink(file, 'url')
	}

	updateFileElement(file, field, querySelector)
	{
		let elementToEdit = this.files[file.id].element.querySelector(querySelector)
		if (elementToEdit.innerHTML !== this.templateForField(file, field)) {
			elementToEdit.innerHTML = this.templateForField(file, field)
		}
	}

	loadDeleteLink(file, field, querySelector)
	{
		this.files[file.id].element.querySelector(querySelector).dataset.url = file[field]
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

	newFileListenners()
	{
		let instance = this
		this.element.querySelector('.' + this.nodeNames.classes.newFileInput).addEventListener('change', function() {
			if (this.files.length === 1) {
				Ajax.post(instance.saveUrl, {file: this.files[0]}, 'json', true).then(data => {
					instance.loadList()
				})
			}
		})
	}
}

module.exports = OrderableFileManager