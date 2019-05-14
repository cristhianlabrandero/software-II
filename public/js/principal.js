const app = new Vue({
        el: '#app',
        data: {
            message: '',
            finalizado: 0,
            menu: 0,
            video: {},
            results: {},
            restrictions: [],
            rule: ''
        }
        , methods: {
            analyzeVideo: function (id) {
                event.preventDefault();
                let me = this;
                let url = "/analyze/" + id;
                console.log("URL " + url);
                me.message = 'Analysing';
                axios.get(url)
                    .then(function (response) {
                        me.message = '';
                        console.log(response);
                        swal({
                            title: '',
                            type: 'success',
                            html: response.data,
                            showCloseButton: true,
                            showCancelButton: true,
                            focusConfirm: false,
                            confirmButtonText:
                                '<i class="fa fa-thumbs-up"></i> Great!',
                            confirmButtonAriaLabel: 'Thumbs up, great!'
                        }).then((result) => {
                            if (result.value) {
                                me.seeDetails(id)
                            }
                        })
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            },
            seeDetails: function (id) {
                let me = this;
                event.preventDefault();
                let url = `/details/${id}`;
                axios.get(url).then(function (response) {
                    console.log(response);
                    me.menu = 1;
                    me.video = response.data.video;
                    me.video.nombre = '/uploads/' + me.video.nombre;
                    me.results = response.data.results;
                    me.finalizado = 1;
                    me.restrictions = response.data.restrictions;
                    socket.emit('newmessage', {
                        data: 'OK'
                    })
                }).catch(function (error) {
                    console.log(error)
                });

            }, inRestriction: function (val) {
                console.log(val);
                return (this.restrictions.includes(val))
            },
            mostrarRestriccions: function () {
                let me = this;
                me.menu = 2;
                axios.get('/restrictions').then(function (response) {
                    console.log(response);
                    me.restrictions = response.data.restrictions;
                }).catch(function (error) {
                    console.log(error)
                })
            }
        }

    }
);