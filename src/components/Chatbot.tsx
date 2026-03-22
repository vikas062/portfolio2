import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { MessageCircle, X, Send, Bot, User, Github, ExternalLink, ArrowRight, Sparkles, MapPin, Briefcase, Code2 } from 'lucide-react';
import { Button } from './ui/button';
import { Input } from './ui/input';
import { cn } from '@/lib/utils';

interface Message {
  id: string;
  type: 'bot' | 'user';
  text: string | string[];
}

const FAQS = [
  {
    question: "Why should we hire you?",
    keywords: ["why", "hire", "suitability", "value", "reason", "join", "benefit"],
    answer: [
      "Kriti is a results-driven **AI/ML Engineer** who perfectly bridges the gap between complex research and production-grade software.",
      "**Key Highlights for Recruiters:**",
      "• **Real-world ML Impact:** Built systems like **AI-NutriCare** (Healthcare) and **CrimeIntel** (Analytics).",
      "• **Industrial experience:** Currently an **AI/ML Intern at Infosys**, mastering professional workflows.",
      "• **End-to-End Execution:** Expert in Python, React, and various ML/DL frameworks (TensorFlow, PyTorch).",
      "• **Problem Solver:** Strong focus on building scalable, intelligent solutions for complex data problems."
    ]
  },
  {
    question: "Tell me about your projects",
    keywords: ["project", "work", "portfolio", "build", "show", "developed", "apps", "assignment"],
    answer: [
      "Kriti has developed several high-impact projects. You can explore them in detail in the [Projects Section](#projects).",
      "**Featured Projects:**",
      "1. **CrimeIntel System:** A real-time graph-based crime risk intelligence platform. [View Source](https://github.com/Kriti-kumari221/CrimeIntel)",
      "2. **AI NutriCare:** A full-stack AI system for personalized nutrition. [View Source](https://github.com/PriceOptima-SpringBoard/AI-NutriCare/tree/Kriti-AI-NutriCare)",
      "3. **Sentiment Analysis:** An NLP platform for real-time text extraction. [View Live](https://nlp-one-gilt.vercel.app/)",
      "4. **Smart Placement Tracker:** An analytics dashboard for placement management. [View Source](https://github.com/Kriti-kumari221/Smart-Placement-Tracker)",
      "I'm moving you to the project section now so you can see them live!"
    ],
    action: { type: 'scroll', target: '#projects' }
  },
  {
    question: "What are your strengths?",
    keywords: ["strengths", "skills", "good at", "strong", "expert", "talents"],
    answer: [
      "Her strengths lie at the intersection of Data Science and Software Engineering:",
      "• **Analytical Depth:** Deep expertise in algorithmic problem solving and data structures.",
      "• **Domain Focus:** Strong interest and experience in **Healthcare AI** and predictive modeling.",
      "• **Agility:** Fast learner, as evidenced by her rapid growth during her **Infosys internship**.",
      "• **Collaborative:** Experienced in working within professional development cycles."
    ]
  },
  {
    question: "What technologies do you know?",
    keywords: ["tech", "technologies", "stack", "languages", "python", "react", "tools", "frameworks"],
    answer: [
      "Kriti works with a modern, scalable tech stack:",
      "• **Languages:** Python (Expert), Java, C++, JavaScript, TypeScript.",
      "• **AI/DL:** TensorFlow, PyTorch, Scikit-learn, NLP, Computer Vision.",
      "• **Backend:** FastAPI, Flask, Node.js, Express, MySQL, MongoDB.",
      "• **Frontend:** React, Tailwind CSS, Framer Motion, Three.js.",
      "Check out her full skill set in the [Skills Section](#skills)!"
    ],
    action: { type: 'scroll', target: '#skills' }
  },
  {
    question: "Experience & Internship",
    keywords: ["internship", "infosys", "experience", "intern", "company", "work history", "fresher"],
    answer: [
      "Kriti is currently an **AI/ML Intern at Infosys** (Nov 2025 - Jan 2026).",
      "**Core Focus Areas:**",
      "• Implementing industrial AI/ML workflows and model optimization.",
      "• Collaborative development using enterprise-standard Git/GitHub practices.",
      "• Building end-to-end intelligent systems for specialized corporate use cases.",
      "She combines the energy of a fresher with the practical execution skills of an industry-trained engineer."
    ]
  },
  {
    question: "Location & Origins",
    keywords: ["location", "from", "belong", "live", "address", "home", "city", "state", "place"],
    answer: [
      "Kriti is originally from **Sitamarhi, Bihar, India**.",
      "She is currently based there and is open to remote roles or relocating to major tech hubs for the right opportunity.",
      "Would you like to see her contact details?"
    ]
  },
  {
    question: "Roles you are looking for?",
    keywords: ["roles", "jobs", "looking", "career", "hiring", "position", "opportunity", "opening"],
    answer: [
      "She is actively seeking opportunities for the following roles:",
      "• **AI/ML Engineer**",
      "• **Data Scientist / Analyst**",
      "• **Full Stack Developer (AI-focused)**",
      "She is open to roles that challenge her problem-solving skills and allow her to build impactful tech."
    ]
  }
];

