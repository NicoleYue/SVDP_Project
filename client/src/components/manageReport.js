import React, { Component } from 'react';
import "@material/react-chips/dist/chips.css";
import '@material/react-material-icon/dist/material-icon.css';
import 'react-notifications/lib/notifications.css';
import "react-table/react-table.css";
import './datetime.css'
import * as am4core from "@amcharts/amcharts4/core";
import * as am4charts from "@amcharts/amcharts4/charts";
import Doc from './DocService';
import PdfContainer from './PdfContainer';
// import Pdf from "react-to-pdf";
// const ref = React.createRef();

export default class EditMember extends Component {
  constructor(props) {
    super(props)
    this.state = {
        n_active_total:0,
        n_active_inq:0,
        n_active_cat:0,
        n_active_can:0,
        n_active_ele:0,
    };
  }

  componentDidMount() {
    fetch("/manageReport")
    .then(res => res.json())
    .then(result => this.setState({
        n_active_total : result,
    }));
    fetch("/manageReport/INQ")
    .then(res => res.json())
    .then(result => this.setState({
        n_active_inq : result,
      },()=> {
        fetch("/manageReport/CAT")
        .then(res => res.json())
        .then(result => this.setState({
            n_active_cat : result,
          },()=> {
    
        fetch("/manageReport/CAN")
        .then(res => res.json())
        .then(result => this.setState({
            n_active_can : result,
          },()=> {
    
        fetch("/manageReport/ELE")
        .then(res => res.json())
        .then(result => this.setState({
            n_active_ele : result,
        },()=> {
    
        fetch("/manageReport/NEO")
        .then(res => res.json())
        .then(result => this.setState({
            n_active_neo : result,
        },()=> {
            var chart = am4core.create("chartdiv", am4charts.PieChart);
            chart.data = [{
              "type": "Inquirer",
              "n": this.state.n_active_inq
            }, {
              "type": "Catechumen",
              "n": this.state.n_active_cat
            }, {
                "type": "Candidate",
                "n": this.state.n_active_can
            }, {
                "type": "Elect",
                "n": this.state.n_active_ele
            }, {
                "type": "Neophyte",
                "n": this.state.n_active_neo
            }];
        
            // Add and configure Series
            let pieSeries = chart.series.push(new am4charts.PieSeries());
            pieSeries.dataFields.value = "n";
            pieSeries.dataFields.category = "type";
        }));
      }));
    }));
  }));
}));
}
  createPdf = (html) => Doc.createPdf(html);

  render() {
    
    return (
      <div>
    {/* <PdfContainer createPdf={this.createPdf}> */}
      <div style={{alignContent:'center',textAlign:'center'}} >
        <h1>Current Status</h1>
        <div id="chartdiv" style={{marginTop:10,textAlign:'left',float: 'left',marginLeft:30, width:'50%',height:'270px'}}></div>
    <div style={{textAlign:'left',float: 'left',marginLeft:0,width:'35%'}} >
      <div style={{clear:'both', marginTop:25}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:20,marginLeft:30}}>
            <label>Number of active Initiate:</label>
        </div>
        <div style={{width:50,float: 'left',marginTop:20}}>
            <label>{this.state.n_active_total}</label>
        </div>
      </div>
      <div style={{clear:'both', marginTop:25}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:25,marginLeft:30}}>
            <label>Number of active Inquirer:</label>
        </div>
        <div style={{width:50,float: 'left',marginTop:25}}>
            <label>{this.state.n_active_inq}</label>
        </div>
      </div>

      <div style={{clear:'both', marginTop:50}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:25,marginLeft:30}}>
            <label>Number of active Catechumen:</label>
        </div>
        <div style={{width:50,float: 'left',marginTop:25}}>
            <label>{this.state.n_active_cat}</label>
        </div>
      </div>

      <div style={{clear:'both', marginTop:50}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:25,marginLeft:30}}>
            <label>Number of active Candidate:</label>
        </div>
        <div style={{width:50,float: 'left',marginTop:25}}>
            <label>{this.state.n_active_can}</label>
        </div>
      </div>

      <div style={{clear:'both', marginTop:50}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:25,marginLeft:30}}>
            <label>Number of active Elect:</label>
        </div>
        <div style={{width:50,float: 'left',marginTop:25}}>
            <label>{this.state.n_active_ele}</label>
        </div>
      </div>

      <div style={{clear:'both', marginTop:50}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:25,marginLeft:30}}>
            <label>Number of active Neophyte:</label>
        </div>
        <div style={{width:50,float: 'left',marginTop:25}}>
            <label>{this.state.n_active_neo}</label>
        </div>
      </div>

      
    </div>
      </div>


      <div style={{clear:'both', marginTop:50}}>
        <div style={{width:250,textAlign:'left',float: 'left',marginTop:25,marginLeft:30}}>
            {/* <Pdf targetRef={ref} filename="code-example.pdf">
                {({ toPdf }) => <button onClick={toPdf}>Export Report</button>}
            </Pdf> */}
            {/* <button type="button" style={{width:160,height:30}}>Export Report</button> */}
        </div>
      </div>
      {/* </PdfContainer> */}
      </div>      
    );
  }
}
