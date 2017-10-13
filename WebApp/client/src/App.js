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
    loaderIsShowing: false,
    qrCodeIsShowing: true
  };

  componentDidMount() {
    /*fetch('/getTx')
      .then(response => response.text())
      .then(info => this.setState({
        qrValue: info,
        loaderIsShowing: false,
        qrCodeIsShowing: true
      })).then(function() {
        console.log(this.state.qrValue);
      }.bind(this))*/
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

class UserForm extends Component {
  state = {
    customer: {
      "name": "temp",
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
    fetch('/getInfo?startDate='+this.state.pageLoadTime)
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

  sendInfoStub() {
    fetch('/sendInfo', {
      method: 'post',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({a: 7, str: 'Some string: &=&'})
    })
  }

  componentDidMount() {
    //this.sendInfoStub();

    this.getCustomerInfo()
  }


  render() {
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputPassword4" className="col-form-label">Name</label>
            <input type="text" className="form-control" id="inputPassword4" placeholder="Name" value={this.state.customer.name} />
          </div>
          <div className="form-group col-md-6">
            <label htmlFor="inputEmail4" className="col-form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" value={this.state.customer.email} />
          </div>
        </div>
        <div className="form-group">
          <label htmlFor="inputSSN" className="col-form-label">SSN</label>
          <input type="text" className="form-control" id="inputSSN" placeholder="SSN" value={this.state.customer.email} />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress" className="col-form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" value={this.state.customer.address.lineOne} />
        </div>
        <div className="form-group">
          <label htmlFor="inputAddress2" className="col-form-label">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" value={this.state.customer.address.lineTwo} />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label htmlFor="inputCity" className="col-form-label">City</label>
            <input type="text" className="form-control" id="inputCity" value={this.state.customer.address.city} />
          </div>
          <div className="form-group col-md-4">
            <label htmlFor="inputState" className="col-form-label">State</label>
            <input id="inputState" className="form-control" value={this.state.customer.address.state} />
          </div>
          <div className="form-group col-md-2">
            <label htmlFor="inputZip" className="col-form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" value={this.state.customer.address.zip} />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default App;