const SMALL_TALK = [
  { keywords: ["hi", "hello", "hey", "greetings", "yo"], answer: "Hello! I'm Kriti's AI Assistant. I can introduce you to her projects, skills, or professional journey. How can I help you today?" },
  { keywords: ["thanks", "thank you", "thx", "appreciate"], answer: "You're very welcome! Is there anything else I can show you in Kriti's portfolio?" },
  { keywords: ["okay", "ok", "got it", "cool", "fine"], answer: "Great! Let me know if you want to jump to a specific section like projects or skills." },
  { keywords: ["how are you", "how are u"], answer: "I'm functioning at 100% capacity! Ready to help you explore Kriti's amazing work." },
  { keywords: ["who are you", "what are you"], answer: "I am an intelligent assistant built to represent Kriti Kumari. I can help you navigate her portfolio and understand her technical strengths." }
];

const ACTIONS = [
  { keywords: ["go to projects", "show projects", "scroll to projects", "view projects", "project section"], action: { type: 'scroll', target: '#projects', answer: "Heading over to the Projects section. Check out the CrimeIntel and AI-NutriCare systems!" } },
  { keywords: ["go to skills", "show skills", "scroll to skills", "view skills", "expertise"], action: { type: 'scroll', target: '#skills', answer: "Navigating to the Skills section to show you her technical stack." } },
  { keywords: ["contact section", "hiring process", "email her", "get in touch", "message her"], action: { type: 'scroll', target: '#contact', answer: "I'll take you to the contact section so you can reach out to her directly!" } },
  { keywords: ["journey", "bio", "story", "life"], action: { type: 'scroll', target: '#about', answer: "Let's look at Kriti's journey from her first 'Hello World' to AI engineering." } },
  { keywords: ["go to top", "scroll up", "hero"], action: { type: 'scroll', target: '#hero', answer: "Back to the top!" } }
];

