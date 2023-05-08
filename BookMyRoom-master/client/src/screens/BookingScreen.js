import React, { useState, useEffect } from "react";
import axios from "axios";
import { json, useParams } from 'react-router-dom';
import Loader from "../components/Loader";
import Error from "../components/Error";
import moment from "moment";
import StripeCheckout from 'react-stripe-checkout';
import swal from "sweetalert2";


function BookingScreen() {
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState();
    const [room, setRoom] = useState();
    const { roomid, fromdate, todate } = useParams();
    // console.log("roomi d = "+roomid);
    const start = moment(fromdate, 'DD-MM-YYYY');
    const end = moment(todate, 'DD-MM-YYYY');
    const totaldays = moment.duration(end.diff(start)).asDays() + 1;
    const [totalamount, setTotalAmount] = useState();
    const username = (JSON.stringify(localStorage.getItem("currentuser")).name
    );
    async function getroombyid() {
        try {
            setLoading(true);
            const data = (await axios.post('/api/rooms/getroombyid', { roomid: roomid })).data;
            // console.log(Data);
            setTotalAmount(data.rentperday * totaldays);
            setRoom(data);
            setLoading(false);
        } catch (error) {
            setLoading(false);
            setError(true);
            console.log(error);

        }
    };

    useEffect(() => {
        if(!localStorage.getItem('currentuser')){
            window.location.reload('/login')
        }
        getroombyid();
    }, [0]);

    // async function bookroom() {
    //     const bookingDetails = {
    //         room,
    //         userid: JSON.parse(localStorage.getItem("currentuser"))._id,
    //         fromdate,
    //         todate,
    //         totalamount,
    //         totaldays,
    //     }
    //     try {
    //         const result = axios.post('/api/bookings/bookroom', bookingDetails);
    //     } catch (error) {

    //     }
    // }
    // useEffect(async()=>{
    //     try {
    //         setLoading(true);
    //         const Data = (await axios.post('/api/rooms/getroombyid',{roomid : match.params.roomid})).data;
    //         console.log(Data);
    //         setRoom(Data);
    //         setLoading(false);
    //     } catch (error) {
    //         setLoading(false);
    //         setError(true);
    //         console.log(error);

    //     }
    // },[]);

    async function onToken(token) {
        console.log(token);
        const bookingDetails = {
            room,
            userid: JSON.parse(localStorage.getItem("currentuser"))._id,
            fromdate,
            todate,
            totalamount,
            totaldays,
            token
        }
        try {
            setLoading(true);
            const result = axios.post('/api/bookings/bookroom', bookingDetails);
            setLoading(false);
            swal.fire('congratulations','your room booked sucessfully','success').then(result=>{
                window.location.href='/profile'
            });
        } catch (error) {
            setLoading(false);
            swal.fire('Opps!','something went wrong','error');
        }


    }

    return (
        <div className="container">
            {loading ? (<Loader />) : room ? (<div>
                <div className="row justify-content-center mt-5 bs">
                    <div className="col-md-6">
                        <h1>{room.name}</h1>
                        <img src={room.imageurls[0]} className="bigimg" />
                    </div>
                    <div className="col-md-6">
                        <div style={{ textAlign: "right" }}>
                            <h1>Booking Details</h1>
                            <hr />
                            <b>
                                <p>Name: {username}</p>
                                <p>From Date: {fromdate}</p>
                                <p>To Date: {todate}</p>
                                <p>Max Count:{room.maxcount}</p>
                            </b>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <h1>Amount</h1>
                            <hr />
                            <p>Total Days:{totaldays}</p>
                            <p>Rent Per Day:{room.rentperday}</p>
                            <p>Total Amount:{totalamount}</p>
                        </div>
                        <div style={{ textAlign: "right" }}>
                            <StripeCheckout
                                amount={totalamount * 100}
                                token={onToken}
                                currency='INR'
                                stripeKey="pk_test_51LqtOrSGYIgVpoiwyeNBSxc6hRrnhjajREH4a7AyQM91rmqhEqNSAiQ8eR9Zs9xIZWhX7IJs9w2x2Xuus0wXRX1g00FWl8C2p0"
                            >
                            <button className="btn btn-primary">Pay Now</button>
                            </StripeCheckout>
                        </div>
                    </div>
                </div>
            </div>) : (<Error />)};
        </div>
    )
}

export default BookingScreen;