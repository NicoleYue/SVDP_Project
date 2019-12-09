import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { fakeAuth } from "../context/auth";

export default class Notification extends Component {
  constructor() {
    super();
    this.state = {
      all_com: [],
      all_com2: [],
      all_bir:[],
      myArray: [],
      date:14,
    };
  }

  componentDidMount() {
    // fetch('/notification/'+fakeAuth.user_id,)
    //   .then(res => res.json())
    //   .then(all_com => this.setState({all_com}
    //   ,()=>{
    //     if (Object.getOwnPropertyNames(this.state.all_com).length > 0){
    //       //console.log("inside length>0")
    //       for (var i = 0; i < this.state.all_com.length; i++){
    //         var array = this.state.myArray;
    //         if (this.state.all_com[i].communication_date != 'Invalid date' && this.state.all_com[i].communication_date != ''){
    //           array.push({
    //             members_id:this.state.all_com[i].members_id,
    //             type:"Communication",
    //             members_name: this.state.all_com[i].members_id,
    //             date:this.state.all_com[i].communication_date,
    //           })
    //         }
    //         //console.log(this.state.all_com[i].follow_up_date,this.state.all_com[i].follow_up_date !== 'Invalid date' && this.state.all_com[i].follow_up_date !== '')
    //         // if (this.state.all_com[i].follow_up_date !== 'Invalid date' && this.state.all_com[i].follow_up_date !== ''){
    //         //   array.push({
    //         //     type:"Follow Up",
    //         //     members_id: this.state.all_com[i].members_id,
    //         //     date:this.state.all_com[i].follow_up_date,
    //         //   })
    //         // }
    //         //console.log("i", array);
    //         this.setState({ myArray:array});
    //       }
    //     }
    //   }));

      fetch('/notificationFollowUp/'+fakeAuth.user_id)
      .then(res => res.json())
      .then(all_com2 => this.setState({all_com2}
      ,()=>{
        if (Object.getOwnPropertyNames(this.state.all_com2).length > 0){
          //console.log("inside length>0")
          for (var i = 0; i < this.state.all_com2.length; i++){
            var array = this.state.myArray;
            //console.log(this.state.all_com2[i].follow_up_date,this.state.all_com2[i].follow_up_date !== 'Invalid date' && this.state.all_com[i].follow_up_date !== '')
            if (this.state.all_com2[i].follow_up_date !== 'Invalid date' && this.state.all_com2[i].follow_up_date !== ''){
              array.push({
                members_id:this.state.all_com2[i].members_id,
                type:"Communication",
                members_first_name: this.state.all_com2[i].first_name,
                members_last_name: this.state.all_com2[i].last_name,
                date:this.state.all_com2[i].follow_up_date,
              })
            }
            this.setState({ myArray:array});
          }
        }
      }));

      fetch('/notificationBirthday')
      .then(res => res.json())
      .then(all_bir => this.setState({all_bir}
        ,()=>{
        if (Object.getOwnPropertyNames(this.state.all_bir).length > 0){
          //console.log("inside length>0")
          for (var i = 0; i < this.state.all_bir.length; i++){
            var array = this.state.myArray;
            if (this.state.all_bir[i].birthday != 'Invalid date' && this.state.all_bir[i].birthday != ''){
              array.push({
                members_id:this.state.all_bir[i].members_id,
                type:"Birthday",
                members_first_name: this.state.all_bir[i].first_name,
                members_last_name: this.state.all_bir[i].last_name,
                date:this.state.all_bir[i].birthday,
              })
            }
            this.setState({ myArray:array});
          }
        }
      }));

      fetch('/notificationMarriage')
      .then(res => res.json())
      .then(all_mar => this.setState({all_mar}
        ,()=>{
        if (Object.getOwnPropertyNames(this.state.all_mar).length > 0){
          //console.log("inside length>0")
          for (var i = 0; i < this.state.all_mar.length; i++){
            var array = this.state.myArray;
            if (this.state.all_mar[i].marriage_date != 'Invalid date' && this.state.all_mar[i].marriage_date != ''){
              array.push({
                members_id:this.state.all_mar[i].members_id,
                type:"Marriage Anniversary",
                members_first_name: this.state.all_mar[i].first_name,
                members_last_name: this.state.all_mar[i].last_name,
                date:this.state.all_mar[i].marriage_date,
              })
            }
            this.setState({ myArray:array});
          }
        }
      }));
      fetch('/notificationBaptism')
      .then(res => res.json())
      .then(all_bap => this.setState({all_bap}
        ,()=>{
        if (Object.getOwnPropertyNames(this.state.all_bap).length > 0){
          //console.log("inside length>0")
          for (var i = 0; i < this.state.all_bap.length; i++){
            var array = this.state.myArray;
            if (this.state.all_bap[i].start_date != 'Invalid date' && this.state.all_bap[i].start_date != ''){
              array.push({
                members_id:this.state.all_bap[i].members_id,
                type:"Baptism Anniversary",
                members_first_name: this.state.all_bap[i].first_name,
                members_last_name: this.state.all_bap[i].last_name,
                date:this.state.all_bap[i].baptism_date,
              })
            }
            this.setState({ myArray:array});
          }
        }
      }));
  }

  render() {
    return (
      <div style={{marginTop:20,textAlign:'center'}}>
        <div style={{marginTop:20,textAlign:'center'}}>
          <h2>My Reminders Table</h2>
          <br/>
          <select style={{width:175,height:30, padding:0}} value={this.state.date} onChange={e => this.setState({ date: e.target.value})}>
            <option Value={7} >1 week</option>
            <option Value={14}>2 weeks</option>
            <option value={30}>1 month</option>
          </select>
          </div>
          <br/>
          <ReactTable
          data={this.state.myArray}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                if (rowInfo !== undefined){
                  var row = rowInfo.original
                  this.props.history.push('/editMember/'+ rowInfo.original.members_id);
                }
              }
            }
          }}
          columns={[
            {
              columns: [
                {
                  Header: "Date",
                  accessor: "date",
                },
                {
                  Header: "First Name",
                  accessor: "members_first_name",
                  // maxWidth: 160,
                },
                {
                  Header: "Last Name",
                  accessor: "members_last_name",
                  // maxWidth: 160,
                },
                {
                  Header: "Reminder Type",
                  accessor: "type",
                },
              ]
            }
          ]}
          defaultPageSize={10}
          className="-striped -highlight"
          defaultSorted={[{ // the sorting model for the table
            id: 'date',
            desc: false
          }]}
        />
        <br />
      </div>
    );
  }
}


