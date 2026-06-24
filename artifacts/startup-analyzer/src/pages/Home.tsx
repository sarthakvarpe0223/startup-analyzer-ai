import { useState, useEffect, useRef } from "react";
import { motion, useInView } from "framer-motion";
import { 
  Zap, 
  ArrowRight, 
  CheckCircle2, 
  Target, 
  TrendingUp, 
  ShieldAlert, 
  Lightbulb, 
  MessageSquare,
  BarChart,
  Globe,
  Users
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// -- COMPONENTS --

const FadeIn = ({ children, delay = 0, className = "" }: { children: React.ReactNode, delay?: number, className?: string }) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-50px" });
  
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
      transition={{ duration: 0.6, delay, ease: "easeOut" }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

export default function Home() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">("idle");
  const [progressMsg, setProgressMsg] = useState("");
  
  const inputRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = () => {
    if (!idea.trim()) return;
    setStatus("analyzing");
    
    // Smooth scroll to input section
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
    
    const messages = [
      "Analyzing market size...",
      "Evaluating competition...",
      "Identifying growth levers...",
      "Generating insights..."
    ];
    
    let i = 0;
    setProgressMsg(messages[0]);
    
    const interval = setInterval(() => {
      i++;
      if (i < messages.length) {
        setProgressMsg(messages[i]);
      } else {
        clearInterval(interval);
        setTimeout(() => setStatus("complete"), 600);
      }
    }, 600);
  };

  const handleReset = () => {
    setIdea("");
    setStatus("idle");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">
      
      {/* NAVBAR */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-lg tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-primary/20 flex items-center justify-center text-primary">
              <Zap size={18} fill="currentColor" />
            </div>
            Startup Analyzer AI
          </div>
          <Button onClick={scrollToInput} variant="outline" className="hidden sm:flex border-white/10 hover:bg-white/5 rounded-full px-6">
            Try for free
          </Button>
        </div>
      </header>

      {/* HERO SECTION */}
      <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-grid-pattern opacity-30 pointer-events-none" />
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[600px] h-[600px] bg-primary/20 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="absolute top-40 left-1/4 w-72 h-72 bg-purple-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob pointer-events-none" />
        <div className="absolute top-40 right-1/4 w-72 h-72 bg-blue-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute -bottom-20 left-1/2 -translate-x-1/2 w-72 h-72 bg-pink-600/30 rounded-full mix-blend-screen filter blur-[80px] animate-blob animation-delay-4000 pointer-events-none" />

        <div className="container mx-auto px-6 relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full glass-card text-sm font-medium text-primary mb-6 border-primary/20">
              <span className="relative flex h-2 w-2">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75"></span>
                <span className="relative inline-flex rounded-full h-2 w-2 bg-primary"></span>
              </span>
              YC S24 Waitlist Open
            </div>
          </FadeIn>
          
          <FadeIn delay={0.1}>
            <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight max-w-4xl mx-auto leading-[1.1] mb-6">
              Validate Your Startup Before You Waste <span className="text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">Months Building It</span>
            </h1>
          </FadeIn>
          
          <FadeIn delay={0.2}>
            <p className="text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto mb-10 leading-relaxed">
              Get brutal AI feedback, discover weaknesses, uncover opportunities, and improve your startup idea instantly.
            </p>
          </FadeIn>
          
          <FadeIn delay={0.3} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Button 
              size="lg" 
              onClick={scrollToInput}
              className="rounded-full px-8 py-6 text-lg bg-gradient-to-r from-primary to-blue-600 hover:from-primary/90 hover:to-blue-600/90 shadow-[0_0_40px_-10px_rgba(124,58,237,0.5)] transition-all hover:scale-105"
            >
              Analyze Startup <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
            <Button 
              variant="ghost" 
              size="lg" 
              onClick={scrollToInput}
              className="rounded-full px-8 py-6 text-lg hover:bg-white/5 border-transparent hover:border-white/10"
            >
              See example analysis ↓
            </Button>
          </FadeIn>

          <FadeIn delay={0.5} className="mt-16 pt-8 border-t border-white/5 max-w-3xl mx-auto flex flex-col items-center">
            <p className="text-sm text-muted-foreground mb-4 uppercase tracking-widest font-semibold">Trusted by 12,000+ founders</p>
            <div className="flex -space-x-4">
              {[1, 2, 3, 4, 5].map((i) => (
                <div key={i} className="w-12 h-12 rounded-full border-2 border-background bg-muted flex items-center justify-center overflow-hidden">
                  <img src={`https://i.pravatar.cc/150?img=${i + 10}`} alt={`Founder ${i}`} className="w-full h-full object-cover" />
                </div>
              ))}
            </div>
          </FadeIn>
        </div>
      </section>

      {/* INPUT SECTION */}
      <section ref={inputRef} className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              {/* Glow accent */}
              <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50" />
              
              <h2 className="text-3xl font-bold mb-6">Describe Your Startup Idea</h2>
              <Textarea 
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Example: AI-powered meal planning app for college students that learns your taste preferences, dietary restrictions, and budget to generate weekly grocery lists and simple recipes..."
                className="min-h-[180px] text-lg p-6 bg-black/40 border-white/10 focus-visible:ring-primary/50 focus-visible:border-primary rounded-xl resize-y"
                data-testid="input-startup-idea"
                disabled={status !== "idle"}
              />
              
              <div className="mt-6 flex justify-between items-center">
                <div className="text-sm text-muted-foreground hidden sm:block">
                  Press <kbd className="px-2 py-1 bg-white/10 rounded-md text-xs font-mono">⌘ Enter</kbd> to analyze
                </div>
                
                {status === "idle" && (
                  <Button 
                    size="lg" 
                    onClick={handleAnalyze}
                    disabled={!idea.trim()}
                    data-testid="button-analyze"
                    className="w-full sm:w-auto rounded-full px-8 py-6 text-lg bg-white text-black hover:bg-gray-200 transition-transform hover:scale-105"
                  >
                    Analyze Startup <Zap className="ml-2 h-5 w-5" />
                  </Button>
                )}
                
                {status === "analyzing" && (
                  <div className="w-full sm:w-auto flex items-center gap-4 bg-primary/10 border border-primary/20 px-8 py-4 rounded-full text-primary">
                    <div className="w-5 h-5 border-2 border-primary border-t-transparent rounded-full animate-spin" />
                    <span className="font-medium animate-pulse">{progressMsg}</span>
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* RESULTS SECTION */}
      {status === "complete" && (
        <section data-testid="section-results" className="py-12 pb-24 relative z-10">
          <div className="container mx-auto px-6 max-w-6xl">
            <motion.div 
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            >
              <div className="mb-12 flex flex-col items-center text-center">
                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 mb-6">
                  <CheckCircle2 size={18} /> Analysis Complete
                </div>
                <h2 className="text-4xl font-bold mb-4">Your Startup Intelligence Report</h2>
                <p className="text-muted-foreground text-lg max-w-2xl">Based on our evaluation of market dynamics, typical failure modes, and current trends.</p>
              </div>

              {/* Main Score */}
              <div className="flex justify-center mb-16">
                <div className="relative flex flex-col items-center justify-center w-64 h-64 rounded-full glass-card border-primary/30 shadow-[0_0_60px_-15px_rgba(124,58,237,0.3)]">
                  <svg className="absolute inset-0 w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="4" className="text-white/5" />
                    <circle cx="50" cy="50" r="46" fill="transparent" stroke="currentColor" strokeWidth="4" strokeDasharray="289" strokeDashoffset="63" strokeLinecap="round" className="text-primary transition-all duration-1000 ease-out" />
                  </svg>
                  <span className="text-6xl font-black tabular-nums tracking-tighter">78<span className="text-2xl text-muted-foreground font-medium">/100</span></span>
                  <span className="mt-2 text-primary font-semibold tracking-wide uppercase text-sm">Strong Potential</span>
                </div>
              </div>

              {/* Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {/* Card 1 */}
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-red-500 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4 text-red-400">
                    <ShieldAlert size={24} />
                    <h3 className="font-bold text-lg">Biggest Weakness</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">Customer acquisition cost in the college segment is notoriously high. Students churn aggressively after graduation. Monetization via freemium is risky without a clear upsell path.</p>
                </div>

                {/* Card 2 */}
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-green-500 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4 text-green-400">
                    <Target size={24} />
                    <h3 className="font-bold text-lg">Biggest Opportunity</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">The $12B meal kit market is underserving budget-conscious young adults. A mobile-first, AI-personalized approach with social sharing ('cook with a friend') could dominate the Gen Z segment.</p>
                </div>

                {/* Card 3 */}
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-orange-500 hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4 text-orange-400">
                    <Globe size={24} />
                    <h3 className="font-bold text-lg">Competitive Threat</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">HelloFresh and Mealime have large user bases. Your differentiator must be hyper-personalization + cost efficiency. Risk: a big player could copy your AI layer in 6 months.</p>
                </div>

                {/* Card 4 */}
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-primary hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex items-center gap-3 mb-4 text-primary">
                    <Lightbulb size={24} />
                    <h3 className="font-bold text-lg">Improved Version</h3>
                  </div>
                  <p className="text-muted-foreground leading-relaxed">Pivot to a 'study house meal planning' model — target college houses of 4-6 people sharing grocery costs. Group buying reduces CAC and creates natural retention through social accountability.</p>
                </div>

                {/* Card 5 */}
                <div className="glass-card p-6 rounded-2xl border-l-4 border-l-blue-500 hover:-translate-y-1 transition-transform duration-300 lg:col-span-2">
                  <div className="flex items-center gap-3 mb-4 text-blue-400">
                    <MessageSquare size={24} />
                    <h3 className="font-bold text-lg">Marketing Angle</h3>
                  </div>
                  <div className="space-y-4">
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Landing Page Headline</span>
                      <p className="text-xl font-bold mt-1 text-white">"The Smartest Way for College Houses to Eat Well Without Going Broke"</p>
                    </div>
                    <div>
                      <span className="text-xs text-muted-foreground uppercase font-bold tracking-wider">Elevator Pitch</span>
                      <p className="text-muted-foreground mt-1">We're the AI meal planner that helps college students eat healthy on $30/week. Unlike meal kits, we work with what's already in your area's grocery stores. 3,000 students are on our waitlist.</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Action Bar */}
              <div className="mt-16 flex justify-center">
                <Button 
                  variant="outline" 
                  size="lg" 
                  onClick={handleReset}
                  data-testid="button-reset"
                  className="rounded-full px-8 border-white/10 hover:bg-white/5 hover:text-white gap-2"
                >
                  <Zap size={18} />
                  Reset & Analyze Another Idea
                </Button>
              </div>
            </motion.div>
          </div>
        </section>
      )}

      {/* FEATURES SECTION */}
      <section className="py-24 bg-black/40 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-4">Everything You Need to Validate Faster</h2>
            <p className="text-muted-foreground text-lg max-w-2xl mx-auto">Stop guessing and start building with confidence. Our AI models are trained on thousands of successful (and failed) startups.</p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <FadeIn delay={0.1}>
              <div className="glass-card p-8 rounded-3xl h-full group hover:border-primary/50 transition-colors duration-500">
                <div className="w-12 h-12 bg-primary/20 rounded-2xl flex items-center justify-center text-primary mb-6 group-hover:scale-110 transition-transform">
                  <Zap size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Instant Analysis</h3>
                <p className="text-muted-foreground leading-relaxed">Get comprehensive feedback in under 3 seconds. No waiting, no forms, no calls. Iterate on your idea in real-time.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass-card p-8 rounded-3xl h-full group hover:border-blue-500/50 transition-colors duration-500">
                <div className="w-12 h-12 bg-blue-500/20 rounded-2xl flex items-center justify-center text-blue-400 mb-6 group-hover:scale-110 transition-transform">
                  <BarChart size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Market Validation</h3>
                <p className="text-muted-foreground leading-relaxed">Understand your total addressable market and where you fit in the competitive landscape before writing a single line of code.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="glass-card p-8 rounded-3xl h-full group hover:border-orange-500/50 transition-colors duration-500">
                <div className="w-12 h-12 bg-orange-500/20 rounded-2xl flex items-center justify-center text-orange-400 mb-6 group-hover:scale-110 transition-transform">
                  <Globe size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Competitive Insights</h3>
                <p className="text-muted-foreground leading-relaxed">Know exactly who you're up against and how to position yourself to win. Find the gaps in existing solutions.</p>
              </div>
            </FadeIn>
            <FadeIn delay={0.4}>
              <div className="glass-card p-8 rounded-3xl h-full group hover:border-green-500/50 transition-colors duration-500">
                <div className="w-12 h-12 bg-green-500/20 rounded-2xl flex items-center justify-center text-green-400 mb-6 group-hover:scale-110 transition-transform">
                  <TrendingUp size={24} />
                </div>
                <h3 className="text-xl font-bold mb-3">Growth Opportunities</h3>
                <p className="text-muted-foreground leading-relaxed">Uncover hidden angles, underserved segments, and viral growth loops that you might have missed in your initial brainstorming.</p>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight">Founders who moved faster</h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <FadeIn delay={0.1}>
              <div className="glass-card p-8 rounded-2xl h-full flex flex-col">
                <div className="flex gap-1 text-primary mb-6">
                  {[1,2,3,4,5].map(i => <Zap key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg leading-relaxed mb-8 flex-grow">"I killed a bad idea before spending 6 months on it. Best 5 minutes I've spent this year."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=11" alt="Avatar" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">@jordanmkts</p>
                    <p className="text-xs text-muted-foreground">Founder</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.2}>
              <div className="glass-card p-8 rounded-2xl h-full flex flex-col">
                <div className="flex gap-1 text-primary mb-6">
                  {[1,2,3,4,5].map(i => <Zap key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg leading-relaxed mb-8 flex-grow">"The competitive threat analysis alone saved us from entering a dying market."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=5" alt="Avatar" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">@priyanka_vc</p>
                    <p className="text-xs text-muted-foreground">Startup Advisor</p>
                  </div>
                </div>
              </div>
            </FadeIn>
            <FadeIn delay={0.3}>
              <div className="glass-card p-8 rounded-2xl h-full flex flex-col">
                <div className="flex gap-1 text-primary mb-6">
                  {[1,2,3,4,5].map(i => <Zap key={i} size={16} fill="currentColor" />)}
                </div>
                <p className="text-lg leading-relaxed mb-8 flex-grow">"Showed this to my co-founder and we pivoted on the spot. Brutal but necessary."</p>
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-muted overflow-hidden">
                    <img src="https://i.pravatar.cc/150?img=12" alt="Avatar" />
                  </div>
                  <div>
                    <p className="font-medium text-sm">@tomcodes</p>
                    <p className="text-xs text-muted-foreground">YC S23</p>
                  </div>
                </div>
              </div>
            </FadeIn>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer className="border-t border-white/5 bg-black py-12 relative z-10">
        <div className="container mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2 font-bold text-xl tracking-tight mb-4">
                <Zap size={20} className="text-primary" fill="currentColor" />
                Startup Analyzer AI
              </div>
              <p className="text-muted-foreground max-w-sm">
                AI-powered startup validation for the builders who move fast. Don't code before you know.
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Product</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Features</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Pricing</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Changelog</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-4 text-white">Legal</h4>
              <ul className="space-y-3 text-sm text-muted-foreground">
                <li><a href="#" className="hover:text-primary transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Terms of Service</a></li>
                <li><a href="#" className="hover:text-primary transition-colors">Contact</a></li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col md:flex-row items-center justify-between gap-4 text-sm text-muted-foreground">
            <p>© {new Date().getFullYear()} Startup Analyzer AI. All rights reserved.</p>
            <div className="flex items-center gap-6">
              <a href="#" className="hover:text-white transition-colors">Twitter</a>
              <a href="#" className="hover:text-white transition-colors">GitHub</a>
              <a href="#" className="hover:text-white transition-colors">LinkedIn</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
