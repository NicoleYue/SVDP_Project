// Grabbing the Node modules from our package.json file
const express = require('express');
const mysql = require('mysql');
const bodyParser = require('body-parser');
const path = require('path');
var moment = require('moment');

// TODO: Change the connection information if the database changes
// This is the information used to create a connection with our MySQL database
const connection =mysql.createConnection({
  host:"35.193.123.243",
  database:"svdp",
  user:'root',
  password:'amQImti)FL(gp~',
  // In React, the date shows up as 'YYYY-MM-DD HH:MM'
  // We ended up using moment.js, a library to help format the dates
  // In this case, we only wanted the date, not the time.
  typeCast: function (field, next) {
    if (field.type === 'DATE') {
      return moment(field.string()).format('YYYY-MM-DD');
    } else {
      return next();
    }
  }
})

// We make a variable called 'app' which is uses the express() function to create an app
const app = express();
// TODO: As you make changes to your site, you have to make a new build folder
// This is where we set that path for static content to be served
app.use(express.static(path.join(__dirname, 'client/build')));
// body-parser is a Node module that allows us to read through HTTP bodies
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended:true}));

// This statement allows us to get all of the member information that's displayed on the homepage
app.get('/api', (req, res) => {
    connection.query("SELECT * FROM homepage_basic", function (err, results, fields) {
      var members = results;
      res.json(members);
  });
});

// This statement allows us to insert a record into the members table
app.post('/addMember', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members SET ?', values, function (error, results, fields) {
  if (error) {
    console.log("An application error has occured ", error);
  } else {
    var id = results.insertId;
    res.json(id);
  }
  });
});

// This statement checks if the inputted email and password matches an entry in our users table
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
      res.status(204).send("Email does not exist");
    }else{
      var user = JSON.parse(JSON.stringify(results[0]));
      if(user.password == password){
        var id = user.users_id;
        res.json(id);
        }else{
          res.status(205).send("Email and password does not match");
        }
      }
    }
  });
});

app.get('/viewuser/:id', (req, res) => {
  connection.query("SELECT email FROM users WHERE users_id = ?",[req.params.id], function (err, result, fields){
    if (err){
      console.log(err);
    } else {
      res.json(result[0].email);
    }
  });
});

// For our "Promote" modal, this brings up the information shown within the modal
// Mainly checking for the recently active role
app.get('/viewpromote/:id', (req, res) => {
  connection.query("SELECT * FROM members_sub_roles WHERE members_id = ? AND roles_id = 'INI' AND status = 'A'",[req.params.id], function (err, result, fields){
    if (result[0] == undefined){
      res.json({})
    }else{
      var promote_table = result[0];
      res.json(promote_table);
    }
  });
});

