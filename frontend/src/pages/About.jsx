const About = () => {
  return (
    <div className="py-10">
      <div className="max-w-5xl mx-auto space-y-10">
        <section className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-primary mb-3">
            About MediConnect
          </p>
          <h1 className="text-4xl font-bold sm:text-5xl">
            A better way to book care
          </h1>
          <p className="mt-5 text-gray-600 leading-8">
            MediConnect brings patients and healthcare professionals together
            with fast appointment booking, virtual care support, and reliable
            health resources. We help you discover the right provider and manage
            your care in one simple experience.
          </p>
        </section>

        <section className="grid gap-8 md:grid-cols-3">
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Trusted Providers</h2>
            <p className="text-gray-600 leading-7">
              Find licensed doctors, specialists and clinics with verified
              profiles, patient ratings, and appointment details in seconds.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Easy Scheduling</h2>
            <p className="text-gray-600 leading-7">
              Book appointments online, view availability, and receive reminders
              so you never miss an important visit.
            </p>
          </div>
          <div className="rounded-3xl border border-gray-200 p-8 shadow-sm hover:shadow-md transition-shadow">
            <h2 className="text-xl font-semibold mb-3">Patient Support</h2>
            <p className="text-gray-600 leading-7">
              Manage your profile, appointments, and care preferences in one
              secure portal built for modern healthcare.
            </p>
          </div>
        </section>

        <section className="grid gap-8 lg:grid-cols-[2fr_1fr] items-center rounded-3xl bg-primary/5 p-10">
          <div>
            <h2 className="text-3xl font-bold mb-4">Our mission</h2>
            <p className="text-gray-700 leading-8">
              We believe everyone should have access to quality healthcare with
              confidence. MediConnect is designed to reduce the friction of
              finding the right provider, simplify booking, and improve
              communication between patients and medical professionals.
            </p>
          </div>
          <div className="space-y-4">
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xl font-semibold">Fast access</p>
              <p className="text-gray-600 mt-2">
                Quickly find doctors by specialty, location, and availability.
              </p>
            </div>
            <div className="rounded-2xl bg-white p-6 shadow-sm">
              <p className="text-xl font-semibold">Community care</p>
              <p className="text-gray-600 mt-2">
                Supportive tools for ongoing care and meaningful medical
                relationships.
              </p>
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default About;
