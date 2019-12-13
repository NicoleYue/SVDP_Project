const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;;
const uuid = require('uuid/v4')
const session = require('express-session')
const FileStore = require('session-file-store')(session);
var cookieParser = require('cookie-parser');
var moment = require('moment');

const connection =mysql.createConnection({
  host:"35.193.123.243",
  database:"svdp",
  user:'root',
  password:'amQImti)FL(gp~',
  typeCast: function (field, next) {
    if (field.type === 'DATE') {
      // if (moment(field.string())==='Invalid date'){
      //   return null;
      // }
      return moment(field.string()).format('YYYY-MM-DD');
    } else {
      return next();
    }
  }
})

const app = express();
app.use(express.static(path.join(__dirname, 'client/build')));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

app.get('/api', (req, res) => {
    connection.query("SELECT * FROM homepage_basic", function (err, results, fields){
      var members = results;
      //console.log(JSON.stringify(members));
      res.json(members);
  });
});

app.post('/addMember', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members SET ?', values, function (error, results, fields) {
  if (error) {
    console.log("An application error has occured ", error);
  }else {
    console.log('ROW INSERTED.-member')
    var id = results.insertId;
    console.log(id);
    res.json(id);
    // connection.query('INSERT INTO members_sub_roles SET ?', values, function (error, results, fields) {}
  }
  console.log("EXITING FUNCTION")
  });
});

app.post('/login', (req, res) =>{
  var email= req.body.email;
  var password = req.body.password;
  connection.query('SELECT * FROM users WHERE email = ?',[email], function (error, results, fields) {
  if (error) {
    res.send({
      "code":400,
      "failed":"error ocurred"
    })
  }else{
    if (results.length==0){
      res.status(204).send("Email does not exits");
      console.log("Email does not exits");
    }else{
      var user = JSON.parse(JSON.stringify(results[0]));
      if(user.password == password){
        var id = user.users_id;
        console.log("sucess login",id);
        res.json(id);
        }else{
          res.status(205).send("Email and password does not match");
          console.log("not match");
        }
      }
    }
  });
});

app.get('/viewuser/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT email FROM users WHERE users_id = ?",[req.params.id], function (err, result, fields){
    if (err){
      console.log(err);
    }else{
      console.log(result[0].email)
    res.json(result[0].email);
    }
  });
});

app.get('/viewpromote/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_sub_roles WHERE members_id = ? AND roles_id = 'INI' AND status = 'A'",[req.params.id], function (err, result, fields){
    if (result[0] == undefined){
      //console.log("empty result");
      res.json({})
    }else{
      var promote_table = result[0];
      //console.log(promote_table);
      res.json(promote_table);
    }
  });
});

app.get('/viewreportrole/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_sub_roles WHERE members_id = ? AND roles_id = 'INI'",[req.params.id], function (err, result, fields){
    // if (result[0] == undefined){
    //   //console.log("empty result");
    //   res.json([])
    // }else{
      var all_roles = result;
      //console.log(JSON.stringify(all_roles))
      res.json(all_roles);
    // }
  });
});

app.post('/promoterole/:id/:date', (req, res) =>{
  var values = req.body;
  //console.log(req.params, req.body);
  connection.query("UPDATE members_sub_roles SET status = 'I' , end_date = ? WHERE roles_id = 'INI' AND status = 'A' and members_id = ?",[req.params.date,req.params.id], function (err, result, fields){
    if (err) {
      console.log("Could not update end date", err)
    } else {
      console.log("Row updated.- int role end date")
    } 
    //console.log("Exiting function")
  })
  connection.query('INSERT INTO members_sub_roles SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add role. Try again")
    } else {
      console.log("Row inserted.- int role")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    //console.log("Exiting function")
  })
});

app.get('/notificationFollowUp/:id/:time', (req, res) => {
  console.log("req.params",req.params);
  connection.query("SELECT * FROM notification_follow_up WHERE users_id = ?",req.params.id, function (err, result, fields){
    if (err) {
      console.log("notification err", err);
    }else {
    var all_com2 = result;
    //console.log("all_com",all_com)
    res.json(all_com2);
    }
  });
});

app.get('/notificationBirthday/:time', (req, res) => {
  //console.log("req.params",req.params);
  connection.query(" SELECT * FROM notification_birthday", function (err, result, fields){
    if (err) {
      console.log("notification birthday err", err);
    }else {
    var all_bir = result;
    //console.log("all_bir",all_bir)
    res.json(all_bir);
    }
  });
});

app.get('/notificationMarriage/:time', (req, res) => {
  //console.log("req.params",req.params);
  connection.query(" SELECT * FROM notification_marriage", function (err, result, fields){
    if (err) {
      console.log("notification mar aniversary err", err);
    }else {
    var all_mar = result;
    //console.log("all_mar",all_mar)
    res.json(all_mar);
    }
  });
});

app.get('/notificationBaptism/:time', (req, res) => {
  //console.log("req.params",req.params);
  connection.query(" SELECT * FROM notification_baptism", function (err, result, fields){
    if (err) {
      console.log("notification bap aniversary err", err);
    }else {
    var all_bap = result;
    //console.log("all_bap",all_bap)
    res.json(all_bap);
    }
  });
});

app.get('/viewcommunication/:id/:userid', (req, res) => {
  //console.log("req.params",req.params);
  connection.query("SELECT * FROM members_events WHERE members_id = ? AND users_id = ?",[req.params.id,req.params.userid], function (err, result, fields){
    var all_com = result;
    //console.log("all_com",all_com)
    res.json(all_com);
  });
});

app.post('/addcommunication', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_events SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add communication.",error)
    } else {
      console.log("Row inserted.-communication")
      var id = results;
      console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/deletecommunication/:id', (req, res) => {
  console.log(req.params);
  var values = req.body;
  connection.query("DELETE FROM members_events WHERE id = ?",[req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    console.log("Row deleted - com")
    res.json(edit_role);
    }
  });
});

