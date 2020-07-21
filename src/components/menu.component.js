import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';

import MoreVertIcon from '@material-ui/icons/MoreVert';

import axios from 'axios';
import { toast, Flip } from 'react-toastify';

// eslint-disable-next-line react/prop-types
export default ({ row, size, deleteCallback, renameFolderCallback, renameFileCallback,commentCallback }) => {

  const [anchorEl, setAnchorEl] = React.useState(null);
  const handleClick = event => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const deleteRow = async () => {
    debugger;
    if (row.isFolder) {
      let r = window.confirm("Do you want to delete " + row.fileName + " Folder?");
      if (r === true) {
        try {
          await axios.delete(
            "http://localhost:3001/filestore/DeleteFolder/" + row.folderId + "/" + row.fileName
          );
          toast.success("Folder Deleted Successfully!", { transition: Flip, autoClose: 3000 });
          setAnchorEl(null);
          deleteCallback();
        } catch (error) {
          toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
      }
      else {
        setAnchorEl(null);
      }

    }
    else {
      let r = window.confirm("Do you want to delete " + row.fileName + " File?");
      if (r === true) {
        try {
          await axios.delete(
            "http://localhost:3001/filestore/DeleteFile/" + row.fileId + "/" + row.fileName
          );
          toast.success("File Deleted Successfully!", { transition: Flip, autoClose: 3000 });
          setAnchorEl(null);
          deleteCallback();
        } catch (error) {
          toast.error(error.response.data.error, { transition: Flip, autoClose: 3000 });
        }
      }
      else {
        setAnchorEl(null);
      }
    }
  };


  const downloadRow = () => {
    setTimeout(() => {
      debugger
      const response = {
        file: 'http://localhost:3001/images/' + row.fileName,
      };
      debugger;
      console.log(response.file.text());
      window.open(response.file);

      
      // var blob = response.fileBlob;
      //   var reader = new FileReader();
      //   reader.addEventListener("loadend", function() {
      //       console.log(reader.result); // will print out file content
      //   });
      //   reader.readAsText(blob);

    }, 100);

  };

  const renameFolder = () => {
    debugger;
    setAnchorEl(null);
    if (row.isFolder) {
      renameFolderCallback(row);
    }
    else {
      renameFileCallback(row);
    }
  };

  const commentClick = () => {
    debugger;
    setAnchorEl(null);
   
      commentCallback(row);
   
  };


  return (
    <div>
      <IconButton
        aria-label="more"
        aria-controls="long-menu"
        aria-haspopup="true"
        onClick={handleClick}
        size={size}
      >
        <MoreVertIcon />
      </IconButton>
      <Menu
        id="menu"
        getContentAnchorEl={null}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'center',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'center',
        }}
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >

        <MenuItem onClick={downloadRow}>
          Download
        </MenuItem>

        <MenuItem onClick={deleteRow}>
          Delete
        </MenuItem>
        <MenuItem onClick={renameFolder}>
          Rename
        </MenuItem>
        { !row.isFolder ?   <MenuItem n onClick={commentClick}>
          Comment
        </MenuItem> : null }
       

        {/* <Divider /> */}

        {/* <MenuItem onClick={deleteRow}>
          <ListItemIcon>
            <DeleteIcon fontSize="small" color="secondary" />
          </ListItemIcon>
          <Typography variant="inherit">
            Delete
          </Typography>
        </MenuItem> */}
      </Menu>
    </div>
  );
};