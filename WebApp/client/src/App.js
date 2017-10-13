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
    loaderIsShowing: true,
    qrCodeIsShowing: false
  };

  componentDidMount() {
    fetch('/getTx')
      .then(res => this.setState({
        qrValue: res,
        loaderIsShowing: false,
        qrCodeIsShowing: true
      }))
  }

  render() {
    return (
      <div>
        { this.state.loaderIsShowing ? <div className="loader"></div> : null }
        { this.state.qrCodeIsShowing ? <QRCode value={this.state.qrValue} size="64" /> : null }
        
      </div>
    )
  }
}

class UserForm extends Component {
  render() {
    return (
      <form>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputPassword4" className="col-form-label">Name</label>
            <input type="text" className="form-control" id="inputPassword4" placeholder="Name" />
          </div>
          <div className="form-group col-md-6">
            <label for="inputEmail4" className="col-form-label">Email</label>
            <input type="email" className="form-control" id="inputEmail4" placeholder="Email" />
          </div>
        </div>
        <div className="form-group">
          <label for="inputSSN" className="col-form-label">SSN</label>
          <input type="text" className="form-control" id="inputSSN" placeholder="SSN" />
        </div>
        <div className="form-group">
          <label for="inputAddress" className="col-form-label">Address</label>
          <input type="text" className="form-control" id="inputAddress" placeholder="1234 Main St" />
        </div>
        <div className="form-group">
          <label for="inputAddress2" className="col-form-label">Address 2</label>
          <input type="text" className="form-control" id="inputAddress2" placeholder="Apartment, studio, or floor" />
        </div>
        <div className="form-row">
          <div className="form-group col-md-6">
            <label for="inputCity" className="col-form-label">City</label>
            <input type="text" className="form-control" id="inputCity" />
          </div>
          <div className="form-group col-md-4">
            <label for="inputState" className="col-form-label">State</label>
            <input id="inputState" className="form-control" />
          </div>
          <div className="form-group col-md-2">
            <label for="inputZip" className="col-form-label">Zip</label>
            <input type="text" className="form-control" id="inputZip" />
          </div>
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
    )
  }
}

export default App;