// When using the "Promote" modal, two things happen:
// 1. It changes a previous record in members_sub_roles to a status of "I" for inactive
// 2. It creates a new record in the same table to hold the information of the new role.
app.post('/promoterole/:id/:date', (req, res) =>{
  var values = req.body;
  connection.query("UPDATE members_sub_roles SET status = 'I' , end_date = ? WHERE roles_id = 'INI' AND status = 'A' and members_id = ?",[req.params.date,req.params.id], function (err, result, fields){
    if (err) {
      console.log("Could not update end date", err)
    } else {
      console.log("Row updated.- int role end date")
    } 
  })
  connection.query('INSERT INTO members_sub_roles SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add role. Try again")
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

app.get('/viewreportrole/:id', (req, res) => {
  connection.query("SELECT * FROM members_sub_roles WHERE members_id = ? AND roles_id = 'INI'",[req.params.id], function (err, result, fields){
    var all_roles = result;
    res.json(all_roles);
  });
});

// This statement grabs the information from the notification_follow_up view to show in the reminders tab
app.get('/notificationFollowUp/:id/:time', (req, res) => {
  connection.query("SELECT * FROM notification_follow_up WHERE users_id = ?",req.params.id, function (err, result, fields){
    if (err) {
      console.log("notification err", err);
    } else {
    var all_com2 = result;
    res.json(all_com2);
    }
  });
});

// Anniversary information: MM-DD repeats yearly
// This statement grabs the information from the notification_birthday view to show in the reminders tab
app.get('/notificationBirthday/:time', (req, res) => {
  connection.query(" SELECT * FROM notification_birthday", function (err, result, fields){
    if (err) {
      console.log("notification birthday err", err);
    } else {
    var all_bir = result;
    res.json(all_bir);
    }
  });
});

// Anniversary information: MM-DD repeats yearly
// This statement grabs the information from the notification_marriage view to show in the reminders tab
app.get('/notificationMarriage/:time', (req, res) => {
  //console.log("req.params",req.params);
  connection.query(" SELECT * FROM notification_marriage", function (err, result, fields){
    if (err) {
      console.log("notification mar aniversary err", err);
    } else {
    var all_mar = result;
    res.json(all_mar);
    }
  });
});

// Anniversary information: MM-DD repeats yearly
// This statement grabs the information from the notification_baptism view to show in the reminders tab
app.get('/notificationBaptism/:time', (req, res) => {
  //console.log("req.params",req.params);
  connection.query(" SELECT * FROM notification_baptism", function (err, result, fields){
    if (err) {
      console.log("notification bap aniversary err", err);
    } else {
    var all_bap = result;
    res.json(all_bap);
    }
  });
});

// This statement brings up member communications where follow up dates are inputted
app.get('/viewcommunication/:id/:userid', (req, res) => {
  connection.query("SELECT * FROM members_events WHERE members_id = ? AND users_id = ?",[req.params.id,req.params.userid], function (err, result, fields){
    var all_com = result;
    res.json(all_com);
  });
});

// This statement adds a record into our members_events table
// TODO: If John decides he no longer wants to events (like initial interview, retreat, etc.) we must change the table name
app.post('/addcommunication', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members_events SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add communication.",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// Deletes a communication from the members_events table
app.post('/deletecommunication/:id', (req, res) => {
  connection.query("DELETE FROM members_events WHERE id = ?",[req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    } else {
    var edit_role = result;
    res.json(edit_role);
    }
  });
});

// This statement allows us to edit a record within the members_events table
app.post('/editcommunication/:id', (req, res) => {
  var values = req.body;
  connection.query("UPDATE members_events SET ? WHERE id = ?",[values,req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    } else {
    var edit_com = result;
    res.json(edit_com);
    }
  });
});

// We use this statement to get all of the records of a certain member within the members_sub_roles table
app.get('/viewrole/:id', (req, res) => {
  connection.query("SELECT * FROM members_sub_roles WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var all_roles = result;
    res.json(all_roles);
  });
});

// Edits a record in the members_sub_roles
app.post('/editrole/:id', (req, res) => {
  var values = req.body;
  connection.query("UPDATE members_sub_roles SET ? WHERE id = ?",[values,req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    res.json(edit_role);
    }
  });
});

// Deletes a record in the members_sub_roles
// TODO: We might take out this functionality as we don't want to physically delete records
// However, John asked for a delete function in case a user makes an incorrect role
app.post('/deleterole/:id', (req, res) => {
  console.log(req.params);
  var values = req.body;
  connection.query("DELETE FROM members_sub_roles WHERE id = ?",[req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    res.json(edit_role);
    }
  });
});

// Adds a record in the members_sub_roles
app.post('/addrole', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members_sub_roles SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add role. Try again")
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// This statement selects the information from the members_baptism table and displays it on the sacraments page
app.get('/viewbaptism/:id', (req, res) => {
  connection.query("SELECT * FROM members_baptism WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var bap = result;
    if (bap[0] == undefined){
      res.json({})
    } else{
      res.json(bap[0]);
    }
  });
});

