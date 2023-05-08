const express = require("express");
const router = express.Router();
const Booking = require("../models/booking");
const Room = require("../models/room");
const moment = require("moment");
const { v4: uuidv4 } = require('uuid');
const stripe = require("stripe")("sk_test_51LqtOrSGYIgVpoiwjAPux95NFt7BeQKqroPh2jRTkUAYu19kco8wWnZlt4rS8Ey8Jz2JiNqeTTUq56dJGpSphvEj00t9Dhw1q0");
// router.post("/bookroom", async (req, res) => { 
//     const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;
//     try {
//         const customer = await stripe.customers.create({
//             email: token.email,
//             source: token.id
//         });
//         const paymentob = await stripe.charges.create(
//             {
//                 amount: totalamount * 100,
//                 customer: customer.id,
//                 currency: 'INR',
//                 receipt_email: token.email
//             }, {
//                 idempotencyKey: uuidv4()
//         } 
//         );
//         if(paymentob){
//             try {
//                 const newbooking = new Booking({
//                     room: room.name,
//                     roomid: room._id,
//                     userid,
//                     fromdate: fromdate,
//                     todate: todate,
//                     totalamount,
//                     totaldays,
//                     transactionid: '12345'
//                 })
//                 const booking = await newbooking.save();

//                 const roomtemp = await Room.findOne({ _id: room._id });
//                 roomtemp.currentbookings.push({
//                     bookingid: booking._id,
//                     fromdate: fromdate,
//                     todate: todate,
//                     userid: userid,
//                     status: booking.status
//                 });
//                 await roomtemp.save();
//                 res.send("your room is booked")
//             } catch (error) {
//                 return res.status(400).json(`error come room booking ${error}`);
//             }
//         }
//         res.send("payment sucessfull , your room is booked")

//     } catch (error) {
//         return res.status(400).json(`error come payment ${error}`)
//     }

// });
router.post("/bookroom", async (req, res) => { 
    const { room, userid, fromdate, todate, totalamount, totaldays, token } = req.body;
 
            try {
                const newbooking = new Booking({
                    room: room.name,
                    roomid: room._id,
                    userid,
                    fromdate: fromdate,
                    todate: todate,
                    totalamount,
                    totaldays,
                    transactionid: '12345'
                })
                const booking = await newbooking.save();

                const roomtemp = await Room.findOne({ _id: room._id });
                roomtemp.currentbookings.push({
                    bookingid: booking._id,
                    fromdate: fromdate,
                    todate: todate,
                    userid: userid,
                    status: booking.status
                });
                await roomtemp.save();
                res.send("your room is booked")
            } catch (error) {
                return res.status(400).json(`error come room booking ${error}`);
            }
            // res.send("payment sucessfull , your room is booked")
        }
        
);
router.post('/getbookingsbyuserid', async(req,res)=>{
    const userid = req.body.userid;
    try {
        const bookings = await Booking.find({userid :userid});
        res.send(bookings);
    } catch (error) {
        res.status(400).json({error});
    }
})

router.post('/cancelbooking', async(req,res)=>{
    const {bookingid,roomid} = req.body;
    try {
        const bookingItem = await Booking.findOne({_id : bookingid});
        bookingItem.status = 'cancelled';
        await bookingItem.save();
        const room = await Room.findOne({_id: roomid})
        const bookings = room.currentbookings;
        const temp = bookings.filter(booking=>{booking.bookingid.toString() !== bookingid})
        room.currentbookings = temp;
        await room.save();
        res.send('your booking cancelled sucessfully');
    } catch (error) {
        res.status(400).json({error});
        
    }
})

router.get('/getallbookings', async(req,res)=>{
    try {
        const bookings = await Booking.find();
        res.send(bookings);
    } catch (error) {
        res.status(400).json({error});
    }
})

module.exports = router;