const Chatbot = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'bot',
      text: "Hi! I'm Kriti’s Agentic Assistant. I can walk you through her projects, internship at Infosys, or instantly navigate you to any section. What would you like to see?"
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    if (isOpen) {
      setTimeout(scrollToBottom, 100);
    }
  }, [messages, isTyping, isOpen]);

  const handleAction = (action: { type: string, target: string, answer?: string }) => {
    if (action.type === 'scroll') {
      const element = document.querySelector(action.target);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        if (action.answer) {
          addBotMessage(action.answer);
        }
      }
    }
  };

  const addBotMessage = (text: string | string[], action?: any) => {
    setIsTyping(true);
    const delay = Array.isArray(text) ? 800 : 500;
    
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: Date.now().toString(),
        type: 'bot',
        text
      }]);
      setIsTyping(false);
      
      // Auto follow-up logic
      if (!action) {
        setTimeout(() => {
          setIsTyping(true);
          setTimeout(() => {
            setMessages(prev => [...prev, {
              id: (Date.now() + 1).toString(),
              type: 'bot',
              text: "Is there anything else I can help you with? I can show you her **skills**, **projects**, or **contact** info."
            }]);
            setIsTyping(false);
          }, 600);
        }, 1500);
      } else {
        setTimeout(() => handleAction(action), 500);
      }
    }, delay);
  };

  const handleSend = (text: string) => {
    if (!text.trim()) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      text
    };

    setMessages(prev => [...prev, userMessage]);
    setInputValue('');

    const normalizedText = text.toLowerCase();

    // PRIORITIZE FAQs over Actions to provide detailed info instead of just scrolling
    const faqMatch = FAQS.find(faq => 
      faq.keywords.some(keyword => normalizedText.includes(keyword))
    );
    if (faqMatch) {
      addBotMessage(faqMatch.answer, faqMatch.action);
      return;
    }

    // THEN Navigation Actions
    const actionMatch = ACTIONS.find(a => 
      a.keywords.some(k => normalizedText.includes(k))
    );
    if (actionMatch) {
      handleAction(actionMatch.action);
      return;
    }

    // THEN Small Talk
    const smallTalkMatch = SMALL_TALK.find(st => 
      st.keywords.some(keyword => normalizedText.includes(keyword))
    );
    if (smallTalkMatch) {
      addBotMessage(smallTalkMatch.answer);
      return;
    }

    // Special Contexts
    if (normalizedText.includes("work") || normalizedText.includes("github") || normalizedText.includes("source")) {
       addBotMessage([
         "Kriti's code is available on [GitHub](https://github.com/Kriti-kumari221).",
         "I'm also moving you to the Projects section where you can see live demos."
       ], { type: 'scroll', target: '#projects' });
       return;
    }

    if (normalizedText.includes("resume") || normalizedText.includes("cv")) {
       addBotMessage("I'll take you to the Resume section where you can view and download her full CV.", { type: 'scroll', target: '#resume' });
       return;
    }

    // Fallback
    addBotMessage("That’s not listed in Kriti’s portfolio, but she is always eager to learn. Would you like to see her projects or contact her instead?");
  };

  const renderText = (text: string) => {
    const parts = text.split(/(\[.*?\]\(.*?\))|(\*\*.*?\*\*)/g);
    return parts.map((part, i) => {
      if (!part) return null;
      if (part.startsWith('[') && part.includes('](')) {
        const title = part.match(/\[(.*?)\]/)?.[1];
        const url = part.match(/\((.*?)\)/)?.[1];
        return (
          <a key={i} href={url} target="_blank" rel="noopener noreferrer" className="text-primary font-bold underline underline-offset-4 hover:text-primary/80 transition-all inline-flex items-center gap-1 group/link">
            {title} <ExternalLink size={10} className="group-hover/link:translate-x-0.5 group-hover/link:-translate-y-0.5 transition-transform" />
          </a>
        );
      }
      if (part.startsWith('**') && part.endsWith('**')) {
        return <strong key={i} className="font-bold text-white tracking-wide">{part.slice(2, -2)}</strong>;
      }
      return <span key={i}>{part}</span>;
    });
  };

  return (
    <div className="fixed bottom-6 right-6 z-[9999]">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            className="mb-4 w-[350px] sm:w-[440px] h-[600px] flex flex-col shadow-[0_30px_90px_rgba(0,0,0,0.7)] rounded-[2.5rem] overflow-hidden border border-white/10 bg-[#0a0a0a]/80 backdrop-blur-3xl"
          >
            {/* Header */}
            <div className="p-6 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-primary/20 to-blue-500/20 flex items-center justify-center border border-white/10 shadow-inner">
                   <Bot className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-bold text-white text-base tracking-tight">Kriti’s Core Assistant</h3>
                  <div className="flex items-center gap-2">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span className="text-[10px] text-white/40 font-mono uppercase tracking-widest">Neural Link Active</span>
                  </div>
                </div>
              </div>
              <Button 
                variant="ghost" 
                size="icon" 
                onClick={() => setIsOpen(false)}
                className="text-white/30 hover:text-white hover:bg-white/5 rounded-2xl h-10 w-10"
              >
                <X className="w-5 h-5" />
              </Button>
            </div>

            {/* Chat Area */}
            <div className="flex-1 overflow-hidden relative">
              <div className="h-full overflow-y-auto p-6 custom-scrollbar">
                <div className="space-y-6">
                  {messages.map((message) => (
                    <motion.div
                      key={message.id}
                      initial={{ opacity: 0, y: 15 }}
                      animate={{ opacity: 1, y: 0 }}
                      className={cn(
                        "flex w-full items-end gap-3",
                        message.type === 'bot' ? "justify-start" : "justify-end flex-row-reverse"
                      )}
                    >
                      <div className={cn(
                        "w-8 h-8 rounded-full flex items-center justify-center border shrink-0",
                        message.type === 'bot' ? "bg-primary/10 border-primary/20" : "bg-white/10 border-white/10"
                      )}>
                        {message.type === 'bot' ? <Bot size={14} className="text-primary" /> : <User size={14} className="text-white/60" />}
                      </div>
                      <div className={cn(
                        "max-w-[80%] p-4 rounded-3xl shadow-2xl text-[13px] leading-relaxed",
                        message.type === 'bot' 
                          ? "bg-white/[0.03] text-white/80 rounded-bl-none border border-white/[0.05]" 
                          : "bg-primary text-primary-foreground rounded-br-none font-medium"
                      )}>
                        {Array.isArray(message.text) ? (
                          <div className="space-y-3">
                             {message.text.map((line, idx) => (
                               <p key={idx}>{renderText(line)}</p>
                             ))}
                          </div>
                        ) : (
                          <p>{renderText(message.text)}</p>
                        )}
                      </div>
                    </motion.div>
                  ))}
                  {isTyping && (
                    <div className="flex justify-start items-center gap-3">
                      <div className="w-8 h-8 rounded-full bg-primary/10 border border-primary/20 flex items-center justify-center">
                        <Bot size={14} className="text-primary" />
                      </div>
                      <div className="bg-white/5 p-4 rounded-3xl rounded-bl-none border border-white/10">
                        <div className="flex gap-1.5">
                          {[0, 1, 2].map((i) => (
                            <motion.div
                              key={i}
                              animate={{ scale: [1, 1.4, 1], opacity: [0.3, 1, 0.3] }}
                              transition={{ repeat: Infinity, duration: 1, delay: i * 0.2 }}
                              className="w-1.5 h-1.5 rounded-full bg-primary"
                            />
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                  <div ref={messagesEndRef} className="h-2" />
                </div>
              </div>
            </div>

            {/* Suggestions Overlay */}
            {messages.length <= 1 && (
              <div className="px-6 pb-6 pt-2">
                 <div className="flex flex-wrap gap-2">
                    {FAQS.slice(0, 4).map((faq, index) => (
                      <button
                        key={index}
                        onClick={() => handleSend(faq.question)}
                        className="text-[11px] px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/5 text-white/50 hover:bg-primary/10 hover:text-white hover:border-primary/30 transition-all duration-300"
                      >
                        {faq.question}
                      </button>
                    ))}
                 </div>
              </div>
            )}

            {/* Input Area */}
            <div className="p-6 bg-white/[0.02] border-t border-white/5">
              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  handleSend(inputValue);
                }}
                className="flex gap-3"
              >
                <div className="relative flex-1">
                   <Input 
                    placeholder="Ask about projects, skills, or experience..." 
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                    className="bg-black/50 border-white/10 text-white text-[13px] h-12 rounded-2xl focus-visible:ring-primary/20 transition-all pl-5"
                  />
                </div>
                <Button 
                  type="submit" 
                  size="icon" 
                  className="h-12 w-12 shrink-0 bg-primary hover:bg-primary/90 rounded-2xl transition-all active:scale-95 shadow-[0_10px_20px_rgba(var(--primary),0.3)]"
                  disabled={!inputValue.trim()}
                >
                  <Send className="w-5 h-5" />
                </Button>
              </form>
            </div>

            {/* Footer */}
            <div className="px-8 py-4 bg-black/40 flex items-center justify-between">
               <div className="flex items-center gap-4">
                 <MapPin size={12} className="text-white/20" />
                 <span className="text-[9px] text-white/30 font-mono tracking-widest uppercase">Sitamarhi, BIH, IN</span>
               </div>
               <div className="flex items-center gap-4 text-white/20">
                  <Briefcase size={12} />
                  <Code2 size={12} />
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.05, y: -4 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        className={cn(
          "w-16 h-16 rounded-[1.8rem] flex items-center justify-center shadow-2xl transition-all duration-500 border border-white/20 group relative overflow-hidden",
          isOpen ? "bg-[#111] text-white" : "bg-primary text-primary-foreground"
        )}
      >
        {!isOpen && (
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/10 to-white/0 -translate-x-full group-hover:translate-x-full transition-transform duration-[1.2s]" />
        )}
        {isOpen ? <X className="w-6 h-6 animate-in fade-in zoom-in duration-300" /> : <MessageCircle className="w-7 h-7 animate-in fade-in zoom-in duration-300" />}
        {!isOpen && (
           <div className="absolute top-2 right-2 w-3 h-3 bg-emerald-500 rounded-full border-2 border-[#111] shadow-[0_0_10px_rgba(16,185,129,0.5)]" />
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;
