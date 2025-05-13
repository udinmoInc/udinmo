import React from 'react';
import Link from 'next/link';

const PrivacyPolicy: React.FC = () => {
  return (
    <div className="bg-[#08090a] text-white min-h-screen p-8">
    <div className="max-w-3xl mx-auto space-y-8 mt-20">
      <h1 className="text-4xl font-bold">Privacy Policy</h1>
      <p className="text-muted">Last Updated: April 25, 2025</p>
  
      <p className="mt-4">
        We take your privacy seriously. This policy explains how we collect, use, and protect your personal
        information when you use our services. We are committed to safeguarding your privacy and ensuring that your
        personal information is secure.
      </p>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">1. Information We Collect</h2>
        <p>We collect personal details when you sign up or interact with our services. This includes:</p>
        <ul className="list-disc pl-6">
          <li>Personal information (name, email, etc.)</li>
          <li>Payment details (credit card information, billing address)</li>
          <li>Account activity logs (usage history, interactions with our support team)</li>
          <li>Device information (IP address, device type, operating system)</li>
        </ul>
        <p>
          We also collect information from third parties, such as social media platforms, when you choose to interact with
          us through these services.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">2. How We Use Your Information</h2>
        <p>We use your data to improve our services and support your account:</p>
        <ul className="list-disc pl-6">
          <li>Account management and support, including resolving issues or requests</li>
          <li>Communication for service updates, new features, and promotional materials</li>
          <li>Analyzing usage data to optimize our services and ensure a seamless user experience</li>
          <li>Personalizing content and advertisements based on your usage and preferences</li>
        </ul>
        <p>
          We may also use your information to comply with legal obligations, including responding to lawful requests from
          government authorities.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">3. Data Protection</h2>
        <p>
          We use industry-standard security measures to safeguard your personal data, including encryption, firewalls, and
          secure servers. However, no method of transmission over the Internet is 100% secure, and we cannot guarantee the
          absolute security of your data.
        </p>
        <p>
          We continually review and update our security practices to ensure your information is as protected as possible.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">4. Sharing Your Information</h2>
        <p>
          We don’t sell or share your personal data with third parties, except where necessary to provide services or
          when required by law. This may include sharing data with trusted service providers who assist us in providing our
          services.
        </p>
        <p>
          We may also share your information if we are involved in a merger, acquisition, or asset sale, in which case we
          will notify you before your personal information is transferred.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">5. Your Rights</h2>
        <p>
          You have the right to access, modify, or delete your personal information at any time by contacting us. You may
          also opt out of receiving promotional emails or newsletters by following the unsubscribe link in such emails.
        </p>
        <p>
          If you request the deletion of your personal information, we may retain some data as required by law or for
          legitimate business purposes.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">6. Cookies</h2>
        <p>
          We use cookies to enhance your experience on our website. Cookies are small files stored on your device that
          help us remember your preferences and improve your interaction with our site. You can manage cookie preferences
          in your browser settings. Some cookies are necessary for our site to function properly, while others help us
          analyze traffic and optimize content.
        </p>
        <p>
          By continuing to use our website, you consent to our use of cookies. You can change your cookie settings at any
          time in your browser.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">7. Terms & Policies</h2>
        <p>
          Please also review our <Link href="/terms" className="text-green-400">Terms of Service</Link>, 
          <Link href="/refund-policy" className="text-green-400 ml-4">Refund Policy</Link>, and 
          <Link href="/cookie-policy" className="text-green-400 ml-4">Cookie Policy</Link> for more information about
          our practices.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">8. Changes to This Policy</h2>
        <p>
          We may update this policy from time to time. If we make significant changes, we will notify you through a
          prominent notice on our website or via email. We encourage you to review this page periodically for any updates.
        </p>
      </div>
  
      <div className="mt-10">
        <h2 className="text-2xl font-semibold mb-2">9. Contact Us</h2>
        <p>
          If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us at <a href="mailto:support@yourdomain.com" className="text-green-400">support@yourdomain.com</a>.
        </p>
      </div>
    </div>
  </div>
  );
};

export default PrivacyPolicy;
