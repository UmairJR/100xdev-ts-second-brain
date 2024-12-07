import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcrypt";
import dotenv from "dotenv";
import cors from "cors";
import { connectToDb, ContentModel, UserModel } from "./db";
import { userAuthMiddleware } from "./middleware";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

interface User {
  username: string;
  password: string;
}

interface CustomRequest extends Request {
  userId?: string;
}
//SIGN UP
app.post("/api/v1/signup", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const hashedPassword = await bcrypt.hash(password, 5);
  try {
    await UserModel.create({
      username: username,
      password: hashedPassword,
      date: new Date(),
    });
    res.json({
      message: "User Signed Up",
    });
  } catch (e) {
    res.status(411).send({
      message: "User Already Exists",
    });
  }
});
//SIGN IN
app.post("/api/v1/signin", async (req: Request, res: Response) => {
  const { username, password } = req.body;
  const existingUser = await UserModel.findOne({ username });
  if (existingUser && typeof existingUser.password == "string") {
    const matched = await bcrypt.compare(password, existingUser.password);
    if (matched) {
      const token = jwt.sign(
        {
          id: existingUser._id,
        },
        `${process.env.JWT_SECRET}`
      );
      res.json({
        token: token,
      });
    }
    else{
      res.status(401).send({
        message: "Invalid password",
      });
    }
  } else {
    res.status(403).json({
      message: "User Not Found",
    });
  }
});

// USING AUTH
app.use(userAuthMiddleware);

// UPLOADING CONTENT
app.post("/api/v1/content", async (req: CustomRequest, res: Response) => {
  const { title, link, type} = req.body
  try{
    await ContentModel.create({
      title: title,
      link: link,
      type: type,
      userId: req.userId,
      tags: [],
      date: new Date()
    })
    res.json({
      message: "Content Added"
    })
  } catch (e) {
    res.status(401).send({
      message: "Can't add"
    })
  }
  
})

// GETTING CONTENT
app.get("/api/v1/content", async (req: CustomRequest, res: Response) => {
  try{
    const content = await ContentModel.find({ userId: req.userId }).populate("userId","username")
    res.json({
      content
    })
  } catch (e) {
    res.status(401).send({
      message: "Can't get"
    })
  }
})

// DELETING CONTENT
app.delete("/api/v1/content", async (req: CustomRequest, res: Response) => {
  try{
    const { contentId } = req.body
    await ContentModel.deleteOne({ _id: contentId, userId: req.userId })
    res.json({
      message: "Content Deleted"
    })
  } catch (e) {
    res.status(401).send({
      message: "Can't delete"
    })
  }
})

// STARTING APP AND CONNECTING DB
const startApp = async () => {
  await connectToDb();
  console.log("Connected to MongoDB");
  app.listen(process.env.PORT, () => {
    console.log(`Server is running on port ${process.env.PORT}`);
  });
};
startApp();
