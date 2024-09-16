// Function to generate email template for property inquiry
const inquiryEmailTemplate = (receiverName, senderName, propertyTitle) => {
    return `
      Hi ${receiverName},
      
      You have received an inquiry from ${senderName} about the property "${propertyTitle}".
      
      Please check your portal for more details.
  
      Thanks,
      RealConnect Team
    `;
  };
  
  module.exports = { inquiryEmailTemplate };
  