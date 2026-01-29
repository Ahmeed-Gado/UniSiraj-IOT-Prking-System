'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { Mail, Github, Linkedin, Send } from 'lucide-react';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { slideInFromBottom } from '@/lib/utils/animations';

export default function ContactPage() {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        message: '',
    });
    const [submitted, setSubmitted] = useState(false);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        // In production, this would send to a backend API
        console.log('Form submitted:', formData);
        setSubmitted(true);
        setTimeout(() => setSubmitted(false), 3000);
    };

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value,
        });
    };

    return (
        <div className="min-h-screen pt-24 pb-12 px-4">
            <div className="container mx-auto max-w-4xl">
                {/* Header */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-center mb-16"
                >
                    <h1 className="text-5xl font-bold font-display mb-4">
                        Get In <span className="bg-gradient-to-r from-brand-gold to-accent-cyan bg-clip-text text-transparent">Touch</span>
                    </h1>
                    <p className="text-xl text-gray-400">
                        Have questions? We'd love to hear from you.
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                    {/* Contact Form */}
                    <motion.div
                        variants={slideInFromBottom}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                    >
                        <Card>
                            <h2 className="text-2xl font-bold mb-6">Send a Message</h2>
                            <form onSubmit={handleSubmit} className="space-y-4">
                                <div>
                                    <label htmlFor="name" className="block text-sm font-medium mb-2">
                                        Name
                                    </label>
                                    <input
                                        type="text"
                                        id="name"
                                        name="name"
                                        value={formData.name}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium mb-2">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        id="email"
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="message" className="block text-sm font-medium mb-2">
                                        Message
                                    </label>
                                    <textarea
                                        id="message"
                                        name="message"
                                        value={formData.message}
                                        onChange={handleChange}
                                        required
                                        rows={5}
                                        className="w-full px-4 py-3 bg-white/5 border border-white/10 rounded-lg focus:outline-none focus:ring-2 focus:ring-accent-cyan resize-none"
                                    />
                                </div>

                                <Button type="submit" variant="primary" className="w-full">
                                    {submitted ? (
                                        'Message Sent! ✓'
                                    ) : (
                                        <>
                                            Send Message
                                            <Send className="w-4 h-4 ml-2" />
                                        </>
                                    )}
                                </Button>
                            </form>
                        </Card>
                    </motion.div>

                    {/* Contact Info */}
                    <motion.div
                        variants={slideInFromBottom}
                        initial="hidden"
                        whileInView="visible"
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="space-y-6"
                    >
                        {/* Developer Profile */}
                        <Card className="mb-6">
                            <div className="flex flex-col items-center text-center">
                                <div className="relative w-32 h-32 mb-4 rounded-full overflow-hidden ring-4 ring-accent-cyan/20">
                                    <Image
                                        src="/ahmed-jado.jpg"
                                        alt="Ahmed Jado"
                                        fill
                                        className="object-cover"
                                    />
                                </div>
                                <h3 className="text-xl font-bold mb-1">Ahmed Jado</h3>
                                <p className="text-accent-cyan text-sm font-medium mb-2">Junior IoT Developer & AI Automation Developer</p>
                                <p className="text-gray-400 text-sm">UniSiraj Smart Parking System</p>
                            </div>
                        </Card>

                        <Card>
                            <h2 className="text-2xl font-bold mb-6">Contact Information</h2>
                            <div className="space-y-4">
                                <ContactItem
                                    icon={Mail}
                                    label="Email"
                                    value="GADO21774@GMAIL.COM"
                                    href="mailto:GADO21774@GMAIL.COM"
                                />
                                <ContactItem
                                    icon={Github}
                                    label="GitHub"
                                    value="github.com/Ahmeed-Gado"
                                    href="https://github.com/Ahmeed-Gado"
                                />
                                <ContactItem
                                    icon={Linkedin}
                                    label="LinkedIn"
                                    value="Ahmed Jado"
                                    href="https://www.linkedin.com/in/ahmed-jado-88a932365"
                                />
                            </div>
                        </Card>

                        <Card>
                            <h3 className="text-xl font-bold mb-4">Project Details</h3>
                            <div className="space-y-2 text-gray-400 text-sm">
                                <p><strong className="text-white">University:</strong> Tiankiu Syed Sirajuddin International Islamic University</p>
                                <p><strong className="text-white">Project Type:</strong> Final Year Project</p>
                                <p><strong className="text-white">Year:</strong> 2026</p>
                                <p><strong className="text-white">Category:</strong> IoT & Smart Systems</p>
                            </div>
                        </Card>
                    </motion.div>
                </div>
            </div>
        </div>
    );
}

function ContactItem({
    icon: Icon,
    label,
    value,
    href,
}: {
    icon: React.ElementType;
    label: string;
    value: string;
    href: string;
}) {
    return (
        <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-start gap-4 p-4 rounded-lg bg-white/5 hover:bg-white/10 transition-colors group"
        >
            <div className="p-2 rounded-lg bg-accent-cyan/10 group-hover:bg-accent-cyan/20 transition-colors">
                <Icon className="w-5 h-5 text-accent-cyan" />
            </div>
            <div>
                <div className="text-sm text-gray-400 mb-1">{label}</div>
                <div className="font-medium group-hover:text-accent-cyan transition-colors">{value}</div>
            </div>
        </a>
    );
}
