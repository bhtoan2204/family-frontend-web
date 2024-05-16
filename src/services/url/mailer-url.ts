import { baseUrl } from "@/services/url";

const MailerUrl = {
  sendUserConfirmation: `${baseUrl}api/v1/mailer/sendUserConfirmation`,
  sendInvitation: `${baseUrl}api/v1/mailer/sendInvite`,
};

export default MailerUrl;
