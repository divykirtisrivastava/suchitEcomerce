const db = require('../databaseConfig.js')

exports.createOrder = async (req, res) => {
  const { items, customerDetails } = req.body
let tname = req.params.tname

  try {
    const { address, phone, email, paymentMethod } = customerDetails
    // Use Promise.all to handle both queries
    Promise.all([
      new Promise((resolve, reject) => {
        for (const item of items) {
           db.query(`
            INSERT INTO orders (customer_address, customer_phone, customer_email, payment_method, product_id, product_title, quantity, product_price, product_discount, total_price, productImage)
            VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`,
            [
              address,
              phone,
              email,
              paymentMethod,
              item.productId,
              item.productTitle,
              item.quantity,
              item.productPrice,
              item.productDiscount,
              item.totalPrice,
              item.productImages
            ]
          )
        }
    
        resolve({ message: 'Order created successfully' })
      }),
      new Promise((resolve, reject) => {
        const allquery = `TRUNCATE TABLE ${tname}`;
        db.query(allquery,  (err, results) => {
          if (err) {
            console.error('Database error for allpashu:', err);
            return reject(err);
          }
          resolve("all row delete");
        });
      })
    ]).then(([orderCreate, cartEmpty]) => {
      // Send a combined response
      res.status(201).json({ orderCreate, cartEmpty });
    }).catch(error => {
      console.error('Error during database operations:', error);
      res.status(500).json({ error: 'Internal server error' });
    });
    // Insert each item into the single orders table
    
  } catch (error) {
    console.error('Error creating order:', error)
    res.status(500).json({ message: 'Error creating order', error })
  }
}
exports.ordersGet = (req, res) => {
  let sql = `select * from orders`
  db.query(sql, (err, result) => {
    if (err) throw err
    else {
      res.json(result)
    }
  })
}
exports.ordersGetEmail = (req, res) => {
  let email = req.params.email
  // console.log(email)
  let sql = `select * from orders where customer_email = ?`
  db.query(sql, [email], (err, result) => {
    if (err) throw err
    else {
      // console.log(result)
      res.json(result)
    }
  })
}
exports.ordersUpdate = (req, res) => {
  let id = req.params.id
  let data = req.body.status
  let sql = `update orders set status = ? where id = ?`
  db.query(sql, [data, id], (err, result) => {
    if (err) throw err
    else {
      res.json(result)
    }
  })
}