app.post('/editcommunication/:id', (req, res) => {
  //console.log(req.params);
  var values = req.body;
  connection.query("UPDATE members_events SET ? WHERE id = ?",[values,req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_com = result;
    console.log("Row updated - com")
    res.json(edit_com);
    }
  });
});

app.get('/viewrole/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_sub_roles WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var all_roles = result;
    //console.log(all_roles)
    res.json(all_roles);
  });
});

app.post('/editrole/:id', (req, res) => {
  //console.log(req.params);
  var values = req.body;
  connection.query("UPDATE members_sub_roles SET ? WHERE id = ?",[values,req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    console.log("Row updated - role")
    res.json(edit_role);
    }
  });
});

app.post('/deleterole/:id', (req, res) => {
  console.log(req.params);
  var values = req.body;
  connection.query("DELETE FROM members_sub_roles WHERE id = ?",[req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    console.log("Row deleted - role")
    res.json(edit_role);
    }
  });
});

app.post('/addrole', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_sub_roles SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add role. Try again")
    } else {
      console.log("Row inserted.-role")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.get('/viewbaptism/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_baptism WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var bap = result;
    console.log("bap",bap)
    if (bap[0] == undefined){
      res.json({})
    }else{
      res.json(bap[0]);
    }
  });
});

app.post('/addbaptism', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_baptism SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add baptism. Try again",error)
    } else {
      console.log("Row inserted. -Baptism")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/editbaptism/:id', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('UPDATE members_baptism SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update baptism. Try again",error)
    } else {
      console.log("Row updated. -Baptism")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.get('/viewconfirmation/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_confirmation WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var con = result;
    if (con[0] == undefined){
      res.json({})
    }else{
      res.json(con[0]);
    }
  });
});
app.post('/addconfirmation', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_confirmation SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add con. Try again",error)
    } else {
      console.log("Row inserted. -con")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/editconfirmation/:id', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('UPDATE members_confirmation SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update con. Try again",error)
    } else {
      console.log("Row updated. -con")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});
app.get('/viewfirstcommunion/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_first_communion WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var com = result;
    //console.log(com)
    if (com[0] == undefined){
      res.json({})
    }else{
      res.json(com[0]);
    }
  });
});
app.post('/addfirstcommunion', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_first_communion SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add con. Try again",error)
    } else {
      console.log("Row inserted. -com")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});
app.post('/editfirstcommunion/:id', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('UPDATE members_first_communion SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update con. Try again",error)
    } else {
      console.log("Row updated. -com")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/editcurrentmarriage/:id', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('UPDATE members_marriage SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update marr. Try again",error)
    } else {
      console.log("Row updated. -marr")
      var id = results;
      //console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/addcurrentmarriage', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_marriage SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add marriage. Try again",error)
    } else {
      console.log("Row inserted. -marriage")
      var id = results;
      console.log(id);
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.get('/viewmarriage/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members_marriage WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var mar = result;
    //console.log("mar",mar)
    if (mar[0] == undefined){
      res.json({})
    }else{
      res.json(mar[0]);
    }
  });
});

app.get('/viewpremarriage/:id', (req, res) => {
  connection.query("SELECT * FROM members_prior_marriage WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var premar = result;
    res.json(premar);
  });
});

app.post('/addpremar', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('INSERT INTO members_prior_marriage SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add pre mar. Try again",error)
    } else {
      console.log("Row inserted.-pre mar")
      var id = results;
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/editpremar/:id', (req, res) =>{
  var values = req.body;
  console.log(req.params,values)
  connection.query('UPDATE members_prior_marriage SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update premar. Try again",error)
    } else {
      console.log("Row updated. -premar")
      var id = results;
      res.json(id);
    } 
    console.log("Exiting function")
  })
});

app.post('/deletepremar/:id', (req, res) => {
  console.log(req.params);
  var values = req.body;
  connection.query("DELETE FROM members_prior_marriage WHERE id = ?",[req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    console.log("Row deleted - role")
    res.json(edit_role);
    }
  });
});

app.get('/editMember/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    //console.log("This member",member);
    res.json(member[0]);
  });
});

app.post('/editMember/:id', (req, res) =>{
  var values = req.body;
  //console.log(values);
  connection.query('UPDATE members SET ? WHERE members_id = ?', [values, req.params.id], function (error, results, fields) {
  if (error) {
    console.log("An application error has occured ", error);
  }else {
    console.log('ROW UPDATED.-member')
  }
  console.log("EXITING FUNCTION")
  });
});

app.get('/editMember/:id/sacrament', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    //console.log("This member",member);
    res.json(member[0]);
  });
});

app.get('/memberReport/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    //console.log("This member",member);
    res.json(member[0]);
  });
});

app.get('/communicationReport/:id', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    //console.log("This member",member);
    res.json(member[0]);
  });
});

app.get('/manageReport/:subrole', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT COUNT(*) AS number FROM members_sub_roles WHERE sub_roles_id = ? AND status = 'A'",[req.params.subrole], function (err, result, fields){
    var number = JSON.stringify(result[0].number);
    //console.log("number", number);
    res.json(number);
  });
});

app.get('/manageReport', (req, res) => {
  //console.log(req.params);
  connection.query("SELECT COUNT(*) AS number FROM members_sub_roles WHERE roles_id = 'INI' AND status = 'A'", function (err, result, fields){
    var number = JSON.stringify(result[0].number);
    //console.log("number", number);
    res.json(number);
  });
});

app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,'/client/build/index.html'))
})

const port = 8080;

app.listen(port, () => `Server running on port ${port}`);
