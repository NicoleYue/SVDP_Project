import React, { Component } from 'react';
import {Redirect} from "react-router-dom";
import "@material/react-chips/dist/chips.css";
import {ChipSet, Chip} from '@material/react-chips';
import '@material/react-material-icon/dist/material-icon.css';
import { IoMdClose } from "react-icons/io";

export default class Member extends Component {
  constructor(props) {
    super(props)
    this.state = {
      first_name : '',
      middle_name: '',
      last_name:'',
      address:'',
      address2:'',
      primary_email:'',
      secondary_email:'',
      gender:'',
      volunteers:[
        {label: 'Sponsor', id: '1'},
        {label: 'CateChist', id: '2'},
        {label: 'Director', id: '3'},
      ],
      supporters: [
        {label: 'Jane Smith',relationship:'Father', id: '1'},
        {label: 'John Doe',relationship:'Friend', id: '2'},
      ],
    };
  }

  componentDidMount() {
    const id = this.props.location.pathname
    console.log(id)
    fetch(id)
      .then(res => res.json())
      .then(member => this.setState({
        first_name: member.first_name, 
        last_name:member.last_name,
        address:member.address,
        address2:member.address2,
        primary_email:member.primary_email,
        secondary_email:member.secondary_email,
        gender:member.gender,
      }));
      
  }

  handleKeyDown = (e) => {
    // If you have a more complex input, you may want to store the value in the state.
    const label = e.target.value;
    if (!!label && e.key === 'Enter') {
      const id = label.replace(/\s/g,'');
      const chips = [...this.state.chips];
      if (chips.some((v) => v.id === id)) {
        console.error('There is already a chip which has same key.');
      } else {
        chips.push({label, id});
        this.setState({chips});
        e.target.value = '';
      }
    }
  };

handleInputChange = (event) => {
    const { value, name } = event.target;
    console.log("1",name, value)
    this.setState({
      name: value
    }, () => {
      console.log("2",name,value)
  });
  }

// changeFirstName = (event) =>{
//   this.setState({first_name:event.target.value})
// }

  onSubmit = (event) => {
  }

