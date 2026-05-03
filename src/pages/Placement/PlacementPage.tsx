import { Link } from "react-router-dom";
import { useState } from "react";
import {
  FileText, Users, MessageSquare, Code2, ArrowRight,
  CheckCircle2, ChevronDown, ChevronUp, Star, Briefcase
} from "lucide-react";

// ── Static placement content ──────────────────────────────────────────────────

const resumeTips = [
  { title: "Keep it to 1 page",           desc: "For freshers and < 3 years experience. Recruiters spend 6–10 seconds on first scan." },
  { title: "Use action verbs",            desc: "Start every bullet with: Built, Designed, Implemented, Reduced, Improved, Led, Optimized." },
  { title: "Quantify everything",         desc: "'Improved performance by 40%' beats 'Improved performance'. Numbers get noticed." },
  { title: "ATS-friendly format",         desc: "No tables, no columns, no images. Use standard headings. Plain .docx or PDF." },
  { title: "Projects > certificates",     desc: "A live GitHub project beats 10 online certificates. Build real things." },
  { title: "Tailor for each JD",          desc: "Mirror keywords from the job description. ATS filters on keyword match." },
  { title: "Skills section is important", desc: "List languages, frameworks, tools, databases. Recruiters search for these." },
  { title: "Proofread — twice",           desc: "A typo in 'Experience' or 'Proficiency' is an instant red flag." },
];

const resumeSections = [
  { label: "Header",      must: true,  desc: "Name, email, phone, GitHub, LinkedIn, portfolio (if any)" },
  { label: "Summary",     must: false, desc: "2-3 lines — role you're targeting + your strongest selling point" },
  { label: "Skills",      must: true,  desc: "Languages, frameworks, tools, databases — grouped logically" },
  { label: "Experience",  must: false, desc: "Internships, freelance, part-time — only if relevant" },
  { label: "Projects",    must: true,  desc: "3–4 strong projects with tech stack, problem solved, live link/GitHub" },
  { label: "Education",   must: true,  desc: "Degree, institution, CGPA (if ≥ 7.5), graduation year" },
  { label: "Achievements",must: false, desc: "Hackathons, competitive coding rankings, open source contributions" },
];

const hrQuestions = [
  {
    q: "Tell me about yourself.",
    a: "Structure: Present → Past → Future. 'I'm a final year CS student at [college], currently working on [project/skill]. Previously I [relevant experience]. I'm passionate about [domain] and looking to join a company where I can [contribution].' Keep it 90 seconds max.",
  },
  {
    q: "Why do you want to join our company?",
    a: "Research before every interview. Mention: 1 specific product they build, 1 thing about their culture/values, 1 how your skills align. Never say 'for salary' or 'it's a big company'. Show genuine interest.",
  },
  {
    q: "What is your greatest weakness?",
    a: "Pick a REAL weakness that's not core to the job. Add what you're doing to fix it. Example: 'I sometimes overthink design decisions — I've started time-boxing my design phase to become more decisive.' Never say 'I work too hard.'",
  },
  {
    q: "Where do you see yourself in 5 years?",
    a: "Be ambitious but realistic. Align with the company's growth path. 'In 5 years, I see myself as a senior engineer, having owned significant features/systems, and ideally mentoring junior developers.' Shows drive + loyalty.",
  },
  {
    q: "Why should we hire you?",
    a: "This is your sales pitch. Combine 3 things: skill match ('I have X which your JD needs'), proof ('I built Y project that demonstrates this'), and motivation ('I'm genuinely excited about this domain'). Be confident, not arrogant.",
  },
  {
    q: "Do you have any questions for us?",
    a: "ALWAYS have questions. Good ones: 'What does success look like in the first 90 days?', 'What are the biggest technical challenges the team is solving?', 'How does the team approach code review/learning?'. Never ask about salary first.",
  },
];

