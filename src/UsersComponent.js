import React, {Component} from "react";
import axios from "axios";
class UsersComponent extends Component{
    state = {
        users: [],
        newFirstName: "",
        newLastName: "",
        newActive: false
    };

    componentDidMount() {
        axios.get("http://localhost:8989/get-all-users",
            {
                params: {

                }
            }).then((res) => {
                const usersFromServer = res.data;
            this.setState({
                users: usersFromServer
            })
        });
    }

    inputFirstName = (e) => {
        this.setState({
            newFirstName: e.target.value
        })
    };

    inputLastName = (e) => {
        this.setState({
            newLastName: e.target.value
        })
    };

    inputActive = () => {
        this.setState({
            newActive: !this.state.newActive
        })
    };

    addUser = () => {
        const newUser = {
            firstName: this.state.newFirstName,
            lastName: this.state.newLastName,
            active: this.state.newActive
        };
        const currentUser = this.state.users;
        currentUser.push(newUser);
        this.setState({
            users: currentUser,
            newFirstName: "",
            newLastName: "",
            newActive: false
        })
        axios.get("http://localhost:8989/addUser",
            {
                params: newUser
            }).then((res) => {

        });
    };

    clearAll = () => {
        this.setState({
            users: [],
            newFirstName: "",
            newLastName: "",
            newActive: false
        })
    };

    render() {
        return(
            <div>
                <h1> My Users </h1>
                <br/>
                <div style={{margin: "30px"}}>
                    <input placeholder={"First Name..."} value={this.state.newFirstName} onChange={this.inputFirstName}/>
                    <input placeholder={"Last Name..."} value={this.state.newLastName} onChange={this.inputLastName}/>
                    Active: <input type={"checkbox"} checked={this.state.newActive} onChange={this.inputActive}/>
                    <button disabled={this.state.newLastName.length === 0 || this.state.newFirstName.length === 0} onClick={this.addUser}>Add User</button>
                </div>
                {
                    this.state.users.length > 0 &&
                    <table style={{border: "1px solid black"}}>
                        <tr>
                            <th style={{padding: "10px"}}>First Name</th>
                            <th style={{padding: "10px"}}>Last Name</th>
                            <th style={{padding: "10px"}}>Active</th>
                        </tr>
                        {
                            this.state.users.map((user) => {
                                return(
                                    <tr>
                                        <td style={{padding: "10px"}}>{user.firstName}</td>
                                        <td style={{padding: "10px"}}>{user.lastName}</td>
                                        <td style={{padding: "10px"}}>{user.active ? "Yes" : "No"}</td>
                                    </tr>
                                )
                            })
                        }
                    </table>
                }
                <button disabled={this.state.users.length === 0} onClick={this.clearAll}>Clear</button>
            </div>
        )
    }
}
export default UsersComponent;
