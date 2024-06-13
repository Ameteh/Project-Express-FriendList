var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX schedule
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM tb_schedule ORDER BY id_schedule desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('schedule', {
                data: ''
            });
        } else {
            //render ke view schedule index
            res.render('schedule/index', {
                data: rows // <-- data schedule
            });
        }
    });
});

/**
 * CREATE schedule
 */
router.get('/create', function (req, res, next) {
    res.render('schedule/create', {
        judul: '',
        tanggal: '',
        status: '',
        id_team_kiri: '',
        id_team_kanan: '',
        skor_kiri: '',
        skor_kanan: ''
    })
})

/**
 * STORE schedule
 */
router.post('/store', function (req, res, next) {
    

    console.log(req.body);
    let judul   = req.body.judul;
    let tanggal = req.body.tanggal;
    let status   = req.body.status;
    let id_team_kiri = req.body.id_team_kiri;
    let id_team_kanan = req.body.id_team_kanan;
    let skor_kiri = req.body.skor_kiri;
    let skor_kanan = req.body.skor_kanan;
    let errors  = false;

    
    if(judul.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }
    
    if(tanggal.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }
    
    if(status.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(id_team_kiri.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(id_team_kanan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(skor_kiri.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(skor_kanan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        }
        
        // insert query
        connection.query('INSERT INTO tb_schedule SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('schedule/create', {
                    judul: formData.judul,
                    tanggal: formData.tanggal,
                    status: formData.status,
                    id_team_kiri: formData.id_team_kiri,
                    id_team_kanan: formData.id_team_kanan,
                    skor_kiri: formData.skor_kiri,
                    skor_kanan: formData.skor_kanan                  
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/schedule');
            }
        })
    }

})
/**
 * EDIT schedule
 */
router.get('/edit/(:id_schedule)', function(req, res, next) {

    let id_schedule = req.params.id_schedule;
   
    connection.query('SELECT * FROM tb_schedule WHERE id_schedule = ' + id_schedule, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data schedule Dengan id_schedule ' + id_schedule + " Tidak Ditemukan")
            res.redirect('/schedule')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('schedule/edit', {
                id_schedule: rows[0].id_schedule,
                judul:   rows[0].judul,
                tanggal: rows[0].tanggal,
                status: rows[0].status,
                id_team_kiri: rows[0].id_team_kiri,
                id_team_kanan: rows[0].id_team_kanan,
                skor_kiri: rows[0].skor_kiri,
                skor_kanan: rows[0].skor_kanan
            })
        }
    })
})

/**
 * UPDATE schedule
 */
router.post('/update/:id_schedule', function(req, res, next) {

    let id_schedule = req.params.id_schedule;
    let judul = req.body.judul;
    let tanggal = req.body.tanggal;
    let status   = req.body.status;
    let id_team_kiri = req.body.id_team_kiri;
    let id_team_kanan = req.body.id_team_kanan;
    let skor_kiri = req.body.skor_kiri;
    let skor_kanan = req.body.skor_kanan;
    let errors  = false;

    if(judul.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }
    
    if(tanggal.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }
    
    if(status.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(id_team_kiri.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(id_team_kanan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(skor_kiri.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    if(skor_kanan.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('schedule/create', {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        })
    }

    // if no error
    if( !errors ) {   
 
        let formData = {
            judul: judul,
            tanggal: tanggal,
            status: status,
            id_team_kiri: id_team_kiri,
            id_team_kanan: id_team_kanan,
            skor_kiri: skor_kiri,
            skor_kanan: skor_kanan
        }

        // update query
        connection.query('UPDATE tb_schedule SET ? WHERE id_schedule = ' + id_schedule, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('schedule/edit', {
                    id_schedule:     req.params.id_schedule,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/schedule');
            }
        })
    }
})

/**
 * DELETE schedule
 */
router.get('/delete/(:id_schedule)', function(req, res, next) {

    let id_schedule = req.params.id_schedule;
     
    connection.query('DELETE FROM tb_schedule WHERE id_schedule = ' + id_schedule, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to schedule page
            res.redirect('/schedule')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to schedule page
            res.redirect('/schedule')
        }
    })
})

module.exports = router;