import { useState, useEffect, useRef } from "react";
import { motion, useInView, AnimatePresence } from "framer-motion";
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
  Users,
  Megaphone,
  RotateCcw,
  Star,
  Swords,
  Trophy,
  Flame,
  Shield,
  TrendingDown,
  Crown,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";

// -- Scroll reveal wrapper --
const FadeIn = ({
  children,
  delay = 0,
  className = "",
}: {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-60px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 28 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 28 }}
      transition={{ duration: 0.65, delay, ease: [0.16, 1, 0.3, 1] }}
      className={className}
    >
      {children}
    </motion.div>
  );
};

// -- Animated circular score --
const ScoreRing = ({ score, label }: { score: number; label: string }) => {
  const [offset, setOffset] = useState(289);
  const radius = 46;
  const circumference = 2 * Math.PI * radius; // ≈ 289

  useEffect(() => {
    const timer = setTimeout(() => {
      setOffset(circumference * (1 - score / 100));
    }, 200);
    return () => clearTimeout(timer);
  }, [score, circumference]);

  return (
    <div className="relative flex items-center justify-center w-52 h-52">
      <svg
        className="absolute inset-0 w-full h-full -rotate-90"
        viewBox="0 0 100 100"
      >
        {/* Track */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="rgba(255,255,255,0.06)"
          strokeWidth="5"
        />
        {/* Progress */}
        <circle
          cx="50"
          cy="50"
          r={radius}
          fill="transparent"
          stroke="url(#scoreGrad)"
          strokeWidth="5"
          strokeDasharray={circumference}
          strokeDashoffset={offset}
          strokeLinecap="round"
          style={{ transition: "stroke-dashoffset 1.4s cubic-bezier(0.16, 1, 0.3, 1)" }}
        />
        <defs>
          <linearGradient id="scoreGrad" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#7c3aed" />
            <stop offset="100%" stopColor="#3b82f6" />
          </linearGradient>
        </defs>
      </svg>
      <div className="flex flex-col items-center">
        <span className="text-5xl font-black tabular-nums leading-none">
          {score}
          <span className="text-xl text-white/40 font-medium">/100</span>
        </span>
        <span className="mt-2 text-sm font-semibold tracking-widest uppercase text-transparent bg-clip-text bg-gradient-to-r from-primary to-blue-400">
          {label}
        </span>
      </div>
    </div>
  );
};

// -- Quality badge --
const Badge = ({
  label,
  color,
}: {
  label: string;
  color: "purple" | "green" | "orange" | "blue";
}) => {
  const styles = {
    purple: "bg-purple-500/10 text-purple-300 border-purple-500/20",
    green: "bg-green-500/10 text-green-300 border-green-500/20",
    orange: "bg-orange-500/10 text-orange-300 border-orange-500/20",
    blue: "bg-blue-500/10 text-blue-300 border-blue-500/20",
  };
  return (
    <span
      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-semibold border tracking-wide ${styles[color]}`}
    >
      {label}
    </span>
  );
};

// -- Loading step indicator --
const LOAD_STEPS = [
  "Analyzing market...",
  "Finding competitors...",
  "Evaluating business model...",
  "Generating recommendations...",
];

// -- Battle Mode steps --
const BATTLE_STEPS = [
  "Analyzing Startup A...",
  "Analyzing Startup B...",
  "Running head-to-head comparison...",
  "Determining the winner...",
];

// -- Battle comparison bar --
const BattleBar = ({
  label,
  scoreA,
  scoreB,
  icon,
  delay,
}: {
  label: string;
  scoreA: number;
  scoreB: number;
  icon: React.ReactNode;
  delay: number;
}) => {
  const [animate, setAnimate] = useState(false);
  useEffect(() => {
    const t = setTimeout(() => setAnimate(true), delay * 1000 + 100);
    return () => clearTimeout(t);
  }, [delay]);

  const winnerA = scoreA >= scoreB;
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: [0.16, 1, 0.3, 1] }}
      className="glass-card rounded-2xl p-5 flex flex-col gap-3"
    >
      <div className="flex items-center gap-2 text-sm font-semibold text-white/70">
        <span className="text-white/40">{icon}</span>
        {label}
      </div>
      <div className="flex items-center gap-3">
        {/* A bar */}
        <div className="flex-1 flex flex-col items-end gap-1">
          <span className={`text-xs font-bold ${winnerA ? "text-violet-400" : "text-white/30"}`}>
            {scoreA}
          </span>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-violet-600 to-violet-400 transition-all duration-1000 ease-out"
              style={{ width: animate ? `${scoreA}%` : "0%" }}
            />
          </div>
        </div>
        <div className="text-xs text-white/20 font-mono w-8 text-center flex-shrink-0">vs</div>
        {/* B bar */}
        <div className="flex-1 flex flex-col items-start gap-1">
          <span className={`text-xs font-bold ${!winnerA ? "text-blue-400" : "text-white/30"}`}>
            {scoreB}
          </span>
          <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
            <div
              className="h-full rounded-full bg-gradient-to-r from-blue-400 to-blue-600 transition-all duration-1000 ease-out"
              style={{ width: animate ? `${scoreB}%` : "0%" }}
            />
          </div>
        </div>
      </div>
    </motion.div>
  );
};

const LoadingSteps = ({ step }: { step: number }) => (
  <div className="w-full sm:w-auto flex flex-col gap-3 py-2">
    {LOAD_STEPS.map((msg, i) => {
      const done = i < step;
      const active = i === step;
      return (
        <div
          key={i}
          className={`flex items-center gap-3 transition-all duration-300 ${
            done ? "opacity-50" : active ? "opacity-100" : "opacity-25"
          }`}
        >
          <div
            className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${
              done
                ? "bg-green-500 border-green-500"
                : active
                ? "border-primary"
                : "border-white/20"
            }`}
          >
            {done ? (
              <CheckCircle2 size={12} className="text-white" />
            ) : active ? (
              <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            ) : null}
          </div>
          <span
            className={`text-sm font-medium ${
              active ? "text-white" : "text-white/50"
            }`}
          >
            {msg}
          </span>
        </div>
      );
    })}
  </div>
);

