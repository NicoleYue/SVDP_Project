import React, { Component } from 'react';
import "@material/react-chips/dist/chips.css";
import '@material/react-material-icon/dist/material-icon.css';
import 'react-notifications/lib/notifications.css';
import { Row, Col } from 'react-flexbox-grid';
import Modal from 'react-responsive-modal';
import ReactTable from "react-table";
import "react-table/react-table.css";

export default class Sacrament extends Component {
  constructor(props) {
    super(props)
    this.state = {
        show_baptism:false,
        isOpenBap:false,
        baptism_table:{},
        bap:{},
        church_name:'',
        contact_phone:'',
        church_address:'',
        baptism_date:null,
        denomination:'',
        bap_id:'',
        baptism_certificate:null,

        show_current_marriage:false,
        isOpenMar:false,
        current_marriage_table:{},
        mar:{},
        spouse_name:'',
        spouse_baptismal_status:'BA',
        marriage_type:'CI',
        marriage_date:null,
        convalidation_date:null,
        denomination2:'',
        baptismal_certificate:'',
        marriage_certificate:'',
        mar_id:'',

        show_pre_marriage:false,
        isOpenPreMar:false,
        premar_table:{},
        premar:[],
        current_marriage_table:{},
        spouse_name2:'',
        marriage_type2:'CI',
        divorce_date:null,

        premar_id:'',
        isOpenPreMar2:false,

        show_confirmation:false,
        isOpenCon:false,
        confirmation_table:{},
        con:{},
        church_name2:'',
        contact_phone2:'',
        church_address2:'',
        confirmation_date:null,
        officiant:'',
        con_id:'',
    };
  }
  componentDidMount() {
    const id = this.props.location.pathname;
    fetch(id)
      .then(res => res.json())
      .then(member => this.setState({
        members_id:member.members_id,
      }, () => {
      fetch("/viewbaptism/"+this.state.members_id)
      .then(res => res.json())
      .then(bap => this.setState({bap},()=>{
        console.log('inside bap', this.state.bap.baptism_certificate)
        if (Object.getOwnPropertyNames(this.state.bap).length > 0){
            console.log('inside length>0')
            this.setState({
                show_baptism:true,
                church_name: this.state.bap.church_name,
                contact_phone:this.state.bap.contact_phone,
                church_address:this.state.bap.church_address,
                baptism_date:this.state.bap.baptism_date,
                denomination:this.state.bap.denomination,
                bap_id:this.state.bap.id,
                baptism_certificate:URL.createObjectURL(new Blob([this.state.bap.baptism_certificate.data], {type: 'application/pdf'})),
            },()=>{console.log("baptism_certificate",this.state.baptism_certificate)})
        }
      }));
  
      fetch("/viewmarriage/"+this.state.members_id)
      .then(res => res.json())
      .then(mar => this.setState({mar},()=>{
        if (Object.getOwnPropertyNames(this.state.mar).length > 0){
              this.setState({
                show_current_marriage:true,
                spouse_name:this.state.mar.spouse_name,
                spouse_baptismal_status:this.state.mar.spouse_baptismal_status,
                marriage_type:this.state.mar.marriage_type,
                marriage_date:this.state.mar.marriage_date,
                convalidation_date:this.state.mar.convalidation_date,
                denomination2:this.state.mar.denomination,
                mar_id:this.state.mar.id,
              });
            }
      }));

      fetch("/viewpremarriage/"+this.state.members_id)
      .then(res => res.json())
      .then(premar => this.setState({premar},()=>{
        if ((this.state.premar).length > 0){
              this.setState({
                show_pre_marriage:true,
              });
            }
      }));

      fetch("/viewconfirmation/"+this.state.members_id)
      .then(res => res.json())
      .then(con => this.setState({con},()=>{
        //console.log('inside con', this.state.con)
        if (Object.getOwnPropertyNames(this.state.con).length > 0){
            //console.log('inside length>0')
            this.setState({
                show_confirmation:true,
                church_name2: this.state.con.church_name,
                contact_phone2:this.state.con.contact_phone,
                church_address2:this.state.con.church_address,
                confirmation_date:this.state.con.confirmation_date,
                officiant:this.state.con.officiant,
                con_id:this.state.con.id,
            })
        }
      }));
    }));
  }
  toggleBap = () => {
    this.setState({isOpenBap: !this.state.isOpenBap})
    // if (Object.getOwnPropertyNames(this.state.bap).length > 0){
    // this.setState({
    //   church_name: this.state.bap.church_name,
    //   contact_phone:this.state.bap.contact_phone,
    //   church_address:this.state.bap.church_address,
    //   baptism_date:this.state.bap.baptism_date,
    //   denomination:this.state.bap.denomination,
    //   bap_id:this.state.bap.id,
    // },()=>{console.log("this.state.bap",this.state.bap, this.state.church_name)});
  }
  toggleMar = () => {
    this.setState({isOpenMar: !this.state.isOpenMar})
  }
  togglePreMar = () => {
    this.setState({
        isOpenPreMar: !this.state.isOpenPreMar,
        spouse_name2 : '', 
        marriage_type2: 'CI',
        divorce_date: null,
    })
  }
  togglePreMar2 = () => {
    this.setState({isOpenPreMar2: !this.state.isOpenPreMar2})
  }
  toggleCon = () => {
    this.setState({isOpenCon: !this.state.isOpenCon})
  }
  onSubmitBap = (event) => {
    //console.log(this.state.file)
    event.preventDefault();
    //console.log("this.state.bap",this.state.bap);
    if (Object.getOwnPropertyNames(this.state.bap).length > 0){
      console.log("need update row")
      if (this.state.baptism_date == 'Invalid date' || this.state.baptism_date == ''){
        this.setState({
      baptism_table: {
        members_id:this.state.members_id,
        church_name:this.state.church_name,
        contact_phone:this.state.contact_phone,
        church_address:this.state.church_address,
        baptism_date:null,
        denomination:this.state.denomination,
        baptism_certificate:this.state.baptism_certificate,
      }
        }, () => {
      console.log("baptism_table",this.state.baptism_table)
      fetch("/editbaptism/"+this.state.bap_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.baptism_table)
      })
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitbap');
      });

      // fetch("/editbaptism/"+this.state.bap_id, {
      //   method: 'POST',
      //   headers: {
      //     'Content-Type': 'application/pdf'
      //   },
      //   body: JSON.stringify(this.state.baptism_certificate)
      // })
      // .then((id) => 
      //    {this.props.history.push('/');
      //     this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      // )
      // .catch(err => {
      //   console.log(err);
      //   alert('Error logging in please try again - onsubmitbap');
      // });

      });

      }else{
        this.setState({
      baptism_table: {
        members_id:this.state.members_id,
        church_name:this.state.church_name,
        contact_phone:this.state.contact_phone,
        church_address:this.state.church_address,
        baptism_date:this.state.baptism_date,
        denomination:this.state.denomination,
        baptism_certificate:this.state.baptism_certificate,
      }
        }, () => {
      console.log("baptism_table",this.state.baptism_table)
      fetch("/editbaptism/"+this.state.bap_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.baptism_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitbap');
      });
      });
      }
    }else{
      console.log("need add new row")
      if (this.state.baptism_date == 'Invalid date' || this.state.baptism_date == ''){
        this.setState({
      baptism_table: {
        members_id:this.state.members_id,
        church_name:this.state.church_name,
        contact_phone:this.state.contact_phone,
        church_address:this.state.church_address,
        baptism_date:null,
        denomination:this.state.denomination,
        baptism_certificate:this.state.baptism_certificate,
      }
        }, () => {
      console.log("baptism_table",this.state.baptism_table)
      fetch("/addbaptism", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.baptism_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditbap');
      });
      });
      }else{
        this.setState({
      baptism_table: {
        members_id:this.state.members_id,
        church_name:this.state.church_name,
        contact_phone:this.state.contact_phone,
        church_address:this.state.church_address,
        baptism_date:this.state.baptism_date,
        denomination:this.state.denomination,
        baptism_certificate:this.state.baptism_certificate,
      }
        }, () => {
      console.log("baptism_table",this.state.baptism_table)
      fetch("/addbaptism", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.baptism_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditbap');
      });
      });
      }
    }
  }
  onSubmitMar = (event) => {
    event.preventDefault();
    if (Object.getOwnPropertyNames(this.state.mar).length > 0){
      console.log("need update row")
      if ((this.state.marriage_date == 'Invalid date' || this.state.marriage_date == '') && (this.state.convalidation_date == 'Invalid date' || this.state.convalidation_date == '')){
    this.setState({
      current_marriage_table: {
        members_id:this.state.members_id,
        spouse_name:this.state.spouse_name,
        spouse_baptismal_status:this.state.spouse_baptismal_status,
        marriage_type:this.state.marriage_type,
        marriage_date:null,
        convalidation_date:null,
        denomination:this.state.denomination2,
      }
    }, () => {
      console.log("current_marriage_table",this.state.current_marriage_table)
      fetch("/editcurrentmarriage/"+this.state.mar_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.current_marriage_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitmar');
      });
  });
      }else if (this.state.marriage_date == 'Invalid date' || this.state.marriage_date == ''){
    this.setState({
      current_marriage_table: {
        members_id:this.state.members_id,
        spouse_name:this.state.spouse_name,
        spouse_baptismal_status:this.state.spouse_baptismal_status,
        marriage_type:this.state.marriage_type,
        marriage_date:null,
        convalidation_date:this.state.convalidation_date,
        denomination:this.state.denomination2,
      }
    }, () => {
      console.log("current_marriage_table",this.state.current_marriage_table)
      fetch("/editcurrentmarriage/"+this.state.mar_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.current_marriage_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitmar');
      });
  });
      }else if (this.state.convalidation_date == 'Invalid date' || this.state.convalidation_date == ''){
    this.setState({
      current_marriage_table: {
        members_id:this.state.members_id,
        spouse_name:this.state.spouse_name,
        spouse_baptismal_status:this.state.spouse_baptismal_status,
        marriage_type:this.state.marriage_type,
        marriage_date:this.state.marriage_date,
        convalidation_date:null,
        denomination:this.state.denomination2,
      }
    }, () => {
      console.log("current_marriage_table",this.state.current_marriage_table)
      fetch("/editcurrentmarriage/"+this.state.mar_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.current_marriage_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitmar');
      });
  });
      }else{
    this.setState({
      current_marriage_table: {
        members_id:this.state.members_id,
        spouse_name:this.state.spouse_name,
        spouse_baptismal_status:this.state.spouse_baptismal_status,
        marriage_type:this.state.marriage_type,
        marriage_date:this.state.marriage_date,
        convalidation_date:this.state.convalidation_date,
        denomination:this.state.denomination2,
      }
    }, () => {
      console.log("current_marriage_table",this.state.current_marriage_table)
      fetch("/editcurrentmarriage/"+this.state.mar_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.current_marriage_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitmar');
      });
  });
      }
    }else{
      console.log("need add new row")
      if ((this.state.marriage_date == 'Invalid date' || this.state.marriage_date == '') && (this.state.convalidation_date == 'Invalid date' || this.state.convalidation_date == '')){
        this.setState({
          current_marriage_table: {
            members_id:this.state.members_id,
            spouse_name:this.state.spouse_name,
            spouse_baptismal_status:this.state.spouse_baptismal_status,
            marriage_type:this.state.marriage_type,
            marriage_date:null,
            convalidation_date:null,
            denomination:this.state.denomination2,
          }
        }, () => {
          console.log("current_marriage_table",this.state.current_marriage_table)
          fetch("/addcurrentmarriage", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.current_marriage_table)
          })
          // .then(res => res.json())
          .then((id) => 
             {this.props.history.push('/');
              this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
          )
          .catch(err => {
            console.log(err);
            alert('Error logging in please try again - onsubmitmar');
          });
      });
          }else if (this.state.marriage_date == 'Invalid date' || this.state.marriage_date == ''){
        this.setState({
          current_marriage_table: {
            members_id:this.state.members_id,
            spouse_name:this.state.spouse_name,
            spouse_baptismal_status:this.state.spouse_baptismal_status,
            marriage_type:this.state.marriage_type,
            marriage_date:null,
            convalidation_date:this.state.convalidation_date,
            denomination:this.state.denomination2,
          }
        }, () => {
          console.log("current_marriage_table",this.state.current_marriage_table)
          fetch("/addcurrentmarriage", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.current_marriage_table)
          })
          // .then(res => res.json())
          .then((id) => 
             {this.props.history.push('/');
              this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
          )
          .catch(err => {
            console.log(err);
            alert('Error logging in please try again - onsubmitmar');
          });
      });
          }else if (this.state.convalidation_date == 'Invalid date' || this.state.convalidation_date == ''){
        this.setState({
          current_marriage_table: {
            members_id:this.state.members_id,
            spouse_name:this.state.spouse_name,
            spouse_baptismal_status:this.state.spouse_baptismal_status,
            marriage_type:this.state.marriage_type,
            marriage_date:this.state.marriage_date,
            convalidation_date:null,
            denomination:this.state.denomination2,
          }
        }, () => {
          console.log("current_marriage_table",this.state.current_marriage_table)
          fetch("/addcurrentmarriage", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.current_marriage_table)
          })
          // .then(res => res.json())
          .then((id) => 
             {this.props.history.push('/');
              this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
          )
          .catch(err => {
            console.log(err);
            alert('Error logging in please try again - onsubmitmar');
          });
      });
          }else{
        this.setState({
          current_marriage_table: {
            members_id:this.state.members_id,
            spouse_name:this.state.spouse_name,
            spouse_baptismal_status:this.state.spouse_baptismal_status,
            marriage_type:this.state.marriage_type,
            marriage_date:this.state.marriage_date,
            convalidation_date:this.state.convalidation_date,
            denomination:this.state.denomination2,
          }
        }, () => {
          console.log("current_marriage_table",this.state.current_marriage_table)
          fetch("/addcurrentmarriage", {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify(this.state.current_marriage_table)
          })
          // .then(res => res.json())
          .then((id) => 
             {this.props.history.push('/');
              this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
          )
          .catch(err => {
            console.log(err);
            alert('Error logging in please try again - onsubmitmar');
          });
      });
          }
    }

  }
  onSubmitPreMar = (event) => {
    event.preventDefault();
    this.setState({
      premar_table: {
        members_id: this.state.members_id,
        spouse_name : this.state.spouse_name2, 
        marriage_type: this.state.marriage_type2,
        divorce_date: this.state.divorce_date,
      }
    }, () => {
      console.log(this.state.premar_table)
      fetch("/addpremar", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.premar_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');
          this.setState({
            spouse_name2 : '', 
            marriage_type2: 'CI',
            divorce_date: null,
            isOpenPreMar:false,
          });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitpremar');
      });
  });
  }
  OnSubmitDeletePreMar = (event) => {
    var id = this.state.premar_id;
    event.preventDefault();
    fetch("/deletepremar/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: ""
      })
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');
          this.setState({
            spouse_name2 : '', 
            marriage_type2: 'CI',
            divorce_date: null,
            isOpenPreMar:false,
          });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitpremar');
      });
  }
  onSubmitPreMar2 = (event) => {
    event.preventDefault();
    var id = this.state.premar_id;
    if (this.state.divorce_date == 'Invalid date' || this.state.divorce_date == ''){
    this.setState({
      premar_table: {
        members_id: this.state.members_id,
        spouse_name : this.state.spouse_name2, 
        marriage_type: this.state.marriage_type2,
        divorce_date: null,
      }
    }, () => {
      console.log(id,this.state.premar_table)
      fetch("/editpremar/"+id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.premar_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');
          this.setState({
            spouse_name2 : '', 
            marriage_type2: 'CI',
            divorce_date: null,
            isOpenPreMar:false,
          });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditpremar');
      });
     });
    }else{
        this.setState({
            premar_table: {
              members_id: this.state.members_id,
              spouse_name : this.state.spouse_name2, 
              marriage_type: this.state.marriage_type2,
              divorce_date: this.state.divorce_date,
            }
          }, () => {
            console.log(id,this.state.role_table)
            fetch("/editpremar/"+ id, {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify(this.state.premar_table)
            })
            // .then(res => res.json())
            .then((id) => 
               {this.props.history.push('/');
                this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');
                this.setState({
                  spouse_name2 : '', 
                  marriage_type2: 'CI',
                  divorce_date: null,
                  isOpenPreMar:false,
                });} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
            )
            .catch(err => {
              console.log(err);
              alert('Error logging in please try again - oneditpremar');
            });
           });
    }
  }
  onSubmitCon = (event) => {
    event.preventDefault();
    if (Object.getOwnPropertyNames(this.state.con).length > 0){
      console.log("need update row")
      if (this.state.confirmation_date == 'Invalid date' || this.state.confirmation_date == ''){
        this.setState({
      confirmation_table: {
        members_id:this.state.members_id,
        church_name:this.state.church_name2,
        contact_phone:this.state.contact_phone2,
        church_address:this.state.church_address2,
        confirmation_date:null,
        officiant:this.state.officiant,
      }
        }, () => {
      console.log("confirmation_table",this.state.confirmation_table)
      fetch("/editconfirmation/"+this.state.con_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.confirmation_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitcon');
      });
      });
      }else{
        this.setState({
        confirmation_table: {
            members_id:this.state.members_id,
            church_name:this.state.church_name2,
            contact_phone:this.state.contact_phone2,
            church_address:this.state.church_address2,
            officiant:this.state.officiant,
            confirmation_date:this.state.confirmation_date,
      }
        }, () => {
      console.log("confirmation_table",this.state.confirmation_table)
      fetch("/editconfirmation/"+this.state.con_id, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.confirmation_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - onsubmitcon');
      });
      });
      }
    }else{
      console.log("need add new row")
      if (this.state.baptism_date == 'Invalid date' || this.state.baptism_date == ''){
        this.setState({
        confirmation_table: {
            members_id:this.state.members_id,
            church_name:this.state.church_name2,
            contact_phone:this.state.contact_phone2,
            church_address:this.state.church_address2,
            confirmation_date:null,
            officiant:this.state.officiant,
      }
        }, () => {
      console.log("confirmation_table",this.state.confirmation_table)
      fetch("/addconfirmation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.confirmation_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditcon');
      });
      });
      }else{
        this.setState({
        confirmation_table: {
            members_id:this.state.members_id,
            church_name:this.state.church_name2,
            contact_phone:this.state.contact_phone2,
            church_address:this.state.church_address2,
            officiant:this.state.officiant,
            confirmation_date:this.state.confirmation_date,
      }
        }, () => {
      console.log("confirmation_table",this.state.confirmation_table)
      fetch("/addconfirmation", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(this.state.confirmation_table)
      })
      // .then(res => res.json())
      .then((id) => 
         {this.props.history.push('/');
          this.props.history.push('/editMember/'+this.state.members_id+'/sacrament');} // Warning: Expected `onClick` listener to be a function, instead got a value of `object` type
      )
      .catch(err => {
        console.log(err);
        alert('Error logging in please try again - oneditcon');
      });
      });
      }
    }
  }


  render() {
      let bap_date;
      if (this.state.baptism_date == 'Invalid date'){
        bap_date = <label></label>
      }else{
        bap_date = <label>{this.state.baptism_date}</label>
      }

      let mar_date;
      if (this.state.marriage_date == 'Invalid date'){
        mar_date = <label></label>
      }else{
        mar_date = <label>{this.state.marriage_date}</label>
      }

      let conv_date;
      if (this.state.convalidation_date == 'Invalid date'){
        conv_date = <label></label>
      }else{
        conv_date = <label>{this.state.convalidation_date}</label>
      }

      let conf_date;
      if (this.state.confirmation_date == 'Invalid date'){
        conf_date = <label></label>
      }else{
        conf_date = <label>{this.state.confirmation_date}</label>
      }

      let bap_form;
      if (this.state.show_baptism == true){
          bap_form = <div>
          <div style={{marginTop:60,textAlign:'center'}}>
          <h2>Baptism</h2>
          </div>
          <Row around="xs">
            <Col xs={1} />
            <Col xs={3.5}>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
              <label>Church Name:</label>
            </div>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                <label>{this.state.church_name}</label>
            </div>
            </Col>
    
            <Col xs={3.5}>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
              <label>Contact Phone:</label>
            </div>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                <label>{this.state.contact_phone}</label>
            </div>
            </Col>
    
            <Col xs={3.5}>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
              <label>Church Address:</label>
            </div>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                <label>{this.state.church_address}</label>
            </div>
            </Col>
            </Row>
    
            <Row around="xs">
            <Col xs={1} />
            <Col xs={3.5}>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
              <label>Baptism Date:</label>
            </div>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                {bap_date}
            </div>
            </Col>
    
            <Col xs={3.5}>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
              <label>Denomination:</label>
            </div>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                <label>{this.state.denomination}</label>
            </div>
            </Col>
            <Col xs={3.5}/>
            </Row>

            <Row around="xs">
            <Col xs={1} />
            <Col xs={6}>
            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
              <label>Baptism Certificate:</label>
            </div>
            
            <div style={{float: 'left',marginTop:17,marginLeft:0}}>
              <input 
                type="file" 
                onChange={ (e) => this.setState({baptism_certificate: URL.createObjectURL(e.target.files[0])}) } 
              />
            </div>

            <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                <a href={this.state.baptism_certificate} target = "_blank" >View Document</a>
            </div>
            </Col>
            <Col xs={5}/>
            </Row>
           </div>     
      }else{
        bap_form = null;
      }

      let mar_form;
      if (this.state.show_current_marriage == true){
          mar_form = <div>
          <div style={{marginTop:40,textAlign:'center'}}>
           <h2>Current Marriage</h2>
           </div>
           <Row around="xs">
             <Col xs={1} />
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Spouse Name:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 <label>{this.state.spouse_name}</label>
             </div>
             </Col>
     
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Spouse status:</label>
             </div>
             <div style={{width:100,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 <label>{this.state.spouse_baptismal_status}</label>
             </div>
             </Col>
     
             <Col xs={3.5} />
             </Row>
     
             <Row around="xs">
             <Col xs={1} />
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Marriage Type:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 <label>{this.state.marriage_type}</label>
             </div>
             </Col>
     
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Marriage Date:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 {mar_date}
             </div>
             </Col>
     
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Convalidation Date:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 {conv_date}
             </div>
             </Col>
             </Row>
            
             <Row around="xs">
             <Col xs={1} />
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Denomination:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 <label>{this.state.denomination2}</label>
             </div>
             </Col>
     
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Marriage Certificate:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 <a href={this.state.marriage_certificate} target = "_blank" >View Document</a>
             </div>
             </Col>
     
             <Col xs={3.5}>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>Baptismal Certificate:</label>
             </div>
             <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
                 <a href={this.state.baptismal_certificate} target = "_blank" >View Document</a>
             </div>
             </Col>
             </Row>
            
            </div>        
      }else{
        mar_form = null;
      }

      let premar_form;
      if (this.state.show_pre_marriage == true){
        premar_form =  <div style={{marginTop:20,textAlign:'center',marginLeft:100,marginRight:100,marginBottom:60}}>
        <div style={{marginTop:40,textAlign:'center'}}>
         <h2>Previous Marriage</h2>
         </div>
      <ReactTable
          data={this.state.premar}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                if (rowInfo !== undefined){
                  var row = rowInfo.original
                  this.setState({
                    premar_id:rowInfo.original.id,
                    spouse_name2:rowInfo.original.spouse_name,
                    marriage_type2:rowInfo.original.marriage_type,
                    divorce_date:rowInfo.original.divorce_date,
                    isOpenPreMar2: true,
                  });
                }
              }
            }
          }}
          columns={[
            {
              columns: [
                {
                  Header: "Spouse Name",
                  accessor: "spouse_name",
                //   maxWidth: 120,
                },
                {
                  Header: "Marriage Type",
                  accessor: "marriage_type",
                  Cell: ({ value }) => (
                    value === "CI" ? "Civil" :
                    value === "RE" ? "Religious" :
                    value === "CL" ? "Common Law" :
                    "N/A"),
                //   maxWidth: 160,
                },
                {
                  Header: "Divorce Date",
                  accessor: "divorce_date",
                  Cell: ({ value }) => (value === "Invalid date" ? "" : value),
                },
              ]
            }
          ]}
          defaultPageSize={5}
          className="-striped -highlight"
        />
        </div>
      }else{
        premar_form = null;
      }

      let con_form;
      if (this.state.show_confirmation == true){
          con_form =  <div>
          <div style={{marginTop:40,textAlign:'center'}}>
         <h2>Confirmation</h2>
         </div>
         <Row around="xs">
           <Col xs={1} />
           <Col xs={3.5}>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
             <label>Church Name:</label>
           </div>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>{this.state.church_name2}</label>
           </div>
           </Col>
   
           <Col xs={3.5}>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
             <label>Contact Phone:</label>
           </div>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>{this.state.contact_phone2}</label>
           </div>
           </Col>
   
           <Col xs={3.5}>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
             <label>Church Address:</label>
           </div>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>{this.state.church_address2}</label>
           </div>
           </Col>
           </Row>
   
           <Row around="xs">
           <Col xs={1} />
           <Col xs={3.5}>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
             <label>Confirmation Date:</label>
           </div>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               {conf_date}
           </div>
           </Col>
   
           <Col xs={3.5}>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
             <label>Officiant:</label>
           </div>
           <div style={{width:160,textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
               <label>{this.state.officiant}</label>
           </div>
           </Col>
   
           <Col xs={3.5}/>
           </Row>
          </div>    
      }else{
        con_form = null;
      }
      
    return (
      <div>
      <div style={{alignContent:'center',textAlign:'center'}}>
      <label ></label>
      </div>
      <Row around="xs">
        <Col xs={1} />
        <Col xs={2.5}>
        <div style={{textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
            <button type="button" onClick={this.toggleBap} style={{width:160,height:30}}>Baptism</button>
        </div>
        </Col>

        <Col xs={2.5}>
        <div style={{textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
            <button type="button" onClick={this.toggleMar} style={{width:160,height:30}}>Current Marriage</button>
        </div>
        </Col>

        <Col xs={2.5}>
        <div style={{textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
            <button type="button" onClick={this.togglePreMar} style={{width:160,height:30}}>Previous Marriage</button>
        </div>
        </Col>

        <Col xs={2.5}>
        <div style={{textAlign:'left',float: 'left',marginTop:20,marginLeft:0}}>
            <button type="button" onClick={this.toggleCon} style={{width:160,height:30}}>Confirmation</button>
        </div>
        </Col>
        </Row>

      {bap_form}
      {mar_form}
      {premar_form}
      {con_form}
      <div style={{height:60}} />

        <Modal open={this.state.isOpenBap} onClose={this.toggleBap} center>
      <form onSubmit={this.onSubmitBap} style={{marginTop:0}}>
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
        <div style={{float: 'left',marginTop:17,marginLeft:30}}>
              <input 
                type="file" 
                onChange={ (e) => this.setState({baptism_certificate: URL.createObjectURL(e.target.files[0])}) } 
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

        <Modal open={this.state.isOpenMar} onClose={this.toggleMar} center>
        <form onSubmit={this.onSubmitMar} style={{marginTop:0}}>
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

        <Modal open={this.state.isOpenCon} onClose={this.toggleCon} center>
      <form onSubmit={this.onSubmitCon} style={{marginTop:0}}>
        <h3>Confirmation</h3>
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Church Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="church_name"
          value={this.state.church_name2}
          onChange={e => this.setState({ church_name2: e.target.value})}
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
          value={this.state.contact_phone2}
          onChange={e => this.setState({ contact_phone2: e.target.value})}
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
          value={this.state.church_address2}
          onChange={e => this.setState({ church_address2: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        <div style={{width:200,float: 'left',marginTop:20,marginLeft:30}}>
          <label>Confirmation Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="baptism_date"
          value={this.state.confirmation_date}
          onChange={e => this.setState({ confirmation_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Officiant</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="denomination"
          value={this.state.officiant}
          onChange={e => this.setState({ officiant: e.target.value})}
          style={{height:20, padding:4}}
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

        <Modal open={this.state.isOpenPreMar} onClose={this.togglePreMar} center>
        <form onSubmit={this.onSubmitPreMar} style={{marginTop:0}}>
        <div style={{clear:'both', marginTop:10}}>
        <h3>Add Prior Marriage</h3>
        </div>
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Spouse Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="spouse_name"
          value={this.state.spouse_name2}
          onChange={e => this.setState({ spouse_name2: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </div>
        
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Marriage Type</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.marriage_type2} onChange={e => this.setState({ marriage_type2: e.target.value})}>
          <option Value="CI">Civil</option>
          <option value="RE">Religious</option> 
          <option value="CL">Common Law</option> 
        </select>
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Divorce Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="divorce_date"
          value={this.state.divorce_date}
          onChange={e => this.setState({ divorce_date: e.target.value})}
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

        <Modal open={this.state.isOpenPreMar2} onClose={this.togglePreMar2} center>
        <form onSubmit={this.onSubmitPreMar2} style={{marginTop:0}}>
        <div style={{clear:'both', marginTop:10}}>
        <h3>Edit Prior Marriage</h3>
        </div>
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Spouse Name</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="text"
          name="spouse_name"
          value={this.state.spouse_name2}
          onChange={e => this.setState({ spouse_name2: e.target.value})}
          style={{height:20, padding:4}}
        />
        </div>
        </div>
        
        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Marriage Type</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <select style={{width:175,height:30, padding:0}} value={this.state.marriage_type2} onChange={e => this.setState({ marriage_type2: e.target.value})}>
          <option Value="CI">Civil</option>
          <option value="RE">Religious</option> 
          <option value="CL">Common Law</option> 
        </select>
        </div>
        </div>

        <div style={{clear:'both', marginTop:0}}>
        <div style={{width:140,float: 'left',marginTop:20,marginLeft:0}}>
          <label>Divorce Date</label>
        </div>
        <div style={{float: 'left',marginTop:15}}>
        <input
          type="date"
          name="divorce_date"
          value={this.state.divorce_date}
          onChange={e => this.setState({ divorce_date: e.target.value})}
          style={{width:163,height:20, padding:4}}
        />
        </div>
        </div>

        <div style={{clear:'both', marginTop:50,marginBottom:10}}>
        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button style={{width:130,height:30}}>Save</button>
        </div>
        <div style={{float: 'right',marginTop:15,marginLeft:40}}>
            <button type="button" onClick={this.OnSubmitDeletePreMar} style={{width:130,height:30}}>delete</button>
        </div>
        </div>
        </form>
        </Modal>

      </div>
    );
  }
}
