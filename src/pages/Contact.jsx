import { motion, useInView } from "framer-motion";
import { PageHero } from "@/components/PageHero";
import { SectionHeader } from "@/components/SectionHeader";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { MapPin, Phone, Mail, Clock, ChevronDown, Send, MessageCircle, Navigation, Copy, Check, Star, Users, Building, Award, Calendar, User, School, CalendarDays, Clock as ClockIcon } from "lucide-react";
import { toast } from "sonner";
import heroContact from "@/assets/conatctus.png";
import { useLanguage } from "@/contexts/LanguageContext";
import { useState, useEffect, useRef } from "react";

// Animated Counter Component
const AnimatedCounter = ({ end, duration = 2000, suffix = "" }) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.5 });
  
  useEffect(() => {
    if (isInView) {
      let startTime = null;
      let animationFrame;
      
      const animate = (currentTime) => {
        if (!startTime) startTime = currentTime;
        const progress = Math.min((currentTime - startTime) / duration, 1);
        
        const easeOutQuart = 1 - Math.pow(1 - progress, 4);
        const currentCount = Math.floor(easeOutQuart * end);
        
        setCount(currentCount);
        
        if (progress < 1) {
          animationFrame = requestAnimationFrame(animate);
        } else {
          setCount(end);
        }
      };
      
      animationFrame = requestAnimationFrame(animate);
      
      return () => {
        if (animationFrame) cancelAnimationFrame(animationFrame);
      };
    }
  }, [isInView, end, duration]);
  
  return (
    <span ref={ref}>
      {count}{suffix}
    </span>
  );
};

