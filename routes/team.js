var express = require('express');
var router = express.Router();
var multer = require('multer')
var path = require('path');

//import database
var connection = require('../library/database');
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});
var upload = multer({ storage: storage });

/**
 * INDEX team
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM tb_team ORDER BY id_team asc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('team', {
                data: ''
            });
        } else {
            //render ke view team index
            res.render('team/index', {
                data: rows // <-- data team
            });
        }
    });
});

/**
 * CREATE team
 */
router.get('/create', function (req, res, next) {
    res.render('team/create', {
        nama_team: '',
        image_logo: '',
    })
})

/**
 * STORE team
 */
router.post('/store', upload.single('avatar'), function (req, res, next) {
    

    console.log(req.file, req.body);
    let nama_team   = req.body.nama_team;
    let image_logo = req.file ? req.file.path : null;
    let errors  = false;

    
    if(nama_team.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('team/create', {
            nama_team: nama_team,
            image_logo: image_logo,
        })
    }
    
    if(image_logo === null) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('team/create', {
            nama_team: nama_team,
            image_logo: image_logo,
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            nama_team: nama_team,
            image_logo: image_logo,
            }
        image_logo.originalname;
        
        // insert query
        connection.query('INSERT INTO tb_team SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('team/create', {
                    nama_team: formData.nama_team,
                    image_logo: formData.image_logo,             
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/team');
            }
        })
    }

})
/**
 * EDIT team
 */
router.get('/edit/(:id_team)', function(req, res, next) {

    let id_team = req.params.id_team;
   
    connection.query('SELECT * FROM tb_team WHERE id_team = ' + id_team, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data team Dengan id_team ' + id_team + " Tidak Ditemukan")
            res.redirect('/team')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('team/edit', {
                id_team: rows[0].id_team,
                nama_team:   rows[0].nama_team,
                image_logo: rows[0].image_logo,
            })
        }
    })
})

/**
 * UPDATE team
 */
router.post('/update/:id_team', upload.single('img'), function(req, res, next) {

    console.log(req.file, req.body);
    let id_team = req.params.id_team;
    let nama_team = req.body.nama_team;
    let image_logo = req.file ? req.file.path : null;
    let errors  = false;

    if(nama_team.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('team/edit', {
            id_team: req.params.id_team,
            nama_team: nama_team,
            image_logo: image_logo,
        })
    }
    
    if(image_logo === null) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('team/edit', {
            id_team: req.params.id_team,
            nama_team: nama_team,
            image_logo: image_logo,
        })
    }
    
    // if no error
    if( !errors ) {   

        /*connection.query('SELECT * FROM tb_team WHERE id_team = ?', [id_team], function(err, rows) {
            fs.unlinkSync(rows[0].image_logo);
        })*/
        
 
        let formData = {
            nama_team: nama_team,
            image_logo: image_logo,
        }

        // update query
        connection.query('UPDATE tb_team SET ? WHERE id_team = ' + id_team, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('team/edit', {
                    id_team:     req.params.id_team,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/team');
            }
        })
    }
})

/**
 * DELETE team
 */
router.get('/delete/(:id_team)', function(req, res, next) {

    let id_team = req.params.id_team;

    connection.query('SELECT * FROM tb_team WHERE id_team = ?', [id_team], function(err, rows) {
        fs.unlinkSync(rows[0].image_logo);
    })
     
    connection.query('DELETE FROM tb_team WHERE id_team = ' + id_team, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to team page
            res.redirect('/team')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to team page
            res.redirect('/team')
        }
    })
})

module.exports = router;