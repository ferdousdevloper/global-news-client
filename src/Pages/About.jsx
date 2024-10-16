import React, { useEffect } from "react";
import { FaCaretDown } from "react-icons/fa";
import { Link } from "react-router-dom";
import AOS from "aos";
import "aos/dist/aos.css";

const About = () => {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div className="space-y-4 md:space-y-7 lg:space-y-10 bg-gray-800 text-gray-100 text-opacity-70 container mx-auto pt-20">
      <div className="grid grid-cols-1 md:grid-cols-6 gap-2 my-3 lg:my-4 px-2 md:px-4 lg:px-8">
        <div className="text-3xl font-medium underline col-span-1 md:col-span-2 text-center">
          Our History
        </div>
        <div className="text-justify md:text-start col-span-1 md:col-span-4 px-3 md:px-1">
          Welcome to Global News, where we believe that staying informed should
          be both empowering and accessible to all. In an era where information
          flows faster than ever before, it's crucial to have a trusted source
          that delivers the truth with clarity, precision, and responsibility.
          Global News is that source. We are a digital news platform dedicated
          to bringing you the latest, most important stories from across the
          world, covering events and developments that shape societies,
          economies, and lives. <br /> <br />
          We understand the vital role that news plays in shaping public
          perception and decision-making. Our mission is simple yet essential:
          to provide timely, reliable, and unbiased news coverage that keeps our
          readers ahead of the curve. From breaking political updates and
          economic shifts to emerging trends in technology, health, and culture,
          our goal is to ensure you’re always equipped with the knowledge you
          need to navigate today’s world. <br />
          <br />
          At Global News, we know that the modern reader demands more than just
          headlines. They need context, depth, and a balanced perspective.
          That’s why our team of journalists, editors, and contributors are
          committed to not just reporting on what’s happening, but explaining
          why it’s happening and what it means for you. We dig deeper into the
          stories that matter, asking the critical questions that uncover the
          full picture behind major events. <br /> <br />
          As we continue to grow and expand our coverage, we are committed to
          innovating and adapting to meet the needs of our readers in this
          ever-evolving digital age. Whether you are here to follow the latest
          breaking news or to delve into detailed analyses and special reports,
          we are honored to be your source for reliable, thought-provoking
          journalism.
        </div>
      </div>

      <hr className="border border-gray-100 my-8 md:my-10" />

      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        <div data-aos="fade-down-right" className="col-span-1 md:col-span-3">
          <div className="text-3xl font-medium underline mb-3 text-center">
            What We Cover
          </div>
          <div className="px-2 md:px-6">
            At Global News, we cover a diverse range of topics to ensure our
            readers have access to the most important stories shaping our world.
            Our dedicated team of journalists works around the clock to bring
            you in-depth reporting and analysis on:
            <br /> <br />
            1. Politics: Comprehensive coverage of global political
            developments, elections, and policy changes, with a focus on how
            these events impact society.
            <br />
            2. Business & Economy: Insights into financial markets, economic
            trends, corporate news, and the global economy’s shifts that affect
            businesses and consumers alike.
            <br />
            3. Technology: News on cutting-edge innovations, emerging
            technologies, and their impact on industries and everyday life, from
            AI to cybersecurity.
            <br />
            4. Health & Science: Up-to-date reports on medical advancements,
            health policy, and scientific discoveries that influence public
            health and well-being.
            <br />
            5. Environment: Coverage of climate change, sustainability efforts,
            and environmental policies, along with their social and economic
            implications.
            <br />
            6. Sports: Highlights from global sporting events, in-depth analysis
            of athletes’ performances, and the latest news from major leagues
            and tournaments.
          </div>
        </div>
        <div data-aos="fade-down-left" className="col-span-1 md:col-span-3">
          <img
            className="min-h-full min-w-full hover:scale-105 transition-all duration-300 pr-4 md:pr-10"
            src="https://i.ibb.co.com/fx3wVs7/47ec03bebff5d8e8026a79b1601c7f6e.jpg"
            alt=""
          />
        </div>
      </div>
      <hr className="border border-gray-100 my-8 md:my-10" />
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8">
        <div
          data-aos="fade-right"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="col-span-1 md:col-span-3"
        >
          <img
            className="min-h-full min-w-full hover:scale-105 transition-all pl-2 md:pl-6"
            src="https://i.ibb.co.com/jwDx7nF/360-F-698685684-BNd-KCJLywox-Cmra-GSqps0b-Lre-Fe-URelm.jpg"
            alt=""
          />
        </div>
        <div
          data-aos="fade-left"
          data-aos-offset="300"
          data-aos-easing="ease-in-sine"
          className="col-span-1 md:col-span-3"
        >
          <div className="text-3xl font-medium underline mb-3 text-center">
            Our Vision
          </div>
          <div>
            At Global News, our vision is to become the leading global platform
            for fact-based, unbiased journalism that empowers people to
            understand the world around them. We believe that reliable
            information is a fundamental right and a cornerstone of democracy,
            progress, and positive societal change. In an era of misinformation
            and polarized opinions, we aim to stand as a beacon of truth,
            offering a trusted space where readers can access news that is
            accurate, balanced, and comprehensive. <br /> <br />
            We envision a future where news is not just a passive experience but
            a dynamic, interactive conversation. Our goal is to foster an
            informed and engaged global community by encouraging dialogue,
            participation, and critical thinking. Through multimedia, innovative
            storytelling techniques, and insightful analysis, we aim to make the
            news accessible, engaging, and relevant to people of all backgrounds
            and cultures. <br /> <br />
            Ultimately, our vision is to be more than just a news outlet. We
            strive to be a trusted partner for our readers, providing them with
            the knowledge and perspectives they need to make informed decisions
            in their personal and professional lives, and empowering them to
            contribute to a better, more connected world.
          </div>
        </div>
      </div>
      <hr className="border border-gray-100 my-8 md:my-10" />
      {/* Our values section */}
      <div data-aos="fade-up" data-aos-duration="2000">
        <div className="space-y-4 max-w-5xl mx-auto text-center my-4">
          <div className="text-3xl font-bold underline">Our Values</div>
          <div className="text-justify px-2 md:px-1">
            At Global News, our values are the foundation of everything we do.
            We are committed to delivering news with integrity, accuracy, and
            transparency. In an age where misinformation is widespread, we
            prioritize truth and objectivity, ensuring that every story is
            rooted in facts and balanced reporting. We believe that journalism
            has the power to inform, educate, and bring people together, which
            is why we strive to be a trusted source of information for our
            global audience. <br />
            <br />
            Impartiality is at the core of our reporting. We approach every
            story without bias, providing multiple perspectives so that readers
            can form their own informed opinions. We also place a strong
            emphasis on accountability—to our readers and to the truth. Our
            journalists adhere to the highest ethical standards, ensuring that
            we uphold the principles of fairness and responsibility in all our
            coverage. <br />
            <br />
            Inclusivity is another key value. We believe in representing voices
            from all walks of life, covering stories that reflect the diversity
            of the world we live in. Whether it’s local or global news, we are
            dedicated to fostering understanding and promoting dialogue across
            different cultures and communities.
          </div>
        </div>
      </div>

      <hr className="border border-gray-100 my-8 md:my-10" />

      {/* contact us section */}
      <section
        data-aos="fade-down"
        data-aos-easing="linear"
        data-aos-duration="2000"
        className="space-y-4 max-w-5xl mx-auto text-center my-4"
      >
        <div className="text-3xl font-semibold">Join the Conversation</div>
        <div>
          If you have any questions, story suggestions, or would like to
          contribute to our platform, feel free to reach out via our [Contact
          Page] or email us at info@globalnews.com. Thank you for choosing
          Global News—your window to the world.
        </div>
        <div className="text-5xl flex">
          <FaCaretDown className=" text-red-600 mx-auto" />
        </div>
        <div className="pb-10">
          <Link to="/contact">
            <button className="text-white font-medium text-lg bg-green-800 btn outline-none border-none">
              Contact Us
            </button>
          </Link>
        </div>
      </section>
    </div>
  );
};

export default About;
