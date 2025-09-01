
const YoutubeSection = () => {
  return (
    <>
      <section className="p-16 bg-gradient-to-br from-[#0b0d10] to-[#101418] text-white" id="about">
        <div className="container mx-auto max-w-6xl">
          {/* YouTube Section */}
          <h2 className="text-3xl md:text-4xl font-bold text-center mb-12 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent animate-pulse">
            Join Our AI Community on YouTube
          </h2>

          <div className="flex flex-col lg:flex-row gap-10 items-center">
            {/* Text Content */}
            <div className="flex-1 transition-all duration-500 hover:translate-x-2">
              <h3 className="text-2xl font-semibold mb-4">Subscribe for Exclusive AI Content</h3>
              <p className="text-gray-300 mb-6">
                Get access to tutorials, behind-the-scenes development updates, AI news, and exclusive content you won't find anywhere else.
              </p>

              <ul className="space-y-3 mb-8">
                {[
                  "Weekly AI tutorials and how-to guides",
                  "Early access to new features",
                  "Live Q&A sessions with our developers",
                  "Community highlights and user showcases"
                ].map((item, index) => (
                  <li key={index} className="flex items-start group">
                    <svg className="w-5 h-5 text-[#00d1ff] mt-0.5 mr-3 flex-shrink-0 group-hover:scale-110 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" />
                    </svg>
                    <span className="group-hover:text-[#00d1ff] transition-colors">{item}</span>
                  </li>
                ))}
              </ul>

              <a
                href="https://www.youtube.com/@UncensoredMic"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] hover:from-[#6a4ce6] hover:to-[#00b8e6] text-white font-medium py-3 px-6 rounded-lg transition-all duration-300 transform hover:-translate-y-1 shadow-lg hover:shadow-xl hover:shadow-[#7c5cff]/30"
              >
                <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M19.615 3.184c-3.604-.246-11.631-.245-15.23 0-3.897.266-4.356 2.62-4.385 8.816.029 6.185.484 8.549 4.385 8.816 3.6.245 11.626.246 15.23 0 3.897-.266 4.356-2.62 4.385-8.816-.029-6.185-.484-8.549-4.385-8.816zm-10.615 12.816v-8l8 3.993-8 4.007z" />
                </svg>
                Subscribe to Our Channel
              </a>
            </div>

            {/* Video Preview */}
            <div className="flex-1 flex flex-col items-center">
              <div className="relative w-full max-w-md overflow-hidden rounded-lg shadow-2xl group">
                <div className="aspect-w-16 aspect-h-9 bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] flex items-center justify-center">
                  <div className="absolute inset-0 bg-black opacity-20 group-hover:opacity-10 transition-opacity"></div>
                  <div className="relative z-10 transform group-hover:scale-110 transition-transform duration-500">
                    <div className="w-16 h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#7c5cff] to-[#00d1ff] rounded-full flex items-center justify-center hover:from-[#6a4ce6] hover:to-[#00b8e6] transition-all duration-300 transform group-hover:scale-110 shadow-lg group-hover:shadow-xl group-hover:shadow-[#7c5cff]/40">
                      <svg className="w-8 h-8 md:w-10 md:h-10 text-white ml-1" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M8 5v14l11-7z" />
                      </svg>
                    </div>
                  </div>
                </div>
              </div>
              <p className="mt-6 text-lg font-medium bg-gradient-to-r from-[#7c5cff] to-[#00d1ff] bg-clip-text text-transparent animate-pulse">
                Join 15K+ AI enthusiasts
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default YoutubeSection;


