import classes from './Books.module.css';
import {Button,TextField} from '@material-ui/core';
import {useNavigate} from "react-router-dom";
import { useState,useEffect } from 'react';
import {defaultBookPageFilter,RecordsPerPage} from './constants/Constant';
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TablePagination from "@material-ui/core/TablePagination";
import TableRow from "@material-ui/core/TableRow";
import Table from "@material-ui/core/Table";
import {toast} from "react-toastify";
import {getPagenatedUsers,deleteUser} from './myService/userService';

import ConfirmationDialog from "./ConfirmationDialog";
import {useAuthContext} from './context';

function Users(){
    const redColor = "#ff0000";
    const navigate=useNavigate();
    const userContext=useAuthContext();
    const [filters,setFilters]=useState(defaultBookPageFilter);
    const [open, setOpen] = useState(false);
    const [selectedId, setSelectedId] = useState(0);
   

    const [userResult, setUserResult] = useState({
        pageIndex: 0,
        pageSize: 10,
        totalPages: 1,
        items: [],
        totalItems: 0,
    });
    const columns = [
        { id: "firstName", label: "First Name", minWidth: 100 },
        { id: "lastName", label: "Last Name", minWidth: 100 },
        {
          id: "email",
          label: "Email",
          minWidth: 170,
        },
        {
          id: "roleName",
          label: "Role",
          minWidth: 130,
        },
    ];

    useEffect(() => {
        const timer = setTimeout(() => {
          if (filters.keyword === "") delete filters.keyword;
          searchPaginatedUserList({ ...filters });
        }, 1000);
        return () => clearTimeout(timer);
    }, [filters]);

    async function searchPaginatedUserList(filters){
        try{
            const response=await getPagenatedUsers(filters);
            if(response.key==="SUCCESS"){
                setUserResult(response.result);
            }
            else{
                toast.error("There is Something Wrong in fetching paginated list.",{theme:"colored"});
            }
        }
        catch(error){
            toast.error(error,{theme:"colored"});
        }
    }
    const onConfirmDelete = async() => {
        try{
            const response=await deleteUser(selectedId);
            if(response.key==="SUCCESS"){
                toast.success("User Deleted Successfully.",{theme:"colored"});
                setOpen(false);
                setFilters({ ...filters, pageIndex: 1 });
            }
            else{
                toast.error("There is Something wrong while deleting book.",{theme:"colored"});
                setOpen(false);
            }
        }
        catch(error){
            toast.error(error,{theme:"colored"});
            setOpen(false);
        } 
      };
    
    return(
        <div className={classes.wrapper}>
            <div className={classes.headingWrapper}>
                <h1 className={classes.heading}>Users</h1>
            </div>
            <div className={classes.search}>
                <div className={classes.userSearch}>
                    <TextField className={classes.box} variant="outlined" name='userSearch' placeholder='search...' onChange={(e)=>{
                        setFilters({...filters,keyword:e.target.value,pageIndex:1});
                    }}  />
                </div>
            </div>
            <div className={classes.table}>
            <TableContainer>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow className={classes.headingRow}>
                            {columns.map((column) => (
                            <TableCell  className={classes.headingRowData}
                                key={column.id}
                                style={{ minWidth: column.minWidth }}
                            >
                                {column.label}
                            </TableCell>
                            ))}
                            <TableCell></TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                    {userResult?.items?.map((user, index) => (
                        <TableRow key={user.id}>
                            <TableCell>{user.firstName}</TableCell>
                            <TableCell>{user.lastName}</TableCell>
                            <TableCell>{user.email}</TableCell>
                            <TableCell>{user.role}</TableCell>
                            <TableCell>
                                <Button
                                type="button"
                                className={classes.editUser}
                                variant="contained"
                                color="secondary"
                                style={{ marginRight:'4vw'}}
                                onClick={() => {
                                    navigate(`/edit-user/${user.id}`);
                                }}
                                >
                                Edit
                                </Button>
                                {user.id !== userContext.userValues.id && (
                                    <Button
                                        type="button"
                                        className={classes.deleteUser}
                                        variant="contained"
                                        style={{ backgroundColor: redColor,color:'white'}}
                                        onClick={() => {
                                            setOpen(true);
                                            setSelectedId(user.id ?? 0);
                                        }}
                                    >
                                        Delete
                                    </Button>
                                )}
                            </TableCell>
                        </TableRow>
                    ))}
                    {!userResult.items.length && (
                        <TableRow className="TableRow">
                            <TableCell colSpan={5} className={classes.noData}>
                                {/* <Typography align="center" className="noDataText"> */}
                                No Users
                                {/* </Typography> */}
                            </TableCell>
                        </TableRow>
                    )}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
            rowsPerPageOptions={RecordsPerPage}
            component="div"
            count={userResult.totalItems}
            rowsPerPage={filters.pageSize || 0}
            page={filters.pageIndex - 1}
            onPageChange={(e, newPage) => {
                setFilters({ ...filters, pageIndex: newPage + 1 });
            }}
            onRowsPerPageChange={(e) => {
                setFilters({
                ...filters,
                pageIndex: 1,
                pageSize: Number(e.target.value),
                });
            }}
            />
            </div>
            <ConfirmationDialog
            open={open}
            onClose={() => setOpen(false)}
            onConfirm={() => onConfirmDelete()}
            title="Delete User"
            description="Are you sure you want to delete this user?"
            />
        </div>
    );
}
export {Users};