import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import { Divider, Tag } from 'antd';

import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert2";
import { Link } from "react-router-dom";


function ProfileScreen() {
    const user = JSON.parse(localStorage.getItem("currentuser"));
    useEffect(() => {
        if (!user) {
            window.location.href = "/login"
        }
    }, [])

    return (
        <div className="ml-5 mt-3">
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Profile" key="1">
                    <h1>My Profile</h1>
                    <br />
                    <h1>Name : {user.name}</h1>
                    <h1>Email : {user.emial}</h1>
                    <h1>IsAdmin : {user.isAdmin ?  <Link to='/admin'>YES 'Click here to go admin page'</Link> : 'No'}</h1>
                </Tabs.TabPane>
                <Tabs.TabPane tab="Bookings" key="2">
                    <MyBookings />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
};

export default ProfileScreen;


export function MyBookings() {
    const user = JSON.parse(localStorage.getItem("currentuser"));
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    async function getbookingsbyuserid() {
        try {
            setLoading(true);
            const data = await (await axios.post('/api/bookings/getbookingsbyuserid', { userid: user._id })).data
            console.log(data);
            setBookings(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }
    useEffect(() => {
        getbookingsbyuserid();
    }, [0])
    async function cancelBooking(bookingid, roomid) {
        try {
            setLoading(true);
            const result = await (await axios.post('/api/bookings/cancelbooking', { bookingid, roomid })).data
            console.log(result);
            setLoading(false);
            swal.fire('congrates', 'your booking has been cancelled successfully', 'success').then(result => {
                window.location.reload();
            })
        } catch (error) {
            console.log(error);
            setLoading(false);
            swal.fire('Opps!', 'something went wrong', "error");
        }
    }

    return (
        <div>
            <div className="row">
                <div className="col-md-6">
                    {loading && <Loader/>}
                    {bookings && bookings.map(bookings => {
                        return <div className="bs">
                            <h1>{bookings.room}</h1>
                            <p>BookingID : {bookings._id}</p>
                            <p>CheckIn : {bookings.fromdate}</p>
                            <p>Checkout : {bookings.todate}</p>
                            <p>Amount : {bookings.totalamount}</p>
                            {/* <p>Status : {bookings.status == 'booked' ? 'Confirmed' : 'cancelled'}</p> */}
                            {bookings.status == 'cancelled' ? (<Tag color="red">Cancelled</Tag>) : (<Tag color="green">Confirmed</Tag>)}

                            {bookings.status !== 'cancelled' && (
                                <div className="text-right">
                                    <button className="btn btn-primary" onClick={() => { cancelBooking(bookings._id, bookings.roomid) }}> Cancel Booking</button>
                                </div>
                            )}
                        </div>
                    })}
                </div>
            </div>
        </div>
    )
}