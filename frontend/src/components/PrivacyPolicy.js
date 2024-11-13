import React from 'react';
import NavBar from './NavBar';
import Footer from './Footer';
import "./TermsConditions.css";

function PrivacyPolicy() {
  return (
    <div>
      <NavBar />
        <div className="terms" style={{ textAlign: 'center', margin: '20px auto', maxWidth: '1200px', lineHeight: '1.6' }}>
          <h1>PRIVACY POLICY</h1>

          <h3>1. Introduction</h3>
          <p>
            This Privacy Policy explains how EVRITECH, registered in British Columbia, Canada ("We" or "The Company"), collects, uses, and protects your personal data when you interact with our website, services, or products.
            <br />
            EVRITECH provides both web development and graphic design services, and by using our website or engaging with us, you agree to the terms of this Privacy Policy.
          </p>

          <h3>2. Information We Collect</h3>
          <p>
            We may collect the following types of personal information:
            <br />
            <strong>Contact Information:</strong> Name, email address, phone number, and any other information you provide when contacting us.
            <br />
            <strong>Project-Related Data:</strong> Information related to your project needs, preferences, and feedback provided during the course of working together for web development or graphic design services.
            <br />
            <strong>Technical Information:</strong> IP address, browser type, operating system, and website usage data collected automatically through cookies and other tracking technologies.
          </p>

          <h3>3. How We Use Your Information</h3>
          <p>
            We use your personal information for the following purposes:
            <br />
            - To communicate with you regarding project inquiries, updates, and deliverables related to web development and graphic design services.
            <br />
            - To provide and improve our services, ensuring projects meet your specifications.
            <br />
            - To maintain our internal records and ensure legal compliance.
            <br />
            - To enhance the security and performance of our website and services.
          </p>

          <h3>4. Data Sharing</h3>
          <p>
            We do not sell, rent, or trade your personal information to third parties. However, we may share your data with trusted service providers or partners necessary to complete your project (e.g., hosting platforms, design tools) under strict confidentiality agreements.
            <br />
            Additionally, we may disclose your personal information if required by law, court order, or regulatory authority.
            <br />
            <strong>Third-Party Services:</strong> We may use or recommend third-party services, such as hosting platforms or design tools, as part of our services. We are not responsible for the performance, security, or reliability of third-party services, and their use is at your own risk.
          </p>

          <h3>5. Data Security</h3>
          <p>
            We take all reasonable measures to protect your personal data from unauthorized access, alteration, disclosure, or destruction. This includes secure coding practices, encryption, and industry-standard security protocols.
            <br />
            However, please note that no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute protection against cyber threats. 
            <br />
            <strong>Security Disclaimer:</strong> While we take all necessary precautions to secure your data, we cannot be held responsible for malicious attacks, hacking, or security breaches after project delivery. Clients are encouraged to maintain ongoing security measures.
          </p>

          <h3>6. Your Data Rights</h3>
          <p>
            You have the right to:
            <br />
            - Access the personal data we hold about you.
            <br />
            - Request corrections or updates to your data.
            <br />
            - Request the deletion of your data under certain circumstances.
            <br />
            - Object to or restrict the processing of your data.
            <br />
            To exercise these rights, please contact us at the email listed below.
          </p>

          <h3>7. Cookies and Tracking Technologies</h3>
          <p>
            Our website may use cookies and similar technologies to collect information about how you use our site, improve user experience, and track website performance. You can manage cookie preferences through your browser settings, but disabling cookies may affect your ability to use certain features.
          </p>

          <h3>8. Third-Party Links</h3>
          <p>
            Our website may contain links to third-party websites or services. We are not responsible for the privacy practices or content of those third-party sites. We encourage you to review their privacy policies before interacting with them.
          </p>

          <h3>9. Children's Privacy</h3>
          <p>
            Our services are not intended for individuals under the age of 18. We do not knowingly collect personal information from children. If we become aware that we have inadvertently gathered data from a minor, we will take steps to delete it.
          </p>

          <h3>10. Changes to This Privacy Policy</h3>
          <p>
            We reserve the right to modify this Privacy Policy at any time. Any updates will be posted on this page with the effective date of the revised policy. We encourage you to review this policy periodically to stay informed about how we protect your data.
          </p>

          <h3>11. Governing Law</h3>
          <p>
            This Privacy Policy is governed by the laws of British Columbia, Canada. Any disputes arising from this policy will be resolved in accordance with the jurisdiction of British Columbia.
          </p>

          <h3>12. Contact Information</h3>
          <p>
            If you have any questions or concerns regarding this Privacy Policy, please contact us at:
            <br />
            <strong>EVRITECH:</strong> evritech.ca@gmail.com
          </p>
        </div>
      <Footer />
    </div>
  )
}

export default PrivacyPolicy;
