import React, { Component } from 'react';
import './style.css';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import ReactTable from "react-table";
import "react-table/react-table.css";


export default class MemberReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
        members_id:'',
        name : '', 
        primary_email:'',
        primary_phone:'',
        description:"abc",
        all_roles:[],
    };
  }

  componentDidMount() {
    const id = this.props.location.pathname;
    //console.log(id)
    fetch(id)
      .then(res => res.json())
      .then(member => this.setState({
        members_id:member.members_id,
        name : member.first_name+' '+member.last_name, 
        primary_email:member.primary_email,
        primary_phone:member.primary_phone,
      }, () => {
        fetch("/viewreportrole/"+this.state.members_id)
        .then(res => res.json())
        .then(all_roles => this.setState({
            all_roles
          },()=>(console.log(this.state.all_roles))));
    }));  
  }
  createPdf = (html) => Doc.createPdf(html);

  render() {
    //console.log(this.state);
    // var roles= this.state.all_roles;
    // console.log(roles);
    // const listItems = roles.map((r) =>
    // <section className="flex-row">
    //     <label>{r.sub_roles_id} {r.status} {r.start_date} {r.end_date}</label>
    // </section>
    // );
    return (
      <React.Fragment>
        <PdfContainer createPdf={this.createPdf} style={{marginTop:0}}>
          <React.Fragment>
            <section className="flex-column">
              <h2 className="flex">Member Report</h2>
              <section className="flex-row">
                <label style={{marginLeft:5,width:110}}>Member name</label>
                <input placeholder="Name"
                  name="Name"
                  value={this.state.name}/>
              </section>
              <section className="flex-row">
                <label style={{marginLeft:5,width:110}}>Primary email</label>
                <input placeholder="primary email"
                  name="Name"
                  value={this.state.primary_email}/>
              </section>
              <section className="flex-row">
                <label style={{marginLeft:5,width:110}}>Primary phone</label>
                <input placeholder="primary phone"
                  name="Name"
                  value={this.state.primary_phone}/>
              </section>
              {/* {listItems } */}
              <div style={{marginTop:20,textAlign:'center'}}>
              <ReactTable
                data={this.state.all_roles}
            showPaginationBottom={false}
            columns={[
            {
              columns: [
                {
                  Header: "Initiate Role",
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
              ]
            }
          ]}
          defaultPageSize={8}
          defaultSorted={[{ // the sorting model for the table
            id: 'start_date',
            desc: true
          }]}
          className="-striped -highlight"
              />
              </div>   
              {/* <textarea rows="20"
                placeholder="Description"
                name="description"
                value={this.state.description}
                 /> */}
            </section>
          </React.Fragment>
        </PdfContainer>
      </React.Fragment>
    );
  }
}

