import React, { Component } from 'react';
import "@material/react-chips/dist/chips.css";
import '@material/react-material-icon/dist/material-icon.css';
import 'react-notifications/lib/notifications.css';
import { Grid, Row, Col } from 'react-flexbox-grid';

export default class AddMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name : '',
      middle_name: '',
      last_name:'',
      nick_name:'',
      for_name_tag:'',
      address1:'',
      address2:'',
      primary_email:'',
      secondary_email:'',    
      primary_phone:'',
      secondary_phone:'',
      city:'',
      state:'',
      status:'A',
      check_text:false,
      check_call:false,
      zip:'',
      gender:'M',
      birthday:null,
      birth_city:'',
      occupation:'',
      birth_state:'',
      birth_country:'',
      member_path:'',
    };
  }


  onSubmit = (event) => {
    event.preventDefault();
    console.log(this.state);
    fetch('/addMember', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state)
      })
      .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/editMember/'+id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmit - addmember');
      });
  }


  render() {
    return (
      <div>
      <div style={{alignContent:'center',textAlign:'center'}}>
      <label ></label>
      </div>
      <form onSubmit={this.onSubmit} style={{marginTop:30}}>
      <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>First Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          required
          type="text"
          name="first_name"
          value={this.state.first_name}
          onChange={e => this.setState({ first_name: e.target.value})}
          style={{height:20, padding:4}}
          pattern='[a-zA-Z]{1,20}'
          maxLength = '20'
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Middle Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="middle_name"
          value={this.state.middle_name}
          onChange={e => this.setState({ middle_name: e.target.value})}
          style={{height:20, padding:4}}
          pattern='[a-zA-Z]{1,20}'
          maxLength = '20'
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Last Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          required
          type="text"
          name="last_name"
          value={this.state.last_name}
          onChange={e => this.setState({ last_name: e.target.value})}
          style={{height:20, padding:4}}
          pattern='[a-zA-Z]{1,20}'
          maxLength = '20'
        />
        </div>
        </Col>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Nickname</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="nick_name"
          value={this.state.nick_name}
          onChange={e => this.setState({ nick_name: e.target.value})}
          style={{height:20, padding:4}}
          maxLength= '20'
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>For Name Tag</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="for_name_tag"
          value={this.state.for_name_tag}
          onChange={e => this.setState({ for_name_tag: e.target.value})}
          style={{height:20, padding:4}}
          maxLength = '20'
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Gender</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.gender} onChange={e => this.setState({ gender: e.target.value})}>
          <option Value="M">Male</option>
          <option value="F">Female</option>
        </select>
        </div>
        </Col>
        </Row>
        
        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Street Address 1</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="address1"
          value={this.state.address1}
          onChange={e => this.setState({ address1: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Member status</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.status} onChange={e => this.setState({ status: e.target.value})}>
          <option Value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
        </div>
        </Col>
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Member Path</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.member_path} onChange={e => this.setState({ member_path: e.target.value})}>
          <option defaultValue="">N/A</option>
          <option value="RCIA">RCIA</option> 
          <option value="AC">Adult Comfirmation</option>
          <option value="ES">Essentials</option>
        </select>
        </div>
        </Col>
        </Row>
        
        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Street Address 2</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="address2"
          value={this.state.address2}
          onChange={e => this.setState({ address2: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Primary Phone</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="primary_phone"
          value={this.state.primary_phone}
          onChange={e => this.setState({ primary_phone: e.target.value})}
          style={{height:20, padding:4}}
          maxLength='10'
          pattern='[0-9]{10}'
        />
        </div>
        </Col>
        <Col xs={3.5}/>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>City</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="city"
          value={this.state.city}
          onChange={e => this.setState({ city: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Secondary Phone</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="secondary_phone"
          value={this.state.secondary_phone}
          onChange={e => this.setState({ secondary_phone: e.target.value})}
          style={{height:20, padding:4}}
          maxLength='10'
          pattern='[0-9]{10}'
        />
        </div>
        </Col>
        <Col xs={3.5}/>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>State</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.state} onChange={e => this.setState({ state: e.target.value})}>
          <option defaultValue="">--</option>
          <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        </div>
        </Col>
        <Col xs={2}>
        <div style={{float: 'left',marginTop:20,marginLeft:20}}>
          <input
            name="check_text"
            type="checkbox"
            checked={this.state.check_text}
            onChange={e => this.setState({ check_text: !this.state.check_text})} />
        </div>
        <div style={{width:60,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Text</label>
        </div>
        </Col>
        <Col xs={2}>
        <div style={{float: 'left',marginTop:20,marginLeft:0}}>
          <input
            name="check_call"
            type="checkbox"
            checked={this.state.check_call}
            onChange={e => this.setState({ check_call:!this.state.check_call})} />
        </div>
        <div style={{width:60,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Call</label>
        </div>
        </Col>
        <Col xs={3}/>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Zip Code</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="zip"
          value={this.state.zip}
          onChange={e => this.setState({ zip: e.target.value})}
          style={{height:20, padding:4}}
          maxLength='5'
          pattern='[0-9]{5}'
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Primary Email</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          required
          type="email"
          name="primary_email"
          value={this.state.primary_email}
          onChange={e => this.setState({ primary_email: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>
        <Col xs={3.5}/>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Date of Birth</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="birthday"
          value={this.state.birthday}
          onChange={e => this.setState({ birthday: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Secondary Email</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="email"
          name="secondary_email"
          value={this.state.secondary_email}
          onChange={e => this.setState({ secondary_email: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>
        <Col xs={3.5}/>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Birth City</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="birth_city"
          value={this.state.birth_city}
          onChange={e => this.setState({ birth_city: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Occupation</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          onChange={e => this.setState({ occupation: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>
        <Col xs={3.5}/>
        </Row>



        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Birth State</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.birth_state} onChange={e => this.setState({ birth_state: e.target.value})}>
        <option defaultValue="">--</option>
        <option value="AL">Alabama</option>
          <option value="AK">Alaska</option>
          <option value="AZ">Arizona</option>
          <option value="AR">Arkansas</option>
          <option value="CA">California</option>
          <option value="CO">Colorado</option>
          <option value="CT">Connecticut</option>
          <option value="DE">Delaware</option>
          <option value="FL">Florida</option>
          <option value="GA">Georgia</option>
          <option value="HI">Hawaii</option>
          <option value="ID">Idaho</option>
          <option value="IL">Illinois</option>
          <option value="IN">Indiana</option>
          <option value="IA">Iowa</option>
          <option value="KS">Kansas</option>
          <option value="KY">Kentucky</option>
          <option value="LA">Louisiana</option>
          <option value="ME">Maine</option>
          <option value="MD">Maryland</option>
          <option value="MA">Massachusetts</option>
          <option value="MI">Michigan</option>
          <option value="MN">Minnesota</option>
          <option value="MS">Mississippi</option>
          <option value="MO">Missouri</option>
          <option value="MT">Montana</option>
          <option value="NE">Nebraska</option>
          <option value="NV">Nevada</option>
          <option value="NH">New Hampshire</option>
          <option value="NJ">New Jersey</option>
          <option value="NM">New Mexico</option>
          <option value="NY">New York</option>
          <option value="NC">North Carolina</option>
          <option value="ND">North Dakota</option>
          <option value="OH">Ohio</option>
          <option value="OK">Oklahoma</option>
          <option value="OR">Oregon</option>
          <option value="PA">Pennsylvania</option>
          <option value="RI">Rhode Island</option>
          <option value="SC">South Carolina</option>
          <option value="SD">South Dakota</option>
          <option value="TN">Tennessee</option>
          <option value="TX">Texas</option>
          <option value="UT">Utah</option>
          <option value="VT">Vermont</option>
          <option value="VA">Virginia</option>
          <option value="WA">Washington</option>
          <option value="WV">West Virginia</option>
          <option value="WI">Wisconsin</option>
          <option value="WY">Wyoming</option>
        </select>
        </div>
        </Col>

        <Col xs={3.5}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Birth Country</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="birth_country"
          value={this.state.birth_country}
          onChange={e => this.setState({ birth_country: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </Col>
        <Col xs={3.5}>
        <div style={{textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
            <button type="submit" value="Submit" style={{width:150,height:30}}>Add Member</button>
        </div>
        <div style={{float: 'left',marginTop:20,marginLeft:10}}>
            <button onClick={()=>this.props.history.push('/')} style={{width:160,height:30}}>Cancel</button>
        </div>
        </Col>
        </Row>
    
      </form>
      </div>
    );
  }
}
