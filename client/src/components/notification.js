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
    };
  }

  componentDidMount() {
    fetch('/notification/'+fakeAuth.user_id,)
      .then(res => res.json())
      .then(all_com => this.setState({all_com}
      ,()=>{
        if (Object.getOwnPropertyNames(this.state.all_com).length > 0){
          //console.log("inside length>0")
          for (var i = 0; i < this.state.all_com.length; i++){
            var array = this.state.myArray;
            if (this.state.all_com[i].communication_date != 'Invalid date' && this.state.all_com[i].communication_date != ''){
              array.push({
                members_id:this.state.all_com[i].members_id,
                type:"Communication",
                members_name: this.state.all_com[i].members_id,
                date:this.state.all_com[i].communication_date,
              })
            }
            //console.log(this.state.all_com[i].follow_up_date,this.state.all_com[i].follow_up_date !== 'Invalid date' && this.state.all_com[i].follow_up_date !== '')
            // if (this.state.all_com[i].follow_up_date !== 'Invalid date' && this.state.all_com[i].follow_up_date !== ''){
            //   array.push({
            //     type:"Follow Up",
            //     members_id: this.state.all_com[i].members_id,
            //     date:this.state.all_com[i].follow_up_date,
            //   })
            // }
            //console.log("i", array);
            this.setState({ myArray:array});
          }
        }
      }));

      fetch('/notification2/'+fakeAuth.user_id)
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
                type:"Follow Up",
                members_name: this.state.all_com2[i].members_id,
                date:this.state.all_com2[i].follow_up_date,
              })
            }
            this.setState({ myArray:array});
          }
        }
      }));

      fetch('/notification3')
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
                members_name: this.state.all_bir[i].first_name + " "+ this.state.all_bir[i].last_name,
                date:this.state.all_bir[i].birthday,
              })
            }
            this.setState({ myArray:array});
          }
        }
      }));

      fetch('/notification4')
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
                type:"Anniversary",
                members_name: this.state.all_mar[i].members_id,
                date:this.state.all_mar[i].marriage_date,
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
          <h2>Notification Table</h2>
          </div>
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
                  // maxWidth: 120,
                  // Cell: ({ value }) => (
                  //   value === "EM" ? "Email" :
                  //   value === "PC" ? "Phone Call" :
                  //   value === "TM" ? "Text Message" :
                  //   value === "IP" ? "In Person" :
                  //   "N/A"),
                },
                {
                  Header: "members_name",
                  accessor: "members_name",
                  // maxWidth: 160,
                },
                {
                  Header: "Type",
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


