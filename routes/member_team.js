var express = require('express');
var router = express.Router();

//import database
var connection = require('../library/database');

/**
 * INDEX member_team
 */
router.get('/', function (req, res, next) {
    //query
    connection.query('SELECT * FROM tb_member_team ORDER BY id_member asc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('member_team', {
                data: ''
            });
        } else {
            //render ke view member_team index
            res.render('member_team/index', {
                data: rows // <-- data member_team
            });
        }
    });
});

/**
 * CREATE member_team
 */
router.get('/create', function (req, res, next) {
    res.render('member_team/create', {
        nama: '',
        id_team_image: '',
    })
})

/**
 * STORE member_team
 */
router.post('/store', function (req, res, next) {
    

    console.log(req.body);
    let nama   = req.body.nama;
    let id_team_image = req.body.id_team_image;
    let errors  = false;

    
    if(nama.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('member_team/create', {
            nama: nama,
            id_team_image: id_team_image,
        })
    }
    
    if(id_team_image.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('member_team/create', {
            nama: nama,
            id_team_image: id_team_image,
        })
    }

    // if no error
    if(!errors) {

        let formData = {
            nama: nama,
            id_team_image: id_team_image,
            }
        
        // insert query
        connection.query('INSERT INTO tb_member_team SET ?', formData, function(err, result) {
            //if(err) throw err
            if (err) {
                req.flash('error', err)
                 
                // render to add.ejs
                res.render('member_team/create', {
                    nama: formData.nama,
                    id_team_image: formData.id_team_image,             
                })
            } else {                
                req.flash('success', 'Data Berhasil Disimpan!');
                res.redirect('/member_team');
            }
        })
    }

})
/**
 * EDIT member_team
 */
router.get('/edit/(:id_member)', function(req, res, next) {

    let id_member = req.params.id_member;
   
    connection.query('SELECT * FROM tb_member_team WHERE id_member = ' + id_member, function(err, rows, fields) {
        if(err) throw err
         
        // if user not found
        if (rows.length <= 0) {
            req.flash('error', 'Data member_team Dengan id_member ' + id_member + " Tidak Ditemukan")
            res.redirect('/member_team')
        }
        // if book found
        else {
            // render to edit.ejs
            res.render('member_team/edit', {
                id_member: rows[0].id_member,
                nama:   rows[0].nama,
                id_team_image: rows[0].id_team_image,
            })
        }
    })
})

/**
 * UPDATE member_team
 */
router.post('/update/:id_member', function(req, res, next) {

    let id_member = req.params.id_member;
    let nama = req.body.nama;
    let id_team_image = req.body.id_team_image;
    let errors = false;

    if(nama.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Title");
        // render to add.ejs with flash message
        res.render('member_team/edit', {
            id_member: req.params.id_member,
            nama: nama,
            id_team_image: id_team_image,
        })
    }
    
    if(id_team_image.length === 0) {
        errors = true;

        // set flash message
        req.flash('error', "Silahkan Masukkan Konten");
        // render to add.ejs with flash message
        res.render('member_team/edit', {
            id_member: req.params.id_member,
            nama: nama,
            id_team_image: id_team_image,
        })
    }
    
    // if no error
    if( !errors ) {   
 
        let formData = {
            nama: nama,
            id_team_image: id_team_image,
           
        }

        // update query
        connection.query('UPDATE tb_member_team SET ? WHERE id_member = ' + id_member, formData, function(err, result) {
            //if(err) throw err
            if (err) {
                // set flash message
                req.flash('error', err)
                // render to edit.ejs
                res.render('member_team/edit', {
                    id_member:     req.params.id_member,
                    name:   formData.name,
                    author: formData.author
                })
            } else {
                req.flash('success', 'Data Berhasil Diupdate!');
                res.redirect('/member_team');
            }
        })
    }
})

/**
 * DELETE member_team
 */
router.get('/delete/(:id_member)', function(req, res, next) {

    let id_member = req.params.id_member;
     
    connection.query('DELETE FROM tb_member_team WHERE id_member = ' + id_member, function(err, result) {
        //if(err) throw err
        if (err) {
            // set flash message
            req.flash('error', err)
            // redirect to member_team page
            res.redirect('/member_team')
        } else {
            // set flash message
            req.flash('success', 'Data Berhasil Dihapus!')
            // redirect to member_team page
            res.redirect('/member_team')
        }
    })
})

module.exports = router;