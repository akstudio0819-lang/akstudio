import React from 'react';

export const Privacy: React.FC = () => {
  return (
    <div className="studio-container py-16 max-w-4xl space-y-8 font-sans">
      <h1 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-studio-white border-b border-studio-border pb-4">
        Privacy Policy
      </h1>
      <span className="text-xs text-studio-text font-mono uppercase tracking-widest block">Last updated: August 2026</span>
      
      <div className="space-y-6 text-sm text-studio-text leading-relaxed">
        <p>
          At AK Studio, accessible from hello@akstudio.com, one of our main priorities is the privacy of our visitors. This Privacy Policy document contains types of information that is collected and recorded by AK Studio and how we use it.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">1. Information We Collect</h3>
        <p>
          If you contact us directly, we may receive additional information about you such as your name, email address, phone number, the contents of the message and/or attachments you may send us, and any other information you may choose to provide.
        </p>
        <p>
          When you register for an Account (Client Portal), we may ask for your contact information, including items such as name, company name, address, email address, and telephone number.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">2. How We Use Your Information</h3>
        <ul className="list-disc pl-5 space-y-2">
          <li>Provide, operate, and maintain our website and customer portals.</li>
          <li>Improve, personalize, and expand our website capabilities.</li>
          <li>Understand and analyze how you interact with our forms.</li>
          <li>Develop new products, services, features, and functionality.</li>
          <li>Communicate with you, either directly or through one of our partners, including for customer service, to provide you with updates and other information relating to the website.</li>
        </ul>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">3. Log Files</h3>
        <p>
          AK Studio follows a standard procedure of using log files. These files log visitors when they visit websites. All hosting companies do this and a part of hosting services' analytics. The information collected by log files include internet protocol (IP) addresses, browser type, Internet Service Provider (ISP), date and time stamp, referring/exit pages, and possibly the number of clicks. These are not linked to any information that is personally identifiable.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">4. Third-Party Privacy Policies</h3>
        <p>
          AK Studio's Privacy Policy does not apply to other advertisers or websites. Thus, we are advising you to consult the respective Privacy Policies of these third-party servers for more detailed information. It may include their practices and instructions about how to opt-out of certain options.
        </p>
      </div>
    </div>
  );
};
