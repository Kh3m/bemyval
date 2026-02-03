import { useState, useRef } from "react";
import { Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import SuccessScreen from "./SuccessScreen";

interface ValentineCardProps {
  name: string;
}

const ValentineCard = ({ name }: ValentineCardProps) => {
  const [accepted, setAccepted] = useState(false);
  const [noButtonStyle, setNoButtonStyle] = useState<React.CSSProperties>({});
  const [escapeCount, setEscapeCount] = useState(0);
  const buttonAreaRef = useRef<HTMLDivElement>(null);

  const escapeMessages = [
    "No",
    "Are you sure?",
    "Really?",
    "Think again!",
    "Pretty please?",
    "Don't do this!",
    "I'll be sad 😢",
    "NOOOO!",
    "Just click Yes!",
    "Come on! 💔",
  ];

  const moveNoButton = () => {
    if (!buttonAreaRef.current) return;

    const area = buttonAreaRef.current.getBoundingClientRect();
    
    // Generate random position within the button area
    const positions = [
      { top: '0%', left: '0%', transform: 'translate(0, 0)' },
      { top: '0%', left: '100%', transform: 'translate(-100%, 0)' },
      { top: '100%', left: '0%', transform: 'translate(0, -100%)' },
      { top: '100%', left: '100%', transform: 'translate(-100%, -100%)' },
      { top: '50%', left: '0%', transform: 'translate(0, -50%)' },
      { top: '50%', left: '100%', transform: 'translate(-100%, -50%)' },
      { top: '0%', left: '50%', transform: 'translate(-50%, 0)' },
      { top: '100%', left: '50%', transform: 'translate(-50%, -100%)' },
    ];
    
    // Pick a random position different from current
    const randomIndex = Math.floor(Math.random() * positions.length);
    const newPos = positions[randomIndex];
    
    setNoButtonStyle({
      position: 'absolute',
      top: newPos.top,
      left: newPos.left,
      transform: newPos.transform,
      transition: 'all 0.15s ease-out',
    });
    
    setEscapeCount((prev) => Math.min(prev + 1, escapeMessages.length - 1));
  };

  if (accepted) {
    return <SuccessScreen name={name} />;
  }

  return (
    <div className="relative min-h-screen flex items-center justify-center p-4 overflow-hidden">
      <div className="relative z-10 w-full max-w-md">
        {/* Main Card */}
        <div className="bg-card/80 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/20">
          {/* Decorative Hearts */}
          <div className="absolute -top-6 left-1/2 -translate-x-1/2">
            <Heart className="w-12 h-12 text-primary fill-primary animate-pulse-heart" />
          </div>
          
          {/* Sparkles */}
          <Sparkles className="absolute top-4 right-4 w-6 h-6 text-accent animate-sparkle" />
          <Sparkles className="absolute top-8 left-4 w-4 h-4 text-primary/60 animate-sparkle" style={{ animationDelay: '0.5s' }} />
          
          {/* Content */}
          <div className="text-center space-y-6 mt-4">
            {/* Name */}
            <h2 className="font-romantic text-3xl md:text-4xl text-primary">
              Dear {name},
            </h2>
            
            {/* Question */}
            <div className="space-y-2">
              <h1 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-gradient leading-tight">
                Will you be my Valentine?
              </h1>
              <div className="flex justify-center gap-1">
                {[...Array(3)].map((_, i) => (
                  <Heart 
                    key={i} 
                    className="w-5 h-5 text-primary fill-primary" 
                    style={{ animationDelay: `${i * 0.2}s` }}
                  />
                ))}
              </div>
            </div>
            
            {/* Buttons Area */}
            <div 
              ref={buttonAreaRef}
              className="relative pt-6 min-h-[140px] sm:min-h-[100px]"
            >
              {/* Yes Button - Always centered */}
              <div className="flex justify-center">
                <Button
                  onClick={() => setAccepted(true)}
                  className="px-10 py-6 text-xl font-semibold rounded-full bg-gradient-to-r from-primary to-accent hover:from-accent hover:to-primary transition-all duration-300 transform hover:scale-110 shadow-lg hover:shadow-xl"
                >
                  <Heart className="w-5 h-5 mr-2 fill-current" />
                  Yes!
                </Button>
              </div>
              
              {/* No Button - Moves around */}
              <Button
                variant="outline"
                onMouseEnter={moveNoButton}
                onTouchStart={(e) => {
                  e.preventDefault();
                  moveNoButton();
                }}
                className="px-6 py-4 text-base font-semibold rounded-full border-2 border-muted-foreground/30 hover:border-muted-foreground/50 mt-4 sm:mt-0"
                style={noButtonStyle}
              >
                {escapeMessages[escapeCount]}
              </Button>
            </div>
            
            {escapeCount > 2 && (
              <p className="text-sm text-muted-foreground animate-fade-in italic">
                Psst... the "No" button seems to have a mind of its own! 💕
              </p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ValentineCard;
