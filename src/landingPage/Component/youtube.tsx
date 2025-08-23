const YoutubeDonationAboutSection = () => {
  return (
    <section className="py-16 bg-gradient-to-br from-[#0b0d10] to-[#101418] text-white" id="youtube-donate">
      <div className="container mx-auto px-4 max-w-6xl">
        {/* YouTube Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">
          Join Our AI Community on YouTube
        </h2>
        
        <div className="flex flex-col lg:flex-row gap-10 items-center mb-20">
          {/* Text Content */}
          <div className="flex-1">
            <h3 className="text-2xl font-semibold mb-4">Subscribe for Exclusive AI Content</h3>
            <p className="text-gray-300 mb-6">
              Get access to tutorials, behind-the-scenes development updates, AI news, and exclusive content you won't find anywhere else.
            </p>
            
            <ul className="space-y-3 mb-8">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Weekly AI tutorials and how-to guides</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Early access to new features</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Live Q&A sessions with our developers</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Community highlights and user showcases</span>
              </li>
            </ul>
            
            <a 
              href="https://youtube.com/@LuminaAI" 
              target="_blank" 
              rel="noopener noreferrer"
              className="inline-flex items-center bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] hover:from-[#6a4ce6] hover:to-[#00b8e6] text-white font-medium py-3 px-6 rounded-lg transition duration-300"
            >
              <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
              </svg>
              Subscribe to Our Channel
            </a>
          </div>
          
          {/* Video Preview */}
          <div className="flex-1 flex flex-col items-center">
            <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-2xl">
              <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] flex items-center justify-center">
                <div className="absolute inset-0 bg-black opacity-20"></div>
                <div className="relative z-10">
                  <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] rounded-full flex items-center justify-center hover:from-[#6a4ce6] hover:to-[#00b8e6] transition duration-300 transform hover:scale-110">
                    <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                      <path d="M8 5v14l11-7z" />
                    </svg>
                  </div>
                </div>
              </div>
            </div>
            <p className="mt-6 text-lg font-medium bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">
              Join 15K+ AI enthusiasts
            </p>
          </div>
        </div>

        {/* Donation Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Support Our Mission</h2>

        <div className="max-w-2xl mx-auto bg-[#101418] rounded-2xl p-8 md:p-12 border border-[rgba(255,255,255,0.1)] shadow-xl mb-20">
          <div className="flex flex-col items-center gap-8">
            <div className="qr-code w-32 h-32 bg-white p-3 rounded-xl flex items-center justify-center">
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

            <div className="text-center">
              <p className="mb-4">Scan the QR code to support our open-source AI development</p>
              <p className="wallet-address bg-[rgba(255,255,255,0.08)] py-3 px-4 rounded-lg font-mono my-4 inline-block break-all">0x8a1b3e9fC27d8D2E2A4B7a1F5E2D3C8B1A4E5F7</p>
              <p className="mb-6">Your donation helps us continue providing free AI tools and resources to the community.</p>
              <a href="#" className="btn btn-donate inline-block py-3 px-6 rounded-xl font-semibold cursor-pointer transition-all duration-300 bg-gradient-to-br from-[#ff5c7c] to-[#ff9a3d] text-[#0b0d10] shadow-lg shadow-[rgba(255,92,124,0.25)] hover:translate-y-[-3px] hover:scale-105 hover:shadow-xl hover:shadow-[rgba(255,92,124,0.4)]">
                Donate via PayPal
              </a>
            </div>
          </div>
        </div>

        {/* About Our Team Section */}
        <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">
          About Our Team
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          <div className="bg-[#101418] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Our Mission</h3>
            <p className="text-gray-300 mb-4">
              At LuminaAI (DrishtiAI), we believe in democratizing access to cutting-edge AI technology. Our mission is to make AI tools accessible, affordable, and powerful for everyone—from individual creators to enterprise teams.
            </p>
            <p className="text-gray-300">
              Founded in 2023, we've grown from a small research project to a platform serving thousands of users worldwide, all united by a passion for innovation and the transformative power of artificial intelligence.
            </p>
          </div>
          
          <div className="bg-[#101418] rounded-2xl p-8 border border-[rgba(255,255,255,0.1)] shadow-xl">
            <h3 className="text-2xl font-semibold mb-4 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent">Our Values</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Innovation through simplicity</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Transparency in AI development</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>User privacy and data security</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Accessibility across all skill levels</span>
              </li>
              <li className="flex items-start">
                <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0" fill="currentColor" viewBox="0 0 20 20">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                </svg>
                <span>Continuous learning and improvement</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default YoutubeDonationAboutSection;