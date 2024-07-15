import mongoose from "mongoose";

// let isConnected: boolean = false;

type ConenectionObject = {
  isConnected?: number;
};

const connectionObject: ConenectionObject = {};

export async function dbConnect(): Promise<void> {

  if (connectionObject.isConnected) {
    console.log(`We are already connected `);
    return;
  }


  try {
    const connect = await mongoose.connect(process.env.MONGODB_URI || "");

    connectionObject.isConnected = connect.connections[0].readyState;

    console.log(connectionObject.isConnected);
    console.log(`DB connected successfully`);
  } catch (error) {
    console.log(`Error while connecting db`, error);
    process.exit(1);
  }

  
}
