import React from 'react';

export const Terms: React.FC = () => {
  return (
    <div className="studio-container py-16 max-w-4xl space-y-8 font-sans">
      <h1 className="text-3xl md:text-5xl font-display font-bold uppercase tracking-tight text-studio-white border-b border-studio-border pb-4">
        Terms & Conditions
      </h1>
      <span className="text-xs text-studio-text font-mono uppercase tracking-widest block">Last updated: August 2026</span>
      
      <div className="space-y-6 text-sm text-studio-text leading-relaxed">
        <p>
          Welcome to AK Studio. These Terms & Conditions outline the rules and regulations for the use of AK Studio's Website and Client Dashboard Services.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">1. Acceptance of Terms</h3>
        <p>
          By accessing this website we assume you accept these terms and conditions. Do not continue to use AK Studio if you do not agree to take all of the terms and conditions stated on this page.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">2. Intellectual Property Rights</h3>
        <p>
          Unless otherwise stated, AK Studio and/or its licensors own the intellectual property rights for all material on AK Studio. All intellectual property rights are reserved. You may access this from AK Studio for your own personal use subjected to restrictions set in these terms and conditions.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">3. Project Submissions & Client Dashboards</h3>
        <p>
          Client portals and dashboards are equipped with progress milestones and consultation tools. Any materials, files, or information uploaded by the client must not violate local copyright laws or contain malicious script executables. We reserve the right to suspend any credentials violating user terms.
        </p>

        <h3 className="text-lg font-display font-semibold text-studio-white uppercase pt-4">4. Liability Disclaimer</h3>
        <p>
          AK Studio provides websites and applications on an "as-is" basis. We are not responsible for any database interruptions, loss of business revenue, server downtimes, or API payload lags outside our maintenance scopes.
        </p>
      </div>
    </div>
  );
};
