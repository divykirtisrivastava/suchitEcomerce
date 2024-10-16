const db= require('../databaseConfig.js')


exports.adminSave = (req, res) => {
    const { email, password } = req.body;

        const sql = `INSERT INTO admin_table (email, password) VALUES (?, ?)`;
        db.query(sql, [email, password], (err, result) => {
          if (err) throw err;
          res.json({ message: 'Admin registered successfully' });
        });
      
  }
exports.adminogin = (req, res) => {
    const { email, password } = req.body;

        const sql = `select * from admin_table where email = ? and password = ?`;
        db.query(sql, [email, password], (err, result) => {
          if (err) throw err;
          else{
            if(result.length > 0){
                res.send(true)
            }else{
                res.send(false)
            }
          }
        });
      
  }