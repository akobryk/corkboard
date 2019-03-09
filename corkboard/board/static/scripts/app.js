var app = new Vue({
    el: '#app',
    delimiters: ["${", "}"],
    data: {
        advertResults: [],
        advertPagination: {},
        loading: false,
        currentAdvert: {},
        newAdverts: {
            image: null,
            title: '',
            content: '',
            category: null,
            tags: '',
            price: null,
        },
        filterQuery: {
            search: null,
            price_min: null,
            price_max: null,
            date_start: null,
            date_finish: null,
            tags: null,
            ordering: null

        },
    },
    methods: {
        getAdverts: function() {
            this.loading = true,
            this.$http.get('/api/adverts/')
                .then((response) => {
                    this.pushPaginationData(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => {
                    this.loading = false;
                })
        },
        getFilteredAdverts: function() {
            this.loading = true;
            this.$http.get('/api/adverts/', {params: this.filterQuery})
                .then((response) => {
                    this.pushPaginationData(response.data);
                })
                .catch((err) => {
                    console.log(err);
                }).finally(() => {
                    this.loading = false;
                })
        },
        getPage: function(page) {
            if (page == 'previous') {
                this.filterQuery.page = this.advertPagination.previous;
            } else if (page == 'next') {
                this.filterQuery.page = this.advertPagination.next;
            } else {
                this.filterQuery.page = page;
            }

            $('.page-now').click(function() {
                $(this).addClass('active').siblings().removeClass('active');
            });

            if (this.advertPagination.previous || this.advertPagination.next) {
                $('.page-now:contains(' + (this.filterQuery.page) + ')').addClass('active');
                $('.page-now:not(:contains(' + this.filterQuery.page + '))').removeClass('active');

            }
            let $pagePrevious = $('.page-previous');
            if (!this.filterQuery.page || page == 1) {
                $pagePrevious.addClass('disabled');
            } else if (this.filterQuery.page && this.filterQuery.page == 1) {
                $pagePrevious.addClass('disabled');
            } else {
                $pagePrevious.removeClass('disabled');
            }
            let $pageNext = $('.page-next');
            if (!this.filterQuery.page || page == this.advertPagination.totalPages) {
                $pageNext.addClass('disabled');
            } else if (this.filterQuery.page && this.filterQuery.page == this.advertPagination.totalPages) {
                $pageNext.addClass('disabled');
            } else {
                $pageNext.removeClass('disabled');
            }

            this.getFilteredAdverts();
        },
        getPageRange: function() {
            if (this.advertPagination.totalPages > 1) {
                return Array(this.advertPagination.totalPages).fill(1).map((x, y) => x + y)
            }
            return [0]
        },
        pushPaginationData: function(data) {
            this.advertResults = data.results;
            this.advertPagination = {
                count: data.count,
                next: data.next,
                previous: data.previous,
                totalPages: data.total_pages
            }
        }
    },
    filters: {
        format_date: function (value, type) {
            if (value) {
                return moment(String(value)).format(type)
            }
        },
        truncate: function(value, num) {
            if (value) {
                let str = new Sugar.String(value);
                return str.truncate(num)
            }
        }
    },
    mounted: function() {
        this.getAdverts();
        // Pagination
        $('.page-now').first().addClass('active');
    },
        
  })
