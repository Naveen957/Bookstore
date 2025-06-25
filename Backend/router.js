import express from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import { User, Img, Logo } from "./schema.js";
import dotenv from "dotenv";
import multer from "multer";

dotenv.config();

const route = express.Router();
const storage = multer.memoryStorage();
const upload = multer({ storage: storage });

route.post("/signup", async (req, res) => {
  const { username, email, password } = req.body;
  if (!username || !email || !password)
    return res.status(400).json({ message: "All fields are required" });

  const userExists = await User.findOne({ email });
  if (userExists)
    return res.status(409).json({ message: "User already exists" });

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({ username, email, password: hashedPassword });
  await user.save();
  res.status(201).json({ message: "Account created" });
});

route.post("/login", async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: "Invalid credentials" });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

  const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
    expiresIn: "7d",
  });

  res.status(200).json({ token, username: user.username });
});

route.post("/picture",upload.single('image') ,async (req, res) => {
  try {
    const {category } = req.body;

    const newImage = new Img({
      category,
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });
    await newImage.save();
    res.status(200).json({ message: "Image uploaded successfully" });
  } catch (error) {
        res.status(500).json({ error: 'Upload failed' });

  }
});

route.get("/picture/:category", async (req, res) => {
  try {
    const { category } = req.params;

    const images = await Img.find({ category });

    const result = images.map((img) => ({
      _id: img._id,
      category: img.category,
      image: `data:${img.image.contentType};base64,${img.image.data.toString("base64")}`,
    }));

    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch images" });
  }
});

route.post('/upload-logo', upload.single('logo'), async (req, res) => {
  try {
    const newLogo = new Logo({
      image: {
        data: req.file.buffer,
        contentType: req.file.mimetype,
      },
    });

    const savedLogo = await newLogo.save();
    res.status(201).json({ message: 'Logo uploaded', id: savedLogo._id });
  } catch (err) {
    res.status(500).json({ error: 'Upload failed' });
  }
});

// GET: fetch latest logo
route.get('/logo', async (req, res) => {
  try {
    const logo = await Logo.findOne().sort({ _id: -1 }); // get latest
    if (!logo) return res.status(404).send('No logo found');

    res.set('Content-Type', logo.image.contentType);
    res.send(logo.image.data);
  } catch (err) {
    res.status(500).send('Failed to retrieve logo');
  }
});








export default route;
