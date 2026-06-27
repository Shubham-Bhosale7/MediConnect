const Contact = () => {
  return (
    <div className="py-10">
      <div className="max-w-6xl mx-auto grid gap-10 lg:grid-cols-[1.1fr_0.9fr]">
        <div className="space-y-6">
          <div className="rounded-3xl border border-gray-200 p-10 shadow-sm">
            <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
              Contact Us
            </p>
            <h1 className="text-4xl font-bold sm:text-5xl">
              Get in touch with MediConnect
            </h1>
            <p className="mt-5 text-gray-600 leading-8">
              Have a question about the platform, need help with an appointment,
              or want to learn more about our services? Send us a message and
              our support team will respond as soon as possible.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <p className="text-xl font-semibold mb-2">Customer Support</p>
              <p className="text-gray-600">support@mediconnect.com</p>
              <p className="text-gray-600 mt-3">+1 (212) 456-7890</p>
            </div>
            <div className="rounded-3xl border border-gray-200 p-8 shadow-sm">
              <p className="text-xl font-semibold mb-2">Office Address</p>
              <p className="text-gray-600">123 Health Avenue</p>
              <p className="text-gray-600">New York, NY 10001</p>
            </div>
          </div>
        </div>

        <div className="rounded-3xl border border-gray-200 p-10 shadow-sm bg-white">
          <form className="space-y-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Name
              </label>
              <input
                type="text"
                placeholder="Your name"
                className="mt-3 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Email
              </label>
              <input
                type="email"
                placeholder="Your email"
                className="mt-3 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Message
              </label>
              <textarea
                rows="5"
                placeholder="How can we help you?"
                className="mt-3 w-full rounded-2xl border border-gray-300 bg-gray-50 px-4 py-3 focus:border-primary focus:outline-none focus:ring-2 focus:ring-primary/20"
              />
            </div>
            <button
              type="submit"
              className="w-full rounded-full bg-primary px-6 py-4 text-sm font-semibold text-white transition hover:bg-primary-dark cursor-pointer"
            >
              Send Message
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Contact;
