import React, { Component } from 'react';
import ReactTable from "react-table";
import "react-table/react-table.css";

class Home extends Component {
  constructor() {
    super();
    this.state = {
      members: [],
    };
  }

  componentDidMount() {
    fetch('/api')
      .then(res => res.json())
      .then(members => this.setState({members}));
  }


  render() {
    const {members } = this.state;
    return (
      <div style={{marginTop:20,textAlign:'center'}}>
        <div style={{marginTop:20,textAlign:'center'}}>
          <h2>Member Table</h2>
          </div>
          <ReactTable
          data={members}
          filterable
          defaultFilterMethod={(filter, row) =>
            String(row[filter.id]) === filter.value}
          getTdProps={(state, rowInfo, column, instance) => {
            return {
              onClick: (e, handleOriginal) => {
                console.log('It was in this row:', rowInfo)
                if (rowInfo !== undefined){
                  var id = rowInfo.original.members_id;
                  this.props.history.push('/editMember/'+id);
                }
              }
            }
          }}
          columns={[
            {
              columns: [
                {
                  Header: "ID",
                  accessor: "members_id",
                  maxWidth: 60,
                },
                {
                  Header: "First Name",
                  accessor: "first_name",
                  maxWidth: 100,
                  filterMethod: (filter, row) =>
                    (row[filter.id].toUpperCase()).startsWith(filter.value.toUpperCase())
                },
                {
                  Header: "Last Name",
                  accessor: "last_name",
                  maxWidth: 100,
                  filterMethod: (filter, row) =>
                    (row[filter.id].toUpperCase()).startsWith(filter.value.toUpperCase())
                },
                {
                  Header: "Member Status",
                  accessor: "members_status",
                  maxWidth: 120,
                  Cell: ({ value }) => (
                    value === "A" ? "Active" :
                    value === "I" ? "Inactive" :
                    "N/A"),
                  filterMethod: (filter, row) => {
                    if (filter.value === "A") {
                      return row[filter.id] === "A";
                    }
                    if (filter.value === "all") {
                      return true;
                    }
                    return row[filter.id] === "I";
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "A"}
                    >
                      <option value="all">Show All</option>
                      <option value="A">Active</option>
                      <option value="I">Inactive</option>
                    </select>
                }
              ]
            },
            {
              columns: [
                {
                  Header: "Phone Number",
                  accessor: "primary_phone",
                  filterMethod: (filter, row) =>
                    row[filter.id].startsWith(filter.value)
                },
                {
                  Header: "Primary email",
                  accessor: "primary_email",
                  filterMethod: (filter, row) =>
                    (row[filter.id].toUpperCase()).startsWith(filter.value.toUpperCase())
                },
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
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "ADM") {
                      return row[filter.id] ==="ADM";
                    }
                    if (filter.value === "INI") {
                      return row[filter.id] ==="INI";
                    }
                    if (filter.value === "MIN") {
                      return row[filter.id] ==="MIN";
                    }
                    if (filter.value === "SUP") {
                      return row[filter.id] ==="SUP";
                    }
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show all</option>
                      <option value="ADM">Administrator</option>
                      <option value="INI">Initiate</option>
                      <option value="MIN">Minister</option>
                      <option value="SUP">Supporter</option>
                    </select>
                },
                {
                  Header: "Sub-Role",
                  accessor: "sub_roles_id",
                  maxWidth: 150,
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
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "ADT") {
                      return row[filter.id] ==="ADT";
                    }
                    if (filter.value === "CAN") {
                      return row[filter.id] ==="CAN";
                    }
                    if (filter.value === "CAT") {
                      return row[filter.id] ==="CAT";
                    }
                    if (filter.value === "COM") {
                      return row[filter.id] ==="COM";
                    }
                    if (filter.value === "CTC") {
                      return row[filter.id] ==="CTC";
                    }
                    if (filter.value === "DIR") {
                      return row[filter.id] ==="DIR";
                    }
                    if (filter.value === "EVC") {
                      return row[filter.id] ==="EVC";
                    }
                    if (filter.value === "FAM") {
                      return row[filter.id] ==="FAM";
                    }
                    if (filter.value === "FRI") {
                      return row[filter.id] ==="FRI";
                    }
                    if (filter.value === "INQ") {
                      return row[filter.id] ==="INQ";
                    }
                    if (filter.value === "IQC") {
                      return row[filter.id] ==="IQC";
                    }
                    if (filter.value === "IQT") {
                      return row[filter.id] ==="IQT";
                    }
                    if (filter.value === "NEO") {
                      return row[filter.id] ==="NEO";
                    }
                    if (filter.value === "RTC") {
                      return row[filter.id] ==="RTC";
                    }
                    if (filter.value === "SOM") {
                      return row[filter.id] ==="SOM";
                    }
                    if (filter.value === "SPC") {
                      return row[filter.id] ==="SPC";
                    }
                    if (filter.value === "SPO") {
                      return row[filter.id] ==="SPO";
                    }
                    if (filter.value === "SPU") {
                      return row[filter.id] ==="SPU";
                    }
                    if (filter.value === "SYS") {
                      return row[filter.id] ==="SYS";
                    }
                    if (filter.value === "USE") {
                      return row[filter.id] ==="USE";
                    }
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "all"}
                    >
                      <option value="all">Show all</option>
                      <option value="ADT">Admin Team</option>
                      <option value="CAN">Candidate</option>
                      <option value="CAT">Catechumen</option>
                      <option value="COM">Companion</option>
                      <option value="CTC">Catechist</option>
                      <option value="DIR">Director</option>
                      <option value="EVC">Event Coordinator</option>
                      <option value="FAM">Family</option>
                      <option value="FRI">Friend</option>
                      <option value="INQ">Inquirer</option>
                      <option value="IQT">Inquiry Team</option>
                      <option value="NEO">Neophyte</option>
                      <option value="RTC">Retreat Coordinator</option>
                      <option value="SOM">Social Ministry</option>
                      <option value="SPC">Sponsor Coordinator</option>
                      <option value="SPO">Sponsor</option>
                      <option value="SPU">Spouse</option>
                      <option value="SYS">System Administrator</option>
                      <option value="USE">User</option>
                    </select>
                },
                {
                  Header: "Role Status",
                  accessor: "roles_status",
                  maxWidth: 120,
                  Cell: ({ value }) => (
                    value === "A" ? "Active" :
                    value === "I" ? "Inactive" :
                    "N/A"),
                  filterMethod: (filter, row) => {
                    if (filter.value === "all") {
                      return true;
                    }
                    if (filter.value === "A") {
                      return row[filter.id] === "A";
                    }
                    if (filter.value === "I") {
                      return row[filter.id] === "I";
                    }
                    return (row[filter.id] !== "A" && row[filter.id] !== "I") ;
                  },
                  Filter: ({ filter, onChange }) =>
                    <select
                      onChange={event => onChange(event.target.value)}
                      style={{ width: "100%" }}
                      value={filter ? filter.value : "A"}
                    >
                      <option value="A">Active</option>
                      <option value="all">Show All</option>
                      <option value="I">Inactive</option>
                      <option value="N">N/A</option>
                    </select>
                },
              ]
            }
          ]}
          defaultPageSize={10}
          // pivotBy={["first_name"],["last_name"]}
          className="-striped -highlight"
          defaultSorted={[{ // the sorting model for the table
            id: 'members_id',
            desc: false
          }]}
          defaultFiltered={[{ // the current filters model
            id: 'members_status',
            value: 'A'
          }]}
          defaultFiltered={[{ // the current filters model
            id: 'roles_status',
            value: 'A'
          }]}
        />
        <br />
      </div>
    );
  }
}

export default Home;
