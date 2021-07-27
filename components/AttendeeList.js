import { useEffect, useState } from "react"
import Router from 'next/router';
import { listMeetingAttendees, removeAttendee, toggleAccess, toggleIsHost } from "../helpers/admin_helpers";
import DataTable from 'react-data-table-component';


export default function AttendeeList(props){
    const [list,setList] = useState([]);
    const [limit,setLimit] = useState(8);
    const [offset,setOffset] = useState(0);
    const [total,setTotal] = useState(0);
    const columns = [
        {
            name:'Attendee Email',
            selector: 'email',
        },
        {
            name:'Role',
            cell: function isHost(row){
                return <p>{row.isHost?'Host':'Participant'}</p>
            }
        },
        {
            name:'Access',
            cell: function isHost(row){
                return <p>{row.isAllowed?'Granted':'Denied'}</p>
            }
        },
        {
            name:'In Meeting Status',
            cell: function isHost(row){
                return <p>{row.isLove?'Live':'Not Live'}</p>
            }
        },
        {
            name: 'Action',
            cell: function takeAction(row){
                if(props.actions){              
                    return <div >
                        {!row.isHost&&<>  
                        <button onClick={()=>handleRemove(row)}>Remove</button>
                        <button onClick={()=>handleToggleAccess(row)}>{row.isAllowed?"Revoke Access":"Grant Access"}</button>
                        </>}
                        <button onClick={()=>handleToggleHost(row)}>{row.isHost?"Make Participant":"Make Host"}</button>
                    </div>
                }else{
                    return <p>Not allowed during meeting.</p>
                }
            }
        }
    ]

    const handleRemove = (row) => {
        if(row.isHost){
            alert("Cannot remove host");
            return;
        }
        removeAttendee(row.meeting_id,row.id)
        .then(()=>{
            props.setRefresh(true);
        })
        .catch(console.error);
    }

    const handleToggleAccess = (row) => {
        toggleAccess(row.meeting_id,row.id,!row.isAllowed)
        .then(()=>{
            props.setRefresh(true);
        })
        .catch(console.error);
    }

    const handleToggleHost = (row) => {
        toggleIsHost(row.meeting_id,row.id,!row.isHost)
        .then(()=>{
            props.setRefresh(true);
        })
        .catch(console.error)
    }

    useEffect(()=>{
        const id = Router.query.id || props.id;
        if(id){
            listMeetingAttendees(id,limit,offset)
            .then(res=>{
                setList(res.data);
                setTotal(res.total);
                props.setRefresh(false);
            })
            .catch(console.error);
        }else{

        }
    },[props,limit,offset]);
    
    return (
        <DataTable 
            columns={columns}
            data={list}
            pagination={true}
            onChangeRowsPerPage={(limit)=>setLimit(limit)}
            onChangePage={(page,total)=>console.log(page,total)}
            paginationTotalRows={total}
        />
    )
}