let mysql = require('mysql');
let config = require('../database/config');

module.exports = {

    index: function (req, res) {
        return res.render('videos/index', {
            isAuth: req.isAuthenticated(),
            user: req.user,
            info: req.flash('info'),
            status: req.flash('status')
        });
    },
    uploadVideo: function (req, res) {
        if (req.files) {
            let file = req.files.video, filename = file.name, dir = './public/uploads/' + filename;
            file.mv(dir, function (err) {
                if (err) {
                    console.log(err);
                    req.flash('status', 'failed');
                    req.flash('info', 'The server cannot save the video.');
                    return res.redirect('/videos');
                }
                else {
                    console.log("File uploaded.");
                    let db = mysql.createConnection(config);
                    db.connect();
                    let video = {
                        nombre: filename,
                        analisado: 'Sin procesar',
                        created_at: new Date(),
                        updated_at: new Date()
                    };
                    db.query('INSERT INTO videos SET ?', video, function (err, rows, fields) {
                        if (err) throw err;
                        db.end();
                    });

                }
            });
            req.flash('status', 'done');
            req.flash('info', 'The video file was upload correctly. <a href="/data">Wacth</a>');
            return res.redirect('/videos');

        } else {
            console.log("Files were not detected.")
        }
    }, showContent: function (req, res) {
        let db = mysql.createConnection(config);
        db.connect();
        db.query('SELECT id,nombre,analisado,created_at FROM videos order by created_at desc', function (err, rows, fields) {
            if (err) throw err;
            db.end();
            return res.render('videos/data', {
                isAuth: req.isAuthenticated(),
                user: req.user,
                message: req.flash('info'),
                videos: rows
            });
        });
    }, analyze: function (req, res) {
        let db = mysql.createConnection(config);
        let data = [];
        let filename = '';
        db.connect();
        db.query('SELECT id,nombre,analisado,created_at FROM videos where id=? order by created_at desc', req.params.id, function (err, rows, fields) {
            if (err) throw err;
            db.end();
            data = rows[0];
            filename = data.nombre;
            console.log(data);
            if (data.analisado == "Processed correctly") {
                return res.send('The selected video was already analysed, select another one or see the <a href="#">details</a>')
            }
            const video = require('@google-cloud/video-intelligence').v1;
            const fs = require('fs');
            const client = new video.VideoIntelligenceServiceClient();
            const path = "public/uploads/" + data.nombre;
            const file = fs.readFileSync(path);
            const inputContent = file.toString('base64');
            const request = {
                inputContent: inputContent,
                features: ['LABEL_DETECTION'],
            };
            client
                .annotateVideo(request)
                .then(responses => {
                    var operation = responses[0];
                    req.app.get('io').emit('initialize', {
                        estado: 'Analysis initialized'
                    });
                    operation.on('complete', (result, metadata, finalApiResponse) => {
                        console.log('Completado');
                        console.log(metadata);
                        console.log(result);
                        console.log(finalApiResponse);
                        req.app.get('io').emit('complete', {
                            estado: 'Done',
                            metadata: metadata,
                            result: result
                        });
                        const annotations = result.annotationResults[0];
                        // Gets labels for video from its annotations
                        const labels = annotations.segmentLabelAnnotations;
                        labels.forEach(label => {
                            let data = {
                                categoria: '',
                                segmento: '',
                                confidence: '',
                                descripcion: '',
                                id_video: req.params.id
                            };
                            console.log(`Label ${label.entity.description} occurs at:`);
                            data.descripcion = label.entity.description;
                            label.segments.forEach(segment => {
                                data.confidence = segment.confidence
                                segment = segment.segment;
                                if (segment.startTimeOffset.seconds === undefined) {
                                    segment.startTimeOffset.seconds = 0;
                                }
                                if (segment.startTimeOffset.nanos === undefined) {
                                    segment.startTimeOffset.nanos = 0;
                                }
                                if (segment.endTimeOffset.seconds === undefined) {
                                    segment.endTimeOffset.seconds = 0;
                                }
                                if (segment.endTimeOffset.nanos === undefined) {
                                    segment.endTimeOffset.nanos = 0;
                                }
                                console.log(
                                    `\tStart: ${segment.startTimeOffset.seconds}` +
                                    `.${(segment.startTimeOffset.nanos / 1e6).toFixed(0)}s`
                                );
                                console.log(
                                    `\tEnd: ${segment.endTimeOffset.seconds}.` +
                                    `${(segment.endTimeOffset.nanos / 1e6).toFixed(0)}s`
                                );

                                data.segmento = `${segment.startTimeOffset.seconds} ` + `.${(segment.startTimeOffset.nanos / 1e6).toFixed(0)}s a ${segment.endTimeOffset.seconds}.${(segment.endTimeOffset.nanos / 1e6).toFixed(0)}`

                            });
                            label.categoryEntities.forEach(category => {
                                data.categoria = category.description
                            });
                            var db = mysql.createConnection(config);
                            db.connect();
                            db.query("INSERT INTO result_analisis SET ?", data, function (rows, err, fields) {
                                if (err) console.log(err);
                                db.end();
                            })
                        });

                        let db = mysql.createConnection(config);
                        db.connect();
                        db.query("UPDATE videos set analisado=? where id=?", ['Processed correctly', req.params.id], function (rows, err, fields) {
                            if (err) console.log(err);
                            db.end();
                        });
                        return res.send('Finished <a href="#">See the details</a> ');

                    });
                    operation.on('progress', (metadata, apiResponse) => {
                        console.log('Progreso');
                        console.log(metadata);
                        console.log(apiResponse);
                        req.app.get('io').emit('progress', {
                            estado: 'Incompleto',
                            metadata: metadata
                        })
                    });
                    operation.on('error', err => {
                        req.app.get('io').emit('error', {
                            estado: 'Error, the analysis was stopped.'
                        });
                        throw(err);
                    });
                })
                .catch(err => {
                    console.error(err);
                });
        });


    }, detailsVideo: function (req, res) {
        let db = mysql.createConnection(config);
        db.connect();
        let video;

        db.query('SELECT * FROM videos  where id =? ', req.params.id, function (err, rows, fields) {
            if (err) throw err;
            video = rows[0];
            db.query('SELECT * FROM result_analisis  where id_video =? order by categoria desc', video.id, function (err, rows, fields) {
                if (err) throw err;
                let results = rows;
                db.query('SELECT restriccion FROM restrictions', function (err, rows, fields) {
                    if (err) throw err;
                    db.end();
                    res.json({
                        isAuthenticated: req.isAuthenticated(),
                        user: req.user,
                        message: req.flash('info'),
                        video: video,
                        results: results,
                        restrictions: JSON.stringify(rows)
                    });

                });


            });
        });
    }
    , realTime: function (req, res) {
        return res.render('videos/realtime');
    }, saveRalTimeVideo: function (req, res) {
        console.log(req.body);
        const save = require('save-file');

    }, getrestrictions: function (req, res) {
        let db = mysql.createConnection(config);
        db.connect();
        let data = [];
        db.query("SELECT id,restriccion from restrictions order by restriccion asc", function (err, rows, fields) {
            if (err) console.log(err);
            db.end();
            data = rows;
            res.json({
                restrictions: data
            });
        });
    }, savetrestrictions: function (req, res) {
        let db = mysql.createConnection(config);
        db.connect();
        db.query("INSERT INTO restrictions SET ?", {restriccion: req.body.restriction}, function (err, rows, fields) {
            if (err) console.log(err);
            db.end();
            req.app.get('io').emit('received', {
                estado: 'Saved record',
            });
            return res.redirect('/data');
        });
    }

};