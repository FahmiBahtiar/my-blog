const dotenv = require ("dotenv");
dotenv.config();

const SibApiV3Sdk = require('sib-api-v3-sdk');
const defaultClient = SibApiV3Sdk.ApiClient.instance;

// Configure API key authorization: api-key
const apiKey = defaultClient.authentications['api-key'];
apiKey.apiKey = process.env.SENDINBLUE_API;

const sendEmail = async (
  params,
  templateId,
  sendToUser
) => {
  const apiInstance = new SibApiV3Sdk.TransactionalEmailsApi();

  const user = {email: params.email, name: params.name };
  const admin = {email: "fahmibahtiar76@gmail.com", name: "Isha Kapoor"};

  const replyTo = sendToUser ? admin : user; 
  const sendTo = sendToUser ? user : admin;

  let sendSmtpEmail = new SibApiV3Sdk.SendSmtpEmail(); // SendSmtpEmail | Values to send a transactional email

  sendSmtpEmail = {
      to: [sendTo],
      replyTo,
      templateId,
      params
  };

  await apiInstance.sendTransacEmail(sendSmtpEmail);
}


const createContact = async ({name, email})=> {

  let apiInstance = new SibApiV3Sdk.ContactsApi();

  let createDoiContact = new SibApiV3Sdk.CreateDoiContact(); // CreateDoiContact | Values to create the Double opt-in (DOI) contact

  createDoiContact = {
    email,
    attributes: { FIRSTNAME: name },
    includeListIds: [2],
    templateId: 1, // Ganti nilai templateId disini secara manual
    redirectionUrl: "http://example.com", // Ganti BASE_URL disini secara manual
  }

  return await apiInstance.createDoiContact(createDoiContact);
}

const scheduleCampaign = async(blog) => {
  let apiInstance = new SibApiV3Sdk.EmailCampaignsApi();
  let emailCampaigns = new SibApiV3Sdk.CreateEmailCampaign();

  const date = new Date().getTime();
  const halfHour = 30 * 60 * 1000 ; 
  const scheduledAt = new Date(date + halfHour)
  
  emailCampaigns = {
    templateId: 1, // Ganti nilai TEMPLATE_CAMPAIGN disini secara manual
    scheduledAt,
    sender: { name: "Blimbing Blog", email: "fahmibahtiar76@gmail.com" },
    name: 'latest blog on Blimbing Blog',
    subject: `See our latest blog on "${blog.title}"`,
    toField: "{{contact.FIRSTNAME}}",
    recipients: { listIds: [2] },
    params: { blog, url: `http://localhost:3000/blog/${blog.title}-${blog._id}` }
  }

  await apiInstance.createEmailCampaign(emailCampaigns)
}

module.exports = {sendEmail, createContact, scheduleCampaign};
