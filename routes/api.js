var express = require('express');
var router = express.Router();

var connection = require('../library/database');

router.get('/schedule', function (req, res, next) {
    
    try{
        //query
        connection.query(' SELECT a.*, b.nama_team AS nama_team_kiri,b.image_logo AS image_logo_kiri, c.nama_team AS nama_team_kanan, c.image_logo AS image_logo_kanan FROM tb_schedule AS a LEFT JOIN tb_team AS b ON a.id_team_kiri = b.id_team LEFT JOIN tb_team AS c ON a.id_team_kanan = c.id_team ORDER BY a.id_schedule DESC;', function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.render('schedule', {
                    data: ''
                });
                throw new Error("error" + err)
            } else {
               
                res.json(rows.map((row) => {
                    return {
                        "matchtype": row.judul,
                        "home_team": row.nama_team_kiri,
                        "away_team": row.nama_team_kanan,
                        "status": row.status,
                        "home_score": row.skor_kiri,
                        "away_score": row.skor_kanan,
                        "date": row.tanggal,
                        "home_team_icon": row.image_logo_kiri,
                        "away_team_icon": row.image_logo_kanan
                    }
                }))


                   } })}
             catch(error){
        console.error("error",error)
        res.status(400).json({
            error: error.message
        }
    )}
});



module.exports = router;
