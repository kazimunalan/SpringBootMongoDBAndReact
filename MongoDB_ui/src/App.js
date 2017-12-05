import React, {Component} from 'react';
import './App.css';
import axios from "axios";
import {Col, Row, Table, Button} from "react-bootstrap";
import TextInput from "robe-react-ui/lib/inputs/TextInput";
import RequestUtils from "./utils/RequestUtils";
import Toast from "pre-toast/lib/Toast";


export default class App extends Component {

    static BaseUrl = "http://127.0.0.1:8081/rest/user";

    constructor(props) {
        super(props);

        this.state = {
            datas: [],
            id: "",
            name: "",
            surname: "",
            save: "",
            update: false,
            showForm: false
        };
    }


    render() {
        return (
            <div style={{padding: 50}}>
                <Row>
                    <Col style={{display: this.state.showForm ? "" : "none"}}>
                        <Col md={3}>
                            <TextInput
                                label="Name"
                                name="name"
                                value={this.state.name}
                                onChange={this.__handleChange}
                            />
                        </Col>
                        <Col md={3}>
                            <TextInput
                                label="Surname"
                                name="surname"
                                value={this.state.surname}
                                onChange={this.__handleChange}
                            />
                        </Col>
                        <Col md={3}>
                            <Button bsStyle="primary"
                                    onClick={this.state.save === "save" ? this.save : this.doUpdate}>{this.state.save}</Button>
                            <Button bsStyle="primary" onClick={this.cancel}>Cancel</Button>
                        </Col>
                    </Col>
                </Row>
                <Row>
                    <Col md={4}>
                        <h2>Name - Surname List</h2>
                    </Col>
                    <Button bsStyle="primary" onClick={this.getAdd}>Add</Button>
                </Row>
                <Row>
                    <Col md={7}>
                        <Table striped bordered condensed hover>
                            <thead>
                            <tr>
                                <th>#</th>
                                <th>Name</th>
                                <th>Surname</th>
                                <th>...</th>
                            </tr>
                            </thead>
                            <tbody>
                            {this.__renderData()}
                            </tbody>
                        </Table>
                    </Col>
                </Row>
            </div>
        );
    }

    getAdd = () => {
        this.setState({
            name: "",
            surname: "",
            showForm: true,
            save: "save"
        });
    }
    cancel = () => {
        this.setState({
            showForm: false
        });
    }


    __getAllData = () => {

        let datas = [];
        axios.get(App.BaseUrl)
            .then(response => {
                datas = response.data;
                this.setState({
                    datas: datas
                });
            });


        // let datas = [];
        // while (RequestUtils.getRequest(App.BaseUrl).length !== 0) {
        //     datas = RequestUtils.getRequest(App.BaseUrl);
        // }
        //
        //
        // if (datas !== undefined) {
        //     this.setState({
        //         datas: datas
        //     });
        // }
    };


    save = () => {
        //console.log(this.state.todoSurname);
        let data = {
            id: "",
            name: this.state.name,
            surname: this.state.surname
        };

        if (this.state.save === "save") {
            if (data.name !== "" && data.surname !== "") {
                axios.post(App.BaseUrl, {
                    name: data.name,
                    surname: data.surname
                })
                    .then(response => {
                        //console.log(response)
                        this.__getAllData()
                    })
                    .catch(function (error) {
                        console.log(error);
                    });
            } else {
                Toast.error("Data Boş");
            }
        }
    }

    doUpdate = () => {

        let data = {
            id: this.state.id,
            name: this.state.name,
            surname: this.state.surname
        }

        if (data.name !== "" && data.surname !== "") {
            axios.put(App.BaseUrl, data)
                .then(res => {
                    this.__getAllData()
                })
                .catch((err) => {
                    console.log(err);
                })
        } else {
            Toast.error("Data Boş");
        }

    }

    __renderData() {
        let datas = this.state.datas.length !== 0 ? this.state.datas : null;
        if (datas !== null) {
            let arr = [];
            for (let i = 0; i < datas.length; i++) {
                let data = datas[i];
                arr.push(
                    <tr>
                        <td key={i}>{data.id}</td>
                        <td>{data.name}</td>
                        <td>{data.surname}</td>
                        <td><Button bsStyle="danger" onClick={this.delete.bind(undefined, data.id)}>Delete</Button>
                            <Button bsStyle="danger" onClick={this.update.bind(this, data)}>Update</Button>
                        </td>
                    </tr>);
            }

            return arr;
        }
    }

    delete = (id) => {

        debugger;
        // this.setState({
        //     showForm: true
        // });

        axios.delete(App.BaseUrl + "/" + id)
            .then(response => {
                //console.log(response)
                this.__getAllData()
            })
            .catch(function (error) {
                console.log(error);
            });

        this.forceUpdate();
    }

    update = (datas) => {

        this.state.id = datas.id;
        this.state.name = datas.name;
        this.state.surname = datas.surname;
        this.setState({
            showForm: true,
            update: true,
            save: "update"
        });

        let name = this.state.name

        let data = {
            name: this.state.name,
            surname: this.state.surname
        }
    }

    componentWillMount() {
        this.__getAllData();
    }

    componentDidMount() {
        this.__getAllData();
    }

    __handleChange = (e: Object) => {
        let state = {};
        let value = e.target.parsedValue !== undefined ? e.target.parsedValue : e.target.value;
        state[e.target.name] = value;
        this.setState(state);
    };

}
