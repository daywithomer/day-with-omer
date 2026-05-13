import { useState, useRef } from 'react';
import { motion } from 'motion/react';
import QRCode from 'react-qr-code';
import { 
  Copy, 
  CheckCircle2, 
  Activity, 
  Crosshair, 
  Settings2, 
  LineChart, 
  ShieldCheck, 
  Zap, 
  RefreshCcw, 
  QrCode,
  ArrowRight,
  Send,
  Mail,
  MessageCircle,
  Loader2
} from 'lucide-react';
import { supabase } from './lib/supabase';

export default function App() {
  const [username, setUsername] = useState('');
  const [isCopied, setIsCopied] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitError, setSubmitError] = useState<string | null>(null);
  const paymentSectionRef = useRef<HTMLDivElement>(null);

  const walletAddress = "TREEpVU3ZcXM4kXRoXfmbJ88Fe3NMK8hFR";
  const whatsappNumber = "+6285122702854";
  
  const handleActivateClick = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!username) return;
    
    setIsSubmitting(true);
    setSubmitError(null);
    
    try {
      if (supabase) {
        // Assume 'leads' table has an 'username' column
        const { error } = await supabase
          .from('access_requests')
          .insert([{ username }]);
          
        if (error) throw error;
      }
      
      setIsSubmitted(true);
      
      setTimeout(() => {
        paymentSectionRef.current?.scrollIntoView({ behavior: 'smooth' });
      }, 500);
    } catch (err: any) {
      console.error(err);
      setSubmitError(err.message || "Something went wrong.");
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(walletAddress);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 2000);
  };

  const handleWhatsApp = () => {
    const text = `Hello, I have purchased Day With Omer Lifetime Access.\n\nTradingView Username: ${username || '[NOT ENTERED]'}\nTransaction ID: \n\nPayment proof attached.`;
    const url = `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(text)}`;
    window.open(url, '_blank');
  };

  return (
    <div className="min-h-screen font-sans selection:bg-emerald-500/20 text-[#F0F0F0] relative bg-[#050505]">
      {/* Dynamic Background Glows */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden z-0 opacity-20">
        <div className="absolute top-[-100px] right-[-100px] w-[500px] h-[500px] bg-cyan-500/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-100px] left-[-100px] w-[500px] h-[500px] bg-emerald-500/20 blur-[120px] rounded-full" />
      </div>

      <div className="relative z-10 w-full max-w-5xl mx-auto px-6 pb-24">
        
        {/* --- NAVBAR --- */}
        <nav className="py-8 flex justify-between items-center z-10">
          <div className="flex items-center gap-4">
            {/* The actual logo image */}
            <img 
              src="/logo.jpg" 
              alt="DWO Logo" 
              className="h-9 w-auto object-contain rounded-md" 
              onError={(e) => {
                 // Fallback if user hasn't uploaded logo.jpg yet
                 (e.target as HTMLImageElement).src = 'https://placehold.co/100x100/111111/10B981?text=DWO';
              }} 
            />
            <div className="text-xl md:text-2xl font-light tracking-[0.2em] md:tracking-[0.3em] uppercase whitespace-nowrap">Day With <span className="font-bold">Omer</span></div>
          </div>
          <div className="hidden md:flex gap-8 text-[11px] uppercase tracking-widest text-white/50">
            <a href="#" className="hover:text-white transition-colors">Precision</a>
            <a href="#" className="hover:text-white transition-colors">Structure</a>
            <a href="#" className="hover:text-white transition-colors">Verified</a>
          </div>
        </nav>

        {/* --- 1. HERO & ACCESS SECTION --- */}
        <section className="min-h-[90vh] flex flex-col justify-center pt-8 pb-16">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center max-w-3xl mx-auto mb-12"
          >
            <div className="inline-block mb-4 px-3 py-1 rounded-full border border-cyan-500/30 bg-cyan-500/5 text-cyan-400 text-[10px] uppercase tracking-[0.2em] font-semibold">
              Exclusive Invite Only
            </div>
            <h1 className="text-4xl md:text-6xl font-semibold leading-[1.1] tracking-tight mb-6">
              Professional Trading <br className="hidden md:block"/> 
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40">Indicator System.</span>
            </h1>
            <p className="text-lg md:text-xl text-white/50 mb-8 max-w-2xl mx-auto font-light leading-relaxed">
              Clean market structure signals designed for institutional-grade precision and simplicity.
            </p>
          </motion.div>

          <div className="grid md:grid-cols-2 gap-8 items-start">
            
            {/* ACCESS CARD */}
            <motion.div 
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              <div className="relative group">
                <div className="relative bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl">
                  
                  <div className="absolute top-0 right-0 p-8">
                    <div className="text-right">
                      <div className="text-3xl font-bold">$99</div>
                      <div className="text-[10px] uppercase tracking-widest text-white/30">Lifetime Access</div>
                    </div>
                  </div>

                  <div className="mb-8">
                    <h2 className="text-xl font-medium">Activate Access</h2>
                    <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Link your TradingView account</p>
                  </div>

                  <form onSubmit={handleActivateClick} className="space-y-6 max-w-sm">
                    <div className="space-y-2">
                      <label className="text-[10px] uppercase tracking-[0.15em] text-white/40 ml-1">
                        TradingView Username
                      </label>
                      <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        placeholder="Enter username..."
                        disabled={isSubmitted}
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-5 py-4 text-sm focus:outline-none focus:border-cyan-500/50 transition-colors placeholder:text-white/20 disabled:opacity-50"
                        required
                      />
                    </div>
                    
                    <button 
                      type="submit"
                      disabled={isSubmitted || isSubmitting}
                      className={`w-full py-4 text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)] flex items-center justify-center gap-2 group ${isSubmitted ? 'bg-emerald-600' : 'bg-emerald-500 hover:bg-emerald-400'} disabled:opacity-75`}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="w-4 h-4 animate-spin" />
                          Processing
                        </>
                      ) : isSubmitted ? (
                        <>
                          Saved <CheckCircle2 className="w-4 h-4" />
                        </>
                      ) : (
                        <>
                          Continue
                          <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                        </>
                      )}
                    </button>
                    {submitError && (
                      <div className="text-red-400 text-xs text-center mt-2">
                        {submitError}
                      </div>
                    )}
                  </form>
                  
                  <div className="mt-6 flex items-center gap-2 text-[10px] uppercase tracking-widest text-white/30">
                    <ShieldCheck className="w-4 h-4 text-emerald-500" />
                    Secure manual approval process
                  </div>

                </div>
              </div>
            </motion.div>

            {/* INDICATOR PREVIEW */}
            <motion.div 
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.3, ease: "easeOut" }}
              className="h-full"
            >
              <div className="h-full flex flex-col justify-center">
                <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl relative overflow-hidden group">
                  <div className="flex justify-between items-center mb-4">
                    <span className="text-[10px] uppercase tracking-widest text-white/40 font-semibold">Indicator Preview</span>
                    <div className="flex gap-1">
                      <div className="w-1 h-1 rounded-full bg-emerald-500"></div>
                      <div className="w-1 h-1 rounded-full bg-emerald-500 animate-pulse"></div>
                    </div>
                  </div>
                  
                  {/* Premium mock chart using CSS / SVGs for guaranteed quality without external assets depending on network */}
                  <div className="aspect-[4/3] w-full bg-black/40 border border-white/5 rounded-lg relative p-4 flex flex-col justify-between">
                    {/* Top Bar mock */}
                    <div className="flex justify-between items-center z-20 opacity-80">
                      <div className="flex items-center gap-2">
                        <div className="w-6 h-6 rounded-md bg-emerald-500/20 flex items-center justify-center">
                          <Activity className="w-4 h-4 text-emerald-400" />
                        </div>
                        <span className="font-mono text-sm text-white font-medium">XAUUSD</span>
                        <span className="text-xs text-neutral-500">1m</span>
                      </div>
                      <div className="flex gap-1.5">
                        <div className="w-2 h-2 rounded-full bg-red-500/50" />
                        <div className="w-2 h-2 rounded-full bg-amber-500/50" />
                        <div className="w-2 h-2 rounded-full bg-emerald-500/50" />
                      </div>
                    </div>
                    
                    {/* SVG Chart Abstract Shapes to simulate a premium indicator */}
                    <div className="absolute inset-0 flex items-center justify-center opacity-70">
                      <svg width="100%" height="80%" viewBox="0 0 400 200" preserveAspectRatio="none" className="px-4">
                        <path d="M0,150 Q50,160 100,120 T200,80 T300,50 T400,100" fill="none" stroke="#10b981" strokeWidth="2" strokeOpacity="0.4" />
                        <path d="M0,130 Q40,110 80,140 T160,90 T250,110 T350,60 T400,80" fill="none" stroke="#ef4444" strokeWidth="2" strokeOpacity="0.2" />
                        {/* Buy/Sell markers */}
                        <circle cx="100" cy="120" r="4" fill="#10b981" />
                        <text x="100" y="140" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">BUY</text>
                        
                        <circle cx="200" cy="80" r="4" fill="#ef4444" />
                        <text x="200" y="70" fill="#ef4444" fontSize="10" fontWeight="bold" textAnchor="middle">SELL</text>

                        <circle cx="300" cy="50" r="4" fill="#10b981" />
                        <text x="300" y="40" fill="#10b981" fontSize="10" fontWeight="bold" textAnchor="middle">BUY</text>
                        
                        {/* Trend zone */}
                        <path d="M100,120 L200,80 L200,200 L100,200 Z" fill="url(#trendGrad)" opacity="0.3" />
                        
                        <defs>
                          <linearGradient id="trendGrad" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="#10b981" stopOpacity="0.2"/>
                            <stop offset="100%" stopColor="#10b981" stopOpacity="0"/>
                          </linearGradient>
                        </defs>
                      </svg>
                    </div>

                    {/* Bottom brand mock */}
                    <div className="z-20 flex justify-between items-center opacity-60 mt-auto pt-2 border-t border-white/10">
                      <span className="text-[8px] font-mono text-white/30 truncate">MSB CONFIRMED</span>
                      <span className="text-[8px] font-mono text-emerald-400 whitespace-nowrap">+14.2%</span>
                    </div>
                  </div>

                </div>
              </div>
            </motion.div>

          </div>
        </section>

        {/* --- 2. PAYMENT & VERIFICATION SECTION --- */}
        <section ref={paymentSectionRef} className="py-16 border-t border-white/5">
          <div className="max-w-xl mx-auto space-y-6">
            <div className="bg-white/5 backdrop-blur-2xl border border-white/10 rounded-3xl p-8 shadow-2xl relative">
              <div className="absolute top-0 right-0 p-8 hidden sm:block">
                <div className="text-right">
                  <div className="text-3xl font-bold">$99</div>
                  <div className="text-[10px] uppercase tracking-widest text-white/30">Lifetime Access</div>
                </div>
              </div>

              <div className="mb-6">
                <h3 className="text-lg font-medium text-[#F0F0F0]">Complete Payment</h3>
                <p className="text-[10px] uppercase tracking-widest text-white/40 mt-1">Binance USDT (TRC20)</p>
              </div>

              <div className="space-y-6 max-w-sm">
                <div className="flex items-center gap-4">
                  <div className="w-20 h-20 bg-white flex items-center justify-center rounded-xl shrink-0 p-1">
                     <QRCode value={walletAddress} size={256} className="w-full h-full" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <div className="text-[10px] uppercase tracking-widest text-white/40 mb-1">Send to</div>
                    <div className="flex items-center gap-2">
                      <code className="text-xs font-mono text-cyan-400 truncate">{walletAddress}</code>
                      <button onClick={handleCopy} className="p-1 text-white/40 hover:text-white transition-colors">
                        {isCopied ? <CheckCircle2 className="w-4 h-4 text-emerald-400" /> : <Copy className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="pt-2 space-y-4">
                  <button 
                    onClick={handleWhatsApp}
                    className="w-full py-4 bg-emerald-500 hover:bg-emerald-400 text-black font-bold uppercase tracking-[0.2em] text-xs rounded-xl transition-all shadow-[0_0_30px_-10px_rgba(16,185,129,0.5)] flex justify-center items-center gap-2"
                  >
                    I Have Paid
                  </button>
                  <p className="text-[9px] text-center text-white/30 uppercase tracking-widest leading-loose">
                    After payment, send proof and transaction ID on WhatsApp for manual verification.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)]"></div>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/70">Secured Payment</span>
              </div>
              <div className="p-4 bg-white/5 border border-white/10 rounded-2xl flex items-center gap-3">
                <div className="w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>
                <span className="text-[10px] uppercase tracking-widest font-medium text-white/70">Manual Validation</span>
              </div>
            </div>
          </div>
        </section>

        {/* --- 3. FEATURES SECTION --- */}
        <section className="py-16">
          <div className="text-center mb-12">
            <h2 className="text-2xl font-display text-white mb-2">Designed for Clarity</h2>
            <p className="text-neutral-500 text-sm">Remove the noise from your charts.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <FeatureCard 
              icon={<Crosshair />}
              title="Clean Signals"
              desc="Precise Buy & Sell indications based on rigid market structure logic."
            />
            <FeatureCard 
              icon={<ShieldCheck />}
              title="No Repaint"
              desc="What you see on a closed candle is final. Our algorithm does not hide mistakes."
            />
            <FeatureCard 
              icon={<Settings2 />}
              title="Easy Setup"
              desc="Built natively for TradingView. Add to your chart in seconds."
            />
            <FeatureCard 
              icon={<LineChart />}
              title="Market Structure"
              desc="Identifies key swing highs and lows automatically for ultimate context."
            />
            <FeatureCard 
              icon={<Zap />}
              title="Real-Time Alerts"
              desc="Set up custom TradingView alerts so you never miss a prime setup."
            />
            <FeatureCard 
              icon={<Activity />}
              title="User Friendly"
              desc="Minimal interface designed not to clutter your technical analysis workspace."
            />
          </div>
        </section>
        
        {/* --- 4. TRUST & CONTACT & SOCIALS (FOOTER) --- */}
        <footer className="pt-16 pb-8 mt-16 flex flex-col items-center bg-black/20 backdrop-blur-md px-12 border border-white/5 rounded-3xl z-10 gap-8">
          <div className="w-full grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-4 items-start md:items-center border-b border-white/10 pb-8">
            <div className="space-y-2 text-center md:text-left">
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">Verification</div>
              <div className="text-[11px] font-medium text-white">Manual Approval <span className="text-emerald-500 ml-1">● Fast</span></div>
            </div>
            
            <div className="space-y-4 text-center">
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">Direct Contact</div>
              <div className="flex flex-col items-center gap-3">
                <a href={`https://wa.me/${whatsappNumber}`} target="_blank" rel="noopener noreferrer" className="flex items-center gap-2 text-xs text-white/70 hover:text-emerald-400 transition-colors">
                  <MessageCircle className="w-4 h-4" />
                  +62 851-2270-2854
                </a>
                <a href="mailto:daywithomer@gmail.com" className="flex items-center gap-2 text-xs text-white/70 hover:text-emerald-400 transition-colors">
                  <Mail className="w-4 h-4" />
                  daywithomer@gmail.com
                </a>
              </div>
            </div>

            <div className="space-y-2 text-center md:text-right">
              <div className="text-[9px] uppercase tracking-[0.2em] text-white/30">Support</div>
              <div className="text-[11px] font-medium text-white">Lifetime Updates</div>
            </div>
          </div>
          
          <div className="w-full flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-[10px] text-white/30">
              © {new Date().getFullYear()} Day With Omer.
            </div>
            <div className="flex items-center gap-4">
              <SocialLink href="https://www.tiktok.com/@_daywithomer?_r=1&_t=ZS-96HmOyWecsf" label="TikTok" 
                icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-1-.05A6.33 6.33 0 0 0 5 20.1a6.34 6.34 0 0 0 10.86-4.43v-7a8.16 8.16 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1-.1z"/></svg>} 
              />
              <SocialLink href="https://www.instagram.com/_daywithomer?utm_source=qr&igsh=NjhxeHg3cWJ3YXZ1" label="Instagram" 
                icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2m-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6m9.65 1.5a1.25 1.25 0 0 1 1.25 1.25A1.25 1.25 0 0 1 17.25 8 1.25 1.25 0 0 1 16 6.75a1.25 1.25 0 0 1 1.25-1.25M12 7a5 5 0 0 1 5 5 5 5 0 0 1-5 5 5 5 0 0 1-5-5 5 5 0 0 1 5-5m0 2a3 3 0 0 0-3 3 3 3 0 0 0 3 3 3 3 0 0 0 3-3 3 3 0 0 0-3-3z"/></svg>} 
              />
              <SocialLink href="https://discord.gg/x2dDUAHC" label="Discord" 
                icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.3698a19.7913 19.7913 0 00-4.8851-1.5152.0741.0741 0 00-.0785.0371c-.211.3753-.4447.8648-.6083 1.2495-1.8447-.2762-3.68-.2762-5.4868 0-.1636-.3933-.4058-.8742-.6177-1.2495a.077.077 0 00-.0785-.037 19.7363 19.7363 0 00-4.8852 1.515.0699.0699 0 00-.0321.0277C.5334 9.0458-.319 13.5799.0992 18.0578a.0824.0824 0 00.0312.0561c2.0528 1.5076 4.0413 2.4228 5.9929 3.0294a.0777.0777 0 00.0842-.0276c.4616-.6304.8731-1.2952 1.226-1.9942a.076.076 0 00-.0416-.1057c-.6528-.2476-1.2743-.5495-1.8722-.8923a.077.077 0 01-.0076-.1277c.1258-.0943.2517-.1923.3718-.2914a.0743.0743 0 01.0776-.0105c3.9278 1.7933 8.18 1.7933 12.0614 0a.0739.0739 0 01.0785.0095c.1202.099.246.1981.3728.2924a.077.077 0 01-.0066.1276 12.2986 12.2986 0 01-1.873.8914.0766.0766 0 00-.0407.1067c.3604.698.7719 1.3628 1.225 1.9932a.076.076 0 00.0842.0286c1.961-.6067 3.9495-1.5219 6.0023-3.0294a.077.077 0 00.0313-.0552c.5004-5.177-.8382-9.6739-3.5485-13.6604a.061.061 0 00-.0312-.0286zM8.02 15.3312c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9555-2.4189 2.157-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.9555 2.4189-2.1569 2.4189zm7.9748 0c-1.1825 0-2.1569-1.0857-2.1569-2.419 0-1.3332.9554-2.4189 2.1569-2.4189 1.2108 0 2.1757 1.0952 2.1568 2.419 0 1.3333-.946 2.4189-2.1568 2.4189Z"/></svg>}
              />
              <SocialLink href="https://www.linkedin.com/in/daywithomer" label="LinkedIn" 
                icon={<svg className="w-4 h-4" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.606 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.924 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>}
              />
            </div>
          </div>
        </footer>

      </div>
    </div>
  );
}

function FeatureCard({ icon, title, desc }: { icon: React.ReactNode, title: string, desc: string }) {
  return (
    <div className="p-6 bg-white/5 border border-white/10 rounded-2xl flex flex-col gap-3 group">
      <div className="flex items-center gap-3">
        <div className="w-2 h-2 rounded-full bg-cyan-500 shadow-[0_0_8px_rgba(6,182,212,1)] group-hover:bg-emerald-500 group-hover:shadow-[0_0_8px_rgba(16,185,129,1)] transition-colors"></div>
        <span className="text-[10px] uppercase tracking-widest font-medium text-white">{title}</span>
      </div>
      <p className="text-white/40 text-xs leading-relaxed">{desc}</p>
    </div>
  );
}

function SocialLink({ href, icon, label }: { href: string, icon: React.ReactNode, label: string }) {
  return (
    <a 
      href={href} 
      target="_blank" 
      rel="noopener noreferrer"
      aria-label={label}
      className="w-10 h-10 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-neutral-400 hover:text-white hover:bg-white/10 transition-all hover:scale-110"
    >
      {icon}
    </a>
  );
}
