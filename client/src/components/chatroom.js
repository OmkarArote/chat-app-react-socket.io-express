import React from 'react';
import io from 'socket.io-client'
import { Form, Button, Alert, InputGroup } from 'react-bootstrap';

const socket = io.connect("http://localhost:8080");
const ms_arr = []

class CHATROOM extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            userDetails: {},
            messagelist: [],
            currentMessage : ''
        };
    };
    async componentDidMount() {
        this.setState({ userDetails: this.props.data })
        await socket.on("receive_message", (data) => {
            // this.state.messagelist.push(data);
            ms_arr.push(data)
            this.setState({ messagelist: ms_arr }, () => {
                console.log(this.state.messagelist);
            })
        })
    }
    onSendButtonPressed = async () => {
        if (this.state.currentMessage !== '') {
            let msgData = {
                room: this.state.userDetails.roomname,
                author: this.state.userDetails.username,
                message: this.state.currentMessage
            }
            await socket.emit("send_message", msgData);
            ms_arr.push(msgData);
            this.setState({ currentMessage: '', messagelist: msgData });
        }
    }
    render() {
        return (
            <div>
                <div className='container'>
                    {/* <h3>Welcome To Chat Room</h3> */}
                    <div className='row justify-content-center mt-'>
                        <div className='col-6 border border-2 m-5 pt-2 pb-2'>
                            <div className='m-4'>
                                <p>Chat Section</p>
                                <div className='chat-content-section border border-1 p-3 mt-3'>
                                    <Alert variant="primary">
                                        My Chat
                                    </Alert>
                                    <Alert variant="warning">
                                        Your Chat
                                    </Alert>
                                    <InputGroup className="mb-3">
                                        <Form.Control
                                            placeholder="Recipient's username"
                                            aria-label="Recipient's username"
                                            aria-describedby="basic-addon2"
                                            value={this.state.currentMessage}
                                            onChange={(e)=>{
                                                this.setState({currentMessage: e.target.value}, ()=>{
                                                    console.log(this.state.currentMessage);
                                                })
                                            }}
                                        />
                                        <Button
                                        onClick={()=>{
                                            this.onSendButtonPressed();
                                        }}
                                        variant="primary" 
                                        id="button-addon2">
                                            Send
                                        </Button>
                                    </InputGroup>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
}

export default CHATROOM;