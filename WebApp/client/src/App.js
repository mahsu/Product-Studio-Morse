import React, { Component } from 'react';
import logo from './images/chasebank-logo.svg';
import morseLogo from './images/morsetrans.png';
import './css/bootstrap.min.css';
import './css/open-iconic-bootstrap.min.css'

import { Button, Modal, ModalHeader, ModalBody, ModalFooter } from 'reactstrap';

var QRCode = require('qrcode.react');

class App extends Component {
  state = {
    isSigningUp: false
  };

  showSignupForm = (e) => {
    this.setState({isSigningUp: true});
  }

  hideSignupForm = (e) => {
    this.setState({isSigningUp: false});
  }
  
  render() {
    return (
      <div>
        <AppHeader />

        <div className="container">
          <div className="row">
            <div className="col-12">
              <h2>Welcome to Chase.com!</h2>
              <p>We've got all sorts of accounts that you can sign up for to make you better at being you. Low rates, awesome customer service, Chase Bank is the best!</p>
              <p>&nbsp;</p>

              <div className="row">
                <div className="col-4 title-page-icon">
                  <p><span class="oi oi-credit-card" title="icon name" aria-hidden="true"></span></p>
                  <h3>Credit Cards</h3>
                  <ul className="list-unstyled">
                    <li>Low Rates</li>
                    <li>Approval for Everyone</li>
                  </ul>
                   
                  <Button color="primary" block>Open a new Credit Card</Button>
                </div>

                <div className="col-4 title-page-icon">
                  <p><span class="oi oi-lock-locked" title="icon name" aria-hidden="true"></span></p>
                  <h3>Savings Accounts</h3>
                  <ul className="list-unstyled">
                    <li>Low Fees</li>
                    <li>Your Money is Safe</li>
                  </ul>
                  
                  <button class="btn btn-primary btn-block">Open a new Savings Account</button>
                </div>

                <div className="col-4 title-page-icon">
                  <p><span class="oi oi-dollar" title="icon name" aria-hidden="true"></span></p>
                  <h3>Checking Accounts</h3>
                  <ul className="list-unstyled">
                    <li>Free checkbooks</li>
                    <li>Sign up online</li>
                  </ul>
                  
                  <button class="btn btn-primary btn-block" onClick={this.showSignupForm}>Open a new Checking Account</button>
                </div>
              </div>
            </div>
          </div>

          {this.state.isSigningUp ? <SignUpForm cancelCallback={this.hideSignupForm} /> : null}
        </div>
      </div>
    );
  }
}

class AppHeader extends Component {
  render() {
    return (
      <nav className="navbar navbar-expand-md navbar-dark bg-dark fixed-top">
        <a className="navbar-brand logo mx-auto" href="#" >
          <img src={logo} />
        </a>
      </nav>
    )
  }
}

class SignUpForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      modal: false
    };
  }

  toggle = () => {
    this.setState({
      modal: !this.state.modal
    });
  }

  morseReceived = () => {
    this.toggle();
  }

  render() {
    return (
            <div className="row signUpPage justify-content-center fixed-top">
              <div className="col-6">
                <h3>New Checking Account <small class="text-muted float-sm-right" style={{cursor:"pointer"}} onClick={this.props.cancelCallback}>Cancel</small></h3>
                <p>Please enter your personal information in the form below and we will review your checking account for approval. Alternatively, sign up with Morse for accelerated approval</p>

                <UserForm responseReceivedCallback={this.morseReceived} />

                <button type="submit" className="btn btn-primary float-sm-right">Submit</button>
                <button type="submit" className="btn btn-outline-danger" onClick={this.toggle}><img src={morseLogo} height="20px" style={{verticalAlign:"-4px"}} /> Sign Up With Morse</button>

                <Modal isOpen={this.state.modal} toggle={this.toggle} className={this.props.className}>
                  <ModalHeader toggle={this.toggle}><img src={morseLogo} height="50px" style={{verticalAlign:"middle"}}  />Sign Up With Morse</ModalHeader>
                  <ModalBody style={{textAlign:"center"}}>
                    <NewCustomerQR />
                  </ModalBody>
                  <ModalFooter>
                    <QRResponseStub />
                    <Button color="secondary" onClick={this.toggle}>Cancel</Button>
                  </ModalFooter>
                </Modal>
              </div>
            </div>
            );
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

          this.props.responseReceivedCallback();
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
          <FormGroupInput value={this.state.customer.name} label="Name" size='6' />
          <FormGroupInput value={this.state.customer.email} label="Email" size='6' />
        </div>
        
        <FormGroupInput value={this.state.customer.ssn} label="SSN" />
        <FormGroupInput value={this.state.customer.address.lineOne} label="Address" />
        <FormGroupInput value={this.state.customer.address.lineTwo} label="Address (Line 2)" />

        <div className="form-row">
          <FormGroupInput value={this.state.customer.address.city} label="City" size='6' />
          <FormGroupInput value={this.state.customer.address.state} label="State" size='4' />
          <FormGroupInput value={this.state.customer.address.zip} label="Zip" size='2' />
        </div>
      </form>
    )
  }
}

class FormGroupInput extends Component {
  render() {
    return (
        <div className={"form-group "+ ((this.props.size) ? "col-md-"+this.props.size : '')}>
          <label className="col-form-label">{this.props.label}</label>
          <input type="text" className="form-control" value={this.props.value} />
        </div>
    )
  }
}

export default App;
