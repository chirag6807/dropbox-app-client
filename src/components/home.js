import Sidebar from "./dashboard-material.js";
import React, { Component } from 'react';
import FolderIcon from '@material-ui/icons/Folder';
import CustomMaterialMenu from './menu.component.js';
import { ToastContainer, toast, Flip } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Dropzone from "react-dropzone";
import axios from 'axios';
import DataTable from 'react-data-table-component';
import moment from "moment";
import 'react-responsive-modal/styles.css';
import { Modal } from 'react-responsive-modal';
import DataTableExtensions from "react-data-table-component-extensions";
import { FileIcon } from '@drawbotics/file-icons';
import '@drawbotics/file-icons/dist/style.css';

export default class HomeComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            fileNames: [],
            fileList: [],
            open: false,
            folderName: '',
            fileName: '',
            renameModelOpen: false,
            renameFileModelOpen: false,
            commentModelOpen: false,
            comment: '',
            commentList: []
        };
    }
    folderId = 0
    fileId = 0
    comment = ''
    oldFileName = ''
    columns = [
        {
            cell: (row) => <span> {row.isFolder ? (<FolderIcon style={{ fill: '#ffc107' }} />) : <FileIcon filename={row.fileName} />}</span>,
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
            cell: row => <CustomMaterialMenu size="small" row={row} deleteCallback={this.deleteCallback}
                renameFolderCallback={this.renameFolderCallback} renameFileCallback={this.renameFileCallback}
                commentCallback={this.commentCallback} />,
            allowOverflow: true,
            button: true,
            width: '56px',
        }
    ];

    columnComment = [

        {

            name: 'Comment',
            selector: 'comment',
            sortable: true,
        },
        {
            name: 'CommentTime',
            selector: 'commentTime',
            sortable: false,
            right: true,
        }
    ];

    customStyles = {
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

    componentDidMount() {
        debugger;
        this.getFileStoreListData();
    }

    deleteCallback = () => {
        debugger;
        this.getFileStoreListData();

    }

    renameFolderCallback = (row) => {
        debugger;
        this.folderId = row.folderId;
        this.setState({ folderName: row.folderName, renameModelOpen: true });

    }
    commentCallback = (row) => {
        debugger;
        this.fileId = row.fileId;
        this.setState({ commentModelOpen: true });
        this.getCommentListData();

    }

    renameFileCallback = (row) => {
        debugger;
        this.fileId = row.fileId;
        this.oldFileName = row.fileName;
        this.setState({ fileName: row.fileName, renameFileModelOpen: true });

    }

    getFileStoreListData = async () => {
        debugger;
        try {
            const response = await axios.get(
                "http://localhost:3001/filestore/GetFolderFileListById/" + this.props.match.params.id
            );
            response.data.forEach(element => {
                element.createdOn = moment(element.createdOn).format('MMMM Do YYYY, h:mm:ss A');
            });
            this.setState({
                fileList: response.data
            })
        } catch (error) {
            toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
    }

    onChangeHandler = (event) => {
        let nam = event.target.name;
        let val = event.target.value;
        this.setState({ [nam]: val });
    }

    commentSaveClick = async (event) => {
        var code = event.keyCode || event.which;
        if (code === 13) {
            const { comment } = this.state;
            let fileId = this.fileId;
            event.preventDefault();
            let userId = localStorage.getItem("userId");
            if (this.state.comment === '' || this.state.comment === undefined) {
                toast.error("Please Enter Comment!", { transition: Flip, autoClose: 3000 });
                return;
            }
            try {
                const response = await axios.post("http://localhost:3001/filestore/CommentAdd", { fileId, userId, comment });
                console.log(response);
                toast.success("Comment added successfully!", { transition: Flip, autoClose: 3000 });
                // this.setState({ comment: '' });
                this.getCommentListData();
            }
            catch (error) {
                console.log(error.response);
                toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
            }
        }
    }

    getCommentListData = async () => {
        debugger;
        try {
            const response = await axios.get(
                "http://localhost:3001/filestore/GetCommentListById/" + this.fileId
            );
            response.data.forEach(element => {
                element.commentTime = moment(element.commentTime).format('MMMM Do YYYY, h:mm:ss A');
            });
            this.setState({
                comment: '',
                commentList: response.data
            })
        } catch (error) {
            toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
    }


    fileSaveClick = async (e) => {
        e.preventDefault();
        let folderId = this.props.match.params.id;
        const data = new FormData()
        data.append('file', this.state.fileNames[0]);
        let userId = localStorage.getItem("userId");
        try {
            const response = await axios.post("http://localhost:3001/filestore/FileUpload/" + folderId + '/' + userId, data, {});
            console.log(response);
            this.setState({ fileNames: [] });
            toast.success("File Added Successfully!", { transition: Flip, autoClose: 3000 });
            this.getFileStoreListData();
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
    }

    onOpenModal = () => {
        this.setState({ open: true });
    };

    onCloseModal = () => {
        this.setState({ open: false, renameModelOpen: false, renameFileModelOpen: false,commentModelOpen:false });
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
        if (this.state.folderName === '' || this.state.folderName === undefined) {
            toast.error("Please Enter Folder Name!", { transition: Flip, autoClose: 3000 });
            return;
        }
        try {
            const response = await axios.post("http://localhost:3001/filestore/FolderCreate", { folderName, userId, folderId });
            console.log(response);
            toast.success("Folder created successfully!", { transition: Flip, autoClose: 3000 });
            this.setState({ folderName: [], open: false });
            // this.setState({ open: false });
            this.getFileStoreListData();
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
    }

    folderRenameClick = async (e) => {
        const { folderName } = this.state;
        let folderId = this.folderId;
        e.preventDefault();
        if (this.state.folderName === '' || this.state.folderName === undefined) {
            toast.error("Please Enter Folder Name!", { transition: Flip, autoClose: 3000 });
            return;
        }
        try {
            const response = await axios.put("http://localhost:3001/filestore/FolderRename", { folderName, folderId });
            console.log(response);
            toast.success("Folder rename successfully!", { transition: Flip, autoClose: 3000 });
            this.setState({ folderName: '', renameModelOpen: false });
            // this.setState({ open: false });
            this.getFileStoreListData();
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
    }

    fileRenameClick = async (e) => {
        const { fileName } = this.state;
        let fileId = this.fileId;
        let oldFileName = this.oldFileName;
        e.preventDefault();
        if (this.state.fileName === '' || this.state.fileName === undefined) {
            toast.error("Please Enter File Name!", { transition: Flip, autoClose: 3000 });
            return;
        }
        try {
            const response = await axios.put("http://localhost:3001/filestore/FileRename", { fileName, fileId, oldFileName });
            console.log(response);
            toast.success("File rename successfully!", { transition: Flip, autoClose: 3000 });
            this.setState({ fileName: '', renameFileModelOpen: false });
            // this.setState({ open: false });
            this.getFileStoreListData();
        }
        catch (error) {
            console.log(error.response);
            toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
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
        let commentList = this.state.commentList;
        let columns = this.columns;
        const tableData = {
            columns,
            data
        };
        const { open, renameModelOpen, renameFileModelOpen, commentModelOpen } = this.state;
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
                        columns={this.columns}
                        data={this.state.fileList}
                        customStyles={this.customStyles}
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
                <Modal
                    open={renameModelOpen}
                    onClose={this.onCloseModal}
                    center
                    className="modelWidth"
                    styles={{
                        modal: {
                            animation: `${
                                renameModelOpen ? 'customEnterAnimation' : 'customLeaveAnimation'
                                } 500ms`,
                        }
                    }}
                >

                    <div className="modelWidth"  >
                        <h1 className="h3  font-weight-normal" > Edit Folder Name</h1>
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
                        <button className="btn btn-primary float-right" onClick={this.folderRenameClick} >
                            Update</button>
                        <button className="btn btn-default float-right" onClick={this.onCloseModal}>
                            <i className="fa fa-user-plus"></i> Close</button>
                        <ToastContainer />
                    </div>
                </Modal>
                <Modal
                    open={renameFileModelOpen}
                    onClose={this.onCloseModal}
                    center
                    className="modelWidth"
                    styles={{
                        modal: {
                            animation: `${
                                renameFileModelOpen ? 'customEnterAnimation' : 'customLeaveAnimation'
                                } 500ms`,
                        }
                    }}
                >

                    <div className="modelWidth"  >
                        <h1 className="h3  font-weight-normal" > Edit File Name</h1>
                        <hr />
                        <div className="form-group">
                            <label>Name</label>
                            <input type="text" id="fileName" className="form-control"
                                placeholder="File Name" required=""
                                name="fileName"
                                onChange={this.onChangeHandler}
                                value={this.state.fileName} />
                        </div>

                        <hr />
                        <button className="btn btn-primary float-right" onClick={this.fileRenameClick} >
                            Update</button>
                        <button className="btn btn-default float-right" onClick={this.onCloseModal}>
                            <i className="fa fa-user-plus"></i> Close</button>
                        <ToastContainer />
                    </div>
                </Modal>
                <Modal
                    open={commentModelOpen}
                    onClose={this.onCloseModal}
                    center
                    className="modelWidth"
                    styles={{
                        modal: {
                            animation: `${
                                commentModelOpen ? 'customEnterAnimation' : 'customLeaveAnimation'
                                } 500ms`,
                        }
                    }}
                >

                    <div className="commentModelWidth"  >
                        <h1 className="h3  font-weight-normal" >Comments</h1>
                        <hr />
                        <div className="form-group">
                            {/* <label>Name</label> */}
                            <input type="text" id="comment" className="form-control"
                                placeholder="Enter Comment" required=""
                                name="comment"
                                onChange={this.onChangeHandler}
                                value={this.state.comment}
                                onKeyPress={this.commentSaveClick} />
                        </div>

                        <hr />
                        <DataTable
                            title="Comment List"
                            columns={this.columnComment}
                            data={this.state.commentList}
                            striped
                        />

                        {/* <button className="btn btn-primary float-right" onClick={this.fileRenameClick} >
                            Update</button>
                        <button className="btn btn-default float-right" onClick={this.onCloseModal}>
                            <i className="fa fa-user-plus"></i> Close</button> */}
                        <ToastContainer />
                    </div>
                </Modal>
            </>
        )
    }
}

