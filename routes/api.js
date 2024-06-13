var express = require('express');
var router = express.Router();

var connection = require('../library/database');

router.get('/schedule', function (req, res, next) {
    
    try{
        
    //query
    connection.query('SELECT * FROM schedule ORDER BY id_schedule desc', function (err, rows) {
        if (err) {
            req.flash('error', err);
            res.render('schedule', {
                data: ''
            });
            throw new Error("error" + err)
        } else {
            //render ke view posts index
          
            res.json(rows.map((row) => {
                return {
                    "matchtype": row.judul,
                    "home_team": row.content,
                    "away_team": "SEN",
                    "status": "DONE",
                    "home_score": 13,
                    "away_score": 2,
                    "date": "12-07-2023",
                    "home_team_icon": "Picture/itbss.png",
                    "away_team_icon": "Picture/sen.png"
                }
            }))
        }
    });
    } catch(error){
        console.error("error",error)
        res.status(400).json({
            error: error.message
        })
    }
});

module.exports = router;
