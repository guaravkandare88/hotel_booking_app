import React, { useState, useEffect } from "react";
import { Tabs } from 'antd';
import axios from "axios";
import Loader from "../components/Loader";
import Error from "../components/Error";
import swal from "sweetalert2";

function AdminScreen() {
    useEffect(() => {
        if (!JSON.parse(localStorage.getItem('currentuser')).isAdmin) {
            window.location.href = '/home'
        }
    }, []);
    return (
        <div className="ml-5 mr-5 mt-3 bs">
            <h2 className="text-center" style={{ fontSize: '30px' }}><b>ADMIN PANEL</b></h2>
            <Tabs defaultActiveKey="1">
                <Tabs.TabPane tab="Bookings" key="1">
                    <Bookings />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Rooms" key="2">
                    <Rooms />
                </Tabs.TabPane>
                <Tabs.TabPane tab="Add rooms" key="3">
                    <Addroom />
                </Tabs.TabPane>
                <Tabs.TabPane tab="User List" key="4">
                    <Users />
                </Tabs.TabPane>
            </Tabs>
        </div>
    )
};

export default AdminScreen;


export function Bookings() {
    const [bookings, setBookings] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function getallbookings() {
        try {
            const data = await (await axios.get('/api/bookings/getallbookings')).data
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
        getallbookings();
    }, [0])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Bookings</h1>
                {loading && (<Loader />)}
                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>BookingId</th>
                            <th>UserId</th>
                            <th>Room</th>
                            <th>From</th>
                            <th>To</th>
                            <th>Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {bookings.length && (bookings.map(bookings => {
                            return (
                                <tr>
                                    <td>{bookings._id}</td>
                                    <td>{bookings.userid}</td>
                                    <td>{bookings.room}</td>
                                    <td>{bookings.fromdate}</td>
                                    <td>{bookings.todate}</td>
                                    <td>{bookings.status}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function Rooms() {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function getallrooms() {
        try {
            const data = await (await axios.get('/api/rooms/getallrooms')).data
            console.log(data);
            setRooms(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        getallrooms();
    }, [0])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Rooms</h1>
                {loading && (<Loader />)}
                <table className="table table-bordered table-dark">
                    <thead className="bs">
                        <tr>
                            <th>Room Id</th>
                            <th>Name</th>
                            <th>Type</th>
                            <th>Rent Per Day</th>
                            <th>Max Count</th>
                            <th>Phone Number</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rooms.length && (rooms.map(room => {
                            return (
                                <tr>
                                    <td>{room._id}</td>
                                    <td>{room.name}</td>
                                    <td>{room.type}</td>
                                    <td>{room.rentperday}</td>
                                    <td>{room.maxcount}</td>
                                    <td>{room.phonenumber}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function Users() {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();

    async function getalluser() {
        try {
            const data = await (await axios.get('/api/users/getallusers')).data
            console.log(data);
            setUsers(data);
            setLoading(false);
        } catch (error) {
            console.log(error);
            setLoading(false);
            setError(true);
        }
    }

    useEffect(() => {
        getalluser();
    }, [0])
    return (
        <div className="row">
            <div className="col-md-12">
                <h1>Users</h1>
                {loading && (<Loader />)}
                <table className="table table-dark table-bordered">
                    <thead>
                        <tr>
                            <th>User Id</th>
                            <th>Name</th>
                            <th>Email</th>
                            <th>Is Admin</th>
                        </tr>
                    </thead>
                    <tbody>
                        {users && (users.map(user => {
                            return (
                                <tr>
                                    <td>{user._id}</td>
                                    <td>{user.name}</td>
                                    <td>{user.email}</td>
                                    <td>{user.isAdmin ? 'YES' : 'NO'}</td>
                                </tr>
                            )
                        }))}
                    </tbody>
                </table>
            </div>
        </div>
    )
}

export function Addroom() {

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState();
    const [name, setName] = useState('');
    const [rentperday, setRentPerDay] = useState('');
    const [maxcount, setMaxCount] = useState('');
    const [description, setDescription] = useState('');
    const [phonenumber, setphonenumber] = useState('');
    const [type, setType] = useState('');
    const [imageurl1, setImageUrl1] = useState('');
    const [imageurl2, setImageUrl2] = useState('');
    const [imageurl3, setImageUrl3] = useState('');

    async function addRoom() {

        const newroom = {
            name,
            rentperday,
            maxcount,
            description,
            phonenumber,
            type,
            imageurls: [imageurl1, imageurl2, imageurl3]
        }
        // console.log(newroom);
        try {
            setLoading(true);
            const result = await (await axios.post('/api/rooms/addrooms', newroom)).data
            console.log(result);
            setLoading(false);
            swal.fire('congratulations', 'your room Add sucessfully', 'success').then(result=>{
                window.location.href='/home'
            });
        } catch (error) {
            console.log(error);
            setLoading(false);
            swal.fire('Opps!', 'something went wrong', 'error');

        }
    }
    return (<>
        <h1>Fill Room Details</h1>
        <div className="row">
            {loading && (<Loader />)}
            <div className="col-md-5">
                <input type="text" className="form-control mt-2" placeholder="Room name"
                    value={name} onChange={(e) => { setName(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Rent Per Day"
                    value={rentperday} onChange={(e) => { setRentPerDay(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Max Count"
                    value={maxcount} onChange={(e) => { setMaxCount(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Description"
                    value={description} onChange={(e) => { setDescription(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Phonenumber"
                    value={phonenumber} onChange={(e) => { setphonenumber(e.target.value) }}
                />
            </div>
            <div className="col-md-5">
                <input type="text" className="form-control mt-2" placeholder="Type"
                    value={type} onChange={(e) => { setType(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Image Url 1"
                    value={imageurl1} onChange={(e) => { setImageUrl1(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Image Url 2"
                    value={imageurl2} onChange={(e) => { setImageUrl2(e.target.value) }}
                />
                <input type="text" className="form-control mt-2" placeholder="Image Url 3"
                    value={imageurl3} onChange={(e) => { setImageUrl3(e.target.value) }}
                />
                <div className="text-right mt-2">
                    <button className="btn btn-primary" onClick={addRoom}>Add Rooms</button>
                </div>
            </div>
        </div>

    </>)
}