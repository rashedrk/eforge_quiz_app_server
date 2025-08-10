import { model, Schema } from "mongoose";
import { TUser, UserModel } from "./user.interface";
import { USER_ROLE } from "./user.constant";
import config from "../../config/config";
import bcrypt from 'bcrypt';

const userSchema = new Schema<TUser, UserModel>({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: Object.values(USER_ROLE),
        required: true,
        default: USER_ROLE.user,
    },
    isVerified: {
        type: Boolean,
        default: false,
    }
}, {
    timestamps: true,
    versionKey: false
});

//Middlewares
userSchema.pre('save', async function (next) {
    // eslint-disable-next-line @typescript-eslint/no-this-alias
    const user = this;
    user.password = await bcrypt.hash(
        user.password,
        Number(config.bcyrpt_salt_rounds));
    next();
})


userSchema.post('save', function (doc, next) {
    doc.password = '';
    next();
})

userSchema.statics.isPasswordMatched = async function (
    plainTextPassword,
    hashedPassword,
) {
    return await bcrypt.compare(plainTextPassword, hashedPassword);
};



export const User = model<TUser, UserModel>('user', userSchema);