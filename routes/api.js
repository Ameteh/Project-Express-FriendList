var express = require('express');
var router = express.Router();

var connection = require('../library/database');

router.get('/schedule', function (req, res, next) {
    
    try{
        //query
        connection.query('SELECT * FROM tb_schedule ORDER BY id_schedule desc', function (err, rows) {
            if (err) {
                req.flash('error', err);
                res.render('schedule', {
                    data: ''
                });
                throw new Error("error" + err)
            } else {
                //render ke view posts index

                const row = rows[0];
                connection.query('SELECT * FROM tb_team WHERE id_team = ? OR id_team = ?', [row.id_team_kiri, row.id_team_kanan], function (err2, rows2) {
                    /*
                    let say if the left id is 2 and right is 1, then
                    the query will resulting the rows in ordered id (1 first, then 2)
                    if the row1 contains the id 1, while we need to get the id 2 as the left team
                    so we need to make some adjusment to make sure the first row contain the left team image
                    */
                    const row1 = rows2[0];
                    const row2 = rows2[1];

                    const icon1 = row1.id_team === row.id_team_kiri ? row1.image_logo : row2.image_logo;
                    const icon2 = row2.id_team === row.id_team_kanan ? row2.image_logo : row1.image_logo;

                    res.json(rows.map((row) => {
                        return {
                            "matchtype": row.judul,
                            "home_team": row.id_team_kiri,
                            "away_team": row.id_team_kanan,
                            "status": row.status,
                            "home_score": row.skor_kiri,
                            "away_score": row.skor_kanan,
                            "date": row.tanggal,
                            "home_team_icon": icon1,
                            "away_team_icon": icon2
                        }
                    }))
                })
            }
        });    
    } catch(error){
        console.error("error",error)
        res.status(400).json({
            error: error.message
        }
    )}
});



module.exports = router;
