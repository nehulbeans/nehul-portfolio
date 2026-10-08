'use client';

import { useState, useRef, useEffect } from 'react';
import emailjs from '@emailjs/browser';

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const formRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    if (isSubmitted) {
      timeoutId = setTimeout(() => {
        setIsSubmitted(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 5000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);

    try {
      await emailjs.sendForm(
        process.env.NEXT_PUBLIC_EMAILJS_SERVICE_ID,
        process.env.NEXT_PUBLIC_EMAILJS_TEMPLATE_ID,
        formRef.current,
        process.env.NEXT_PUBLIC_EMAILJS_PUBLIC_KEY
      );

      setIsSubmitted(true);
    } catch (error) {
      console.error('Failed to send email:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section id="contact" className="mb-16 w-full">
      <div className="bg-gray-50 dark:bg-custom-bg rounded-3xl px-0 pt-10 lg:px-0">
        {!isSubmitted ? (
          <div className="w-full">
            <h2 className="text-5xl lg:text-8xl font-bold mb-4">
              LET'S WORK
              <span className="text-gray-500 dark:text-zinc-500 lg:text-7xl block">
                TOGETHER
              </span>
            </h2>
            <p className="text-gray-500 dark:text-zinc-500 font-medium text-xl mb-6">
              Let's catch up for a coffee? ☕️ (virtually probably?)
            </p>
            <form ref={formRef} onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm text-gray-500 dark:text-zinc-500">
                    Name
                  </label>
                  <input
                    type="text"
                    name="user_name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label className="text-sm text-gray-500 dark:text-zinc-500">
                    Email
                  </label>
                  <input
                    type="email"
                    name="user_email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label className="text-sm text-gray-500 dark:text-zinc-500">
                  Message
                </label>
                <textarea
                  name="message"
                  required
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-orange-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                />
              </div>
              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-orange-500 hover:bg-orange-600 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center"
              >
                {isLoading ? (
                  <div className="flex items-center gap-2">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    <span>Sending...</span>
                  </div>
                ) : (
                  'Submit'
                )}
              </button>
            </form>
          </div>
        ) : (
          <div className="w-full">
            <div className="text-center py-16 space-y-4">
              <div className="w-16 h-16 bg-green-500 rounded-full mx-auto flex items-center justify-center mb-6">
                <svg
                  className="w-8 h-8 text-white"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
              <h3 className="text-3xl font-bold text-gray-900 dark:text-white">
                Thank You!
              </h3>
              <p className="text-gray-600 dark:text-zinc-400">
                I've received your message and will get back to you soon!
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
