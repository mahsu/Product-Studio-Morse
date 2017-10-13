import React, { Component } from 'react';
import logo from './images/betterment-logo-blue.png';
import './bootstrap.min.css';


var QRCode = require('qrcode.react');

class App extends Component {
  state = {
    users: [],
  };
  
  render() {
    return (
      <div>
        <AppHeader />

        <div className="container">
            <div className="row">
              <div className="col-4">
                <NewCustomerQR />
                <QRResponseStub />
              </div>
              <div className="col-8">
                <UserForm />
              </div>
            </div>
        </div>
      </div>
    );
  }
}

class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand" href="#">Betterment Client Onboarding</a>

        <div className="collapse navbar-collapse">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">Logout</a>
            </li>
          </ul>
        </div>
      </nav>
    )
  }
}

class NewCustomerQR extends Component {
  state = {
    qrValue: "temp",
    loaderIsShowing: true,
    qrCodeIsShowing: false
  };

  getTransactionCode() {
    fetch('/getTx')
      .then(response => response.text())
      .then(info => this.setState({
        qrValue: info,
        loaderIsShowing: false,
        qrCodeIsShowing: true
      })).then(function() {
        console.log(this.state.qrValue);
      }.bind(this))
  }

  componentDidMount() {
    this.getTransactionCode();
  }

  render() {
    return (
      <div>
        { this.state.loaderIsShowing ? <div className="loader"></div> : null }
        { this.state.qrCodeIsShowing ? <QRCode value={this.state.qrValue} size="128" /> : null }
      </div>
    )
  }
}

class QRResponseStub extends Component {
  sendInfoStub() {
    fetch('/sendInfo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        "customer": {
          "name": "John Doe",
          "email": "jdoe@cornell.edu",
          "ssn": "123-45-6789",
          "address": {
            "lineOne": "2 West Loop Rd",
            "lineTwo": "#123",
            "city": "New York",
            "state": "NY",
            "zip": "10003"
          }
        }
      })
    })
  }

  render() {
    return (<button className="btn btn-normal" onClick={this.sendInfoStub}>Stub QR Response</button>)
  }
}

class UserForm extends Component {
  state = {
    customer: {
      "name": "",
      "email": "",
      "ssn": "",
      "address": {
        "lineOne": "",
        "lineTwo": "",
        "city": "",
        "state": "",
        "zip": ""
      }
    },
    "pageLoadTime": +new Date()
  };

  getCustomerInfo() {
    fetch('/getInfo?startDate='+String(this.state.pageLoadTime))
      .then(resp => resp.json())
      .then(function(data) {
        // If we have a customer, set the customer state so it populates in the text fields
        if(!!data.customer) {
          this.setState({
            "customer": data.customer
          });
        }

        // Otherwise, look for a customer in 2ish seconds
        else {
          setTimeout(function() {
            this.getCustomerInfo();
          }.bind(this), 2000)
        }
      }.bind(this))
  }

  componentDidMount() {
    this.getCustomerInfo()
  }


  render() {
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="col-form-label">Name</label>
            <input type="text" className="form-control" value={this.state.customer.name} />
          </div>
          <div className="form-group col-md-6">
            <label className="col-form-label">Email</label>
            <input type="email" className="form-control" value={this.state.customer.email} />
          </div>
        </div>
        <div className="form-group">
          <label className="col-form-label">SSN</label>
          <input type="text" className="form-control" value={this.state.customer.ssn} />
        </div>
        <div className="form-group">
          <label className="col-form-label">Address</label>
          <input type="text" className="form-control" value={this.state.customer.address.lineOne} />
        </div>
        <div className="form-group">
          <label className="col-form-label">Address 2</label>
          <input type="text" className="form-control" value={this.state.customer.address.lineTwo} />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label className="col-form-label">City</label>
            <input type="text" className="form-control" value={this.state.customer.address.city} />
          </div>
          <div className="form-group col-md-4">
            <label className="col-form-label">State</label>
            <input id="inputState" className="form-control" value={this.state.customer.address.state} />
          </div>
          <div className="form-group col-md-2">
            <label className="col-form-label">Zip</label>
            <input type="text" className="form-control" value={this.state.customer.address.zip} />
          </div>
        </div>
        
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default App;
