
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { speakBiography } from './services/geminiService';
import { GoldButton } from './components/GoldButton';

const ARTIST_DATA = {
  name: "AHMED OSMAN",
  workTitle: "BANAT BAHRI",
  portraitUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuAMRGXbibi-WOXb-QAwtEDER1QvMlv2Xx-xvyiQNGo9uaaB9jqoUJZPKoJ0uzHs-RBzqaadU0aqzCP22cQV4jIQ1iQchkGXT2fkW0NxydD4dOp0X9OJi4q27jqLcC1ckDpjuRA0iHNYGky1jreMxoOizEvnARS6NFivVYZtls_CZy8NFpbs_SXS8D4PwnU9xz2bHhX0xZSK50jVjEc8hMWflA1oBhRX5A3ruuJpeETSZlJ6KyNwBTvemdPQSnDWF0JtBR9ids_ozuhb",
  sculptureUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuBWsjIRhRC_tD-d4Xzdz-Xt8lIMWmLXBTVqV9itYjkle29jxMyAfFn9BCpuk-iUj5qgbRuKybIj51s5ozp3E31XNTjzbmiIw2epJaekqVElwD2NJLug3--VySsQQQUf0didr8kby-fb-HPZAMg8natONzMn25MMmiuKiFy2YAgGHolylTqeFzX-GB8HdEWnAczePGBSuSnkhvoe6A336fqBmtLs6THtcM5OLzSAw9sCsPsrzX228PPdcPnUILBi2UbCK2kcvwVS9FAA",
  logoUrl: "https://lh3.googleusercontent.com/aida-public/AB6AXuCPjsYi7QgexJHPyYT5xKsn4w_L5WsjDm1CwMJ41BnocljDX1aESLQd5LuWs1JTDKVcjXG-qHtBWeY4YSLuJXctebWjqpSaqHZLJf44DDW_nNcNzbeXWom_P_sN8W53iotSFA5W6z4qdBlfEPE-AkyVkfPNVztHXqt8jOQC_LPRmOX4mqxAO-KANmNFTApB26AyZ0ZB_0aYyYvA9CyWDglZMXzNRXWC6x79MwHuNc_bdYtT3V80NyKlWvhf0Kdt4wBRv55VRDCCi8C7",
  biography: [
    "ولد أحمد عثمان في 8 يوليو 1907 وتوفي في 13 نوفمبر 1970. حصل على تعليمه في القاهرة، وتخرج بمرتبة الشرف من المدرسة المصرية للفنون والزخرفة عام 1927.",
    "حصل على دبلوم النحت من أكاديمية الفنون الجميلة في روما عام 1930، تلاها دكتوراه في النحت من نفس الأكاديمية عام 1932.",
    "عُين مدرساً للنحت في كلية الفنون التطبيقية من 1933 إلى 1937، ثم انتقل إلى كلية الفنون الجميلة بالقاهرة حيث ترأس قسم النحت لمدة عشرين عاماً.",
    "تتميز أعمال عثمان بلمسة إيطالية وتأثر بالفن المصري القديم. إن أي تأريخ للنحت المصري الحديث لابد أن يذكر أحمد عثمان الذي كان له حضور قوي ومتعدد الأوجه."
  ],
  highlight: "تعتبر منحوتة 'بنات بحري' شهادة على ارتباط عثمان العميق بروح الإسكندرية، حيث تجسد أناقة وقوة نسائها في برونز خالد.",
  importantWorks: [
    { title: "نزهة النفوس", year: "1935", description: "قطعة رخامية غنائية تصور الرشاقة والحركة." },
    { title: "الجندي المجهول", year: "1954", description: "تصميم صرحي يحتفي بالصمود الوطني." },
    { title: "نقش منارة الإسكندرية", year: "1940", description: "نحت بارز مفصل مستوحى من التراث اليوناني الروماني." }
  ],
  awards: [
    "جائزة الدولة التشجيعية في الفنون (1958)",
    "وسام الاستحقاق من الطبقة الأولى (1960)",
    "الجائزة الكبرى في بينالي الإسكندرية (1955)",
    "الجائزة الأولى في النحت، صالون القاهرة (1932)"
  ]
};

interface ModalProps {
  title: string;
  children?: React.ReactNode;
  onClose: () => void;
}

