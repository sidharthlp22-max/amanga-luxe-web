import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Sparkles, Award, Heart } from "lucide-react";
import heroImage from "@/assets/hero-jewelry.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[60vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src={heroImage}
            alt="AMANGA Story"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-background/80" />
        </div>
        
        <div className="container mx-auto px-4 z-10 text-center">
          <h1 className="text-5xl md:text-6xl font-serif font-bold mb-6">
            Our Story
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Where Quality meets Fashion
          </p>
        </div>
      </section>

      {/* Philosophy */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-center">
              Our Philosophy
            </h2>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
              At AMANGA, we believe that luxury jewelry should be more than just an accessory—it should be 
              a reflection of your unique story, crafted with exceptional quality and timeless elegance.
            </p>
            <p className="text-lg text-muted-foreground mb-6 leading-relaxed text-center">
              Our philosophy is simple: "Quality meets Fashion." We merge traditional craftsmanship with 
              contemporary design to create pieces that transcend trends and become cherished heirlooms.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-20 bg-gradient-to-br from-primary/5 via-secondary/5 to-accent/5">
        <div className="container mx-auto px-4">
          <h2 className="text-4xl font-serif font-bold mb-12 text-center">
            What Sets Us Apart
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 max-w-5xl mx-auto">
            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-full gradient-bg">
                <Sparkles className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Exceptional Quality</h3>
              <p className="text-muted-foreground leading-relaxed">
                Every piece is crafted using ethically sourced materials and certified gemstones, 
                ensuring the highest standards of quality and authenticity.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-full gradient-bg">
                <Award className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Master Craftsmanship</h3>
              <p className="text-muted-foreground leading-relaxed">
                Our artisans bring decades of expertise to every creation, combining traditional 
                techniques with innovative design approaches.
              </p>
            </div>

            <div className="text-center space-y-4">
              <div className="inline-flex p-4 rounded-full gradient-bg">
                <Heart className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-serif font-semibold">Personal Touch</h3>
              <p className="text-muted-foreground leading-relaxed">
                We understand that jewelry is deeply personal. Each piece is created with care 
                and attention to make your moments unforgettable.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Heritage */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto">
            <h2 className="text-4xl font-serif font-bold mb-8 text-center">
              Our Heritage
            </h2>
            <div className="space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                AMANGA was born from a passion for creating jewelry that tells a story. Our journey began 
                with a simple vision: to craft pieces that embody both exceptional quality and contemporary 
                fashion sensibility.
              </p>
              <p>
                Drawing inspiration from timeless elegance and modern aesthetics, we've developed a signature 
                style that resonates with those who appreciate fine craftsmanship and distinctive design. 
                The winged key, our brand symbol, represents unlocking beauty and potential—a philosophy 
                that guides everything we create.
              </p>
              <p>
                Today, AMANGA continues to push the boundaries of luxury jewelry design, maintaining our 
                commitment to quality while embracing innovation. Each collection reflects our dedication 
                to creating pieces that will be treasured for generations to come.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Commitment */}
      <section className="py-20 bg-muted/30">
        <div className="container mx-auto px-4">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl font-serif font-bold mb-6">
              Our Commitment to You
            </h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              When you choose AMANGA, you're not just purchasing jewelry—you're investing in a piece of 
              art backed by our lifetime guarantee. We stand behind every creation, ensuring your complete 
              satisfaction and providing exceptional service at every step of your journey with us.
            </p>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
