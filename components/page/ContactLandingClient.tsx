// components/page/ContactLandingClient.tsx
"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import * as Lucide from "lucide-react";
import {
  Send,
  Calendar as CalendarIcon,
  MessageSquare,
  CheckCircle,
} from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import type { ContactLandingProps } from "@/lib/mappers/contactLanding";

function IconByName({
  name,
  className,
}: {
  name?: string | null;
  className?: string;
}) {
  if (!name) return <MessageSquare className={className} />;
  const Comp = (Lucide as any)[name] as React.ComponentType<any>;
  return Comp ? (
    <Comp className={className} />
  ) : (
    <MessageSquare className={className} />
  );
}

function isEmail(s: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(s);
}

export default function ContactLandingClient({
  initialData,
}: {
  initialData: ContactLandingProps;
}) {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    service: "", // keep empty to show placeholder
    message: "",
    company: "", // honeypot
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [errors, setErrors] = useState<string[]>([]);
  const [serverError, setServerError] = useState<string | null>(null);

  const handleInputChange = (field: string, value: string) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const validate = () => {
    const e: string[] = [];
    if (!formData.firstName.trim()) e.push("First name is required.");
    if (!formData.lastName.trim()) e.push("Last name is required.");
    if (!formData.email.trim() || !isEmail(formData.email))
      e.push("A valid email is required.");
    if (!formData.message.trim()) e.push("Message is required.");
    return e;
  };

  // inside ContactPage component
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg(null);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });

      const json = await res.json().catch(() => ({}));

      if (!res.ok || json?.ok === false) {
        // Show friendly error; log server details to console for debugging
        console.error("Contact submit failed:", json);
        setErrorMsg(
          json?.message ||
            "Sorry, we couldn’t submit your message. Please try again."
        );
        setIsSubmitting(false);
        return;
      }

      // Success
      setIsSubmitting(false);
      setIsSubmitted(true);
    } catch (err: any) {
      console.error("Contact submit error:", err);
      setErrorMsg("Network error. Please try again.");
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-white pt-16 flex items-center justify-center">
        <motion.div
          initial={{ opacity: 0, scale: 0.92 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="text-center max-w-md mx-auto px-4"
        >
          <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle className="w-10 h-10 text-white" />
          </div>
          <h2 className="text-3xl font-bold text-gray-900 mb-4">Thank you!</h2>
          <p className="text-gray-600 mb-6">
            {initialData.form.successMessage}
          </p>
          {errorMsg && (
            <div className="rounded-md bg-red-50 text-red-700 px-4 py-3 text-sm">
              {errorMsg}
            </div>
          )}
          <Button
            onClick={() => {
              setIsSubmitted(false);
              setErrors([]);
              setServerError(null);
              setFormData({
                firstName: "",
                lastName: "",
                email: "",
                phone: "",
                service: "",
                message: "",
                company: "",
              });
            }}
            className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700"
          >
            Send another message
          </Button>
        </motion.div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white pt-16">
      {/* Hero */}
      <section className="py-20 bg-gradient-to-br from-red-50 via-white to-pink-50 relative overflow-hidden">
        <motion.div
          className="absolute top-20 right-10 w-32 h-32 bg-gradient-to-r from-red-200 to-pink-200 rounded-full opacity-20"
          animate={{ rotate: 360 }}
          transition={{
            duration: 20,
            repeat: Number.POSITIVE_INFINITY,
            ease: "linear",
          }}
        />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center"
          >
            <h1 className="text-5xl md:text-6xl font-bold mb-6">
              <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                {initialData.hero.title}
              </span>
            </h1>
            {initialData.hero.subtitle && (
              <p className="text-xl text-gray-700 mb-2">
                {initialData.hero.subtitle}
              </p>
            )}
            {initialData.hero.descriptionHTML && (
              <div
                className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed"
                dangerouslySetInnerHTML={{
                  __html: initialData.hero.descriptionHTML,
                }}
              />
            )}
          </motion.div>
        </div>
      </section>

      {/* Contact Info Cards */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
            {initialData.cards.map((info, index) => (
              <motion.div
                key={`${info.title}-${index}`}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6, delay: index * 0.06 }}
              >
                <Card className="h-full hover:shadow-lg transition-shadow duration-300">
                  <CardContent className="p-6 text-center">
                    <div
                      className={`w-16 h-16 bg-gradient-to-r ${
                        info.colorClass ?? "from-red-500 to-red-600"
                      } rounded-2xl flex items-center justify-center mx-auto mb-4`}
                    >
                      <IconByName
                        name={info.icon}
                        className="w-8 h-8 text-white"
                      />
                    </div>
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      {info.title}
                    </h3>
                    {(info.details || []).map((detail, idx) => (
                      <p
                        key={idx}
                        className={
                          idx === 0
                            ? "text-gray-900 font-medium"
                            : "text-gray-600 text-sm"
                        }
                      >
                        {detail}
                      </p>
                    ))}
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Form + Calendly */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-12">
            {/* Contact Form */}
            <motion.div
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <MessageSquare className="w-8 h-8 text-red-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      Send us a Message
                    </h2>
                  </div>

                  {/* Errors */}
                  {Boolean(errors.length || serverError) && (
                    <div className="mb-4 rounded-md border border-red-200 bg-red-50 p-3 text-sm text-red-700">
                      {errors.map((e, i) => (
                        <div key={i}>• {e}</div>
                      ))}
                      {serverError && <div>• {serverError}</div>}
                    </div>
                  )}

                  <form
                    onSubmit={handleSubmit}
                    className="space-y-6"
                    noValidate
                  >
                    {/* Honeypot (hidden) */}
                    <input
                      type="text"
                      name="company"
                      autoComplete="off"
                      value={formData.company}
                      onChange={(e) =>
                        handleInputChange("company", e.target.value)
                      }
                      className="hidden"
                      tabIndex={-1}
                    />

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          First Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.firstName}
                          onChange={(e) =>
                            handleInputChange("firstName", e.target.value)
                          }
                          placeholder="Enter your first name"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                          Last Name *
                        </label>
                        <Input
                          type="text"
                          required
                          value={formData.lastName}
                          onChange={(e) =>
                            handleInputChange("lastName", e.target.value)
                          }
                          placeholder="Enter your last name"
                        />
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Email Address *
                      </label>
                      <Input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) =>
                          handleInputChange("email", e.target.value)
                        }
                        placeholder="Enter your email address"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Phone Number
                      </label>
                      <Input
                        type="tel"
                        value={formData.phone}
                        onChange={(e) =>
                          handleInputChange("phone", e.target.value)
                        }
                        placeholder="Enter your phone number"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Service of Interest
                      </label>
                      <Select
                        value={formData.service || undefined}
                        onValueChange={(value) =>
                          handleInputChange("service", value)
                        }
                      >
                        <SelectTrigger className="w-full">
                          <SelectValue placeholder="Select a service" />
                        </SelectTrigger>
                        <SelectContent>
                          {(initialData.form.services || []).map((service) => (
                            <SelectItem key={service} value={service}>
                              {service}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">
                        Message *
                      </label>
                      <Textarea
                        required
                        value={formData.message}
                        onChange={(e) =>
                          handleInputChange("message", e.target.value)
                        }
                        className="h-32"
                        placeholder="Tell us about your immigration goals and any questions you have..."
                      />
                    </div>

                    <Button
                      type="submit"
                      disabled={isSubmitting}
                      className="w-full bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg py-3"
                    >
                      {isSubmitting ? (
                        <div className="flex items-center space-x-2">
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          <span>Sending...</span>
                        </div>
                      ) : (
                        <div className="flex items-center space-x-2">
                          <Send className="w-5 h-5" />
                          <span>Send Message</span>
                        </div>
                      )}
                    </Button>
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Calendly */}
            <motion.div
              id="consultation"
              initial={{ opacity: 0, x: 50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8 }}
            >
              <Card className="h-full">
                <CardContent className="p-8">
                  <div className="flex items-center space-x-3 mb-6">
                    <CalendarIcon className="w-8 h-8 text-red-600" />
                    <h2 className="text-3xl font-bold text-gray-900">
                      {initialData.calendly.title}
                    </h2>
                  </div>

                  <div className="space-y-6">
                    {initialData.calendly.description && (
                      <p className="text-gray-600 text-lg">
                        {initialData.calendly.description}
                      </p>
                    )}

                    <div className="bg-gradient-to-r from-red-50 to-pink-50 rounded-lg p-6">
                      <h3 className="font-semibold text-gray-900 mb-4">
                        What to expect:
                      </h3>
                      <ul className="space-y-2">
                        {(initialData.calendly.expectations || []).map(
                          (item, index) => (
                            <li
                              key={index}
                              className="flex items-center space-x-2"
                            >
                              <CheckCircle className="w-4 h-4 text-green-500" />
                              <span className="text-gray-700">{item}</span>
                            </li>
                          )
                        )}
                      </ul>
                    </div>

                    <div className="text-center">
                      <Button
                        onClick={() => {
                          const link =
                            initialData.calendly.calendlyLink ||
                            "https://calendly.com";
                          window.open(link, "_blank");
                        }}
                        className="bg-gradient-to-r from-red-500 to-red-600 hover:from-red-600 hover:to-red-700 text-lg px-8 py-4 rounded-full"
                      >
                        <CalendarIcon className="mr-3 w-5 h-5" />
                        Schedule Free Consultation
                      </Button>
                    </div>

                    <div className="text-center text-sm text-gray-500">
                      <p>Available Monday - Friday, 9AM - 6PM EST</p>
                      <p>Saturday appointments available upon request</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </section>

      {/* FAQs */}
      {initialData.faqs.length > 0 && (
        <section className="py-20 bg-white">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className="text-center mb-12"
            >
              <h2 className="text-4xl font-bold mb-4">
                <span className="bg-gradient-to-r from-red-600 to-pink-600 bg-clip-text text-transparent">
                  Frequently Asked Questions
                </span>
              </h2>
              <p className="text-xl text-gray-600">
                Quick answers to common questions about our services
              </p>
            </motion.div>

            <div className="space-y-6">
              {initialData.faqs.map((faq, index) => (
                <motion.div
                  key={`${faq.question}-${index}`}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                >
                  <Card className="hover:shadow-md transition-shadow duration-300">
                    <CardContent className="p-6">
                      <h3 className="text-lg font-semibold text-gray-900 mb-3">
                        {faq.question}
                      </h3>
                      <p className="text-gray-600">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      )}
    </div>
  );
}