// Adds a record into the members_baptism table
app.post('/addbaptism', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members_baptism SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add baptism. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// Edits the record in the members_baptism table
app.post('/editbaptism/:id', (req, res) =>{
  var values = req.body;
  connection.query('UPDATE members_baptism SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update baptism. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// This statement selects the information from the members_confirmation table and displays it on the sacraments page
app.get('/viewconfirmation/:id', (req, res) => {
  connection.query("SELECT * FROM members_confirmation WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var con = result;
    if (con[0] == undefined){
      res.json({})
    }else{
      res.json(con[0]);
    }
  });
});

// Adds a record into the members_confirmation table
app.post('/addconfirmation', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members_confirmation SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add con. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// Edits the record in the members_confirmation table
app.post('/editconfirmation/:id', (req, res) =>{
  var values = req.body;
  connection.query('UPDATE members_confirmation SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update con. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
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

// Edits the record in the members_marriage table
app.post('/editcurrentmarriage/:id', (req, res) =>{
  var values = req.body;
  connection.query('UPDATE members_marriage SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update marr. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// Adds a record into the members_marriage table
app.post('/addcurrentmarriage', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members_marriage SET ?', values, function(error, results) {
    if (error) {
      console.log("Could not add marriage. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// This statement selects the information from the members_marriage table and displays it on the sacraments page
app.get('/viewmarriage/:id', (req, res) => {
  connection.query("SELECT * FROM members_marriage WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var mar = result;
    if (mar[0] == undefined){
      res.json({})
    }else{
      res.json(mar[0]);
    }
  });
});

// This statement selects the information from the members_prior_marriage table and displays it on the sacraments page
app.get('/viewpremarriage/:id', (req, res) => {
  connection.query("SELECT * FROM members_prior_marriage WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var premar = result;
    res.json(premar);
  });
});

// Adds a record into the members_prior_marriage table
app.post('/addpremar', (req, res) =>{
  var values = req.body;
  connection.query('INSERT INTO members_prior_marriage SET?', values, function(error, results) {
    if (error) {
      console.log("Could not add pre mar. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// Edits the record in the members_prior_marriage table
app.post('/editpremar/:id', (req, res) =>{
  var values = req.body;
  connection.query('UPDATE members_prior_marriage SET ? WHERE id = ?', [values, req.params.id ], function(error, results) {
    if (error) {
      console.log("Could not update premar. Try again",error)
    } else {
      var id = results;
      res.json(id);
    } 
  })
});

// Deletes a record from the members_prior_marriage table
app.post('/deletepremar/:id', (req, res) => {
  connection.query("DELETE FROM members_prior_marriage WHERE id = ?",[req.params.id], function (err, result, fields){
    if (err) {
      console.log("An application error has occured ", err);
    }else {
    var edit_role = result;
    res.json(edit_role);
    }
  });
});

// This statement selects the information from the members table and displays it on the edit page
// Note the 'get'
app.get('/editMember/:id', (req, res) => {
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    res.json(member[0]);
  });
});

// This statement updates the members table with the information from the edit page
// Note the 'post'
app.post('/editMember/:id', (req, res) =>{
  var values = req.body;
  connection.query('UPDATE members SET ? WHERE members_id = ?', [values, req.params.id], function (error, results, fields) {
    if (error) {
      console.log("An application error has occured ", error);
    }
  });
});

// This statement selects the information from the members table and displays it on the edit page
// Eventually this is used to go to the sacraments page
// Note the 'get'
app.get('/editMember/:id/sacrament', (req, res) => {
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    res.json(member[0]);
  });
});

// Gets information for the memberReport page
app.get('/memberReport/:id', (req, res) => {
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    res.json(member[0]);
  });
});

// Gets information for the communicationReport page
app.get('/communicationReport/:id', (req, res) => {
  connection.query("SELECT * FROM members WHERE members_id = ?",[req.params.id], function (err, result, fields){
    var member = result;
    res.json(member[0]);
  });
});

// Gets the count of each Inititate sub role
app.get('/manageReport/:subrole', (req, res) => {
  connection.query("SELECT COUNT(*) AS number FROM members_sub_roles WHERE sub_roles_id = ? AND status = 'A'",[req.params.subrole], function (err, result, fields){
    var number = JSON.stringify(result[0].number);
    res.json(number);
  });
});

// Gets a count of the total number of Initiate roles 
app.get('/manageReport', (req, res) => {
  connection.query("SELECT COUNT(*) AS number FROM members_sub_roles WHERE roles_id = 'INI' AND status = 'A'", function (err, result, fields){
    var number = JSON.stringify(result[0].number);
    res.json(number);
  });
});

// For all other paths on the client side that aren't accounted for, the server does this
app.get("/*",(req,res)=>{
  res.sendFile(path.join(__dirname,'/client/build/index.html'))
})

// When we deployed on Google Cloud Platform, the port used to listen in was 8080
// Most of the examples online used port 5000
// TODO: Change the listening port if necessary
const port = 8080;
app.listen(port, () => `Server running on port ${port}`);
