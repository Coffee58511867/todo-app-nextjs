export type IBOOK = {
    _id: string;
    customerId : string,
    pickupDate : Date,
    pickupTime : string,
    deliveryDate : Date,
    deliveryTime : string,
    location : string,
    laundryType : string,
    LaundryContainer : string,
    quantity : Number,
    phoneNumber : string,
    laundryStatus : string,
    bookingStatus : string,
   
  };
  export default IBOOK;