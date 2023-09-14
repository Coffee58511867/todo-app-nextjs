import { Schema, model, models } from "mongoose"

const UserSchema = new Schema({
    emailAddress: {
        type: String,
        unique: true,
        required: [true, "Email is required"],
        match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, "Invalid email address"]
    },
    fullName: {
        type: String,
        required: [true, "Full name is required"],
        minLength: [4, "Full name should be atleast 4 characters long"],
        maxLength: [30, "Full name should be less than 30 characters"]
    },
    phoneNumber: {
        type: String,
        required: [true, "Phone number is required"],
        validate: {
            validator: function (value : string) {
                return /^\d{8}$/.test(value);
            },
            message: "Invalid phone number, it should be 8 numeric characters"
        }
    },
    is_admin: {
        type: Boolean,
        required: [true, "Usertype is required"],
        enum: [true, false] 
        
    },
    password: {
        type: String,
        required: [true, "Password is required"],
        select: false
    }
})

const User = models.User || model("User", UserSchema)

export default User