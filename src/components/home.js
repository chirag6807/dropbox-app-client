import Sidebar from "./dashboard-material.js";
import React, { Component, useState } from 'react';
// import { storiesOf } from '@storybook/react';
import Icon from '@material-ui/icons/Apps';
import FolderIcon from '@material-ui/icons/Folder';
import CustomMaterialMenu from './menu.component.js';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from "react-dropzone";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import IconButton from '@material-ui/core/IconButton';
import CircularProgress from '@material-ui/core/CircularProgress';
import moment from "moment";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import DataTableExtensions from "react-data-table-component-extensions";

const columns = [
    {
        cell: (row) => <span> {row.isFolder ? (<FolderIcon style={{ fill: '#ffc107' }} />) : null}</span>,
        width: '56px', // custom width for icon button
        style: {
        },
    },
    {

        name: 'Name',
        selector: 'fileName',
        sortable: true,
    },
    {
        name: 'Owner',
        selector: 'fileType',
        sortable: true,
        right: true,
    },
    {
        name: 'Last Opened',
        selector: 'createdOn',
        sortable: true,
        right: true,
    },
    {
        cell: row => <CustomMaterialMenu size="small" row={row} />,
        allowOverflow: true,
        button: true,
        width: '56px',
    }
];

const customStyles = {
    headRow: {
        style: {
            border: 'none',
        },
    },
    headCells: {
        style: {
            color: '#202124',
            fontSize: '14px',
        },
    },
    rows: {
        highlightOnHoverStyle: {
            backgroundColor: 'rgb(230, 244, 244)',
            borderBottomColor: '#FFFFFF',
            borderRadius: '25px',
            outline: '1px solid #FFFFFF',
        },
    },
    pagination: {
        style: {
            border: 'none',
        },
    },
};


export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNames: [],
            fileList: [],
            open: false,
            folderName: ''
        }
    }

    componentDidMount() {
        this.getFileStoreListData();
        // axios.get("http://localhost:3001/filestore/GetFolderFileListById/" + this.props.match.params.id)
        //     .then(response => {

        //         response.data.forEach(element => {
        //             element.createdOn = moment(element.createdOn).format('MMMM Do YYYY, h:mm:ss A');
        //         });

        //         this.setState({
        //             fileList: response.data
        //         })
        //     })
        //     .catch(function (error) {
        //         console.log(error);
        //     })
    }

    getFileStoreListData = () => {
        axios.get("http://localhost:3001/filestore/GetFolderFileListById/" + this.props.match.params.id)
            .then(response => {

                response.data.forEach(element => {
                    element.createdOn = moment(element.createdOn).format('MMMM Do YYYY, h:mm:ss A');
                });

                this.setState({
                    fileList: response.data
                })
            })
            .catch(function (error) {
                console.log(error);
            })
    }

    getListData = (data) => {
        debugger;
        console.log("List Data :" + data);
    }

    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });

    }

    fileSaveClick = async (e) => {
        e.preventDefault();
        let folderId = this.props.match.params.id;
        const data = new FormData()
        data.append('file', this.state.fileNames[0]);
        let userId = localStorage.getItem("userId");
        // data.append('folderId', folderId);
        try {
            const response = await axios.post("http://localhost:3001/filestore/FileUpload/" + folderId + '/' + userId, data, {});
            console.log(response);
            this.setState({ fileNames: [] });
            toast.success("File Added Successfully!");
            this.getFileStoreListData();
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.error);
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false });
    };
    handleChange = (state) => {
        // You can use setState or dispatch with something like Redux so we can use the retrieved data
        console.log('Selected Rows: ', state.selectedRows);
    };


    folderSaveClick = async (e) => {
        const { folderName } = this.state;
        let folderId = this.props.match.params.id;
        e.preventDefault();
        let userId = localStorage.getItem("userId");
        if (this.state.folderName == '' || this.state.folderName == undefined) {
            toast.error("Please Enter Folder Name!");
            return;
        }
        try {
            const response = await axios.post("http://localhost:3001/filestore/FolderCreate", { folderName, userId, folderId });
            console.log(response);
            toast.success("Folder created successfully!");
            this.setState({ folderName: [], open: false });
            // this.setState({ open: false });
            this.getFileStoreListData();
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.error);
        }
    }

    onDrop = (acceptedFiles) => {
        this.setState({ fileNames: acceptedFiles })
        console.log(acceptedFiles);
    }

    redirectSubList = row => {

        if (row.isFolder) {
            window.history.pushState(null, null, window.location.replace('/file-store/' + row.folderId));
        }
        else {
            setTimeout(() => {
                const response = {
                    file: 'http://localhost:3001/images/' + row.fileName,
                };
                window.open(response.file);
            }, 100);
        }

    }

    render() {
        let data = this.state.fileList;
        const tableData = {
            columns,
            data,
            
        };
        const { open } = this.state;
        return (
            <>
                <Sidebar></Sidebar>
                <div className="App">
                    <Dropzone onDrop={this.onDrop}>
                        {({ getRootProps, getInputProps }) => (
                            <div {...getRootProps({ className: "dropzone" })}>
                                <input {...getInputProps()} />
                                <p>Drag'n'drop files, or click to select files</p>
                            </div>
                        )}
                    </Dropzone>
                    <div>
                        {this.state.fileNames.length > 0 && this.state.fileNames.map(acceptedFile => (
                            <li key={acceptedFile.name} className="list-group-item list-group-item-info">
                                {acceptedFile.name}
                            </li>
                        ))}
                        <br />
                        {this.state.fileNames.length > 0 &&

                            <button className="btn btn-primary " onClick={this.fileSaveClick} id="btn-signup">
                                <i className="fas fa-user-plus"></i> Upload</button>

                        }
                        <ToastContainer />
                    </div>
                </div>
                <div>
                    <button className="btn btn-primary float-right" onClick={this.onOpenModal}>
                        Create New Folder</button>                 
                </div>
                <DataTableExtensions {...tableData}>
                    <DataTable
                        title="File Store"
                        columns={columns}
                        data={this.state.fileList}
                        customStyles={customStyles}
                        highlightOnHover
                        pointerOnHover
                        selectableRows
                        striped
                        pagination                       
                        onRowClicked={this.redirectSubList}

                    />
                </DataTableExtensions>
                <Modal
                    open={open}
                    onClose={this.onCloseModal}
                    center
                    className="modelWidth"
                    styles={{
                        modal: {
                            animation: `${
                                open ? 'customEnterAnimation' : 'customLeaveAnimation'
                                } 500ms`,
                        }
                    }}
                >

                    <div className="modelWidth"  >
                        <h1 className="h3  font-weight-normal" > Create Folder</h1>
                        <hr />
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" id="folderName" className="form-control"
                                placeholder="Folder Name" required=""
                                name="folderName"
                                onChange={this.onChangeHandler}
                                value={this.state.folderName} />
                        </div>

                        <hr />
                        <button className="btn btn-primary float-right" onClick={this.folderSaveClick} >
                            Create</button>
                        <button className="btn btn-default float-right" onClick={this.onCloseModal}>
                            <i className="fa fa-user-plus"></i> Close</button>
                        <ToastContainer />
                    </div>
                </Modal>
            </>
        )
    }
}

