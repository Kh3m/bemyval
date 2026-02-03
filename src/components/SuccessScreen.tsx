import { Heart, Sparkles, PartyPopper } from "lucide-react";
import { useEffect, useState } from "react";

interface SuccessScreenProps {
  name: string;
}

const SuccessScreen = ({ name }: SuccessScreenProps) => {
  const [showContent, setShowContent] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setShowContent(true), 300);
    return () => clearTimeout(timer);
  }, []);

  // Confetti pieces
  const confetti = Array.from({ length: 50 }, (_, i) => ({
    id: i,
    left: Math.random() * 100,
    delay: Math.random() * 3,
    duration: 2 + Math.random() * 3,
    color: [
      "bg-primary",
      "bg-accent",
      "bg-rose-400",
      "bg-pink-300",
      "bg-red-400",
    ][Math.floor(Math.random() * 5)],
    size: 8 + Math.random() * 8,
  }));

  return (
    <div className="fixed inset-0 bg-success-gradient flex items-center justify-center p-4 overflow-hidden">
      {/* Confetti */}
      {confetti.map((piece) => (
        <div
          key={piece.id}
          className={`absolute ${piece.color} rounded-full`}
          style={{
            left: `${piece.left}%`,
            width: piece.size,
            height: piece.size,
            animation: `confetti-fall ${piece.duration}s linear infinite`,
            animationDelay: `${piece.delay}s`,
          }}
        />
      ))}

      {/* Floating Hearts Background */}
      {Array.from({ length: 20 }).map((_, i) => (
        <Heart
          key={i}
          className="absolute text-primary/20 fill-primary/10"
          style={{
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            width: 20 + Math.random() * 40,
            height: 20 + Math.random() * 40,
            animation: `float-heart ${3 + Math.random() * 4}s ease-in-out infinite`,
            animationDelay: `${Math.random() * 3}s`,
          }}
        />
      ))}

      {/* Main Content */}
      <div
        className={`relative z-10 text-center max-w-lg transition-all duration-700 ${
          showContent ? "opacity-100 scale-100" : "opacity-0 scale-90"
        }`}
      >
        {/* Party Icons */}
        <div className="flex justify-center gap-4 mb-6">
          <PartyPopper className="w-10 h-10 text-accent animate-bounce" />
          <Sparkles className="w-10 h-10 text-primary animate-pulse" />
          <PartyPopper
            className="w-10 h-10 text-accent animate-bounce"
            style={{ animationDelay: "0.2s" }}
          />
        </div>

        {/* Success Message */}
        <div className="bg-card/90 backdrop-blur-sm rounded-3xl p-8 md:p-12 shadow-2xl border border-primary/20">
          <h1 className="font-romantic text-4xl md:text-5xl lg:text-6xl text-gradient mb-4">
            Yay! 🎉
          </h1>

          <p className="text-xl md:text-2xl text-foreground mb-6 font-medium">
            {name} made the{" "}
            <span className="text-primary font-bold">best choice!</span>
          </p>

          {/* Cute GIF */}
          <div className="relative mb-6 rounded-2xl overflow-hidden shadow-lg">
            <img
              src="https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExcnU5NmZxbWl1MHV6bW9wajNuMGEyNjB2cGw1MWZpbDJtYW9vOGV3diZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/cXblnKXr2BQOaYnTni/giphy.gif"
              alt="Happy love celebration"
              className="w-full h-auto"
            />
          </div>

          {/* Love Message */}
          <div className="flex items-center justify-center gap-2 text-muted-foreground">
            <Heart className="w-5 h-5 text-primary fill-primary animate-pulse-heart" />
            <span className="font-romantic text-2xl text-primary">
              Happy Valentine {name}!
            </span>
            <Heart
              className="w-5 h-5 text-primary fill-primary animate-pulse-heart"
              style={{ animationDelay: "0.5s" }}
            />
          </div>

          {/* Extra Hearts */}
          <div className="flex justify-center gap-1 mt-4">
            {[...Array(5)].map((_, i) => (
              <Heart
                key={i}
                className="w-6 h-6 text-primary fill-primary animate-pulse-heart"
                style={{ animationDelay: `${i * 0.15}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default SuccessScreen;
