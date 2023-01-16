import mongoose from "mongoose";
const { Schema } = mongoose;
const { ObjectId } = Schema;

const userSchema = new Schema(
  {
    address: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      // required: true,
      min: 6,
      max: 64,
    },
    bonkPoints: {
      type: Number,
      default: 0
    },
    lastClicked: {
      type: Date,
      default: Date.now()
    },
    lastClaimed: {
      type: Date,
    },
    lastClaimedAmount: {
      type: Number,
      default: 0
    }, 
    clickPower: {
      type: Number,
      default: 1
    }, 
    autoClicker: {
      type: Number,
      default: 0
    },
    autoClickerMultiplier: {
      type: Number,
      default: 1
    },
    solPoints: {
      type: Number,
      default: 0
    },
    solLastClicked: {
      type: Date,
      default: Date.now()
    },
    solLastClaimed: {
      type: Date,
    },
    solLastClaimedAmount: {
      type: Number,
      default: 0
    }, 
    solClickPower: {
      type: Number,
      default: 1
    }, 
    solAutoClicker: {
      type: Number,
      default: 0
    },
    solAutoClickerMultiplier: {
      type: Number,
      default: 1
    },
   
  },
  { timestamps: true }
);

export default mongoose.model("User", userSchema);
