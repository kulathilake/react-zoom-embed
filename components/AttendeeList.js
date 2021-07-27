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
                return <div >
                    <button onClick={()=>removeAttendee(row.id)} >Remove</button>
                    <button onClick={()=>toggleAccess(row.id,row.isAllowed)}>{row.isAllowed?"Revoke Access":"Grant Access"}</button>
                    <button onClick={()=>toggleIsHost(row.id,row.isHost)}>{row.isHost?"Make Participant":"Make Host"}</button>
                </div>
            }
        }
    ]

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