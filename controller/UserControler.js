import users from "../models/UsersSche.js";

export const AllUserdata = async (req, res) => {
  try {
    const data = await users.find();
    res.status(201).json({ message: "data getted", data: data });
  } catch (err) {
    console.error(err, "data of user not getted");
    res.status(404).json("user not found!!");
  }
};

export const AddUser = async (req, res) => {
  try {
    const { username, password, email } = req.body;

    if(!username || !password || !email){
        return res.status(404).json("All Feilds Are Reqierd !!")
    }
    const passwordPattern =/^[A-Za-z].{8,}$/;
    if(!passwordPattern.test(password)){
        return res.status(404).json({message:"password must start with a letter and need minmum 8 charecter"})
    }

    const emailPattern =/^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if(!emailPattern.test(email)){
        return res.status(404).json({message:"it not a email format"})
    }
    
    const existingUser = await users.findOne({ email });
    if (existingUser) {
      return res.status(404).json({ message: "email already existed" });
    }
    const newUser = await users.create({ username, password, email });
    res.status(201).json({ message: "data added", data: newUser });
  } catch (err) {   
    console.error(err, "server error");
    res.status(500).json("server error");
  }
};

export const DeletUser = async (req, res) => {
  const { id } = req.params;
  try {
    const dltuser = await users.findByIdAndDelete(id);
    if (!dltuser) {
      return res.status(404).json({ message: "page not found" });
    }
    res.status(201).json({ message: "data deleted", data: dltuser });
  } catch (err) {
    console.error(err, "not deleted");
    res.status(500).json({ message: "server error to do dlt" });
  }
};

export const UpdateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { username, password} = req.body;
    const update = await users.findByIdAndUpdate(id, { username, password });
    if (!update) {
      return res.status(404).json({ message: "no user found" });
    }

    const passwordPattern =/^[A-Za-z].{7,}$/
    if(!passwordPattern.test(password)){
        return res.status(404).json({message:"password must contain 8 charecters and start with any letter !!"})
    }
    res.status(201).json({ message: "data have been updated", data: update });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "server is error to do update" });
  }
};
