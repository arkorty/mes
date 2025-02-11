//import sgMail from '@sendgrid/mail';//
//import SendEmailNodemailer from './EmailConfigNodemailer';

//sgMail.setApiKey(process.env.SENDGRID_API_KEY as string);



interface IEmailService{
    SendMailOnNewRegistration(): void;
}

interface IEmailParams {
    to: string;
    subject: string;
    htmlContent: string;
  }
  

export class EmailService implements IEmailService{
    public async SendMailOnNewRegistration(): Promise<void> {
        try {
            
        } catch (error:any) {
            
        }
    }
    private async SendMail({ to, subject, htmlContent }: IEmailParams){
        try {
            const msg = {
              to: to, 
              from: process.env.SENDER_EMAIL as string, 
              subject: subject, 
              html: htmlContent, 
            };
        
          // await sgMail.send(msg);
           //await SendEmailNodemailer(to, subject, htmlContent);
            console.log(`Email sent successfully to ${to}`);
          } catch (error: any) {
            if (error.response && error.response.body && error.response.body.errors) {
              console.error('Error sending email:', error.response.body.errors);
            } else {
              console.error('Unexpected error:', error);
            }
          }
    }
}