const Modal: React.FC<ModalProps> = ({ title, children, onClose }) => (
  <motion.div 
    initial={{ opacity: 0 }} 
    animate={{ opacity: 1 }} 
    exit={{ opacity: 0 }}
    className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-museum-navy/95 backdrop-blur-md"
  >
    <motion.div 
      initial={{ scale: 0.9, y: 30 }}
      animate={{ scale: 1, y: 0 }}
      exit={{ scale: 0.9, y: 30 }}
      className="bg-[#0A1A2A] border border-museum-gold/40 max-w-2xl w-full max-h-[85vh] overflow-y-auto p-8 rounded-sm shadow-[0_0_50px_rgba(196,154,80,0.2)] relative"
    >
      <button onClick={onClose} className="absolute top-4 right-4 text-museum-gold hover:text-white transition-colors p-2">
        <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
      <h2 className="text-3xl font-serif text-museum-gold mb-8 border-b border-museum-gold/20 pb-4 tracking-widest uppercase text-center">
        {title}
      </h2>
      <div className="custom-scrollbar">
        {children}
      </div>
    </motion.div>
  </motion.div>
);

const App: React.FC = () => {
  const [showTitles, setShowTitles] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [activeModal, setActiveModal] = useState<'works' | 'awards' | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const bioRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTitles(true), 800);
    return () => clearTimeout(timer);
  }, []);

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!containerRef.current) return;
    const rect = containerRef.current.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    setMousePos({ x, y });
  };

  const handleSpeak = async () => {
    if (isSpeaking) return;
    setIsSpeaking(true);
    
    bioRef.current?.scrollIntoView({ behavior: 'smooth', block: 'center' });

    const textToSpeak = ARTIST_DATA.biography.join(' ');
    const source = await speakBiography(textToSpeak);
    if (source) {
      source.onended = () => setIsSpeaking(false);
    } else {
      setIsSpeaking(false);
    }
  };

  return (
    <div 
      className="min-h-screen flex flex-col font-sans selection:bg-museum-gold selection:text-museum-navy"
      ref={containerRef}
      onMouseMove={handleMouseMove}
    >
      {/* Header */}
      <header className="w-full border-b border-museum-gold/30 sticky top-0 bg-museum-navy/90 backdrop-blur-md z-40">
        <div className="container mx-auto px-6 py-4 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-4 cursor-pointer group" onClick={() => window.scrollTo({top: 0, behavior: 'smooth'})}>
            <img 
              alt="Logo" 
              className="h-14 w-auto object-contain transition-transform group-hover:scale-105" 
              src={ARTIST_DATA.logoUrl} 
            />
            <div className="border-l border-museum-gold/50 pl-3">
              <h2 className="text-museum-gold font-serif text-[10px] md:text-xs tracking-[0.2em] leading-tight">
                ALEXANDRIA UNIVERSITY<br/>
                <span className="text-white/80 font-light">FACULTY OF FINE ARTS</span> MUSEUM
              </h2>
            </div>
          </div>
          <nav>
            <ul className="flex gap-6 md:gap-10 text-xs md:text-sm tracking-[0.2em] font-light">
              {['HOME', 'ABOUT', 'EXHIBITIONS', 'CONTACT'].map((item) => (
                <li key={item}>
                  <a 
                    href="#" 
                    className={`uppercase transition-all duration-300 hover:text-museum-gold relative py-1 block ${item === 'EXHIBITIONS' ? 'text-museum-gold font-bold' : 'text-gray-400'}`}
                  >
                    {item}
                    {item === 'EXHIBITIONS' && <motion.div layoutId="underline" className="absolute bottom-0 left-0 right-0 h-[1px] bg-museum-gold" />}
                  </a>
                </li>
              ))}
            </ul>
          </nav>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-grow container mx-auto px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-16">
          
          {/* Left Sidebar: Biography */}
          <aside className="lg:col-span-1 space-y-8" ref={bioRef}>
            <div className="w-full border-b border-museum-gold/30 pb-3">
              <h2 className="text-museum-gold text-2xl font-serif tracking-[0.2em]">BIOGRAPHY</h2>
            </div>
            <motion.div 
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2, ease: "easeOut" }}
              className="relative w-[160px] h-[160px] mx-auto"
            >
              <img 
                alt="Portrait" 
                className="w-full h-full object-cover rounded-full border-2 border-museum-gold/60 shadow-[0_0_30px_rgba(196,154,80,0.3)] z-10 relative" 
                src={ARTIST_DATA.portraitUrl} 
              />
              <div className="absolute inset-[-10px] rounded-full border border-museum-gold/20 animate-spin-slow"></div>
            </motion.div>
            <div className="text-gray-300 text-sm leading-relaxed text-justify font-light space-y-5">
              {ARTIST_DATA.biography.map((p, i) => (
                <p key={i} className="hover:text-white transition-colors duration-300">{p}</p>
              ))}
            </div>
            <button 
              onClick={handleSpeak}
              disabled={isSpeaking}
              className="w-full flex items-center justify-center gap-3 text-museum-gold hover:text-white transition-all text-xs font-serif italic py-3 px-5 border border-museum-gold/30 rounded-sm bg-museum-gold/5 hover:bg-museum-gold/20 uppercase tracking-widest"
            >
              <svg className={`w-4 h-4 ${isSpeaking ? 'animate-pulse text-white' : ''}`} fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.383 3.076A1 1 0 0110 4v12a1 1 0 01-1.707.707L4.586 13H2a1 1 0 01-1-1V8a1 1 0 011-1h2.586l3.707-3.707a1 1 0 011.09-.217zM14.657 2.929a1 1 0 011.414 0A9.972 9.972 0 0119 10a9.972 9.972 0 01-2.929 7.071 1 1 0 01-1.414-1.414A7.971 7.971 0 0017 10c0-2.21-.894-4.208-2.343-5.657a1 1 0 010-1.414zm-2.829 2.828a1 1 0 011.415 0A5.983 5.983 0 0115 10a5.983 5.983 0 01-1.757 4.243 1 1 0 01-1.415-1.415A3.983 3.983 0 0013 10a3.983 3.983 0 00-1.172-2.828a1 1 0 010-1.415z"/>
              </svg>
              {isSpeaking ? 'Narrating Biography...' : 'Listen to Digital Guide'}
            </button>
          </aside>

          {/* Center Showcase: Main Sculpture */}
          <section className="lg:col-span-2 flex flex-col items-center justify-center min-h-[500px]">
            <div className="h-40 text-center flex flex-col justify-center mb-4">
              <AnimatePresence>
                {showTitles && (
                  <motion.div
                    key="titles"
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 1.5, ease: "easeOut" }}
                  >
                    <h1 className="text-4xl md:text-5xl lg:text-7xl text-museum-gold font-serif font-bold mb-3 tracking-[0.1em] drop-shadow-[0_5px_15px_rgba(0,0,0,0.8)]">
                      {ARTIST_DATA.name}
                    </h1>
                    <motion.h3 
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      transition={{ delay: 1, duration: 1 }}
                      className="text-lg md:text-2xl text-museum-gold-light font-serif tracking-[0.4em] font-light italic opacity-80"
                    >
                      {ARTIST_DATA.workTitle}
                    </motion.h3>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <motion.div 
              className="relative w-full flex justify-center perspective-1000"
              animate={{ 
                rotateX: mousePos.y * 12, 
                rotateY: mousePos.x * 12,
              }}
              transition={{ type: "spring", stiffness: 40, damping: 25 }}
            >
              <div className="absolute inset-0 bg-museum-gold/5 blur-[100px] rounded-full opacity-40 -z-10"></div>
              <img 
                alt="Main Sculpture" 
                className="relative z-10 max-w-full h-auto max-h-[500px] object-contain sculpture-glow drop-shadow-[0_45px_55px_rgba(0,0,0,0.8)]" 
                src={ARTIST_DATA.sculptureUrl} 
              />
              <div className="absolute bottom-[-30px] w-[80%] h-12 bg-black/60 blur-2xl rounded-[100%]"></div>
            </motion.div>
          </section>

          {/* Right Sidebar: Actions */}
          <div className="lg:col-span-1 flex flex-col justify-center gap-6 pt-12 lg:pt-0">
            <GoldButton onClick={() => window.scrollTo({top: bioRef.current?.offsetTop || 0, behavior: 'smooth'})}>
              Biography
            </GoldButton>
            <GoldButton onClick={() => setActiveModal('works')}>
              Most Important Works
            </GoldButton>
            <GoldButton onClick={() => setActiveModal('awards')}>
              Awards & Honors
            </GoldButton>
            
            <div className="mt-8 p-6 border border-museum-gold/10 bg-black/20 rounded-sm">
              <h5 className="text-museum-gold text-[10px] tracking-[0.3em] font-serif uppercase mb-3">Museum Info</h5>
              <p className="text-gray-500 text-[11px] leading-relaxed">
                Collection #107 - Modern Egyptian Sculpture Wing.<br/>
                Donated by the Osman Family Archives.
              </p>
            </div>
          </div>
        </div>
      </main>

      {/* Modals with AnimatePresence */}
      <AnimatePresence>
        {activeModal === 'works' && (
          <Modal key="works-modal" title="Most Important Works" onClose={() => setActiveModal(null)}>
            <div className="space-y-10 py-4">
              {ARTIST_DATA.importantWorks.map((work, idx) => (
                <motion.div 
                  initial={{ opacity: 0, x: -15 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.15 }}
                  key={work.title} 
                  className="group border-l border-museum-gold/20 pl-8 py-2 hover:border-museum-gold transition-all duration-500"
                >
                  <div className="flex justify-between items-center mb-3">
                    <h4 className="text-2xl font-serif text-white group-hover:text-museum-gold transition-colors">{work.title}</h4>
                    <span className="text-museum-gold/50 text-xs font-serif tracking-widest">{work.year}</span>
                  </div>
                  <p className="text-gray-400 text-sm leading-relaxed font-light">{work.description}</p>
                </motion.div>
              ))}
            </div>
          </Modal>
        )}

        {activeModal === 'awards' && (
          <Modal key="awards-modal" title="Awards & Recognitions" onClose={() => setActiveModal(null)}>
            <div className="space-y-8 py-4">
              {ARTIST_DATA.awards.map((award, idx) => (
                <motion.div 
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: idx * 0.1 }}
                  key={award} 
                  className="flex items-center gap-6 p-4 bg-white/5 border border-white/5 rounded-sm hover:bg-museum-gold/10 transition-colors"
                >
                  <div className="text-museum-gold shrink-0">
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M5 3v4M3 5h4M6 17v4m-2-2h4m5-16l2.286 6.857L21 12l-7.714 2.143L11 21l-2.286-6.857L1 12l7.714-2.143L11 3z" />
                    </svg>
                  </div>
                  <span className="text-gray-200 font-serif text-lg leading-tight tracking-wide">{award}</span>
                </motion.div>
              ))}
            </div>
          </Modal>
        )}
      </AnimatePresence>

      {/* Quote Section */}
      <section className="w-full mt-12 mb-20">
        <div className="container mx-auto px-6">
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="relative bg-gradient-to-br from-museum-gold-dark via-museum-gold to-museum-gold-dark p-1 rounded-sm shadow-2xl"
          >
            <div className="bg-museum-navy p-10 md:p-14 relative overflow-hidden">
              <div className="absolute top-[-40px] left-[-20px] text-[15rem] font-serif text-museum-gold/5 leading-none select-none italic pointer-events-none">
                “
              </div>
              <div className="relative z-10 text-center max-w-4xl mx-auto">
                <h4 className="font-serif tracking-[0.5em] text-[10px] mb-6 uppercase text-museum-gold opacity-80">Artist Vision</h4>
                <p className="font-serif text-2xl md:text-4xl font-light leading-relaxed italic text-white drop-shadow-sm">
                  {ARTIST_DATA.highlight}
                </p>
                <div className="mt-8 flex justify-center items-center gap-4">
                  <div className="h-[1px] w-12 bg-museum-gold/30"></div>
                  <span className="text-museum-gold font-serif text-sm tracking-widest uppercase">The Alexandria Collection</span>
                  <div className="h-[1px] w-12 bg-museum-gold/30"></div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black/80 border-t border-museum-gold/10 py-12 mt-auto">
        <div className="container mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-8 mb-8">
            <div className="flex items-center gap-4 grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition-all">
              <img src={ARTIST_DATA.logoUrl} alt="Alexandria University" className="h-12 w-auto" />
              <div className="text-left">
                <span className="block text-white text-[10px] tracking-widest uppercase font-bold">Faculty of Fine Arts</span>
                <span className="block text-gray-500 text-[9px] tracking-widest uppercase">Alexandria University</span>
              </div>
            </div>
            <div className="flex gap-8">
              {['Archive', 'Virtual Tour', 'Donations', 'Contact'].map(link => (
                <a key={link} href="#" className="text-gray-500 hover:text-museum-gold text-[10px] tracking-widest uppercase transition-colors">{link}</a>
              ))}
            </div>
          </div>
          <div className="text-center pt-8 border-t border-white/5">
            <p className="text-gray-600 text-[9px] tracking-[0.4em] uppercase font-light">
              &copy; 2024 Ahmed Osman Heritage Preservation Committee. Designed with reverence.
            </p>
          </div>
        </div>
      </footer>

      <style>{`
        .animate-spin-slow { animation: spin 20s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
        .custom-scrollbar::-webkit-scrollbar { width: 4px; }
        .custom-scrollbar::-webkit-scrollbar-track { background: rgba(255,255,255,0.05); }
        .custom-scrollbar::-webkit-scrollbar-thumb { background: #C49A50; border-radius: 10px; }
      `}</style>
    </div>
  );
};

export default App;