// -- Result insight card --
const InsightCard = ({
  icon,
  title,
  accent,
  children,
  delay = 0,
  wide = false,
}: {
  icon: React.ReactNode;
  title: string;
  accent: string;
  children: React.ReactNode;
  delay?: number;
  wide?: boolean;
}) => {
  const accentMap: Record<string, string> = {
    red: "border-l-red-500 [&_.icon-wrap]:text-red-400 [&_.icon-wrap]:bg-red-500/10",
    green:
      "border-l-green-500 [&_.icon-wrap]:text-green-400 [&_.icon-wrap]:bg-green-500/10",
    orange:
      "border-l-orange-500 [&_.icon-wrap]:text-orange-400 [&_.icon-wrap]:bg-orange-500/10",
    purple:
      "border-l-purple-500 [&_.icon-wrap]:text-purple-400 [&_.icon-wrap]:bg-purple-500/10",
    blue: "border-l-blue-500 [&_.icon-wrap]:text-blue-400 [&_.icon-wrap]:bg-blue-500/10",
    pink: "border-l-pink-500 [&_.icon-wrap]:text-pink-400 [&_.icon-wrap]:bg-pink-500/10",
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
      className={wide ? "md:col-span-2 lg:col-span-1" : ""}
    >
      <div
        className={`group glass-card-hover p-6 rounded-2xl border-l-4 h-full flex flex-col gap-4 ${accentMap[accent] ?? ""}`}
      >
        <div className="flex items-center gap-3">
          <div className="icon-wrap w-9 h-9 rounded-xl flex items-center justify-center flex-shrink-0 transition-transform duration-300 group-hover:scale-110">
            {icon}
          </div>
          <h3 className="font-bold text-base tracking-tight">{title}</h3>
        </div>
        <div className="text-sm text-white/60 leading-relaxed flex-grow">
          {children}
        </div>
      </div>
    </motion.div>
  );
};

