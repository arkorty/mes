import { useState } from "react";
import { Send, Phone, Mail, MapPin } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import ForestImage from "@/assets/forest.jpg";

const MAX_COMMENT_LENGTH = 2000;

function ContactPage() {
  const [formData, setFormData] = useState({
    email: "",
    phone: "",
    comments: "",
  });

  const [charCount, setCharCount] = useState(0);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | "success" | "error">(
    null
  );

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;

    if (name === "comments") {
      setCharCount(value.length);
    }

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1500));
      setSubmitStatus("success");
      setFormData({
        email: "",
        phone: "",
        comments: "",
      });
      setCharCount(0);
    } catch {
      setSubmitStatus("error");
    } finally {
      setIsSubmitting(false);
      setTimeout(() => setSubmitStatus(null), 5000);
    }
  };

  return (
    <div className="min-h-screen">
      {/* Background and content container */}
      <div className="relative">
        {/* Background image with overlay */}
        <div className="absolute inset-0 -z-10">
          <img
            src={ForestImage}
            alt="Mountain landscape"
            className="object-cover w-full h-full brightness-75"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/60 to-black/30" />
        </div>

        {/* Hero Section */}
        <div className="h-[30vh] flex items-center backdrop-blur-xs">
          <div className="container mx-auto px-4">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-2">
              Contact Us
            </h1>
            <p className="text-xl text-white/90 max-w-2xl">
              We're here to help you prepare for your next adventure
            </p>
          </div>
        </div>

        {/* Contact Form Section */}
        <section className="py-16">
          <div className="container mx-auto px-4">
            <div className="max-w-3xl mx-auto">
              <Card className="border-0 shadow-lg bg-white">
                <CardHeader className="bg-emerald-700 text-white rounded-t-lg">
                  <CardTitle className="text-2xl">Share Your Details</CardTitle>
                  <CardDescription className="text-emerald-100">
                    Share your vacation details with us and we will get back to
                    you with the best gears and options.
                  </CardDescription>
                </CardHeader>
                <CardContent className="p-6">
                  <form onSubmit={handleSubmit} className="space-y-6">
                    <div className="space-y-2">
                      <Label htmlFor="email">Email</Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        value={formData.email}
                        onChange={handleChange}
                        placeholder="your.email@example.com"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">Phone Number</Label>
                      <Input
                        id="phone"
                        name="phone"
                        type="tel"
                        value={formData.phone}
                        onChange={handleChange}
                        placeholder="(123) 456-7890"
                        required
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label htmlFor="comments">
                          Your Comments (Optional)
                        </Label>
                        <span
                          className={`text-sm ${
                            charCount > MAX_COMMENT_LENGTH
                              ? "text-red-500 font-medium"
                              : "text-gray-500"
                          }`}
                        >
                          {charCount}/{MAX_COMMENT_LENGTH}
                        </span>
                      </div>
                      <Textarea
                        id="comments"
                        name="comments"
                        value={formData.comments}
                        onChange={handleChange}
                        placeholder="Tell us about your upcoming adventure and gear needs..."
                        className="min-h-[150px] resize-none"
                        maxLength={MAX_COMMENT_LENGTH}
                      />
                      <p className="text-xs text-gray-500">
                        Max. {MAX_COMMENT_LENGTH} characters
                      </p>
                    </div>

                    <Button
                      type="submit"
                      className="w-full bg-emerald-700 hover:bg-emerald-800"
                      disabled={isSubmitting || charCount > MAX_COMMENT_LENGTH}
                    >
                      {isSubmitting ? (
                        <span className="flex items-center gap-2">
                          <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                          Submitting...
                        </span>
                      ) : (
                        <span className="flex items-center gap-2">
                          Submit <Send className="h-4 w-4" />
                        </span>
                      )}
                    </Button>

                    {submitStatus === "success" && (
                      <div className="p-3 bg-green-100 text-green-700 rounded-md text-center">
                        Thank you! We've received your message and will get back
                        to you soon.
                      </div>
                    )}

                    {submitStatus === "error" && (
                      <div className="p-3 bg-red-100 text-red-700 rounded-md text-center">
                        There was an error submitting your form. Please try
                        again.
                      </div>
                    )}
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </section>
      </div>

      {/* Additional Contact Information */}
      <section className="py-12 bg-white">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto grid md:grid-cols-3 gap-8 text-center">
            <ContactInfoItem icon={<Phone className="h-6 w-6" />} title="Phone">
              (555) 123-4567
            </ContactInfoItem>

            <ContactInfoItem icon={<Mail className="h-6 w-6" />} title="Email">
              info@summitsupply.com
            </ContactInfoItem>

            <ContactInfoItem
              icon={<MapPin className="h-6 w-6" />}
              title="Location"
            >
              123 Mountain Way
              <br />
              Seattle, WA 98101
            </ContactInfoItem>
          </div>
        </div>
      </section>
    </div>
  );
}

interface ContactInfoItemProps {
  icon: React.ReactNode;
  title: string;
  children: React.ReactNode;
}

function ContactInfoItem({ icon, title, children }: ContactInfoItemProps) {
  return (
    <div className="p-6">
      <div className="w-12 h-12 bg-emerald-100 text-emerald-700 rounded-full flex items-center justify-center mx-auto mb-4">
        {icon}
      </div>
      <h3 className="text-lg font-medium mb-2">{title}</h3>
      <p className="text-gray-600">{children}</p>
    </div>
  );
}

export default ContactPage;
