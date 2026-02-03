import FloatingHearts from "@/components/FloatingHearts";
import ValentineCard from "@/components/ValentineCard";

const Index = () => {
  // You can change the name here! 💕
  const valentineName = "Kemi";

  return (
    <div className="min-h-screen bg-romantic overflow-hidden">
      <FloatingHearts />
      <ValentineCard name={valentineName} />
    </div>
  );
};

export default Index;
