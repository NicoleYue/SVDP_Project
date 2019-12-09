import React, { Component } from 'react';
import './style.css';
import Doc from './DocService';
import PdfContainer from './PdfContainer';
import ReactTable from "react-table";
import "react-table/react-table.css";
import { fakeAuth } from "../context/auth";


export default class CommunicationReport extends Component {
  constructor(props) {
    super(props);
    this.state = {
        members_id:'',
        name : '', 
        primary_email:'',
        primary_phone:'',
        description:"abc",
        user_email:'',
        all_com:[],
    };
  }

  componentDidMount() {
    const userid = fakeAuth.user_id;
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
        fetch("/viewcommunication/"+this.state.members_id+'/'+userid)
        .then(res => res.json())
        .then(all_com => this.setState({all_com}));

        fetch("/viewuser/"+userid)
        .then(res => res.json())
        .then(user_email => this.setState({user_email}));
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
              <h2 className="flex">Communication Report</h2>
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
              <section className="flex-row">
                <label style={{marginLeft:5,width:110}}>User email</label>
                <input placeholder="User email"
                  name="Name"
                  value={this.state.user_email}/>
              </section>
              {/* {listItems } */}
              <div style={{marginTop:20,textAlign:'center'}}>
              <ReactTable
          data={this.state.all_com}
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
                  maxWidth: 250,
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
          defaultPageSize={8}
          showPaginationBottom={false}
          defaultSorted={[{ // the sorting model for the table
            id: 'communication_date',
            desc: true
          }]}
          className="-striped -highlight"
        />
              </div>   
            </section>
          </React.Fragment>
        </PdfContainer>
      </React.Fragment>
    );
  }
}

