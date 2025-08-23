// components/DonationSection.tsx
import React from 'react';

const DonationSection: React.FC = () => {
  return (
      <section className="py-24 px-5 text-center animate-[fadeUp_1s_ease]" id="donate">
          <div className="max-w-[1200px] mx-auto">
              <h2 className="section-title text-3xl md:text-4xl font-bold mb-8 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Support Our Mission</h2>

              <div className="donation-container max-w-2xl mx-auto bg-[#101418] rounded-2xl p-8 md:p-12 border border-[rgba(255,255,255,0.1)] shadow-xl">
                  <div className="donation-flex flex flex-col items-center gap-8">
                      <div className="qr-code w-44 h-44 bg-white p-3 rounded-xl flex items-center justify-center">
                          <div className="qr-code-inner w-full h-full grid grid-cols-11 grid-rows-11 gap-0.5">
                              <div className="qr-cell bg-black" style={{ gridArea: "1/1/4/4" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "1/9/4/12" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "9/1/12/4" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "2/3/3/4" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "3/2/4/3" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "4/5/5/8" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "5/4/8/5" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "5/8/8/9" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "8/5/9/8" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "9/6/10/7" }}></div>
                              <div className="qr-cell bg-black" style={{ gridArea: "10/5/11/6" }}></div>
                          </div>
                      </div>

                      <div className="donation-info text-center">
                          <p className="mb-4">Scan the QR code to support our open-source AI development</p>
                          <p className="wallet-address bg-[rgba(255,255,255,0.08)] py-3 px-4 rounded-lg font-mono my-4 inline-block break-all">0x8a1b3e9fC27d8D2E2A4B7a1F5E2D3C8B1A4E5F7</p>
                          <p className="mb-6">Your donation helps us continue providing free AI tools and resources to the community.</p>
                          <a href="#" className="btn btn-donate inline-block py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#ff5c7c] to-[#ff9a3d] text-[#0b0d10] shadow-lg shadow-[rgba(255,92,124,0.25)] hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl hover:shadow-[rgba(255,92,124,0.4)]">Donate via PayPal</a>
                      </div>
                  </div>
              </div>
          </div>
      </section>
  );
};

export default DonationSection;