// ============================================================
// PAGE
// ============================================================
export default function Home() {
  const [idea, setIdea] = useState("");
  const [status, setStatus] = useState<"idle" | "analyzing" | "complete">(
    "idle"
  );
  const [loadStep, setLoadStep] = useState(0);

  // Battle Mode state
  const [ideaA, setIdeaA] = useState("");
  const [ideaB, setIdeaB] = useState("");
  const [battleStatus, setBattleStatus] = useState<"idle" | "comparing" | "complete">("idle");
  const [battleStep, setBattleStep] = useState(0);

  const inputRef = useRef<HTMLDivElement>(null);
  const resultsRef = useRef<HTMLDivElement>(null);
  const battleRef = useRef<HTMLDivElement>(null);
  const battleResultsRef = useRef<HTMLDivElement>(null);

  const handleAnalyze = () => {
    if (!idea.trim()) return;
    setStatus("analyzing");
    setLoadStep(0);
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < LOAD_STEPS.length) {
        setLoadStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setStatus("complete");
          setTimeout(() => {
            resultsRef.current?.scrollIntoView({
              behavior: "smooth",
              block: "start",
            });
          }, 300);
        }, 500);
      }
    }, 750);
  };

  const handleReset = () => {
    setIdea("");
    setStatus("idle");
    setLoadStep(0);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleBattle = () => {
    if (!ideaA.trim() || !ideaB.trim()) return;
    setBattleStatus("comparing");
    setBattleStep(0);
    battleRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

    let step = 0;
    const interval = setInterval(() => {
      step++;
      if (step < BATTLE_STEPS.length) {
        setBattleStep(step);
      } else {
        clearInterval(interval);
        setTimeout(() => {
          setBattleStatus("complete");
          setTimeout(() => {
            battleResultsRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });
          }, 300);
        }, 500);
      }
    }, 800);
  };

  const handleBattleReset = () => {
    setIdeaA("");
    setIdeaB("");
    setBattleStatus("idle");
    setBattleStep(0);
  };

  const scrollToInput = () => {
    inputRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  const scrollToBattle = () => {
    battleRef.current?.scrollIntoView({ behavior: "smooth", block: "center" });
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-x-hidden selection:bg-primary/30">

      {/* ── NAVBAR ── */}
      <header className="fixed top-0 left-0 right-0 z-50 glass-nav">
        <div className="container mx-auto px-6 h-16 flex items-center justify-between max-w-7xl">
          <div className="flex items-center gap-2.5 font-bold text-base tracking-tight">
            <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center shadow-lg shadow-primary/30">
              <Zap size={16} fill="white" className="text-white" />
            </div>
            <span>Startup Analyzer <span className="text-primary">AI</span></span>
          </div>
          <div className="hidden sm:flex items-center gap-3">
            <button
              onClick={scrollToBattle}
              className="inline-flex items-center gap-2 px-4 h-9 rounded-full text-sm text-white/50 hover:text-white border border-white/8 hover:border-white/20 transition-all hover:bg-white/5"
            >
              <Swords size={14} />
              Battle Mode
            </button>
            <button
              onClick={scrollToInput}
              className="inline-flex px-5 h-9 items-center rounded-full text-sm bg-white/5 hover:bg-white/10 border border-white/10 text-white transition-all hover:border-white/20 active:scale-95"
            >
              Try for free
            </button>
          </div>
        </div>
      </header>

      {/* ── HERO ── */}
      <section className="relative pt-36 pb-24 md:pt-52 md:pb-36 overflow-hidden">
        <div className="absolute inset-0 bg-grid-pattern opacity-[0.25] pointer-events-none" />
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[700px] h-[700px] bg-primary/15 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute top-48 left-1/4 w-80 h-80 bg-purple-600/20 rounded-full mix-blend-screen filter blur-[90px] animate-blob pointer-events-none" />
        <div className="absolute top-48 right-1/4 w-80 h-80 bg-blue-600/20 rounded-full mix-blend-screen filter blur-[90px] animate-blob animation-delay-2000 pointer-events-none" />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-80 h-80 bg-violet-700/20 rounded-full mix-blend-screen filter blur-[90px] animate-blob animation-delay-4000 pointer-events-none" />

        <div className="container mx-auto px-6 max-w-5xl relative z-10 text-center">
          <FadeIn>
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide text-primary border border-primary/20 bg-primary/5 mb-8">
              <span className="relative flex h-1.5 w-1.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-primary opacity-75" />
                <span className="relative inline-flex rounded-full h-1.5 w-1.5 bg-primary" />
              </span>
              YC S24 Waitlist Open
            </div>
          </FadeIn>

          <FadeIn delay={0.08}>
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-black tracking-[-0.03em] leading-[1.08] mb-7">
              <span className="text-white">Validate Your Startup</span>
              <br />
              <span className="text-white/25 font-extrabold">Before You </span>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-violet-300 to-blue-400">
                Commit.
              </span>
            </h1>
          </FadeIn>

          <FadeIn delay={0.16}>
            <p className="text-lg md:text-xl text-white/50 max-w-2xl mx-auto mb-10 leading-relaxed font-normal">
              Get brutal AI feedback, discover weaknesses, uncover opportunities,
              and improve your startup idea instantly.
            </p>
          </FadeIn>

          <FadeIn delay={0.24} className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <button
              onClick={scrollToInput}
              className="cta-btn inline-flex items-center gap-2 px-8 py-4 rounded-full text-base font-semibold text-white"
              data-testid="button-hero-cta"
            >
              Analyze Startup <ArrowRight size={18} />
            </button>
            <button
              onClick={scrollToInput}
              className="inline-flex items-center gap-1 px-8 py-4 rounded-full text-base text-white/50 hover:text-white/80 transition-colors"
            >
              See example analysis ↓
            </button>
          </FadeIn>

          <FadeIn delay={0.4} className="mt-20 flex flex-col items-center">
            <div className="w-px h-8 bg-gradient-to-b from-transparent to-white/10 mb-6" />
            <p className="text-xs text-white/30 uppercase tracking-[0.2em] font-semibold mb-5">
              Trusted by 12,000+ founders
            </p>
            <div className="flex -space-x-3">
              {[11, 12, 13, 5, 20].map((n, i) => (
                <div
                  key={i}
                  className="w-10 h-10 rounded-full border-2 border-background bg-muted overflow-hidden ring-1 ring-white/10"
                >
                  <img
                    src={`https://i.pravatar.cc/80?img=${n}`}
                    alt=""
                    className="w-full h-full object-cover"
                  />
                </div>
              ))}
              <div className="w-10 h-10 rounded-full border-2 border-background bg-primary/20 flex items-center justify-center text-primary text-xs font-bold ring-1 ring-white/10">
                +12k
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── INPUT SECTION ── */}
      <section ref={inputRef} className="py-20 relative z-10">
        <div className="container mx-auto px-6 max-w-4xl">
          <FadeIn>
            <div className="glass-card rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/60 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-white/5 to-transparent" />

              <div className="mb-6">
                <h2 className="text-2xl font-bold mb-1">Describe Your Startup Idea</h2>
                <p className="text-sm text-white/40">The more detail you provide, the sharper the analysis.</p>
              </div>

              <Textarea
                value={idea}
                onChange={(e) => setIdea(e.target.value)}
                placeholder="Example: AI-powered meal planning app for college students that learns your taste preferences, dietary restrictions, and budget to generate weekly grocery lists and simple recipes..."
                className="min-h-[160px] text-base p-5 bg-black/40 border-white/8 focus-visible:ring-primary/40 focus-visible:border-primary/60 rounded-xl resize-y leading-relaxed text-white/90 placeholder:text-white/20"
                data-testid="input-startup-idea"
                disabled={status !== "idle"}
              />

              <div className="mt-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
                <div className="text-xs text-white/25 hidden sm:block">
                  Press{" "}
                  <kbd className="px-1.5 py-0.5 bg-white/8 rounded text-[10px] font-mono border border-white/10">
                    ⌘ Enter
                  </kbd>{" "}
                  to analyze
                </div>

                {status === "idle" && (
                  <button
                    onClick={handleAnalyze}
                    disabled={!idea.trim()}
                    data-testid="button-analyze"
                    className="cta-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold text-white disabled:opacity-30 disabled:cursor-not-allowed disabled:scale-100"
                  >
                    Analyze Startup <Zap size={16} />
                  </button>
                )}

                {status === "analyzing" && (
                  <LoadingSteps step={loadStep} />
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── RESULTS SECTION ── */}
      <AnimatePresence>
        {status === "complete" && (
          <motion.section
            ref={resultsRef}
            data-testid="section-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="py-8 pb-28 relative z-10"
          >
            <div className="container mx-auto px-6 max-w-6xl">
              {/* Header */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="mb-14 flex flex-col items-center text-center"
              >
                <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-green-500/10 text-green-400 border border-green-500/20 text-sm font-semibold mb-6">
                  <CheckCircle2 size={14} /> Analysis Complete
                </div>
                <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight mb-4">
                  Your Startup Intelligence Report
                </h2>
                <p className="text-white/40 text-base max-w-xl leading-relaxed">
                  Based on evaluation of market dynamics, typical failure modes, and current trends.
                </p>
              </motion.div>

              {/* Score + Badges */}
              <motion.div
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.7, delay: 0.1, ease: [0.16, 1, 0.3, 1] }}
                className="flex flex-col items-center mb-16"
              >
                <div className="glass-card rounded-3xl p-10 md:p-14 flex flex-col items-center gap-8 shadow-[0_0_80px_-20px_rgba(124,58,237,0.25)] w-full max-w-md relative overflow-hidden">
                  <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-primary/50 to-transparent" />
                  <ScoreRing score={78} label="Strong Potential" />
                  {/* Quality Badges */}
                  <div className="flex flex-wrap justify-center gap-2">
                    <Badge label="High Potential" color="purple" />
                    <Badge label="Competitive Market" color="orange" />
                    <Badge label="Strong Differentiation" color="green" />
                    <Badge label="Needs Validation" color="blue" />
                  </div>
                </div>
              </motion.div>

              {/* Insight Cards Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                <InsightCard
                  icon={<ShieldAlert size={18} />}
                  title="Biggest Weakness"
                  accent="red"
                  delay={0.15}
                >
                  Customer acquisition cost in the college segment is notoriously
                  high. Students churn aggressively after graduation.
                  Monetization via freemium is risky without a clear upsell path.
                </InsightCard>

                <InsightCard
                  icon={<Target size={18} />}
                  title="Biggest Opportunity"
                  accent="green"
                  delay={0.22}
                >
                  The $12B meal kit market is underserving budget-conscious young
                  adults. A mobile-first, AI-personalized approach with social
                  sharing ('cook with a friend') could dominate the Gen Z segment.
                </InsightCard>

                <InsightCard
                  icon={<Globe size={18} />}
                  title="Competitive Threat"
                  accent="orange"
                  delay={0.29}
                >
                  HelloFresh and Mealime have large user bases. Your
                  differentiator must be hyper-personalization + cost efficiency.
                  Risk: a big player could copy your AI layer in 6 months.
                </InsightCard>

                <InsightCard
                  icon={<Lightbulb size={18} />}
                  title="Improved Version"
                  accent="purple"
                  delay={0.36}
                >
                  Pivot to a 'study house meal planning' model — target college
                  houses of 4–6 people sharing grocery costs. Group buying reduces
                  CAC and creates natural retention through social accountability.
                </InsightCard>

                <InsightCard
                  icon={<Megaphone size={18} />}
                  title="Landing Page Headline"
                  accent="blue"
                  delay={0.43}
                >
                  <p className="text-white font-semibold text-sm leading-snug mb-2">
                    "The Smartest Way for College Houses to Eat Well Without Going Broke"
                  </p>
                  <p className="text-white/40 text-xs">
                    Tagline: Stop splitting takeout bills. Start eating better for less.
                  </p>
                </InsightCard>

                <InsightCard
                  icon={<MessageSquare size={18} />}
                  title="Elevator Pitch"
                  accent="pink"
                  delay={0.5}
                >
                  We're the AI meal planner that helps college students eat
                  healthy on $30/week. Unlike meal kits, we work with what's
                  already in your area's grocery stores. 3,000 students are on
                  our waitlist.
                </InsightCard>
              </div>

              {/* Reset */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.7, duration: 0.5 }}
                className="mt-14 flex justify-center"
              >
                <button
                  onClick={handleReset}
                  data-testid="button-reset"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-white/50 hover:text-white border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/6 transition-all active:scale-95"
                >
                  <RotateCcw size={14} />
                  Analyze Another Idea
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── BATTLE MODE SECTION ── */}
      <section ref={battleRef} className="py-24 relative z-10 border-t border-white/5">
        {/* Background glow */}
        <div className="absolute inset-0 pointer-events-none overflow-hidden">
          <div className="absolute top-1/2 left-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-violet-700/10 rounded-full blur-[130px]" />
          <div className="absolute top-1/2 right-1/4 -translate-y-1/2 w-[500px] h-[500px] bg-blue-700/10 rounded-full blur-[130px]" />
        </div>

        <div className="container mx-auto px-6 max-w-5xl relative z-10">
          <FadeIn className="text-center mb-12">
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs font-semibold tracking-wide border mb-6 bg-gradient-to-r from-violet-500/10 to-blue-500/10 border-violet-500/20 text-violet-300">
              <Swords size={13} />
              Battle Mode
            </div>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-4">
              Which Idea Wins?
            </h2>
            <p className="text-white/40 text-base max-w-lg mx-auto leading-relaxed">
              Pit two startup ideas head-to-head. Our AI judges market strength, competitive advantage, growth potential, and risk.
            </p>
          </FadeIn>

          {/* Input Arena */}
          <FadeIn delay={0.1}>
            <div className="battle-arena rounded-3xl p-6 md:p-10 relative overflow-hidden">
              <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-violet-500/40 to-transparent" />
              <div className="absolute bottom-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-500/40 to-transparent" />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 md:gap-8">
                {/* Startup A */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-violet-500/20 flex items-center justify-center text-violet-400 text-xs font-black">A</div>
                    <span className="text-sm font-semibold text-white/70">Startup A</span>
                  </div>
                  <Textarea
                    value={ideaA}
                    onChange={(e) => setIdeaA(e.target.value)}
                    placeholder="Describe your first startup idea..."
                    className="min-h-[130px] text-sm p-4 bg-black/40 border-violet-500/20 focus-visible:ring-violet-500/30 focus-visible:border-violet-500/50 rounded-xl resize-none leading-relaxed text-white/85 placeholder:text-white/20"
                    data-testid="input-battle-a"
                    disabled={battleStatus !== "idle"}
                  />
                </div>

                {/* VS divider (mobile: horizontal, desktop: vertical) */}
                <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 z-20 flex-col items-center gap-1">
                  <div className="w-px h-16 bg-gradient-to-b from-transparent to-white/10" />
                  <div className="w-9 h-9 rounded-full battle-vs-badge flex items-center justify-center text-xs font-black tracking-tight">VS</div>
                  <div className="w-px h-16 bg-gradient-to-b from-white/10 to-transparent" />
                </div>
                <div className="md:hidden flex items-center gap-3">
                  <div className="flex-1 h-px bg-white/8" />
                  <span className="text-xs font-black text-white/30 tracking-wider">VS</span>
                  <div className="flex-1 h-px bg-white/8" />
                </div>

                {/* Startup B */}
                <div className="flex flex-col gap-3">
                  <div className="flex items-center gap-2.5 mb-1">
                    <div className="w-7 h-7 rounded-lg bg-blue-500/20 flex items-center justify-center text-blue-400 text-xs font-black">B</div>
                    <span className="text-sm font-semibold text-white/70">Startup B</span>
                  </div>
                  <Textarea
                    value={ideaB}
                    onChange={(e) => setIdeaB(e.target.value)}
                    placeholder="Describe your second startup idea..."
                    className="min-h-[130px] text-sm p-4 bg-black/40 border-blue-500/20 focus-visible:ring-blue-500/30 focus-visible:border-blue-500/50 rounded-xl resize-none leading-relaxed text-white/85 placeholder:text-white/20"
                    data-testid="input-battle-b"
                    disabled={battleStatus !== "idle"}
                  />
                </div>
              </div>

              {/* Compare button / loading */}
              <div className="mt-8 flex flex-col items-center gap-4">
                {battleStatus === "idle" && (
                  <button
                    onClick={handleBattle}
                    disabled={!ideaA.trim() || !ideaB.trim()}
                    data-testid="button-compare"
                    className="battle-cta-btn inline-flex items-center gap-2.5 px-9 py-4 rounded-full text-sm font-bold text-white disabled:opacity-25 disabled:cursor-not-allowed"
                  >
                    <Swords size={17} />
                    Start Battle
                  </button>
                )}

                {battleStatus === "comparing" && (
                  <div className="flex flex-col gap-3 py-1 w-full max-w-xs">
                    {BATTLE_STEPS.map((msg, i) => {
                      const done = i < battleStep;
                      const active = i === battleStep;
                      return (
                        <div key={i} className={`flex items-center gap-3 transition-all duration-300 ${done ? "opacity-45" : active ? "opacity-100" : "opacity-20"}`}>
                          <div className={`flex-shrink-0 w-5 h-5 rounded-full border flex items-center justify-center transition-all duration-300 ${done ? "bg-green-500 border-green-500" : active ? "border-violet-400" : "border-white/20"}`}>
                            {done
                              ? <CheckCircle2 size={11} className="text-white" />
                              : active
                              ? <div className="w-2 h-2 rounded-full bg-violet-400 animate-pulse" />
                              : null}
                          </div>
                          <span className={`text-sm font-medium ${active ? "text-white" : "text-white/50"}`}>{msg}</span>
                        </div>
                      );
                    })}
                  </div>
                )}
              </div>
            </div>
          </FadeIn>
        </div>
      </section>

      {/* ── BATTLE RESULTS ── */}
      <AnimatePresence>
        {battleStatus === "complete" && (
          <motion.section
            ref={battleResultsRef}
            data-testid="section-battle-results"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.5 }}
            className="pb-28 relative z-10"
          >
            <div className="container mx-auto px-6 max-w-5xl">

              {/* Winner banner */}
              <motion.div
                initial={{ opacity: 0, scale: 0.92, y: 24 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="winner-banner rounded-3xl p-8 md:p-12 mb-8 flex flex-col items-center text-center relative overflow-hidden"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/12 via-transparent to-blue-500/8 pointer-events-none" />
                <div className="absolute top-0 inset-x-0 h-px bg-gradient-to-r from-transparent via-blue-400/60 to-transparent" />

                <motion.div
                  initial={{ scale: 0, rotate: -15 }}
                  animate={{ scale: 1, rotate: 0 }}
                  transition={{ duration: 0.6, delay: 0.2, type: "spring", bounce: 0.4 }}
                  className="w-16 h-16 rounded-2xl bg-yellow-500/15 border border-yellow-500/25 flex items-center justify-center text-yellow-400 mb-5"
                >
                  <Trophy size={30} />
                </motion.div>

                <p className="text-xs uppercase tracking-[0.2em] text-white/35 font-semibold mb-2">
                  Battle Winner
                </p>
                <h3 className="text-3xl md:text-4xl font-extrabold tracking-tight mb-3">
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-300 to-blue-500">
                    Startup B
                  </span>{" "}
                  Wins
                </h3>
                <p className="text-white/45 text-sm max-w-md leading-relaxed">
                  Startup B edges ahead with stronger market timing and a more defensible moat. Lower regulatory friction and cleaner unit economics tip the scales decisively.
                </p>

                <div className="mt-6 flex flex-wrap justify-center gap-2">
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-blue-500/10 text-blue-300 border border-blue-500/20">
                    <Crown size={11} /> Winner
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-green-500/10 text-green-300 border border-green-500/20">
                    <TrendingUp size={11} /> Better Unit Economics
                  </span>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-purple-500/10 text-purple-300 border border-purple-500/20">
                    <Shield size={11} /> Stronger Moat
                  </span>
                </div>
              </motion.div>

              {/* Score header row */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.25 }}
                className="flex items-center mb-4 px-1"
              >
                <div className="flex-1" />
                <div className="flex gap-3 mr-1">
                  <div className="flex items-center gap-1.5 text-xs font-bold text-violet-400">
                    <div className="w-2.5 h-2.5 rounded-sm bg-violet-500" /> A
                  </div>
                  <span className="text-white/20 text-xs">vs</span>
                  <div className="flex items-center gap-1.5 text-xs font-bold text-blue-400">
                    B <div className="w-2.5 h-2.5 rounded-sm bg-blue-500" />
                  </div>
                </div>
              </motion.div>

              {/* Comparison bars */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                <BattleBar label="Market Strength" icon={<BarChart size={14} />} scoreA={72} scoreB={84} delay={0.3} />
                <BattleBar label="Competitive Advantage" icon={<Shield size={14} />} scoreA={68} scoreB={79} delay={0.4} />
                <BattleBar label="Growth Potential" icon={<Flame size={14} />} scoreA={81} scoreB={77} delay={0.5} />
                <BattleBar label="Risk Score (lower = better)" icon={<TrendingDown size={14} />} scoreA={62} scoreB={45} delay={0.6} />
              </div>

              {/* Final Verdict card */}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.55, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
                className="glass-card rounded-2xl p-7 border-l-4 border-l-yellow-500 mb-10"
              >
                <div className="flex items-center gap-3 mb-4">
                  <div className="w-9 h-9 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-400 flex-shrink-0">
                    <Star size={17} fill="currentColor" />
                  </div>
                  <h3 className="font-bold text-base tracking-tight">Final Verdict</h3>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">
                  <strong className="text-white">Startup B is the stronger bet</strong> — it addresses a larger, less fragmented market with a product that's harder to copy. Startup A has better growth ceiling but faces a steeper climb to viability.{" "}
                  <span className="text-white/40">If resources are limited, double down on B. If you have 18+ months of runway, A's upside is worth exploring with a lean MVP.</span>
                </p>
              </motion.div>

              {/* Reset battle */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.85, duration: 0.4 }}
                className="flex justify-center"
              >
                <button
                  onClick={handleBattleReset}
                  data-testid="button-battle-reset"
                  className="inline-flex items-center gap-2 px-7 py-3 rounded-full text-sm font-medium text-white/45 hover:text-white border border-white/10 hover:border-white/20 bg-white/3 hover:bg-white/6 transition-all active:scale-95"
                >
                  <RotateCcw size={13} />
                  Run Another Battle
                </button>
              </motion.div>
            </div>
          </motion.section>
        )}
      </AnimatePresence>

      {/* ── FEATURES SECTION ── */}
      <section className="py-28 bg-black/30 border-y border-white/5 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              Features
            </p>
            <h2 className="text-3xl md:text-5xl font-extrabold tracking-tight mb-5">
              Everything You Need to Validate Faster
            </h2>
            <p className="text-white/40 text-lg max-w-xl mx-auto leading-relaxed">
              Stop guessing. Build with conviction. Our models are trained on
              thousands of successful and failed startups.
            </p>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
            {[
              {
                icon: <Zap size={22} />,
                title: "Instant Analysis",
                body: "Get comprehensive feedback in under 3 seconds. No waiting, no forms, no calls. Iterate on your idea in real-time.",
                accent: "primary",
                delay: 0.1,
              },
              {
                icon: <BarChart size={22} />,
                title: "Market Validation",
                body: "Understand your total addressable market and where you fit in the competitive landscape before writing a single line of code.",
                accent: "blue",
                delay: 0.2,
              },
              {
                icon: <Globe size={22} />,
                title: "Competitive Insights",
                body: "Know exactly who you're up against and how to position yourself to win. Find the gaps in existing solutions.",
                accent: "orange",
                delay: 0.3,
              },
              {
                icon: <TrendingUp size={22} />,
                title: "Growth Opportunities",
                body: "Uncover hidden angles, underserved segments, and viral growth loops that you might have missed in your initial brainstorming.",
                accent: "green",
                delay: 0.4,
              },
            ].map(({ icon, title, body, accent, delay }) => (
              <FadeIn key={title} delay={delay}>
                <div className={`feature-card group p-8 rounded-3xl h-full border border-white/6 hover:border-${accent === "primary" ? "primary" : accent + "-500"}/30 transition-all duration-500`}>
                  <div className={`feature-icon-${accent} w-11 h-11 rounded-2xl flex items-center justify-center mb-6 transition-transform duration-300 group-hover:scale-110`}>
                    {icon}
                  </div>
                  <h3 className="text-lg font-bold mb-3 tracking-tight">{title}</h3>
                  <p className="text-white/45 text-sm leading-relaxed">{body}</p>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── TESTIMONIALS ── */}
      <section className="py-28 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <FadeIn className="text-center mb-16">
            <p className="text-xs uppercase tracking-[0.2em] text-primary font-semibold mb-4">
              Social proof
            </p>
            <h2 className="text-3xl md:text-4xl font-extrabold tracking-tight">
              Founders who moved faster
            </h2>
          </FadeIn>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                quote:
                  "I killed a bad idea before spending 6 months on it. Best 5 minutes I've spent this year.",
                handle: "@jordanmkts",
                role: "Founder",
                avatar: 11,
                delay: 0.1,
              },
              {
                quote:
                  "The competitive threat analysis alone saved us from entering a dying market.",
                handle: "@priyanka_vc",
                role: "Startup Advisor",
                avatar: 5,
                delay: 0.2,
              },
              {
                quote:
                  "Showed this to my co-founder and we pivoted on the spot. Brutal but necessary.",
                handle: "@tomcodes",
                role: "YC S23",
                avatar: 12,
                delay: 0.3,
              },
            ].map(({ quote, handle, role, avatar, delay }) => (
              <FadeIn key={handle} delay={delay}>
                <div className="glass-card p-7 rounded-2xl h-full flex flex-col hover:-translate-y-1 transition-transform duration-300">
                  <div className="flex gap-0.5 text-yellow-400 mb-5">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <Star key={i} size={13} fill="currentColor" />
                    ))}
                  </div>
                  <p className="text-base leading-relaxed text-white/80 mb-7 flex-grow">
                    "{quote}"
                  </p>
                  <div className="flex items-center gap-3">
                    <div className="w-9 h-9 rounded-full bg-muted overflow-hidden ring-1 ring-white/10">
                      <img
                        src={`https://i.pravatar.cc/80?img=${avatar}`}
                        alt=""
                        className="w-full h-full object-cover"
                      />
                    </div>
                    <div>
                      <p className="text-sm font-semibold text-white">{handle}</p>
                      <p className="text-xs text-white/35">{role}</p>
                    </div>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </section>

      {/* ── FOOTER ── */}
      <footer className="border-t border-white/5 bg-[#050507] py-16 relative z-10">
        <div className="container mx-auto px-6 max-w-6xl">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-10 mb-14">
            <div className="md:col-span-2">
              <div className="flex items-center gap-2.5 font-bold text-lg mb-4">
                <div className="w-7 h-7 rounded-lg bg-gradient-to-br from-primary to-blue-500 flex items-center justify-center">
                  <Zap size={14} fill="white" className="text-white" />
                </div>
                Startup Analyzer <span className="text-primary">AI</span>
              </div>
              <p className="text-white/35 text-sm leading-relaxed max-w-xs">
                AI-powered startup validation for the builders who move fast.
                Don't code before you know.
              </p>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-5">
                Product
              </h4>
              <ul className="space-y-3 text-sm text-white/35">
                {["Features", "Pricing", "Changelog", "Blog"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
            <div>
              <h4 className="text-xs font-semibold uppercase tracking-wider text-white/50 mb-5">
                Company
              </h4>
              <ul className="space-y-3 text-sm text-white/35">
                {["About", "Twitter", "LinkedIn", "Contact"].map((l) => (
                  <li key={l}>
                    <a href="#" className="hover:text-white transition-colors">
                      {l}
                    </a>
                  </li>
                ))}
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-4">
            <p className="text-xs text-white/25">
              © 2025 Startup Analyzer AI. All rights reserved.
            </p>
            <div className="flex gap-6 text-xs text-white/25">
              <a href="#" className="hover:text-white/60 transition-colors">Privacy</a>
              <a href="#" className="hover:text-white/60 transition-colors">Terms</a>
              <a href="#" className="hover:text-white/60 transition-colors">Status</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