const interviewRounds = [
  {
    round: "Online Assessment (OA)",
    icon: "💻",
    desc: "DSA problems on HackerRank/LeetCode-style platform. Usually 2–3 problems in 60–90 mins.",
    tips: ["Solve Easy in < 10 mins, Medium in 20–25 mins", "Always handle edge cases", "Test with provided examples before submitting", "Write clean code — partial marks for partial solutions"],
    color: "from-blue-500 to-indigo-500",
  },
  {
    round: "Technical Round 1",
    icon: "🧠",
    desc: "DSA + CS fundamentals. Could be on a whiteboard, IDE, or video call with live coding.",
    tips: ["Think aloud — interviewers grade your thought process", "Start with brute force, then optimize", "Expect OS, DBMS, OOP questions between DSA", "Write test cases voluntarily — shows engineering maturity"],
    color: "from-purple-500 to-violet-500",
  },
  {
    round: "Technical Round 2",
    icon: "🏗️",
    desc: "System design (for senior/experienced roles) or project deep-dive + advanced DSA.",
    tips: ["For projects: know your tech choices and why", "For system design: clarify requirements, start high-level", "Discuss trade-offs — no system is perfect", "Know your numbers: how many users, what latency is acceptable"],
    color: "from-emerald-500 to-teal-500",
  },
  {
    round: "HR Round",
    icon: "🤝",
    desc: "Cultural fit, motivation, salary negotiation, and basic situational questions.",
    tips: ["Research the company deeply before this round", "Have salary range ready — know your market value", "Use STAR method for behavioral questions", "Be authentic — HR can sense scripted answers"],
    color: "from-orange-500 to-amber-500",
  },
];

const behavioralStarExamples = [
  {
    category: "Teamwork",
    question: "Tell me about a time you worked effectively in a team.",
    star: {
      situation:  "During my final year project, our team of 4 had conflicting opinions on which tech stack to use.",
      task:       "As the informal technical lead, I needed to align the team without creating resentment.",
      action:     "I organized a 1-hour tech evaluation session where each person presented their preference with pros/cons. We voted on objective criteria: learning curve, deployment ease, community support.",
      result:     "We aligned on React + Node.js within one session. No conflict persisted. The project was delivered 2 weeks ahead of schedule.",
    },
  },
  {
    category: "Failure",
    question: "Tell me about a time you failed.",
    star: {
      situation:  "In my first internship hackathon, our team's product demo crashed in front of judges.",
      task:       "We had to recover and still make a case for our product.",
      action:     "I stayed calm, quickly explained what the app was supposed to do, showed the code and architecture instead of the demo, and focused on the problem we were solving.",
      result:     "We didn't win but got positive feedback from judges for our composure and technical depth. I learned to always have a backup demo path.",
    },
  },
];

// ── Component ─────────────────────────────────────────────────────────────────

