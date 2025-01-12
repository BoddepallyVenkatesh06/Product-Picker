import bcrypt from 'bcryptjs';
import { Schema, model, models } from 'mongoose';
import jwt from 'jsonwebtoken';

export interface IUser extends Document {
    _id: string;
    name: string;
    email: string;
    password: string;
    accountType: 'Admin' | 'Team member';
    signAccessToken: () => string;
    signRefreshToken: () => string;
    comparePassword: (password: string) => Promise<boolean>;
}


const userSchema = new Schema<IUser>({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        minlength: [6, "Password must be at least 6 characters"],
        select: false // whenever we fetch user data from DB , by default password will be excluded
    },
    accountType: {
        type: String,
        enum: ['Admin', 'Team member'],
        required: true
    },
});


// Hash password before saving
userSchema.pre('save', async function (next) {
    if (!this.isModified('password')) return next();
    this.password = await bcrypt.hash(this.password, 10);
    next();
});


// compare user entered password , with hashed password store in DB
userSchema.methods.comparePassword = async function (enteredPassword: string): Promise<boolean> {
    return await bcrypt.compare(enteredPassword, this.password)
}



// sign Access Token
userSchema.methods.signAccessToken = function () {
    return jwt.sign({ _id: this._id, accountType: this.accountType, email: this.email, name: this.name }, process.env.ACCESS_TOKEN_SECRET || '', {
        expiresIn: '7m'
    })
}

// sign Refresh Token
userSchema.methods.signRefreshToken = function () {
    return jwt.sign({ _id: this._id, accountType: this.accountType, email: this.email, name: this.name }, process.env.REFRESH_TOKEN_SECRET || '', {
        expiresIn: '3d'
    })
}


const User = models.User || model<IUser>('User', userSchema);
export default User;
