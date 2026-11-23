'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, LoaderCircle, AlertCircle } from 'lucide-react';

export default function ContactSection() {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');
  const formRef = useRef(null);

  useEffect(() => {
    let timeoutId;

    if (isSubmitted) {
      timeoutId = setTimeout(() => {
        setIsSubmitted(false);
        if (formRef.current) {
          formRef.current.reset();
        }
      }, 6000);
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [isSubmitted]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      const formData = new FormData(formRef.current);

      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject') || '',
          message: formData.get('message'),
        }),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || 'Could not send your message.');
      }

      setIsSubmitted(true);
    } catch (err) {
      console.error('Failed to send email:', err);
      setError(
        err?.message ||
          'Something went wrong. Please try again or email me directly.'
      );
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
                  <label
                    htmlFor="contact-name"
                    className="text-sm text-gray-500 dark:text-zinc-500"
                  >
                    Name
                  </label>
                  <input
                    id="contact-name"
                    type="text"
                    name="name"
                    required
                    placeholder="Your Name"
                    className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-coral-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                  />
                </div>
                <div>
                  <label
                    htmlFor="contact-email"
                    className="text-sm text-gray-500 dark:text-zinc-500"
                  >
                    Email
                  </label>
                  <input
                    id="contact-email"
                    type="email"
                    name="email"
                    required
                    placeholder="Your Email"
                    className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-coral-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                  />
                </div>
              </div>
              <div>
                <label
                  htmlFor="contact-subject"
                  className="text-sm text-gray-500 dark:text-zinc-500"
                >
                  Subject <span className="text-zinc-400">(optional)</span>
                </label>
                <input
                  id="contact-subject"
                  type="text"
                  name="subject"
                  placeholder="What's this about?"
                  className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-coral-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                />
              </div>
              <div>
                <label
                  htmlFor="contact-message"
                  className="text-sm text-gray-500 dark:text-zinc-500"
                >
                  Message
                </label>
                <textarea
                  id="contact-message"
                  name="message"
                  required
                  placeholder="Your Message"
                  rows={4}
                  className="w-full bg-white dark:bg-form-bg rounded-lg px-4 py-2 mt-1 placeholder-gray-400 dark:placeholder-zinc-400 focus:outline-none focus:ring-2 focus:ring-coral-500 border border-gray-300 dark:border-none text-gray-900 dark:text-white"
                />
              </div>

              {error && (
                <div className="flex items-start gap-2 rounded-lg bg-coral-500/10 px-4 py-3 text-sm text-coral-600 dark:text-coral-400">
                  <AlertCircle size={16} className="mt-0.5 shrink-0" />
                  <span>{error}</span>
                </div>
              )}

              <button
                type="submit"
                disabled={isLoading}
                className="w-full bg-coral-500 hover:bg-coral-600 text-white py-3 rounded-lg transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isLoading ? (
                  <>
                    <LoaderCircle size={18} className="animate-spin" />
                    <span>Sending...</span>
                  </>
                ) : (
                  <>
                    <Send size={18} />
                    <span>Submit</span>
                  </>
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
