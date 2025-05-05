import { FC } from "react";
import { Mountain, Shield, Award, Users, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import ForestImage from "@/assets/forest.jpg";
import ClimbingImage from "@/assets/About/climbing.jpg";
import ExperienceImage1 from "@/assets/About/experience1.jpg";
import ExperienceImage2 from "@/assets/About/experience2.jpg";
import ExperienceImage3 from "@/assets/About/experience3.jpg";
import ExperienceImage4 from "@/assets/About/experience4.jpg";

const AboutPage: FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[50vh] w-full">
        <img
          src={ForestImage}
          alt="Mountain landscape"
          className="w-full h-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30">
          <div className="container mx-auto px-4 h-full flex flex-col justify-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-4">
              Our Journey to the Summit
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              Providing quality mountaineering gear since 2005
            </p>
          </div>
        </div>
      </div>

      {/* Our Story Section */}
      <SectionWrapper bgColor="bg-white">
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="md:w-1/2">
            <SectionTitle>Our Story</SectionTitle>
            <SectionParagraph>
              Summit Supply was born from a passion for the mountains and a
              frustration with unreliable gear. Our founder, Alex Mountainson,
              experienced equipment failure during a critical climb in the
              Cascades in 2004. This near-disaster sparked a mission: to create
              a company dedicated to providing mountaineers with gear they could
              trust with their lives.
            </SectionParagraph>
            <SectionParagraph>
              Starting from a small garage in Seattle, we've grown into a
              trusted name in mountaineering equipment. Our team consists of
              avid climbers, former mountain guides, and outdoor enthusiasts who
              test every product in real-world conditions before it reaches our
              shelves.
            </SectionParagraph>
            <SectionParagraph>
              Today, Summit Supply serves mountaineers across the globe, but our
              core values remain unchanged: uncompromising quality, expert
              knowledge, and a deep respect for the mountains.
            </SectionParagraph>
          </div>
          <div className="md:w-1/2 relative rounded-md overflow-hidden">
            <img
              src={ClimbingImage}
              alt="Founder climbing a mountain"
              className="w-full h-full object-cover"
              loading="lazy"
            />
          </div>
        </div>
      </SectionWrapper>

      {/* Values Section */}
      <SectionWrapper bgColor="bg-gray-300">
        <div className="text-center">
          <SectionTitle>Our Values</SectionTitle>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <ValueCard
            icon={<Shield className="h-6 w-6 text-emerald-600" />}
            title="Reliability"
            description="We stand behind every product we sell, because lives depend on it."
            bgColor="bg-emerald-100"
          />
          <ValueCard
            icon={<Award className="h-6 w-6 text-blue-600" />}
            title="Quality"
            description="We source and test the finest mountaineering equipment available."
            bgColor="bg-blue-100"
          />
          <ValueCard
            icon={<Users className="h-6 w-6 text-amber-600" />}
            title="Community"
            description="We support the mountaineering community through education and outreach."
            bgColor="bg-amber-100"
          />
          <ValueCard
            icon={<Mountain className="h-6 w-6 text-purple-600" />}
            title="Respect"
            description="We honor the mountains through sustainable practices and conservation efforts."
            bgColor="bg-purple-100"
          />
        </div>
      </SectionWrapper>

      {/* Experience Section */}
      <SectionWrapper bgColor="bg-white">
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="md:w-1/2">
            <SectionTitle>Our Experience</SectionTitle>
            <SectionParagraph>
              With over 50 combined years of mountaineering experience, our team
              has summited peaks on six continents. From Everest to Aconcagua,
              from technical alpine routes to high-altitude expeditions, we've
              been there and know what gear works.
            </SectionParagraph>
            <SectionParagraph>
              This firsthand knowledge informs every product we select. We don't
              just sell gear—we use it ourselves in the most demanding
              conditions on Earth.
            </SectionParagraph>
            <ExperienceStats />
          </div>
          <div className="md:w-1/2 grid grid-cols-2 gap-4">
            {[
              ExperienceImage1,
              ExperienceImage2,
              ExperienceImage3,
              ExperienceImage4,
            ].map((image, index) => (
              <ImageCard
                key={`exp-img-${index}`}
                image={image}
                alt={`Experience ${index + 1}`}
              />
            ))}
          </div>
        </div>
      </SectionWrapper>

      {/* CTA Section */}
      <SectionWrapper bgColor="bg-yellow-600 text-white">
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-6">
            Ready to Gear Up for Your Next Adventure?
          </h2>
          <p className="text-xl mb-8 max-w-2xl mx-auto">
            Explore our selection of premium mountaineering equipment, tested
            and trusted by professionals.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              asChild
              size="lg"
              className="bg-white text-emerald-700 hover:bg-gray-300"
            >
              <a href="/shop">Shop Our Gear</a>
            </Button>
            <Button
              asChild
              size="lg"
              className="text-primary bg-emerald-500 hover:bg-emerald-600"
            >
              <a href="/contact">Contact Our Experts</a>
            </Button>
          </div>
        </div>
      </SectionWrapper>
    </div>
  );
};

// Reusable Components
interface SectionWrapperProps {
  bgColor: string;
  children: React.ReactNode;
}

const SectionWrapper: FC<SectionWrapperProps> = ({ bgColor, children }) => (
  <section className={`py-16 ${bgColor}`}>
    <div className="container mx-auto px-4">{children}</div>
  </section>
);

const SectionTitle: FC<{ children: React.ReactNode }> = ({ children }) => (
  <h2 className="text-3xl font-bold mb-6 text-gray-800">{children}</h2>
);

const SectionParagraph: FC<{ children: React.ReactNode }> = ({ children }) => (
  <p className="text-gray-600 mb-4">{children}</p>
);

interface ValueCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  bgColor: string;
}

const ValueCard: FC<ValueCardProps> = ({
  icon,
  title,
  description,
  bgColor,
}) => (
  <div className="bg-white p-6 rounded-lg shadow-sm flex flex-col items-center text-center">
    <div
      className={`h-12 w-12 ${bgColor} rounded-full flex items-center justify-center mb-4`}
    >
      {icon}
    </div>
    <h3 className="text-xl font-semibold mb-2 text-gray-800">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const ExperienceStats: FC = () => (
  <div className="space-y-3">
    <StatItem
      icon={<MapPin className="h-5 w-5 text-emerald-600" />}
      text="7 Summits completed by our team"
    />
    <StatItem
      icon={<MapPin className="h-5 w-5 text-emerald-600" />}
      text="30+ Expeditions led worldwide"
    />
    <StatItem
      icon={<MapPin className="h-5 w-5 text-emerald-600" />}
      text="100% Safety record on guided climbs"
    />
  </div>
);

interface StatItemProps {
  icon: React.ReactNode;
  text: string;
}

const StatItem: FC<StatItemProps> = ({ icon, text }) => (
  <div className="flex items-center gap-2 text-gray-700">
    {icon}
    <span>{text}</span>
  </div>
);

interface ImageCardProps {
  image: string;
  alt: string;
}

const ImageCard: FC<ImageCardProps> = ({ image, alt }) => (
  <div className="relative aspect-[4/3] overflow-hidden rounded-md shadow-lg">
    <img
      src={image}
      alt={alt}
      className="object-cover w-full h-full"
      loading="lazy"
    />
  </div>
);

export default AboutPage;
