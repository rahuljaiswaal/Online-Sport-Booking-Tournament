import mongoose from "mongoose";

// import dotenv from "dotenv";
// dotenv.config();

 const connectDB = async () => {
        
    // try {
    //     await mongoose.connect(process.env.MONGO_URI, {
    //     //   useNewUrlParser: true,
    //     //   useUnifiedTopology: true, 
    //       serverSelectionTimeoutMS: 5000, // Wait 5 seconds before failing
    //     });
    //     console.log("MongoDB Connected Successfully");
    //   } catch (error) {
    //     console.error("MongoDB connection error:", error);
    //     process.exit(1);
    //   }

        mongoose.connect(process.env.MONGO_URI)
            .then(() => console.log("MongoDB connected successfully"))
            .catch((err) => console.error("MongoDB connection error:", err));


    };

    export default connectDB;