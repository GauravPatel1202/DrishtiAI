// components/LandingPage.tsx
import React from 'react';
import Header from '../components/Header';
import Hero from '../components/Hero';
import CTABanner from '../components/CTABanner';
import ModelSection from '../components/ModelSection';
import AIShowcase from '../components/AIShowcase';
import AboutSection from '../components/AboutSection';
import DonationSection from '../components/DonationSection';
import FAQ from '../components/FAQ';
import Footer from '../components/Footer';
const LandingPage: React.FC = () => {
  return (
    <div>
      <Header />
      <Hero />
      <CTABanner />
      <ModelSection />
      <AIShowcase />
      <AboutSection />
      <DonationSection />
      <FAQ />
      <Footer />
      <style>{`
        :root {
          --bg: #0b0d10;
          --card: #101418;
          --muted: #cdd6f4;
          --text: #e6e8ee;
          --text-dim: #a5afc7;
          --primary: #7c5cff;
          --accent: #00d1ff;
          --shadow: 0 10px 30px rgba(0,0,0,.35), 0 2px 6px rgba(0,0,0,.25);
          --radius: 16px;
          --radius-lg: 24px;
          --container: 1200px;
        }
        *{box-sizing:border-box; scroll-behavior:smooth;}
        html,body{height:100%}
        body {
          margin:0;
          font-family:Inter,system-ui,-apple-system,Segoe UI,Roboto,Ubuntu,Cantarell,"Helvetica Neue",Arial,sans-serif;
          color:var(--text);
          background: radial-gradient(1200px 600px at 80% -10%, rgba(124,92,255,.15), transparent 60%),
                      radial-gradient(900px 500px at -10% 10%, rgba(0,209,255,.12), transparent 60%), var(--bg);
          line-height:1.6;
          overflow-x:hidden;
        }
        a{color:inherit; text-decoration:none}
        img{max-width:100%; display:block}
        .container{max-width:var(--container); margin-inline:auto; padding:0 20px}
        .btn{padding:.9rem 1.1rem; border-radius:12px; font-weight:600; cursor:pointer; transition:.3s;}
        .btn-primary{background:linear-gradient(135deg, var(--primary), var(--accent)); color:#0b0d10; box-shadow:0 10px 20px rgba(124,92,255,.25);}
        .btn-primary:hover{transform:translateY(-3px) scale(1.03); box-shadow:0 15px 25px rgba(124,92,255,.4);}
        .btn-ghost{border:1px solid rgba(255,255,255,.16); color:var(--text); transition:.3s}
        .btn-ghost:hover{background:rgba(255,255,255,.08)}
        .btn-donate{background:linear-gradient(135deg, #ff5c7c, #ff9a3d); color:#0b0d10; box-shadow:0 10px 20px rgba(255,92,124,.25);}
        .btn-donate:hover{transform:translateY(-3px) scale(1.03); box-shadow:0 15px 25px rgba(255,92,124,.4);}

        /* Sticky Header */
        header {
          position: sticky;
          top: 0; left: 0; right: 0;
          z-index: 100;
          backdrop-filter: saturate(160%) blur(10px);
          background: rgba(11,13,16,.85);
          border-bottom: 1px solid rgba(255,255,255,.08);
          animation:fadeDown .7s ease forwards;
        }
        .nav{display:flex; align-items:center; justify-content:space-between; gap:1rem; padding:14px 0}
        .brand{display:flex; align-items:center; gap:.7rem; font-weight:800;}
        .logo{width:36px; height:36px; border-radius:10px; display:grid; place-items:center;
          background:conic-gradient(from 210deg, var(--primary), var(--accent));
          animation:rotate 6s linear infinite;
        }
        .navlinks{display:flex; gap:1rem; align-items:center}
        .navlinks a{padding:.6rem .8rem; border-radius:10px; color:var(--text-dim); transition:.3s}
        .navlinks a:hover{background:rgba(255,255,255,.06); color:var(--text)}

        /* Hero */
        .hero{padding:100px 0 36px; overflow:hidden;}
        .hero-grid{display:grid; grid-template-columns:1.2fr .8fr; gap:48px; align-items:center}
        h1{font-size: clamp(2rem, 3.2vw + 1rem, 4rem); 
          background:linear-gradient(90deg,var(--primary),var(--accent));
          -webkit-background-clip:text; color:transparent;
          background-size:200% auto; animation:gradientMove 6s infinite linear;
        }
        .badge{display:inline-block; padding:.4rem .8rem; border-radius:8px;
          background:rgba(124,92,255,.15); color:var(--accent); font-size:.8rem; font-weight:600; margin-bottom:1rem;}

        /* CTA Banner */
        .cta-banner{padding:100px 20px; text-align:center; background:linear-gradient(135deg, rgba(124,92,255,.15), rgba(0,209,255,.1)); margin-top:60px; animation:fadeUp 1s ease;}
        .cta-banner h2{font-size:2.5rem; margin-bottom:1rem; background:linear-gradient(90deg,var(--primary),var(--accent)); -webkit-background-clip:text; color:transparent;}

        /* Model Section */
        .model-section{padding:100px 20px; text-align:center; animation:fadeUp 1s ease;}
        .model-grid{display:grid; grid-template-columns:repeat(auto-fit,minmax(260px,1fr)); gap:1.5rem; margin-top:2rem}
        .model-card{background:var(--card); border:1px solid rgba(255,255,255,.1); border-radius:var(--radius-lg); padding:2rem; box-shadow:var(--shadow); transition:transform .3s, border-color .3s}
        .model-card:hover{transform:translateY(-10px) scale(1.03); border-color:var(--primary)}

        /* AI Showcase Section */
        .ai-showcase{padding:100px 20px; text-align:center; animation:fadeUp 1s ease;}
        .ai-showcase .container{max-width:var(--container); margin-inline:auto;}
        .section-title{font-size:2.2rem; margin-bottom:2rem; background:linear-gradient(90deg,var(--primary),var(--accent)); -webkit-background-clip:text; color:transparent;}
        .ai-grid{display:grid; grid-template-columns:1fr auto 1fr; gap:2rem; align-items:center; justify-content:center; margin-top:3rem}
        .ai-column{display:flex; flex-direction:column; gap:1.5rem}
        .ai-card{background:var(--card); border:1px solid rgba(255,255,255,.1); border-radius:var(--radius); padding:1.5rem; text-align:left; box-shadow:var(--shadow); transition:.3s; opacity:0; animation:fadeUp .8s forwards;}
        .ai-card:nth-child(1){animation-delay:.2s;}
        .ai-card:nth-child(2){animation-delay:.4s;}
        .ai-card:nth-child(3){animation-delay:.6s;}
        .ai-card:hover{transform:translateY(-8px); border-color:var(--primary)}
        .ai-card h3{margin:.2rem 0; font-size:1.2rem}
        .ai-card .badge{background:rgba(124,92,255,.15); color:var(--accent);}

        .ai-center{display:flex; align-items:center; justify-content:center}
        .glow-circle{width:120px; height:120px; border-radius:50%; background:radial-gradient(circle at 30% 30%, var(--primary), var(--accent)); display:flex; align-items:center; justify-content:center; font-size:2rem; color:white; box-shadow:0 0 60px rgba(124,92,255,.5), 0 0 90px rgba(0,209,255,.5); animation:pulse 3s infinite}

        /* About Us Section */
        .about-section {
          padding: 100px 20px;
          background: rgba(255,255,255,.02);
          animation: fadeUp 1s ease;
        }
        .about-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 3rem;
          align-items: center;
        }
        .team-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-top: 2rem;
        }
        .team-member {
          background: var(--card);
          border-radius: var(--radius);
          padding: 1.5rem;
          text-align: center;
          border: 1px solid rgba(255,255,255,.1);
          transition: .3s;
        }
        .team-member:hover {
          transform: translateY(-5px);
          border-color: var(--primary);
        }
        .team-img {
          width: 80px;
          height: 80px;
          border-radius: 50%;
          margin: 0 auto 1rem;
          background: linear-gradient(135deg, var(--primary), var(--accent));
          display: flex;
          align-items: center;
          justify-content: center;
          font-size: 1.5rem;
        }

        /* Donation Section */
        .donation-section {
          padding: 100px 20px;
          text-align: center;
          animation: fadeUp 1s ease;
        }
        .donation-container {
          max-width: 600px;
          margin: 0 auto;
          background: var(--card);
          border-radius: var(--radius-lg);
          padding: 3rem 2rem;
          border: 1px solid rgba(255,255,255,.1);
          box-shadow: var(--shadow);
        }
        .donation-flex {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2rem;
        }
        .qr-code {
          width: 180px;
          height: 180px;
          background: white;
          padding: 12px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
        }
        .qr-code-inner {
          width: 100%;
          height: 100%;
          display: grid;
          grid-template-columns: repeat(11, 1fr);
          grid-template-rows: repeat(11, 1fr);
          gap: 2px;
        }
        .qr-cell {
          background: black;
        }
        .donation-info {
          text-align: center;
        }
        .wallet-address {
          background: rgba(255,255,255,.08);
          padding: 12px 16px;
          border-radius: 8px;
          font-family: monospace;
          margin: 1rem 0;
          display: inline-block;
          word-break: break-all;
        }

        /* FAQ */
        .faq{padding:80px 20px; background:rgba(255,255,255,.02)}
        .faq h2{font-size:2rem; text-align:center; margin-bottom:2rem}
        .faq-grid{max-width:800px; margin:0 auto; display:grid; gap:1rem}
        details{background:var(--card); border-radius:var(--radius); border:1px solid rgba(255,255,255,.1); padding:1rem 1.2rem; transition:.3s}
        details[open]{border-color:var(--primary);}

        /* Footer */
        footer{background:#0a0c0f; padding:40px 20px; text-align:center; border-top:1px solid rgba(255,255,255,.08); margin-top:60px}
        footer .links{display:flex; justify-content:center; gap:1.5rem; flex-wrap:wrap; margin-bottom:1rem}
        footer a{color:var(--text-dim); font-size:.9rem; transition:.3s}
        footer a:hover{color:var(--text)}
        footer p{color:var(--text-dim); font-size:.85rem; margin:0}

      /* Mobile responsive */
        @media(max-width:980px){
          .btn {
            width: 100%;
            text-align: center;
          }
          .hero-grid{grid-template-columns:1fr}
          .ai-grid{grid-template-columns:1fr}
          .ai-center{display:none}
          .navlinks{display:flex; gap:.5rem; align-items:center}
          .navlinksHide{display:none;}
          .nav {
            display: flex;
            align-items: center;
            justify-content: space-between;
            gap: 1rem;
            padding: 14px 20px;
          }
          header {
            position: sticky;
            top: 0; left: 20px; right: 20px;
            z-index: 100;
            backdrop-filter: saturate(160%) blur(10px);
            background: rgba(11,13,16,.85);
            border-bottom: 1px solid rgba(255,255,255,.08);
            animation:fadeDown .7s ease forwards;
          }
          .about-grid {
            grid-template-columns: 1fr;
          }
        }

        /* Animations */
        @keyframes pulse{0%{transform:scale(1)}50%{transform:scale(1.1)}100%{transform:scale(1)}}
        @keyframes rotate{from{transform:rotate(0)}to{transform:rotate(360deg)}}
        @keyframes gradientMove{0%{background-position:0% 50%}100%{background-position:200% 50%}}
        @keyframes fadeUp{0%{opacity:0; transform:translateY(20px);}100%{opacity:1; transform:translateY(0);}}
        @keyframes fadeDown{0%{opacity:0; transform:translateY(-20px);}100%{opacity:1; transform:translateY(0);}}
      `}</style>
    </div>
  );
};

export default LandingPage;