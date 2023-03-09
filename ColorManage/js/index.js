new Vue({
	el: '#app',
	data() {
		return {
			color: '#',
			list: [],
			show: false,
		}
	},
	methods: {
		upload() {
			if (this.checkColor(this.color)) {
				const code = this.process(this.color)
				this.list.push(code)
				Put(code)
				this.color = '#'
			}
		},
		checkColor(params) {
			return /^\#[\d\w]{3}$|^\#[\d\w]{6}$|^\#[\d\w]{8}$/.test(params)
		},
		process(code) {
			return {
				code,
				time: new Date().getTime(),
				count: 0,
			}
		},
		floor(params) {
			return Math.floor(params / 5)
		},
		async copy(item) {
			try {
				await navigator.clipboard.writeText(item.code)
				item.count += 1
				Put(item)
			} catch (err) {
				console.error('[ERROR]: Failed to Copy: ', err)
			}
		},
		del(item) {
			const Prompt = confirm(`此操作将删除{${item.code}},是否继续`)
			if (Prompt) {
				this.list = this.list.filter(r => r.code != item.code)
				Delete(item.time)
			}
		},
	},
	async created() {
		this.list = await All()
	},
})
