

export default function AboutUs() {
  return (
    <section className=" w-full grid grid-cols-1 md:grid-cols-2 mb-3">
      <div className="bg-blue-950/90 flex items-center justify-center px-3 lg:px-0 h-[300px] md:h-[350px]">
        <div className="max-w-[450px] mx-auto">
          <h2 className="about text-xl font-medium mb-1.5">
            Arena Trade Hub is Trusted & Secure
          </h2>
          <p className="about text-xs w-[85%]">
            All of your information is encrypted and secured safely with state
            of the art security standards. Feel free to contact us for more
            information about how we protect your data.
          </p>
        </div>
      </div>
      <div className="h-[300px] md:h-[350px]">
        <img
          src={'/images/products/secure.jpg'}
          alt="security image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="h-[300px] md:h-[350px]">
        <img
          src={'/images/products/secure.jpg'}
          alt="security image"
          className="object-cover w-full h-full"
        />
      </div>
      <div className="bg-neutral-50 flex items-center justify-center px-3 lg:px-0 h-[300px] md:h-[350px]">
        <div className="max-w-[450px] mx-auto">
          <h2 className="text-xl font-medium mb-1.5">
            Quality Products & Transparent Pricing
          </h2>
          <p className="text-xs w-[85%]">
            At Arena Trade Hub, there are no hidden charges. We offer high
            quality local and international products, and the price you see is
            the same price at check out.
          </p>
        </div>
      </div>

      <div className="bg-blue-950/90 flex items-center justify-center px-3 lg:px-0 h-[300px] md:h-[350px]">
        <div className="max-w-[450px] mx-auto">
          <h2 className="about text-xl font-medium mb-1.5">Top Customer Service</h2>
          <p className="about text-xs w-[85%]">
            Call us, visit us online our support team is available around the
            clock to assist you with any inquiries or issues.
          </p>
        </div>
      </div>
      <div className="h-[300px] md:h-[350px]">
        <img
          src={'/images/products/secure.jpg'}
          alt="security image"
          className="object-cover w-full h-full"
        />
      </div>
    </section>
  );
}
