import mongoose from "mongoose";
import bcrypt from "bcryptjs";

const userSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: true,
            trim: true
        },

        email: {
            type: String,
            required: true,
            unique: true,
            lowercase: true
        },

        phone: {
            type: String,
            required: true,
            unique: true
        },

        password: {
            type: String,
            required: true,
            select: false
        },

        isOnline: {
            type: Boolean,
            default: false
        },

        lastSeen: {
            type: Date
        }
    },
    { timestamps: true }
);

/* 🔐 HASH PASSWORD (NO next) */
userSchema.pre("save", async function () {
    if (!this.isModified("password")) return;

    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
});

/* 🔑 COMPARE PASSWORD */
userSchema.methods.comparePassword = async function (enteredPassword) {
    return bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model("User", userSchema);
