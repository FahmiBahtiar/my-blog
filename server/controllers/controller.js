const {sendEmail, createContact} = require("../utils/sib.js");

const contact = async (req, res) => {
  try {
    await sendEmail(req.body, TEMPLATE_CONTACT, false);
    res.status(200).json({ message: "thankYou for contacting us! we will reply you super soon" });
  } catch (error) { 
    console.log("Error in contact function:", error); // Tambahkan log error di sini
    res.status(500).json({ message: "something went wrong! please try again later" }); 
  }
};

const comment = async (req, res) => {
  try {
    await sendEmail(req.body, TEMPLATE_COMMENT, false);
    res.status(200).json({ message: "thankYou for contacting us! we will reply you super soon" });
  } catch (error) { 
    console.log("Error in comment function:", error); // Tambahkan log error di sini
    res.status(500).json({ message: "something went wrong! please try again later" }); 
  }
};

const subscribe = async (req, res) => {
  try {
    await createContact(req.body);
    res.status(200).json({message : "Confirmation mail is being sent to your email"});
    
  } catch (error) { 
    console.log("Error in contact function:", error); // Tambahkan log error di sini
    res.status(500).json({message : "something went wrong! please try again later"}); 
  }
};

module.exports = { contact, comment, subscribe};
