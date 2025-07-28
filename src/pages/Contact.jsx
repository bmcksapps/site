import ContactForm from "../components/ContactForm";

export default function Contact() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-[#0d1117] to-[#1c1f26] flex flex-col items-center justify-center px-6 py-20">
      <div className="text-center mb-10">
        <h1 className="text-4xl md:text-5xl font-bold text-white">📬 Contact Us</h1>
        <p className="text-gray-400 mt-2 max-w-xl mx-auto">
          Have a question, idea, or partnership proposal? Drop us a message and we’ll get back to you shortly.
        </p>
      </div>

      <div className="w-full max-w-xl animate-fade-in-up">
        <ContactForm />
      </div>
    </div>
  );
}
