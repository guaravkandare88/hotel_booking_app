import React, { useState, useEffect } from "react";
import axios from "axios";
import Room from "../components/Room";
import Loader from "../components/Loader";
import Error from "../components/Error";
import 'antd/dist/antd.css';
import { DatePicker, Space } from 'antd';
import moment from "moment";

function HomeScreen() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState();
    const [error, setError] = useState();
    const { RangePicker } = DatePicker;
    const [fromdate, setfromdate] = useState();
    const [todate, setTodate] = useState();
    const [duplicateroom, setDuplicateroom] = useState([]);
    const [searchkey, setSearchKey] = useState('');
    const [type, setType] = useState('all');

    async function getallrooms() {
        try {
            setLoading(true);
            const Data = await(await axios.get('/api/rooms/getallrooms')).data;
            console.log(Data);
            setRooms(Data);
            setDuplicateroom(Data);
            setLoading(false);
        } catch (error) {
            setError(true);
            console.log(error);
            setLoading(false);

        }
    };
    useEffect(() => {
        getallrooms();
    }, []);

    function filterbydate(dates) {
        setfromdate(moment(dates[0]).format('DD-MM-YYYY'));
        setTodate(moment(dates[1]).format('DD-MM-YYYY'));
        var temprooms = [];
        var avalabilty = false;
        for (const room of duplicateroom) {
            if (room.currentbookings.length > 0) {
                for (const booking of room.currentbookings) {
                    if (!moment(moment(dates[0]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                        && !moment(moment(dates[1]).format('DD-MM-YYYY')).isBetween(booking.fromdate, booking.todate)
                    ) {
                        if (
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[0]).format('DD-MM-YYYY') !== booking.todate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.fromdate &&
                            moment(dates[1]).format('DD-MM-YYYY') !== booking.todate
                        ) {
                            avalabilty = true;
                        }
                    }
                }
            }
            if (avalabilty == true || room.currentbookings.length == 0) {
                temprooms.push(room);
            }
            setRooms(temprooms);
        }
    }
    function filterBySerch() {
        const temprooms = duplicateroom.filter(room => room.name.toLowerCase().includes(searchkey.toLowerCase()));
        setRooms(temprooms);
    }

    function filterByType(e) {
        setType(e);
        if (e !== 'all') {
            const temprooms = duplicateroom.filter(room => room.type.toLowerCase() == e.toLowerCase());
            setRooms(temprooms);
        }else{
        setRooms(duplicateroom); 
        }

    }
    return (
        <div className="container">
            <div className="row mt-5 bs">
                <div className="col-md-4">
                    <RangePicker format="DD-MM-YYYY" onChange={filterbydate} />
                </div>
                <div className="col-md-5">
                    <input type="text" className="form-control" placeholder="serch romms"
                        value={searchkey} onChange={(e) => { setSearchKey(e.target.value) }} onKeyUp={filterBySerch} />
                </div>
                <div className="col-md-3">
                    <select className="form-control" value={type} onChange={(e) => { filterByType(e.target.value) }}>
                        <option value="all">All</option>
                        <option value="delux">Delux</option>
                        <option value="non-delux">Non-Delux</option>
                    </select>
                </div>
            </div>
            <div className="row justify-content-center mt-5">
                {loading ? (<Loader />) : (rooms.map(room => {
                    return <div className="col-md-9 mt-3">
                        <Room room={room} fromdate={fromdate} todate={todate} />
                    </div>
                }))}
            </div>
        </div>
    )
};

export default HomeScreen;