  render() {
    return (
      <div>
      <form onSubmit={this.onSubmit} style={{marginTop:0}}>
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:100}}>
          <label>First Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="first_name"
          value={this.state.first_name}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
          required
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Middle Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="middle_name"
          value={this.state.middle_name}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Last Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="last_name"
          value={this.state.last_name}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
          required
        />
        </div>


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Nickname</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="nickName"
          value={this.state.nickName}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>For Name Tag</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="forNameTag"
          value={this.state.forNameTag}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Gender</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.gender} onChange={this.handleInputChange}>
          <option defaultValue="M">Male</option>
          <option value="F">Female</option>
        </select>
        </div>
        </div>
        


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Street Address 1</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="address1"
          value={this.state.address}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Home Phone</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="homePhone"
          value={this.state.homePhone}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkhomePhone"
            type="checkbox"
            checked={this.state.checkhomePhone}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Primary Contact Method</label>
        </div>
        </div>
        

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Street Address 2</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="address2"
          value={this.state.address2}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Work Phone</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="workPhone"
          value={this.state.workPhone}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkWorkPhone"
            type="checkbox"
            checked={this.state.checkWorkPhone}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Primary Contact Method</label>
        </div>
        </div>



        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>City</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="city"
          value={this.state.city}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Mobile Phone</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="mobilePhone"
          value={this.state.mobilePhone}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkMobilePhone"
            type="checkbox"
            checked={this.state.checkMobilePhone}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Primary Contact Method</label>
        </div>
        </div>


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:100}}>
          <label>State</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}}>
          <option defaultValue="None">--</option>
          <option value="TX">Texas</option>
        </select>
        </div>


        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkText"
            type="checkbox"
            checked={this.state.checkText}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:100,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Text</label>
        </div>

        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkCall"
            type="checkbox"
            checked={this.state.checkCall}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Call</label>
        </div>
        </div>


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Zip Code</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="zipCode"
          value={this.state.zipCode}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Email Address 1</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="email1"
          value={this.state.primary_email}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
          required
        />
        </div>

        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkEmail1"
            type="checkbox"
            checked={this.state.checkEmail1}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Primary Contact Method</label>
        </div>
        </div>


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Date of Birth</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="birthday"
          value={this.state.birthday}
          onChange={this.handleInputChange}
          style={{width:163,height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Email Address 2</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="email2"
          value={this.state.secondary_email}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{float: 'left',marginTop:20,marginLeft:50}}>
          <input
            name="checkEmail2"
            type="checkbox"
            checked={this.state.checkEmail2}
            onChange={this.handleInputChange} />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:10}}>
          <label style={{color:'darkgrey'}}>Primary Contact Method</label>
        </div>
        </div>



        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Birth City</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="bithCity"
          value={this.state.bithCity}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Occupation</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="occupation"
          value={this.state.occupation}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>
        </div>



        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Birth State</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}}>
          <option defaultValue="None">--</option>
          <option value="TX">Texas</option>
        </select>
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Birth Country</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="birthCountry"
          value={this.state.birthCountry}
          onChange={this.handleInputChange}
          style={{height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
            <br/>
            <hr style={{marginLeft:100,marginTop:0,marginRight:100}}/>
        </div>



        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Initiate Role</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}}>
          <option defaultValue="INQ">Inquirer</option>
          <option value="CAT">Catechumen</option>
          <option value="CAN">Candidate</option>
          <option value="ELE">Elect</option>
          <option value="NEO">Neophyte</option>
        </select>
        </div>

        <div style={{width:130,marginTop:20,float: 'left',marginLeft:50}}>
          <label>Start Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="startDate"
          value={this.state.startDate}
          onChange={this.handleInputChange}
          style={{width:163,height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>Member Status</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}}>
          <option defaultValue="A">Active</option>
          <option value="I">Inactive</option>
        </select>
        </div>
        </div>


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Member's Path</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}}>
          <option defaultValue="INQ">RCIA</option>
          <option value="CAT">CI</option>
        </select>
        </div>

        <div style={{width:130,marginTop:20,float: 'left',marginLeft:50}}>
          <label>Start Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="startDate"
          value={this.state.startDate}
          onChange={this.handleInputChange}
          style={{width:163,height:20, padding:4}}
        />
        </div>

        <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}>
          <label>System User Type</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}}>
          <option defaultValue="N">None</option>
          <option value="U">User</option>
          <option value="A">Administrater</option>
        </select>
        </div>
        </div> 


        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Vounteers Role</label>
        </div>
        <div style={{float: 'left',marginTop:5}}>
        {/* <input type="text" onKeyDown={this.handleKeyDown} /> */}
        <ChipSet
          input
          updateChips={(volunteers) => this.setState({volunteers})}
        >
          {this.state.volunteers.map((volunteer) =>
            <Chip
              id={volunteer.id}
              key={volunteer.id} // The chip's key cannot be its index, because its index may change.
              label={volunteer.label}
              trailingIcon={<label> <IoMdClose /> </label>}
            />
          )}
        </ChipSet>
        </div>
        <div style={{float: 'right',marginTop:5,marginRight:150}}>
            <button type="submit" value="Submit" style={{width:170,height:30}}>Save</button>
        </div>
        </div>
        

        <div style={{clear:'both', marginTop:10,marginBottom:50}}>
        <div style={{width:130,marginTop:20,float: 'left',marginLeft:100}}>
          <label>Supporters</label>
        </div>
        <div style={{float: 'left',marginTop:5}}>
        {/* <input type="text" onKeyDown={this.handleKeyDown} /> */}
        <ChipSet
          input
          updateChips={(supporters) => this.setState({supporters})}
        >
          {this.state.supporters.map((supporter) =>
            <Chip
              id={supporter.id}
              key={supporter.id} // The chip's key cannot be its index, because its index may change.
              label={supporter.label + " : " + supporter.relationship}
              trailingIcon={<label> <IoMdClose /> </label>}
            />
          )}
        </ChipSet>
        </div>
        <div style={{float: 'right',marginTop:5,marginRight:150}}>
            <button onClick={<Redirect to="/" />} style={{width:170,height:30}}>Back to home page</button>
        </div>
        </div>
      </form>
      </div>
    );
  }
}
