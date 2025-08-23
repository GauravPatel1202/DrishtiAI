// components/DonationSection.tsx
import React from 'react';

const DonationSection: React.FC = () => {
  return (
    <section className="donation-section" id="donate">
      <div className="container">
        <h2 className="section-title">Support Our Mission</h2>
        
        <div className="donation-container">
          <div className="donation-flex">
            <div className="qr-code">
              <div className="qr-code-inner">
                {/* This is a simplified representation of a QR code using CSS grid */}
                <div className="qr-cell" style={{ gridArea: "1/1/4/4" }}></div>
                <div className="qr-cell" style={{ gridArea: "1/9/4/12" }}></div>
                <div className="qr-cell" style={{ gridArea: "9/1/12/4" }}></div>
                <div className="qr-cell" style={{ gridArea: "2/3/3/4" }}></div>
                <div className="qr-cell" style={{ gridArea: "3/2/4/3" }}></div>
                <div className="qr-cell" style={{ gridArea: "4/5/5/8" }}></div>
                <div className="qr-cell" style={{ gridArea: "5/4/8/5" }}></div>
                <div className="qr-cell" style={{ gridArea: "5/8/8/9" }}></div>
                <div className="qr-cell" style={{ gridArea: "8/5/9/8" }}></div>
                <div className="qr-cell" style={{ gridArea: "9/6/10/7" }}></div>
                <div className="qr-cell" style={{ gridArea: "10/5/11/6" }}></div>
              </div>
            </div>
            
            <div className="donation-info">
              <p>Scan the QR code to support our open-source AI development</p>
              <p className="wallet-address">0x8a1b3e9fC27d8D2E2A4B7a1F5E2D3C8B1A4E5F7</p>
              <p>Your donation helps us continue providing free AI tools and resources to the community.</p>
              <a href="#" className="btn btn-donate">Donate via PayPal</a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default DonationSection;