const Contact = () => {
  const { t } = useLanguage();
  const [copiedField, setCopiedField] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    alternatePhone: '',
    studentName: '',
    grade: '',
    preferredContactTime: '',
    preferredContactMethod: 'email',
    subject: '',
    message: '',
    newsletterSubscribe: false
  });
  const [isSubmitting, setIsSubmitting] = useState(false);

  const SUBJECT_OPTIONS = [
    t("contact.subjectGeneral"),
    t("contact.subjectAdmissions"),
    t("contact.subjectFees"),
    t("contact.subjectAcademic"),
    t("contact.subjectScholarships"),
    t("contact.subjectVisit"),
    t("contact.subjectPTM"),
    t("contact.subjectComplaint"),
    t("contact.subjectOther"),
  ];

  const GRADE_OPTIONS = [
    "Pre-Nursery",
    "Nursery", 
    "LKG",
    "UKG",
    "1st Standard",
    "2nd Standard",
    "3rd Standard",
    "4th Standard",
    "5th Standard",
    "6th Standard",
    "7th Standard",
    "8th Standard",
    "9th Standard",
    "10th Standard",
    "11th Standard (Science)",
    "11th Standard (Commerce)",
    "11th Standard (Arts)",
    "12th Standard (Science)",
    "12th Standard (Commerce)",
    "12th Standard (Arts)"
  ];

  const CONTACT_TIME_OPTIONS = [
    "Any time",
    "Morning (9 AM - 12 PM)",
    "Afternoon (12 PM - 3 PM)",
    "Evening (3 PM - 6 PM)",
    "Weekend only"
  ];

  const handleCopy = (text, field) => {
    navigator.clipboard.writeText(text);
    setCopiedField(field);
    toast.success(`${field} copied to clipboard!`);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const handleInputChange = (e) => {
    const { id, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [id]: type === 'checkbox' ? checked : value
    });
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    // Prepare data for submission
    const submissionData = {
      ...formData,
      submittedAt: new Date().toISOString(),
      userAgent: navigator.userAgent,
      pageUrl: window.location.href
    };
    
    console.log("Form submitted:", submissionData);
    
    // Simulate API call
    await new Promise(resolve => setTimeout(resolve, 1500));
    
    toast.success(t("contact.toastSuccess"), {
      description: "We'll get back to you within 24 hours.",
      duration: 5000,
    });
    
    // Reset form
    setFormData({
      name: '',
      email: '',
      phone: '',
      alternatePhone: '',
      studentName: '',
      grade: '',
      preferredContactTime: '',
      preferredContactMethod: 'email',
      subject: '',
      message: '',
      newsletterSubscribe: false
    });
    setIsSubmitting(false);
  };

  const items = [
    { 
      icon: MapPin, 
      label: t("contact.mainCampus"), 
      value: "108, Saraswati Marg, Bengaluru — 560001",
      copyable: true,
      action: () => window.open('https://maps.google.com/?q=108+Saraswati+Marg+Bengaluru', '_blank')
    },
    { 
      icon: Phone,  
      label: t("contact.callUs"),      
      value: "+91 98765 43210",
      copyable: true,
      action: () => window.location.href = 'tel:+919876543210'
    },
    { 
      icon: Phone,  
      label: "Emergency Contact",      
      value: "+91 98765 43211",
      copyable: true,
      action: () => window.location.href = 'tel:+919876543211'
    },
    { 
      icon: Mail,   
      label: t("contact.email"),       
      value: "hello@psvidyamandir.in",
      copyable: true,
      action: () => window.location.href = 'mailto:hello@psvidyamandir.in'
    },
    { 
      icon: Mail,   
      label: "Admissions Email",       
      value: "admissions@psvidyamandir.in",
      copyable: true,
      action: () => window.location.href = 'mailto:admissions@psvidyamandir.in'
    },
    { 
      icon: Clock,  
      label: t("contact.officeHours"), 
      value: "Mon – Sat · 8 AM – 5 PM",
      copyable: false
    },
  ];

  const stats = [
    { icon: Users, value: 5000, label: "Students", suffix: "+" },
    { icon: Building, value: 50, label: "Classrooms", suffix: "+" },
    { icon: Award, value: 25, label: "Years of Excellence", suffix: "+" },
    { icon: Star, value: 98, label: "Parent Satisfaction", suffix: "%" },
  ];

  const directionsLink = "https://maps.google.com/?q=Pratap+Saraswati+Vidya+Mandir+Bengaluru";

  return (
    <>
      <PageHero
        title={t("contact.heroTitle")}
        sanskrit="॥ अतिथि देवो भव ॥"
        subtitle={t("contact.heroSubtitle")}
        image={heroContact}
        size="full"
      />

      {/* Stats Section with Animated Counters */}
      <section className="bg-gradient-to-r from-primary/5 via-gold/5 to-primary/5 py-12 border-y border-gold/20">
        <div className="container-narrow">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center group cursor-pointer"
              >
                <motion.div
                  whileHover={{ scale: 1.1, rotate: 5 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <stat.icon className="h-8 w-8 mx-auto text-primary mb-3 group-hover:text-gold transition-colors" />
                </motion.div>
                <div className="text-2xl md:text-3xl font-bold text-primary">
                  <AnimatedCounter end={stat.value} duration={2000} suffix={stat.suffix} />
                </div>
                <div className="text-xs text-muted-foreground mt-1 group-hover:text-primary transition-colors">
                  {stat.label}
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="container-narrow py-16">
        <div className="grid lg:grid-cols-5 gap-10 items-start">

          {/* Left — Enhanced Form */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5 }}
            className="lg:col-span-3"
          >
            <SectionHeader
              eyebrow={t("contact.eyebrow")}
              title={t("contact.formTitle")}
              subtitle="Please fill in all required details for a quick response"
              center={false}
            />
            <div className="rounded-2xl bg-card p-8 border border-gold/30 shadow-temple mt-6">
              <form onSubmit={onSubmit} className="space-y-5">
                {/* Parent/Guardian Information */}
                <div className="space-y-3">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <User className="h-4 w-4" />
                    Parent/Guardian Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="name">Full Name *</Label>
                      <Input 
                        id="name" 
                        required 
                        className="mt-1.5"
                        value={formData.name}
                        onChange={handleInputChange}
                        placeholder="Your full name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="email">Email Address *</Label>
                      <Input 
                        id="email" 
                        type="email" 
                        required 
                        className="mt-1.5"
                        value={formData.email}
                        onChange={handleInputChange}
                        placeholder="you@example.com"
                      />
                    </div>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="phone">Phone Number *</Label>
                      <Input 
                        id="phone" 
                        type="tel" 
                        required 
                        className="mt-1.5"
                        value={formData.phone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">Primary contact number</p>
                    </div>
                    <div>
                      <Label htmlFor="alternatePhone">Alternate Phone Number</Label>
                      <Input 
                        id="alternatePhone" 
                        type="tel" 
                        className="mt-1.5"
                        value={formData.alternatePhone}
                        onChange={handleInputChange}
                        placeholder="+91 98765 43210"
                      />
                      <p className="text-[10px] text-muted-foreground mt-1">Optional</p>
                    </div>
                  </div>
                </div>

                {/* Student Information */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <School className="h-4 w-4" />
                    Student Information
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="studentName">Student's Full Name</Label>
                      <Input 
                        id="studentName" 
                        className="mt-1.5"
                        value={formData.studentName}
                        onChange={handleInputChange}
                        placeholder="Student's name"
                      />
                    </div>
                    <div>
                      <Label htmlFor="grade">Grade/Class Applying For *</Label>
                      <div className="relative mt-1.5">
                        <select
                          id="grade"
                          required
                          value={formData.grade}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                        >
                          <option value="" disabled>Select Grade</option>
                          {GRADE_OPTIONS.map(grade => (
                            <option key={grade} value={grade}>{grade}</option>
                          ))}
                        </select>
                        <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Inquiry Details */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <MessageCircle className="h-4 w-4" />
                    Inquiry Details
                  </h3>
                  <div>
                    <Label htmlFor="subject">Subject *</Label>
                    <div className="relative mt-1.5">
                      <select
                        id="subject"
                        required
                        value={formData.subject}
                        onChange={handleInputChange}
                        className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                      >
                        <option value="" disabled>Select Subject</option>
                        {SUBJECT_OPTIONS.map(opt => (
                          <option key={opt} value={opt}>{opt}</option>
                        ))}
                      </select>
                      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                    </div>
                  </div>
                  
                  <div>
                    <Label htmlFor="message">Message *</Label>
                    <Textarea 
                      id="message" 
                      rows={5} 
                      required 
                      className="mt-1.5 resize-none"
                      value={formData.message}
                      onChange={handleInputChange}
                      placeholder="Please provide details about your inquiry (e.g., admission for specific grade, fee structure inquiry, etc.)"
                    />
                  </div>
                </div>

                {/* Contact Preferences */}
                <div className="space-y-3 pt-2">
                  <h3 className="text-sm font-semibold text-primary flex items-center gap-2">
                    <Calendar className="h-4 w-4" />
                    Contact Preferences
                  </h3>
                  <div className="grid sm:grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="preferredContactTime">Preferred Contact Time</Label>
                      <div className="relative mt-1.5">
                        <select
                          id="preferredContactTime"
                          value={formData.preferredContactTime}
                          onChange={handleInputChange}
                          className="w-full appearance-none rounded-md border border-input bg-background px-3 py-2 pr-9 text-sm shadow-sm transition-colors focus:outline-none focus:ring-1 focus:ring-primary text-foreground"
                        >
                          <option value="">Select preferred time</option>
                          {CONTACT_TIME_OPTIONS.map(time => (
                            <option key={time} value={time}>{time}</option>
                          ))}
                        </select>
                        <ClockIcon className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                      </div>
                    </div>
                    <div>
                      <Label htmlFor="preferredContactMethod">Preferred Contact Method</Label>
                      <div className="flex gap-4 mt-2">
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="preferredContactMethod"
                            name="preferredContactMethod"
                            value="phone"
                            checked={formData.preferredContactMethod === 'phone'}
                            onChange={handleInputChange}
                            className="h-3 w-3"
                          />
                          <span className="text-sm">Phone</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="preferredContactMethod"
                            name="preferredContactMethod"
                            value="email"
                            checked={formData.preferredContactMethod === 'email'}
                            onChange={handleInputChange}
                            className="h-3 w-3"
                          />
                          <span className="text-sm">Email</span>
                        </label>
                        <label className="flex items-center gap-2">
                          <input
                            type="radio"
                            id="preferredContactMethod"
                            name="preferredContactMethod"
                            value="whatsapp"
                            checked={formData.preferredContactMethod === 'whatsapp'}
                            onChange={handleInputChange}
                            className="h-3 w-3"
                          />
                          <span className="text-sm">WhatsApp</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Additional Options */}
                <div className="space-y-3">
                  <label className="flex items-center gap-2 cursor-pointer">
                    <input
                      type="checkbox"
                      id="newsletterSubscribe"
                      checked={formData.newsletterSubscribe}
                      onChange={handleInputChange}
                      className="h-4 w-4 rounded border-gold/30 text-primary focus:ring-primary"
                    />
                    <span className="text-sm text-muted-foreground">
                      Subscribe to our newsletter for updates on events, admissions, and academic news
                    </span>
                  </label>
                </div>

                {/* Required fields notice */}
                <p className="text-xs text-muted-foreground">* Required fields</p>

                <Button 
                  type="submit" 
                  variant="hero" 
                  size="lg" 
                  className="w-full gap-2"
                  disabled={isSubmitting}
                >
                  {isSubmitting ? (
                    <>
                      <div className="h-4 w-4 animate-spin rounded-full border-2 border-white border-t-transparent" />
                      Sending...
                    </>
                  ) : (
                    <>
                      <Send className="h-4 w-4" />
                      Send Inquiry
                    </>
                  )}
                </Button>
              </form>
            </div>
          </motion.div>

          {/* Right — info panel */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true, amount: 0.05 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="lg:col-span-2 flex flex-col gap-5"
          >
            {/* Sanskrit callout */}
            <motion.div 
              className="rounded-2xl bg-gradient-festive text-primary-foreground p-6 shadow-warm relative overflow-hidden group cursor-pointer"
              whileHover={{ scale: 1.02 }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              <div className="absolute inset-0 bg-[radial-gradient(circle_at_80%_20%,hsl(43_95%_88%/0.2),transparent_55%)]" />
              <div className="relative z-10">
                <p className="font-sanskrit text-2xl text-gold mb-3">॥ अतिथि देवो भव ॥</p>
                <p className="text-sm leading-relaxed opacity-90">
                  "The guest is God." At Pratap Saraswati Vidya Mandir, every parent, student, and visitor is welcomed with warmth and respect.
                </p>
                <div className="mt-4 flex items-center gap-2 text-xs text-white/70">
                  <MessageCircle className="h-3.5 w-3.5" />
                  We respond within one working day
                </div>
              </div>
            </motion.div>

            {/* Contact info with copy functionality */}
            <div className="rounded-2xl bg-card border border-gold/20 shadow-soft overflow-hidden">
              <div className="h-1 w-full bg-gradient-festive" />
              <div className="divide-y divide-gold/10 max-h-[500px] overflow-y-auto">
                {items.map(({ icon: Icon, label, value, copyable, action }, idx) => (
                  <motion.div
                    key={label}
                    initial={{ opacity: 0, x: 12 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true, amount: 0.05 }}
                    transition={{ delay: idx * 0.07 }}
                    className="flex items-start gap-3 px-5 py-4 group hover:bg-primary/5 transition-colors cursor-pointer"
                    onClick={action}
                  >
                    <motion.span 
                      className="mt-0.5 flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10 text-primary"
                      whileHover={{ scale: 1.1, rotate: 5 }}
                    >
                      <Icon className="h-4 w-4" />
                    </motion.span>
                    <div className="flex-1">
                      <p className="text-[10px] uppercase tracking-widest font-bold text-primary/70">{label}</p>
                      <div className="flex items-center gap-2 mt-0.5">
                        <p className="text-sm text-foreground/80">{value}</p>
                        {copyable && (
                          <button
                            onClick={(e) => {
                              e.stopPropagation();
                              handleCopy(value, label);
                            }}
                            className="opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            {copiedField === label ? (
                              <Check className="h-3.5 w-3.5 text-green-500" />
                            ) : (
                              <Copy className="h-3.5 w-3.5 text-muted-foreground hover:text-primary" />
                            )}
                          </button>
                        )}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="grid grid-cols-2 gap-3">
              <Button
                variant="outline"
                className="border-gold/30 hover:bg-gold/10 group"
                onClick={() => window.open(directionsLink, '_blank')}
              >
                <Navigation className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                Get Directions
              </Button>
              <Button
                variant="outline"
                className="border-gold/30 hover:bg-gold/10 group"
                onClick={() => window.open('https://wa.me/919876543210', '_blank')}
              >
                <MessageCircle className="h-4 w-4 mr-2 group-hover:animate-pulse" />
                WhatsApp
              </Button>
            </div>

            {/* Quick Info Card */}
            <div className="rounded-2xl bg-gradient-to-br from-primary/5 to-gold/5 p-5 border border-gold/20">
              <h4 className="font-semibold text-primary mb-2 flex items-center gap-2">
                <CalendarDays className="h-4 w-4" />
                Upcoming Events
              </h4>
              <div className="space-y-2 text-sm">
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Open House:</span>
                  <span className="font-medium">15th January 2026</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Admission Deadline:</span>
                  <span className="font-medium">31st March 2026</span>
                </p>
                <p className="flex justify-between">
                  <span className="text-muted-foreground">Parent-Teacher Meet:</span>
                  <span className="font-medium">1st Saturday every month</span>
                </p>
              </div>
            </div>
          </motion.div>
        </div>

        {/* Google Maps Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.2 }}
          className="mt-16"
        >
          <SectionHeader
            eyebrow="Find Us"
            title="Visit Our Campus"
            subtitle="Located in the heart of Bengaluru with easy access from all major areas"
            center={true}
          />
          
          <div className="mt-8 rounded-2xl overflow-hidden shadow-temple border border-gold/20">
            <div className="relative w-full h-[400px] md:h-[450px]">
              <iframe
                title="School Location Map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.042184634083!2d77.5946345!3d12.9715987!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae1670c9b44e6d%3A0xf8dfc3e8517e4fe0!2sBengaluru%2C%20Karnataka!5e0!3m2!1sen!2sin!4v1700000000000!5m2!1sen!2sin"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="filter grayscale-[10%] hover:grayscale-0 transition-all duration-500"
              ></iframe>
              
              {/* Map overlay with info */}
              <motion.div 
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                className="absolute bottom-4 right-4 bg-white/95 backdrop-blur-sm rounded-lg p-3 shadow-lg max-w-[200px] text-xs border border-gold/30"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="h-3 w-3 text-primary" />
                  <span className="font-medium">108, Saraswati Marg</span>
                </div>
                <p className="text-muted-foreground mt-1">Near City Center, Bengaluru</p>
                <button
                  onClick={() => window.open(directionsLink, '_blank')}
                  className="mt-2 text-primary text-xs font-medium hover:underline w-full text-center"
                >
                  Open in Google Maps →
                </button>
              </motion.div>
            </div>
          </div>

          {/* Nearby Landmarks */}
          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-3">
            {[
              { name: "City Metro Station", distance: "500m" },
              { name: "Central Bus Stand", distance: "1.2km" },
              { name: "City Hospital", distance: "800m" },
              { name: "Central Park", distance: "1.5km" },
            ].map((landmark, idx) => (
              <motion.div
                key={landmark.name}
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
                whileHover={{ scale: 1.05, y: -2 }}
                className="text-center p-2 rounded-lg bg-muted/30 cursor-pointer hover:bg-primary/10 transition-all"
              >
                <p className="text-xs font-medium">{landmark.name}</p>
                <p className="text-[10px] text-muted-foreground">{landmark.distance}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>

        {/* FAQ / Help Section */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.05 }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-16 pt-8 border-t border-gold/20"
        >
          <div className="text-center mb-8">
            <h3 className="text-2xl font-bold text-primary">Frequently Asked Questions</h3>
            <p className="text-muted-foreground mt-2">Quick answers to common queries</p>
          </div>
          
          <div className="grid md:grid-cols-2 gap-6">
            {[
              { q: "How can I schedule a campus tour?", a: "Call us or fill out the form above to book a personal campus tour during school hours." },
              { q: "What are the admission deadlines?", a: "Admissions open in January each year. Contact our admission office for exact dates." },
              { q: "Is transportation available?", a: "Yes, we provide school bus service across major areas of Bengaluru." },
              { q: "How to pay fees online?", a: "Login to our parent portal or visit the school's fee counter during office hours." },
              { q: "What documents are needed for admission?", a: "Birth certificate, previous school records, transfer certificate, and passport photos." },
              { q: "Is there a scholarship program?", a: "Yes, we offer merit-based and need-based scholarships. Contact admissions for details." },
            ].map((faq, idx) => (
              <motion.div
                key={faq.q}
                initial={{ opacity: 0, x: idx % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ scale: 1.02, y: -2 }}
                className="p-4 rounded-xl bg-card border border-gold/20 hover:shadow-md transition-all cursor-pointer"
              >
                <h4 className="font-semibold text-primary mb-2">{faq.q}</h4>
                <p className="text-sm text-muted-foreground">{faq.a}</p>
              </motion.div>
            ))}
          </div>
        </motion.div>
      </section>
    </>
  );
};

export default Contact;