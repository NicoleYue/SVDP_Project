import React, { Component } from 'react';
import "@material/react-chips/dist/chips.css";
import '@material/react-material-icon/dist/material-icon.css';
import 'react-notifications/lib/notifications.css';
import ReactTable from "react-table";
import "react-table/react-table.css";
import Modal from 'react-responsive-modal';
import './datetime.css'
import { fakeAuth } from "../context/auth";
import { Row, Col } from 'react-flexbox-grid';

export default class EditMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
      members_id:'',
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
      member:{},
      isOpen: false,
      isOpen2: false,
      role:'ADM',
      supporter_name:'',
      supporter_name2:'',
      sub_role:'',
      start_date:null,
      end_date:null,
      role2:'ADM',
      sub_role2:'',
      start_date2:null,
      end_date2:null,
      status2:"",
      isOpenCommunication: false,
      isOpenCommunication2: false,
      initiate_role:'',
      initiate_role_date:null,
      role_table:{},
      notes:'',
      all_roles:[],
      all_com:[],
      bap:{},
      mar:{},
      role_id2:'',
      message:'',
      event_type_id:'EM',
      communication_date_time:null,
      communication_title:'',
      communication_notes:'',
      follow_up_date_time:null,
      com_id:'',
      event_type_id2:'EM',
      communication_date_time2:null,
      communication_title2:'',
      communication_notes2:'',
      follow_up_date_time2:null,
      communication_table:{},
      isOpenSacraments:false,
      church_name:'',
      file:'',
      contact_phone:'',
      church_address:'',
      baptism_date:null,
      denomination:'',
      denomination2:'',
      spouse_name:'',
      spouse_baptismal_status:'BA',
      marriage_type:'CI',
      marriage_date:null,
      convalidation_date:null,
      baptism_table:[],
      current_marriage_table:[],
      bap_id:'',
      mar_id:'',
      promoteOpen:false,
      currentIniRole:'',
      iniRole:'',
      promote_date:null,
      promote_notes:'',
      promote_table:{},
    };
  }
  //open or close the add role modal
  //modal is a popup with a libary "react-responsive-modal"
  toggleModal = () => {
    this.setState({
      isOpen: !this.state.isOpen
    });
  }
  //open or close the edit role modal
  toggleModal2 = () => {
    this.setState({
      isOpen2: !this.state.isOpen2
    });
  }
  //open or close the promote modal
  togglePromote= () => {
    this.setState({
      promoteOpen: !this.state.promoteOpen,
      iniRole:'INQ'
    });
    if (Object.getOwnPropertyNames(this.state.promote_table).length > 0){
      if (this.state.promote_table.sub_roles_id == 'INQ'){
        this.setState({
          currentIniRole:"Inquirer",
          iniRole:'CAT'
        });
      }else if (this.state.promote_table.sub_roles_id == 'CAT'){
        this.setState({
          currentIniRole:"Catechumen",
          iniRole:'CAN'
        });
      }else if (this.state.promote_table.sub_roles_id == 'CAN'){
        this.setState({
          currentIniRole:"Candidate",
          iniRole:'ELE'
        });
      }else if (this.state.promote_table.sub_roles_id == 'ELE'){
        this.setState({
          currentIniRole:"Elect",
          iniRole:'NEO'
        });
      }else if (this.state.promote_table.sub_roles_id == 'NEO'){
        this.setState({
          currentIniRole:"Neophyte",
          iniRole:''
        });
      }
    }else{
      this.setState({
        currentIniRole:"None",
      },()=>{console.log("No this.state.promote_table", this.state.currentIniRole)});
    }
  }
  //open or close the add communication modal
  toggleCommunication = () => {
    this.setState({
      isOpenCommunication: !this.state.isOpenCommunication
    });
  }
  //open or close the edit communication modal
  toggleCommunication2 = () => {
    this.setState({
      isOpenCommunication2: !this.state.isOpenCommunication2
    });
  }
  //Direct sacraments page of each member
  toggleSacraments = () => {
    this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');
}
  componentDidMount() {
  const id = this.props.location.pathname;
  const userid = fakeAuth.user_id;
  //console.log(id)
  fetch(id)
    .then(res => res.json())
    .then(member => this.setState({
      members_id:member.members_id,
      first_name : member.first_name, 
      middle_name: member.middle_name,
      last_name:member.last_name,
      nick_name:member.nick_name,
      for_name_tag:member.for_name_tag,
      address1:member.address1,
      address2:member.address2,
      primary_email:member.primary_email,
      secondary_email:member.secondary_email,
      primary_phone:member.primary_phone,
      secondary_phone:member.secondary_phone,
      city:member.city,
      state:member.state,
      status:member.status,
      check_text:member.check_text,
      check_call:member.check_call,
      zip:member.zip,
      gender:member.gender,
      birthday:member.birthday,
      birth_city:member.birth_city,
      occupation:member.occupation,
      birth_state:member.birth_state,
      birth_country:member.birth_country,
      member_path:member.member_path,
      notes:member.notes,
      message:"",
    }, () => {
      fetch("/viewrole/"+this.state.members_id)
    .then(res => res.json())
    .then(all_roles => this.setState({all_roles}));

    fetch("/viewpromote/"+this.state.members_id)
    .then(res => res.json())
    .then(promote_table => this.setState({promote_table}));

    fetch("/viewcommunication/"+this.state.members_id+'/'+userid)
    .then(res => res.json())
    .then(all_com => this.setState({all_com}));


    fetch("/viewbaptism/"+this.state.members_id)
    .then(res => res.json())
    .then(bap => this.setState({bap}));

    fetch("/viewmarriage/"+this.state.members_id)
    .then(res => res.json())
    .then(mar => this.setState({mar}));
    }));
    
}
  //post data to database to add a new commmunication
  addCommunication = (event) => {
    //fakeAuth.user_id is the id for the user who logined to the account
    console.log("fakeAuth.user_id",fakeAuth.isAuthenticated,fakeAuth.user_id)
    event.preventDefault();
    //set data from database to states in front-end
    this.setState({
      communication_table: {
        members_id: this.state.members_id,
        users_id: fakeAuth.user_id,
        event_type_id:this.state.event_type_id,
        communication_date:this.state.communication_date_time,
        title:this.state.communication_title,
        notes:this.state.communication_notes,
        follow_up_date:this.state.follow_up_date_time,
      }
    }, () => {
      console.log("communication_table",this.state.communication_table)
      console.log()
      //link to "/addcommunication" in "server.js"
      fetch("/addcommunication", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.communication_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id);
          this.setState({
            event_type_id:'EM',
            communication_date:null,
            title:"",
            notes:"",
            follow_up_date:null,
          });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitcomm');
      });
  });
  }
  //delete the selected communication
  deleteCommunication = (event) =>{
    event.preventDefault();
    const id = this.state.com_id;
    console.log(id)
    //link to "/deletecommunication/:id" in "server.js"
    fetch("/deletecommunication/"+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: ""
    })
    // .then(res => res.json())
    .then((id) => 
       {this.props.history.push('/');
         this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
    )
    .catch(err => {
      console.log(err);
      alert('Error logging in please try again - ondeletecom');
    });


  }
  //edit the selected communication
  editCommunication = (event) => {
    event.preventDefault();
    //if this.state.communication_date_time2 does not have date entered, setstate as null
    if ((this.state.communication_date_time2 == 'Invalid date' || this.state.communication_date_time2 == '') && (this.state.follow_up_date_time2 == 'Invalid date' || this.state.follow_up_date_time2 == '')){
    this.setState({
      communication_table: {
        event_type_id:this.state.event_type_id2,
        communication_date:null,
        title:this.state.communication_title2,
        notes:this.state.communication_notes2,
        follow_up_date:null,
      }
    }, () => {
      const id = this.state.com_id;
      console.log("changed com",this.state.communication_table)
      //link to "/editcommunication/:id" in "server.js"
      fetch("/editcommunication/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.communication_table)
      })
      .then((id) => 
      //push to home page, then push to editmember page to refresh the page
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditcom');
      });
  });
  }else if (this.state.communication_date_time2 == 'Invalid date' || this.state.communication_date_time2 == ''){
    this.setState({
      communication_table: {
        event_type_id:this.state.event_type_id2,
        communication_date:null,
        title:this.state.communication_title2,
        notes:this.state.communication_notes2,
        follow_up_date:this.state.follow_up_date_time2,
      }
    }, () => {
      const id = this.state.com_id;
      console.log("changed com",this.state.communication_table)
      fetch("/editcommunication/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.communication_table)
      })
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditcom');
      });
  });
  }else if (this.state.follow_up_date_time2 == 'Invalid date' || this.state.follow_up_date_time2 == ''){
    this.setState({
      communication_table: {
        event_type_id:this.state.event_type_id2,
        communication_date:this.state.communication_date_time2,
        title:this.state.communication_title2,
        notes:this.state.communication_notes2,
        follow_up_date:null,
      }
    }, () => {
      const id = this.state.com_id;
      console.log("changed com",this.state.communication_table)
      fetch("/editcommunication/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.communication_table)
      })
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditcom');
      });
  });
  }else{
    this.setState({
      communication_table: {
        event_type_id:this.state.event_type_id2,
        communication_date:this.state.communication_date_time2,
        title:this.state.communication_title2,
        notes:this.state.communication_notes2,
        follow_up_date:this.state.follow_up_date_time2,
      }
    }, () => {
      const id = this.state.com_id;
      console.log("changed com",this.state.communication_table)
      fetch("/editcommunication/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.communication_table)
      })
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditcom');
      });
  });
  }


  }
  //save & update the member information
  onSubmit = (event) => {
    event.preventDefault();
    const id = this.props.location.pathname;
    if (this.state.birthday == 'Invalid date' || this.state.birthday == ''){
    this.setState({
      member: {
        first_name : this.state.first_name, 
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        nick_name:this.state.nick_name,
        for_name_tag:this.state.for_name_tag,
        address1:this.state.address1,
        address2:this.state.address2,
        primary_email:this.state.primary_email,
        secondary_email:this.state.secondary_email,
        primary_phone:this.state.primary_phone,
        secondary_phone:this.state.secondary_phone,
        city:this.state.city,
        state:this.state.state,
        status:this.state.status,
        check_text:this.state.check_text,
        check_call:this.state.check_call,
        zip:this.state.zip,
        gender:this.state.gender,
        birthday: null,
        birth_city:this.state.birth_city,
        occupation:this.state.occupation,
        birth_state:this.state.birth_state,
        birth_country:this.state.birth_country,
        member_path:this.state.member_path,
      } ,message: "Member saved successfully!"
    }, () => {
      fetch(id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.member)
      })
      .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmit - editmember');
      });  
  });
  }else{
    this.setState({
      member: {
        first_name : this.state.first_name, 
        middle_name: this.state.middle_name,
        last_name: this.state.last_name,
        nick_name:this.state.nick_name,
        for_name_tag:this.state.for_name_tag,
        address1:this.state.address1,
        address2:this.state.address2,
        primary_email:this.state.primary_email,
        secondary_email:this.state.secondary_email,
        primary_phone:this.state.primary_phone,
        secondary_phone:this.state.secondary_phone,
        city:this.state.city,
        state:this.state.state,
        status:this.state.status,
        check_text:this.state.check_text,
        check_call:this.state.check_call,
        zip:this.state.zip,
        gender:this.state.gender,
        birthday: this.state.birthday,
        birth_city:this.state.birth_city,
        occupation:this.state.occupation,
        birth_state:this.state.birth_state,
        birth_country:this.state.birth_country,
        member_path:this.state.member_path,
      } ,message: "Member saved successfully!"
    }, () => {
      fetch(id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.member)
      })
      .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmit - editmember');
      });  
  });
  }
  }
  //delete the selected role
  deleteRole= (event) =>{
    event.preventDefault();
    const id = this.state.role_id2;
    console.log(id)
    fetch("/deleterole/"+id, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: ""
    })
    // .then(res => res.json())
    .then((id) => 
       {this.props.history.push('/');
         this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
    )
    .catch(err => {
      console.log(err);
      alert('Error logging in please try again - ondeleterole');
    });


  }
  //add a new role to this member
  onSubmitRole = (event) => {
    event.preventDefault();
    this.setState({
      role_table: {
        members_id: this.state.members_id,
        roles_id : this.state.role, 
        sub_roles_id: this.state.sub_role,
        start_date: this.state.start_date,
        notes:this.state.notes,
        supporter_name:this.state.supporter_name,
        status:'A',
      }
    }, () => {
      console.log(this.state.role_table)
      fetch("/addrole", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.role_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id);
          this.setState({
            role:'INI',
            sub_role:'',
            start_date:null,
            end_date:null,
            isOpen:false,
          });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitrole');
      });
  });
  }
  //edit the selected role
  onEditRole = (event) => {
    event.preventDefault();
    //console.log("this.state.start_date2,this.state.end_date2",this.state.start_date2,this.state.end_date2)

    if ((this.state.start_date2 == 'Invalid date' || this.state.start_date2 == '') && (this.state.end_date2 == 'Invalid date' || this.state.end_date2 == '')){
    this.setState({
      role_table: {
        roles_id : this.state.role2, 
        sub_roles_id: this.state.sub_role2,
        notes:this.state.notes2,
        status:this.state.status2,
        start_date:null,
        supporter_name:this.state.supporter_name2,
        end_date:null,
      }
    }, () => {
      const id = this.state.role_id2;
      console.log("changed roles",this.state.role_table)
      fetch("/editrole/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.role_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditrole');
      });
  });
  }else if (this.state.start_date2 == 'Invalid date' || this.state.start_date2 == ''){
    this.setState({
      role_table: {
        roles_id : this.state.role2, 
        sub_roles_id: this.state.sub_role2,
        notes:this.state.notes2,
        status:this.state.status2,
        start_date:null,
        end_date:this.state.end_date2,
      }
    }, () => {
      const id = this.state.role_id2;
      console.log("changed roles",this.state.role_table)
      fetch("/editrole/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.role_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditrole');
      });
  });
  }else if (this.state.end_date2 == 'Invalid date' || this.state.end_date2 == ''){
    this.setState({
      role_table: {
        roles_id : this.state.role2, 
        sub_roles_id: this.state.sub_role2,
        notes:this.state.notes2,
        status:this.state.status2,
        start_date:this.state.start_date2,
        end_date:null,
      }
    }, () => {
      const id = this.state.role_id2;
      console.log("changed roles",this.state.role_table)
      fetch("/editrole/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.role_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditrole');
      });
  });
  }else{
    this.setState({
      role_table: {
        roles_id : this.state.role2, 
        sub_roles_id: this.state.sub_role2,
        notes:this.state.notes2,
        status:this.state.status2,
        start_date:this.state.start_date2,
        end_date:this.state.end_date2,
      }
    }, () => {
      const id = this.state.role_id2;
      console.log("changed roles",this.state.role_table)
      fetch("/editrole/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.role_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
           this.props.history.push('/editMember/'+this.state.members_id);} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditrole');
      });
  });
  }


  }
  //promote member's role
  onSubmitPromote= (event) => {
    event.preventDefault();
    this.setState({
      promote_table: {
        members_id: this.state.members_id,
        roles_id : 'INI', 
        sub_roles_id: this.state.iniRole,
        start_date: this.state.promote_date,
        notes:this.state.promote_notes,
        status:'A',
      }
    }, () => {
      console.log(this.state.promote_table)
      fetch("/promoterole/"+ this.state.members_id +'/' + this.state.promote_date, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.promote_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id);
          this.setState({
            promoteOpen:false,
            iniRole:'',
            promote_date:null,
            promote_notes:'',
          });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitPromote');
      });
  });
  }


  render() {
    let select_subrole;
    let supporter_name = null;
    if(this.state.role === "ADM"){
      select_subrole =<select style={{width:175,height:30, padding:0}} value={this.state.sub_role} onChange={e => this.setState({ sub_role: e.target.value})}>
        <option Value="">--</option>
        <option Value="USE">User</option>
        <option value="SYS">System Administrator</option>
      </select>
    }else if(this.state.role === "MIN"){
      select_subrole =<select style={{width:175,height:30, padding:0}} value={this.state.sub_role} onChange={e => this.setState({ sub_role: e.target.value})}>
        <option Value="">--</option>
        <option value="DIR">Director</option>
        <option value="ADT">Admin Team</option>
        <option value="SOM">Social Ministry</option>
        <option value="CTC">Catechist</option>
        <option value="IQT">Inquiry Team</option>
        <option value="SPO">Sponsor</option>
        <option value="SPC">Sponsor Coordinator</option>
        <option value="EVC">Event Coordinator</option>
        <option value="RTC">Retreat Coordinator</option>
      </select>
    }else if(this.state.role === "SUP"){
      select_subrole =<select style={{width:175,height:30, padding:0}} value={this.state.sub_role} onChange={e => this.setState({ sub_role: e.target.value})}>
        <option Value="">--</option>
        <option value="FRI">Friend</option>
        <option value="FAM">Family</option>
        <option value="SPU">Spouse</option>
        <option value="COM">Companion</option>
      </select>
      supporter_name =  <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Supporter Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="supporter_name"
          value={this.state.supporter_name}
          onChange={e => this.setState({ supporter_name: e.target.value})}
          style={{height:20, padding:4}}
          required
        />
        </div>
        </div>
    }

    let select_subrole2;
    let supporter_name2 = null;
    if(this.state.role2 === "ADM"){
      select_subrole2 =<select style={{width:175,height:30, padding:0}} value={this.state.sub_role2} onChange={e => this.setState({ sub_role2: e.target.value})}>
        <option Value="">--</option>
        <option Value="USE">User</option>
        <option value="SYS">System Administrator</option>
      </select>
    }else if(this.state.role2 === "MIN"){
      select_subrole2 =<select style={{width:175,height:30, padding:0}} value={this.state.sub_role2} onChange={e => this.setState({ sub_role2: e.target.value})}>
        <option Value="">--</option>
        <option value="DIR">Director</option>
        <option value="ADT">Admin Team</option>
        <option value="SOM">Social Ministry</option>
        <option value="CTC">Catechist</option>
        <option value="IQT">Inquiry Team</option>
        <option value="SPO">Sponsor</option>
        <option value="SPC">Sponsor Coordinator</option>
        <option value="EVC">Event Coordinator</option>
        <option value="RTC">Retreat Coordinator</option>
      </select>
    }else if(this.state.role2 === "SUP"){
      select_subrole2 =<select style={{width:175,height:30, padding:0}} value={this.state.sub_role2} onChange={e => this.setState({ sub_role2: e.target.value})}>
        <option Value="">--</option>
        <option value="FRI">Friend</option>
        <option value="FAM">Family</option>
        <option value="SPU">Spouse</option>
        <option value="COM">Companion</option>
      </select>
       supporter_name2 =  <div style={{clear:'both', marginTop:10}}>
       <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
         <label>Supporter Name</label>
       </div>
       <div style={{float: 'left',marginTop:15}}>
       <input
         type="text"
         name="supporter_name2"
         value={this.state.supporter_name2}
         onChange={e => this.setState({ supporter_name2: e.target.value})}
         style={{height:20, padding:4}}
         required
       />
       </div>
       </div>
    }
    let select_iniRole;
    let select_button;
    if(this.state.currentIniRole === "None"){
      select_iniRole = <select style={{width:175,height:30, padding:0}} value={this.state.iniRole} onChange={e => this.setState({ iniRole: e.target.value})}>
      <option Value="INQ">Inquirer</option>
      <option value="CAT">Catechumen</option>
      <option value="CAN">Candidate</option>
      <option value="ELE">Elect</option>
      <option value="NEO">Neophyte</option>
    </select>
      select_button =<button type="submit" value="Submit" style={{width:130,height:30}}>Promote</button>
    }else if(this.state.currentIniRole === "Inquirer"){
      select_iniRole =<select style={{width:175,height:30, padding:0}} value={this.state.iniRole} onChange={e => this.setState({ iniRole: e.target.value})}>
      <option value="CAT">Catechumen</option>
      <option value="CAN">Candidate</option>
      <option value="ELE">Elect</option>
      <option value="NEO">Neophyte</option>
    </select>
    select_button =<button type="submit" value="Submit" style={{width:130,height:30}}>Promote</button>
    }else if(this.state.currentIniRole === "Catechumen"){
      select_iniRole =<select style={{width:175,height:30, padding:0}} value={this.state.iniRole} onChange={e => this.setState({ iniRole: e.target.value})}>
      <option value="CAN">Candidate</option>
      <option value="ELE">Elect</option>
      <option value="NEO">Neophyte</option>
    </select>
    select_button =<button type="submit" value="Submit" style={{width:130,height:30}}>Promote</button>
    }else if(this.state.currentIniRole === "Candidate"){
      select_iniRole =<select style={{width:175,height:30, padding:0}} value={this.state.iniRole} onChange={e => this.setState({ iniRole: e.target.value})}>
      <option value="ELE">Elect</option>
      <option value="NEO">Neophyte</option>
    </select>
    select_button =<button type="submit" value="Submit" style={{width:130,height:30}}>Promote</button>
    }else if(this.state.currentIniRole === "Elect"){
      select_iniRole =<select style={{width:175,height:30, padding:0}} value={this.state.iniRole} onChange={e => this.setState({ iniRole: e.target.value})}>
      <option value="NEO">Neophyte</option>
    </select>
    select_button =<button type="submit" value="Submit" style={{width:130,height:30}}>Promote</button>
    }else if(this.state.currentIniRole === "Neophyte"){
      select_iniRole =<label> Unable to Promote</label>
      select_button =<label></label>
    }

    return (
      <div>
      <div style={{alignContent:'center',textAlign:'center'}}>
      <label style={{color:"black",textAlign:'center',backgroundColor: this.state.message==="" ?  'white' :'#d2f8d2',padding:8, borderRadius:10}}>{this.state.message}</label>
      </div>
      <form onSubmit={this.onSubmit} style={{marginTop:10}}>
        <Row middle="xs">
        <Col xs={1} />
          <Col xs={3.5} >
        {/* <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:100}}> */}
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:10,marginLeft:0}}>
          <label>First Name</label>
        </div>
        {/* </div> */}
        {/* <div style={{float: 'left',marginTop:15}}> */}
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
        {/* </div> */}
        </Col>
        <Col xs={3.5} >
        {/* <div style={{width:130,float: 'left',marginTop:20,marginLeft:50}}> */}
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:10,marginLeft:0}}>
          <label>Middle Name</label>
          </div>
        {/* </div> */}
        {/* <div style={{float: 'left',marginTop:15}}> */}
        <input
          type="text"
          value={this.state.middle_name}
          onChange={e => this.setState({ middle_name: e.target.value})}
          style={{height:20, padding:4}}
          pattern='[a-zA-Z]{1,20}'
          maxLength = '20'
        />
        {/* </div> */}
        </Col>
        <Col xs={3.5} >
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:10,marginLeft:0}}>
          <label>Last Name</label>
        </div>
        <input
          required
          type="text"
          value={this.state.last_name}
          onChange={e => this.setState({ last_name: e.target.value})}
          style={{height:20, padding:4}}
          pattern='[a-zA-Z]{1,20}'
          maxLength = '20'
        />
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

        <Col xs={3.5} >
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

        <Col xs={3.5} >
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
        <Col xs={3.5} >
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

        <Col xs={3.5} >
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
        <Col xs={3.5} />
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5} >
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

        <Col xs={3.5} >
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
        <Col xs={3.5} />
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5} >
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

        <Col xs={2} >
        <div style={{width:20,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <input
            name="check_text"
            type="checkbox"
            checked={this.state.check_text}
            onChange={e => this.setState({ check_text: !this.state.check_text})} />
        </div>
        <div style={{width:60,float: 'left',marginTop:20,marginLeft:5}}>
          <label style={{color:'darkgrey'}}>Text</label>
        </div>
        </Col>

        <Col xs={2} >
        <div style={{width:20,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <input
            name="check_call"
            type="checkbox"
            checked={this.state.check_call}
            onChange={e => this.setState({ check_call:!this.state.check_call})} />
        </div>
        <div style={{width:60,float: 'left',marginTop:20,marginLeft:5}}>
          <label style={{color:'darkgrey'}}>Call</label>
        </div>
        </Col>

        <Col xs={3} />
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5} >
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

        <Col xs={3.5} >
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

        <Col xs={3.5} >
        <div style={{width:150,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
         <button onClick={()=>this.props.history.push('/memberReport/'+this.state.members_id)} style={{width:150,height:30}}>Member Report</button>
        </div>
        {/* </Col>
        <Col xs={1.5} > */}
        <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:10}}>
        <button onClick={()=>this.props.history.push('/communicationReport/'+this.state.members_id)} style={{width:160,height:30}}>Communication Report</button>
        </div>
        </Col>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5} >
        <div style={{width:130,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
          <label>Date of Birth</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="birthday"
          value={this.state.birthday}
          onChange={e => this.setState({ birthday:  e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </Col>

        <Col xs={3.5} >
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

        <Col xs={3.5} >
        <div style={{textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
            <button type="button" onClick={this.toggleModal} style={{width:150,height:30}}>Add Role</button>
        </div>
        <div style={{float: 'left',marginTop:20,marginLeft:10}}>
            <button type="button" onClick={this.toggleCommunication} style={{width:160,height:30}}>Add Communication</button>
        </div>
        </Col>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5} >
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

        <Col xs={3.5} >
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
        <Col xs={3.5} >
        <div style={{float: 'left',marginTop:15,marginLeft:0}}>
            <button type="button" onClick={this.toggleSacraments} style={{width:150,height:30}}>Sacraments</button>
        </div>
        <div style={{float: 'left',marginTop:15,marginLeft:10}}>
            <button type="button" onClick={this.togglePromote} style={{width:160,height:30}}>Promote</button>
        </div>
        </Col>
        </Row>

        <Row around="xs">
        <Col xs={1} />
        <Col xs={3.5} >
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

        <Col xs={3.5} >
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
        <Col xs={3.5} >
        <div style={{float: 'left',marginTop:15,marginLeft:0}}>
            <button type="submit" value="Submit" style={{width:320,height:30}}>Save</button>
        </div>
        </Col>
        </Row>

        <div style={{clear:'both', marginTop:0}}>
            <br/>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        </div>
      </form>

      <div style={{marginTop:20,textAlign:'center',marginLeft:100,marginRight:100,marginBottom:30}}>
      <h2>Roles</h2>
      <ReactTable
          data={this.state.all_roles}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                //console.log('It was in this row:', rowInfo)
                if (rowInfo !== undefined){
                  var row = rowInfo.original
                  if (rowInfo.original.roles_id == "INI"){
                    // this.togglePromote;
                    this.setState({
                      promoteOpen:true,
                    })
                    if (Object.getOwnPropertyNames(this.state.promote_table).length > 0){
                      if (this.state.promote_table.sub_roles_id == 'INQ'){
                        this.setState({
                          currentIniRole:"Inquirer",
                        });
                      }else if (this.state.promote_table.sub_roles_id == 'CAT'){
                        this.setState({
                          currentIniRole:"Catechumen",
                        });
                      }else if (this.state.promote_table.sub_roles_id == 'CAN'){
                        this.setState({
                          currentIniRole:"Candidate",
                        });
                      }else if (this.state.promote_table.sub_roles_id == 'ELE'){
                        this.setState({
                          currentIniRole:"Elect",
                        });
                      }else if (this.state.promote_table.sub_roles_id == 'NEO'){
                        this.setState({
                          currentIniRole:"Neophyte",
                        });
                      }
                    }else{
                      this.setState({
                        currentIniRole:"None",
                      },()=>{console.log("No this.state.promote_table", this.state.currentIniRole)});
                    }
                  }else{
                    this.setState({
                      role_id2: rowInfo.original.id,
                      role2: rowInfo.original.roles_id,
                      sub_role2:rowInfo.original.sub_roles_id,
                      notes2:rowInfo.original.notes,
                      start_date2:rowInfo.original.start_date,
                      status2: rowInfo.original.status,
                      end_date2:rowInfo.original.end_date,
                      supporter_name2:rowInfo.original.supporter_name,
                      isOpen2: true,
                    });
                }
                }
              }
            }
          }}
          columns={[
            {
              columns: [
                {
                  Header: "Role",
                  accessor: "roles_id",
                  maxWidth: 120,
                  Cell: ({ value }) => (
                    value === "ADM" ? "Administrator" :
                    value === "INI" ? "Initiate" :
                    value === "MIN" ? "Minister" :
                    value === "SUP" ? "Supporter" :
                    "N/A"),
                },
                {
                  Header: "Sub-Role",
                  accessor: "sub_roles_id",
                  maxWidth: 120,
                  Cell: ({ value }) => (
                    value === "ADT" ? "Admin Team" :
                    value === "CAN" ? "Candidate" :
                    value === "CAT" ? "Catechumen" :
                    value === "COM" ? "Companion" :
                    value === "CTC" ? "Catechist" :
                    value === "DIR" ? "Director" :
                    value === "ELE" ? "Elect" :
                    value === "EVC" ? "Event Coordinator" :
                    value === "FAM" ? "Family" :
                    value === "FRI" ? "Friend" :
                    value === "INQ" ? "Inquirer" :
                    value === "IQC" ? "Inquirer Coordinator" :
                    value === "IQT" ? "Inquiry Team" :
                    value === "NEO" ? "Neophyte" :
                    value === "RTC" ? "Retreat Coordinator" :
                    value === "SOM" ? "Social Ministry" :
                    value === "SPC" ? "Sponsor Coordinator" :
                    value === "SPO" ? "Sponsor" :
                    value === "SPU" ? "Spouse" :
                    value === "SYS" ? "System Administrator" :
                    value === "USE" ? "User" :
                    "N/A"),
                },
                {
                  Header: "Status",
                  accessor: "status",
                  maxWidth: 120,
                  Cell: ({ value }) => (value === "A" ? "Active" : "Inactive"),
                },
                {
                  Header: "Start Date",
                  accessor: "start_date",
                  maxWidth: 130,
                  Cell: ({ value }) => (value === "Invalid date" ? "" : value),
                },
                {
                  Header: "End Date",
                  accessor: "end_date",
                  maxWidth: 130,
                  Cell: ({ value }) => (value === "Invalid date" ? "" : value),
                },
                {
                  Header: "Notes",
                  accessor: "notes",
                },
              ]
            }
          ]}
          defaultPageSize={5}
          defaultSorted={[{ // the sorting model for the table
            id: 'status',
            desc: false
          }]}
          className="-striped -highlight"
        />
        </div>
        <div style={{marginTop:20,textAlign:'center',marginLeft:100,marginRight:100,marginBottom:60}}>
        <h2>Communications</h2>
      <ReactTable
          data={this.state.all_com}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                //console.log('It was in this row:', rowInfo)
                if (rowInfo !== undefined){
                  var row = rowInfo.original
                  this.setState({
                    com_id:rowInfo.original.id,
                    communication_date_time2:rowInfo.original.communication_date,
                    event_type_id2:rowInfo.original.event_type_id,
                    communication_title2:rowInfo.original.title,
                    communication_notes2:rowInfo.original.notes,
                    follow_up_date_time2:rowInfo.original.follow_up_date,
                    isOpenCommunication2: true,
                  });
                }
              }
            }
          }}
          columns={[
            {
              columns: [
                {
                  Header: "Event Type",
                  accessor: "event_type_id",
                  maxWidth: 120,
                  Cell: ({ value }) => (
                    value === "EM" ? "Email" :
                    value === "PC" ? "Phone Call" :
                    value === "TM" ? "Text Message" :
                    value === "IP" ? "In Person" :
                    "N/A"),
                },
                {
                  Header: "Title",
                  accessor: "title",
                  maxWidth: 160,
                },
                {
                  Header: "Notes",
                  accessor: "notes",
                },
                {
                  Header: "Communication Date",
                  accessor: "communication_date",
                  Cell: ({ value }) => (value === "Invalid date" ? "" : value),
                  maxWidth: 190,
                },
                {
                  Header: "Follow Up Date",
                  accessor: "follow_up_date",
                  Cell: ({ value }) => (value === "Invalid date" ? "" : value),
                  maxWidth: 160,
                },
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        </div>

      <Modal open={this.state.isOpen} onClose={this.toggleModal} center>
        <h2>Add Role</h2>
      <form onSubmit={this.onSubmitRole} style={{marginTop:0}}>
        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Role</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.role} onChange={e => this.setState({ role: e.target.value, sub_role:""})}>
          {/* <option Value="INI">Initiates</option> */}
          <option value="ADM">Administrators</option>
          <option value="MIN">Ministers</option>
          <option value="SUP">Supporter</option>
        </select>
        </div>
        </div>
        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Sub-Role</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        {select_subrole}
        </div>
        </div>

        {supporter_name}

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Start Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="start_date"
          value={this.state.start_date}
          onChange={e => this.setState({ start_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
          required
        />
        </div>
        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Notes</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <textarea
          rows="7"
          cols='40'
          value={this.state.notes}
          onChange={e => this.setState({ notes: e.target.value})}
        />
        </div>
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:30,marginLeft:40}}>
            <button type="submit" value="Submit" style={{width:130,height:30}}>Save Info</button>
        </div>
        {/* <div  style={{float: 'left',marginTop:30,marginLeft:30}}>
            <button onClick={this.toggleModal} style={{width:130,height:30}}>Cancel</button>
        </div> */}
        </div>
        </form>
        </Modal>

        <Modal open={this.state.isOpen2} onClose={this.toggleModal2} center>
        <h2>Edit Role</h2>
      <form onSubmit={this.onEditRole} style={{marginTop:0}}>
        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Role</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.role2} onChange={e => this.setState({ role: e.target.value, sub_role:""})}>
          {/* <option Value="INI">Initiates</option> */}
          <option value="ADM">Administrators</option>
          <option value="MIN">Ministers</option>
          <option value="SUP">Supporter</option>
        </select>
        </div>
        </div>
        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Sub-Role</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        {select_subrole2}
        </div>
        </div>

        {supporter_name2}

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Start Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="start_date2"
          value={this.state.start_date2}
          onChange={e => this.setState({ start_date2: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>End Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="end_date2"
          value={this.state.end_date2}
          onChange={e => this.setState({ end_date2: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Status</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.status2} onChange={e => this.setState({ status2: e.target.value})}>
          <option Value="A">Active</option>
          <option value="I">Inactive</option>
        </select>
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Notes</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <textarea
          name="notes"
          rows='7'
          cols='40'
          value={this.state.notes2}
          onChange={e => this.setState({ notes2: e.target.value})}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:30,marginLeft:40}}>
            <button type="submit" value="Submit" onClick={this.toggleModal2} style={{width:130,height:30}}>Save Info</button>
        </div>
        <div style={{float: 'right',marginTop:30,marginLeft:40}}>
            <button type="button" onClick={this.deleteRole} style={{width:130,height:30}}>Delete Role</button>
        </div>
        </div>
        </form>
        </Modal>

        <Modal open={this.state.promoteOpen} onClose={this.togglePromote} center>
        <h2>Promote</h2>
      <form onSubmit={this.onSubmitPromote} style={{marginTop:0}}>
      <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Current Role</label>
        </div>
        <div style={{float: 'left',marginTop:20}}>
          <label>{this.state.currentIniRole}</label>
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Promote to</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        {select_iniRole}
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Promote Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="promote_date"
          value={this.state.promote_date}
          onChange={e => this.setState({ promote_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
          required
        />
        </div>
        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:130,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Notes</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <textarea
          type="text"
          rows='7'
          cols='40'
          name="promote_notes"
          value={this.state.promote_notes}
          onChange={e => this.setState({ promote_notes: e.target.value})}
        />
        </div>
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:30,marginLeft:40}}>
           {select_button}
        </div>
        {/* <div  style={{float: 'left',marginTop:30,marginLeft:30}}>
            <button onClick={this.toggleModal} style={{width:130,height:30}}>Cancel</button>
        </div> */}
        </div>
        </form>
        </Modal>

        <Modal open={this.state.isOpenCommunication} onClose={this.toggleCommunication} center>
      <h2>Add Communication</h2>
      <form onSubmit={this.addCommunication} style={{marginTop:0}}>
      <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,marginTop:20,float: 'left',marginLeft:0}}>
          <label>Communication Type</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.event_type_id} onChange={e => this.setState({ event_type_id: e.target.value})}>
          <option Value="EM">Email</option>
          <option value="PC">Phone Call</option> 
          <option value="TM">Text Message</option>
          <option value="IP">In Person</option>
        </select>
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Communication Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}> 
        <input
          type="date"
          name="communication_date_time"
          value={this.state.communication_date_time}
          onChange={e => this.setState({ communication_date_time: e.target.value})}
          style={{width:163,height:20, padding:4}}
          required
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Title</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="communication_title"
          value={this.state.communication_title}
          onChange={e => this.setState({ communication_title: e.target.value})}
          style={{height:20, padding:4}}
          required
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Notes</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <textarea
          name="communication_notes"
          value={this.state.communication_notes}
          onChange={e => this.setState({ communication_notes: e.target.value})}
          rows='7'
          cols='40'
          required
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Follow Up Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="follow_up_date_time"
          value={this.state.follow_up_date_time}
          onChange={e => this.setState({ follow_up_date_time: e.target.value})}
          style={{width:163,height:20, padding:4}}
          min={this.state.communication_date_time}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button style={{width:160,height:30}}>Save Communication</button>
        </div>
        </div>
        </form>
        </Modal>

        <Modal open={this.state.isOpenCommunication2} onClose={this.toggleCommunication2} center>
      <h2>Edit Communication</h2>
      <form onSubmit={this.editCommunication} style={{marginTop:0}}>
      <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,marginTop:20,float: 'left',marginLeft:0}}>
          <label>Communication Type</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.event_type_id2} onChange={e => this.setState({ event_type_id2: e.target.value})}>
          <option Value="EM">Email</option>
          <option value="PC">Phone Call</option> 
          <option value="TM">Text Message</option>
          <option value="IP">In Person</option>
        </select>
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Communication Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}> 
        <input
          type="date"
          name="communication_date_time2"
          value={this.state.communication_date_time2}
          onChange={e => this.setState({ communication_date_time2: e.target.value})}
          style={{width:163,height:20, padding:4}}
          required
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Title</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="communication_title"
          value={this.state.communication_title2}
          onChange={e => this.setState({ communication_title2: e.target.value})}
          style={{height:20, padding:4}}
          required
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Notes</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <textarea
          name="communication_notes"
          value={this.state.communication_notes2}
          onChange={e => this.setState({ communication_notes2: e.target.value})}
          rows='7'
          cols='40'
          required
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:10}}>
        <div style={{width:160,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Follow Up Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}> 
        <input
          type="date"
          name="follow_up_date_time2"
          value={this.state.follow_up_date_time2}
          onChange={e => this.setState({ follow_up_date_time2: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button style={{width:160,height:30}}>Save Communication</button>
        </div>
        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button type="button" onClick={this.deleteCommunication} style={{width:160,height:30}}>Delete Communication</button>
        </div>
        </div>
        </form>
        </Modal>

        <Modal open={this.state.isOpenSacraments} onClose={this.toggleSacraments} center>
      <form onSubmit={this.onSubmitSacraments} style={{marginTop:0}}>
        <h3>Baptism</h3>
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Church Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="church_name"
          value={this.state.church_name}
          onChange={e => this.setState({ church_name: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Contact Phone</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="contact_phone"
          value={this.state.contact_phone}
          onChange={e => this.setState({ contact_phone: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Church Address</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="church_address"
          value={this.state.church_address}
          onChange={e => this.setState({ church_address: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Baptism Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="baptism_date"
          value={this.state.baptism_date}
          onChange={e => this.setState({ baptism_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Denomination</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="denomination"
          value={this.state.denomination}
          onChange={e => this.setState({ denomination: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Upload Baptism Certificate</label>
        </div>
        <div style={{float: 'left',marginTop:17}}>
        <input 
          type="file" 
          onChange={ (e) => this.setState({file: URL.createObjectURL(e.target.files[0])}) } 
        />
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <a href={this.state.file} target = "_blank" >View Document</a>
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>

        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button style={{width:130,height:30}}>Save</button>
        </div>
        </div>
        </form>
        <div style={{clear:'both'}}>
          <br/>
          <hr/>
        </div>
        <form onSubmit={this.onSubmitSacraments2} style={{marginTop:0}}>
        <div style={{clear:'both', marginTop:10}}>
        <h3>Current Marriage</h3>
        </div>
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Spouse Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="spouse_name"
          value={this.state.spouse_name}
          onChange={e => this.setState({ spouse_name: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Spouse Baptismal Status</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.spouse_baptismal_status} onChange={e => this.setState({ spouse_baptismal_status: e.target.value})}>
          <option Value="BA">Baptized</option>
          <option value="NB">Not Baptized</option> 
        </select>
        </div>
        </div>
        
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Marriage Type</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.marriage_type} onChange={e => this.setState({ marriage_type: e.target.value})}>
          <option Value="CI">Civil</option>
          <option value="RE">Religious</option> 
          <option value="CL">Common Law</option> 
        </select>
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Denomination</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="denomination2"
          value={this.state.denomination2}
          onChange={e => this.setState({ denomination2: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Marriage Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="marriage_date"
          value={this.state.marriage_date}
          onChange={e => this.setState({ marriage_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Convalidation Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="convalidation_date"
          value={this.state.convalidation_date}
          onChange={e => this.setState({ convalidation_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button style={{width:130,height:30}}>Save</button>
        </div>
        </div>
        </form>
        </Modal>

      </div>      
    );
  }
}
