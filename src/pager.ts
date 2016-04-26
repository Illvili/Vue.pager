declare var Vue, require

Vue.component('pager', {
    props: {
        pages: {
            required: true,
            coerce: val => {
                return ~~val
            }
        },
        current: {
            default: 1,
            coerce: val => {
                return ~~val
            }
        },

        ommitThreshold: {
            default: 10
        },
        ommitBefore: {
            default: 3,
            coerce: val => {
                return Math.max(0, ~~val)
            }
        },
        ommitAfter: {
            default: 3,
            coerce: val => {
                return Math.max(0, ~~val)
            }
        },

        pageChanged: Function
    },
    data: _ => {
        return {
            pageSelect: null,
            pageInput: '',
            pageInputGotFocus: false
        }
    },
    methods: {
        pageClicked: function(page) {
            if (page < 1 || page > this.pages) {
                return
            }

            let oldValue = this.current
            this.current = page
            if (!!this.pageChanged && oldValue != page) {
                this.pageChanged.call(this, page)
            }
        },
        gotoPage: function($event) {
            let page = ~~this.pageInput
            if (page < 1 || page > this.pages) {
                this.pageInputHasError = true

                return
            }

            if (!!$event) {
                $event.target.blur()
            }
            this.pageInput = ''
            this.pageClicked(page)
        },
        pageSelected: function($event) {
            let page = ~~this.pageSelect
            this.pageClicked(page)
        }
    },
    ready: function() {
        this.pageSelect = this.current
    },
    computed: {
        pageItems: function() {
            let pageItems = []

            if (this.pages > this.ommitThreshold) {
                pageItems.push(1)

                if (this.pages > this.ommitThreshold && this.current - this.ommitBefore > 2) {
                    pageItems.push('.[')
                }

                // ommit some pages
                for (var i = this.current - this.ommitBefore; i <= this.current + this.ommitAfter; i++) {
                    if (i > 1 && i < this.pages) pageItems.push(i)
                }

                if (this.pages > this.ommitThreshold && this.current + this.ommitAfter < this.pages - 1) {
                    pageItems.push('.]')
                }

                pageItems.push(this.pages)
            } else {
                // show all pages, first and last in template already
                for (var i = parseInt(this.pages); i > 0; i--) {
                    pageItems.unshift(i)
                }
            }

            return pageItems
        }
    },
    template: require('./_pager.tpl')
})
