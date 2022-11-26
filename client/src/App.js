import React from 'react';
import io from 'socket.io-client'
import { Form, Button } from 'react-bootstrap';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import '../node_modules/bootstrap/dist/js/bootstrap.min.js';
import CHATROOM from './components/chatroom';
const socket = io.connect("http://localhost:8080");

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      validInput: false,
      userName: '',
      roomName: '',
      userDetails: {}
    };
  };
  _onSubmitPressed = () => {
    if (this.state.userName !== '' && this.state.roomName !== '') {
      const ud = { username: this.state.userName, roomname: this.state.roomName }
      socket.emit("join_room", this.state.roomName);
      this.setState({ userDetails: ud, validInput: true });
    }
  }
  render() {
    return (
      <>
        {!this.state.validInput ?
          (
            <div className='container'>
              {/* <h3>App Started</h3> */}
              <div className='row justify-content-center mt-5'>
                <div className='col-6 border border-2 m-5 pt-5 pb-5'>
                  <div className='m-4'>
                    <Form>
                      <Form.Group className="mb-3" controlId="formBasicEmail">
                        <Form.Label>User Name</Form.Label>
                        <Form.Control value={this.state.userName} onChange={(e) => {
                          this.setState({ userName: e.target.value })
                        }} type="text" placeholder="Enter User Name" />
                      </Form.Group>
                      <Form.Group className="mb-3" controlId="formBasicPassword">
                        <Form.Label>Room Name</Form.Label>
                        <Form.Control value={this.state.roomName} onChange={(e) => {
                          this.setState({ roomName: e.target.value })
                        }} type="text" placeholder="Enter Room Name" />
                      </Form.Group>
                      <Button onClick={() => {
                        this._onSubmitPressed();
                      }} variant="primary">
                        Submit
                      </Button>
                    </Form>
                  </div>
                </div>
              </div>
            </div>
          )
          :
          (
            <div>
              <CHATROOM data={this.state.userDetails}/>
            </div>
          )}
      </>
    );
  }
}
export default App;
