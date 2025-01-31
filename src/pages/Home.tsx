import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

function TypingEffect() {
  const [text, setText] = useState("");
  const fullText = "Anxo Campos Web";
  const typingSpeed = 150; // Velocidad de escritura en ms

  useEffect(() => {
    let currentIndex = 0;
    let timeout: number | undefined; // ✅ Cambio aquí

    const type = () => {
      if (currentIndex <= fullText.length) {
        setText(fullText.slice(0, currentIndex));
        currentIndex++;
        timeout = window.setTimeout(type, typingSpeed); // ✅ `window.setTimeout`
      }
    };

    type();
    
    return () => clearTimeout(timeout);
  }, []);

  return (
    <h1 className="mb-4 text-3xl font-extrabold text-gray-900 dark:text-white md:text-5xl lg:text-6xl">
      <span className="text-transparent bg-clip-text bg-gradient-to-r to-emerald-600 from-sky-400">
        {text}
      </span>
    </h1>
  );
}

export default function Home() {
  return (
    <div className="p-6">
      <TypingEffect />
      <h2 className="text-3xl font-semibold text-gray-900 dark:text-white">
        Events Web.
      </h2>
      <p className="text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
        On this website, you'll find the best event venues of all kinds in Spain
        and nearby regions. Whether you're looking for concerts, conferences,
        festivals, or private gatherings, this is the perfect place to discover
        top event locations. Plus, you can explore a selection of international
        events as well!
      </p>

      <section className="bg-white dark:bg-gray-900 mt-8">
        <div className="grid max-w-screen-xl px-4 py-8 mx-auto lg:gap-8 xl:gap-0 lg:py-16 lg:grid-cols-12">
          <div className="mr-auto place-self-center lg:col-span-7">
            <h1 className="max-w-2xl mb-4 text-4xl font-extrabold tracking-tight leading-none md:text-5xl xl:text-6xl dark:text-white">
              Payments tool for software companies
            </h1>
            <p className="max-w-2xl mb-6 font-light text-gray-500 lg:mb-8 md:text-lg lg:text-xl dark:text-gray-400">
              From checkout to global sales tax compliance, companies around the
              world use Flowbite to simplify their payment stack.
            </p>
            <Link
              to="/login"
              className="bg-blue-600 hover:bg-blue-700 inline-flex items-center justify-center px-5 py-3 mr-3 text-base font-medium text-white rounded-lg focus:ring-4 focus:ring-primary-300 dark:focus:ring-primary-900"
            >
              Login
              <svg
                className="w-5 h-5 ml-2 -mr-1"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </Link>
            <Link
              to="/register"
              className="inline-flex items-center justify-center px-5 py-3 text-base font-medium text-gray-900 border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 dark:text-white dark:border-gray-700 dark:hover:bg-gray-700 dark:focus:ring-gray-800"
            >
              Register
            </Link>
          </div>
          <div className="hidden lg:mt-0 lg:col-span-5 lg:flex">
            <img
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/hero/phone-mockup.png"
              alt="mockup"
            />
          </div>
        </div>
      </section>
    </div>
  );
}
