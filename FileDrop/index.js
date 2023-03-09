class FileDrop {
	constructor(o) {
		console.log(Object.keys(o).length)
		if (o !== null && typeof o === 'object' && Object.keys(o).length > 0) {
			this.option = o
			this.init()
		} else {
			console.error('The option does not appear to be an object')
		}
	}

	init() {
		const el = this.getElement(this.option.el)

		if (!el) {
			console.error('The element you entered could not be found')
			return false
		}

		el.addEventListener('dragover', this.dragover.bind(this), false)
		el.addEventListener('drop', this.drop.bind(this), false)
	}

	dragover = e => {
		e.preventDefault()
	}

	drop = e => {
		e.preventDefault()

		const files = e.dataTransfer.files
		const items = e.dataTransfer.items

		items ? this.queue(items) : this.queue(files)
	}

	queue = object => {
		const isQueue = this.option?.queue

		try {
			const fileArray = Array.from(object).map(item => item.getAsFile())
			isQueue ? this.option.callback?.(fileArray) : fileArray.forEach(file => this.option.callback?.(file))
		} catch (err) {
			console.error('An error occurred while processing the queue:', err)
		}
	}

	getElement(el) {
		return document.getElementById(el) || document.querySelector(el)
	}
}