export default function PlacementPage() {
  const [openHR, setOpenHR]         = useState<number | null>(0);
  const [openBStar, setOpenBStar]   = useState<number | null>(null);

  return (
    <div className="container-app py-12">
      {/* Header */}
      <div className="mb-12">
        <div className="badge-animated mb-4">Placement Guide</div>
        <h1 className="section-title mb-3">Complete Placement Preparation</h1>
        <p className="section-subtitle max-w-2xl">
          From crafting your resume to cracking every interview round — a comprehensive guide to landing your first or next tech job.
        </p>
      </div>

      {/* Quick nav */}
      <div className="flex flex-wrap gap-2 mb-14">
        {[
          { href: "#resume",      label: "Resume Guide",       icon: FileText     },
          { href: "#rounds",      label: "Interview Rounds",   icon: Code2        },
          { href: "#hr",          label: "HR Questions",       icon: MessageSquare },
          { href: "#behavioral",  label: "Behavioral (STAR)",  icon: Users        },
        ].map(({ href, label, icon: Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center gap-2 text-sm font-medium text-gray-700 bg-white border border-gray-200 hover:border-brand-300 hover:text-brand-600 rounded-xl px-4 py-2.5 transition-colors"
          >
            <Icon size={14} /> {label}
          </a>
        ))}
      </div>

      {/* ── Resume Section ──────────────────────────────────────────── */}
      <section id="resume" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center">
            <FileText size={18} className="text-blue-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">Resume Guide</h2>
        </div>

        <div className="grid lg:grid-cols-2 gap-6">
          {/* Resume sections checklist */}
          <div className="card p-6">
            <h3 className="font-display font-semibold text-gray-900 mb-4">Resume Sections Checklist</h3>
            <div className="space-y-3">
              {resumeSections.map(({ label, must, desc }) => (
                <div key={label} className="flex items-start gap-3">
                  <CheckCircle2
                    size={16}
                    className={must ? "text-brand-500 mt-0.5 shrink-0" : "text-gray-300 mt-0.5 shrink-0"}
                  />
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-gray-800">{label}</span>
                      {must && <span className="badge bg-brand-50 text-brand-700 text-xs">Must have</span>}
                    </div>
                    <p className="text-xs text-gray-500 mt-0.5">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Power tips */}
          <div className="card p-6">
            <h3 className="font-display font-semibold text-gray-900 mb-4 flex items-center gap-2">
              <Star size={16} className="text-amber-500" /> Power Tips
            </h3>
            <div className="space-y-3">
              {resumeTips.map(({ title, desc }) => (
                <div key={title} className="flex items-start gap-3">
                  <span className="w-1.5 h-1.5 rounded-full bg-brand-400 mt-2 shrink-0" />
                  <div>
                    <p className="text-sm font-medium text-gray-800">{title}</p>
                    <p className="text-xs text-gray-500 mt-0.5 leading-relaxed">{desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── Interview Rounds ────────────────────────────────────────── */}
      <section id="rounds" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-purple-50 flex items-center justify-center">
            <Code2 size={18} className="text-purple-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">Interview Rounds Explained</h2>
        </div>

        <div className="grid sm:grid-cols-2 gap-5">
          {interviewRounds.map((round) => (
            <div key={round.round} className="card p-6 flex flex-col">
              <div className="flex items-start gap-4 mb-4">
                <div className={`w-12 h-12 rounded-2xl bg-gradient-to-br ${round.color} flex items-center justify-center text-2xl shadow-sm shrink-0`}>
                  {round.icon}
                </div>
                <div>
                  <h3 className="font-display font-bold text-gray-900">{round.round}</h3>
                  <p className="text-sm text-gray-500 mt-1 leading-snug">{round.desc}</p>
                </div>
              </div>
              <ul className="space-y-2 mt-2">
                {round.tips.map((tip) => (
                  <li key={tip} className="flex items-start gap-2 text-sm text-gray-700">
                    <CheckCircle2 size={13} className="text-emerald-500 mt-0.5 shrink-0" />
                    {tip}
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>

      {/* ── HR Questions ────────────────────────────────────────────── */}
      <section id="hr" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-6">
          <div className="w-10 h-10 rounded-xl bg-green-50 flex items-center justify-center">
            <MessageSquare size={18} className="text-green-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">Top HR Questions & Answers</h2>
        </div>

        <div className="space-y-3">
          {hrQuestions.map((item, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenHR(openHR === i ? null : i)}
                className="w-full p-5 flex items-start justify-between gap-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="w-6 h-6 rounded-full bg-brand-50 text-brand-600 text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                    {i + 1}
                  </span>
                  <span className="font-medium text-gray-800 text-sm leading-snug">{item.q}</span>
                </div>
                {openHR === i ? (
                  <ChevronUp size={16} className="text-gray-400 shrink-0 mt-0.5" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 shrink-0 mt-0.5" />
                )}
              </button>
              {openHR === i && (
                <div className="border-t border-gray-100 px-5 pb-5 pt-4 bg-brand-50/30">
                  <p className="text-sm text-gray-700 leading-relaxed">{item.a}</p>
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── STAR Method ─────────────────────────────────────────────── */}
      <section id="behavioral" className="mb-16 scroll-mt-20">
        <div className="flex items-center gap-3 mb-2">
          <div className="w-10 h-10 rounded-xl bg-orange-50 flex items-center justify-center">
            <Users size={18} className="text-orange-600" />
          </div>
          <h2 className="font-display font-bold text-2xl text-gray-900">Behavioral Questions (STAR Method)</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6 ml-14">
          Structure every behavioral answer as: <strong>S</strong>ituation → <strong>T</strong>ask → <strong>A</strong>ction → <strong>R</strong>esult
        </p>

        {/* STAR legend */}
        <div className="grid grid-cols-4 gap-3 mb-8">
          {[
            { letter: "S", word: "Situation", desc: "Set the context",    color: "bg-blue-50 text-blue-700 border-blue-200"   },
            { letter: "T", word: "Task",      desc: "Your responsibility", color: "bg-purple-50 text-purple-700 border-purple-200" },
            { letter: "A", word: "Action",    desc: "What YOU did",       color: "bg-amber-50 text-amber-700 border-amber-200" },
            { letter: "R", word: "Result",    desc: "Outcome + impact",   color: "bg-emerald-50 text-emerald-700 border-emerald-200" },
          ].map(({ letter, word, desc, color }) => (
            <div key={letter} className={`rounded-2xl border p-4 text-center ${color}`}>
              <div className="font-display font-extrabold text-3xl mb-1">{letter}</div>
              <div className="font-semibold text-sm">{word}</div>
              <div className="text-xs opacity-70 mt-0.5">{desc}</div>
            </div>
          ))}
        </div>

        {/* Example answers */}
        <div className="space-y-4">
          {behavioralStarExamples.map((ex, i) => (
            <div key={i} className="card overflow-hidden">
              <button
                onClick={() => setOpenBStar(openBStar === i ? null : i)}
                className="w-full p-5 flex items-start justify-between gap-3 text-left hover:bg-gray-50 transition-colors"
              >
                <div className="flex items-start gap-3">
                  <span className="badge bg-orange-50 text-orange-700 border border-orange-200 shrink-0">
                    {ex.category}
                  </span>
                  <span className="text-sm font-medium text-gray-800">{ex.question}</span>
                </div>
                {openBStar === i ? (
                  <ChevronUp size={16} className="text-gray-400 shrink-0" />
                ) : (
                  <ChevronDown size={16} className="text-gray-400 shrink-0" />
                )}
              </button>
              {openBStar === i && (
                <div className="border-t border-gray-100 p-5 space-y-3">
                  {Object.entries(ex.star).map(([key, val]) => {
                    const colors: Record<string, string> = {
                      situation: "bg-blue-50 border-blue-200 text-blue-800",
                      task:      "bg-purple-50 border-purple-200 text-purple-800",
                      action:    "bg-amber-50 border-amber-200 text-amber-800",
                      result:    "bg-emerald-50 border-emerald-200 text-emerald-800",
                    };
                    return (
                      <div key={key} className={`rounded-xl border p-4 ${colors[key]}`}>
                        <p className="text-xs font-bold uppercase tracking-wide mb-1 opacity-70">
                          {key}
                        </p>
                        <p className="text-sm leading-relaxed">{val}</p>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          ))}
        </div>
      </section>

      {/* ── Final CTA ───────────────────────────────────────────────── */}
      <div className="rounded-3xl bg-gradient-to-br from-brand-600 to-brand-800 p-10 text-white text-center relative overflow-hidden">
        <div className="absolute inset-0 bg-grid opacity-10" />
        <div className="relative">
          <Briefcase size={36} className="mx-auto mb-4 opacity-80" />
          <h2 className="font-display font-extrabold text-2xl sm:text-3xl mb-3">
            You're almost ready!
          </h2>
          <p className="text-brand-200 mb-6 max-w-md mx-auto">
            Combine this placement guide with strong DSA prep and a solid resume — and you'll stand out from 90% of applicants.
          </p>
          <div className="flex flex-wrap gap-3 justify-center">
            <Link to="/cs-subjects/dsa" className="bg-white text-brand-700 font-semibold px-6 py-3 rounded-xl hover:bg-brand-50 transition-colors inline-flex items-center gap-2 text-sm">
              Practice DSA <ArrowRight size={14} />
            </Link>
            <Link to="/aptitude" className="bg-white/10 border border-white/30 text-white font-semibold px-6 py-3 rounded-xl hover:bg-white/20 transition-colors text-sm">
              Aptitude Practice
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}