import DefaultHOC from "../layout/Default.HOC";
import { Link } from "react-router-dom";
import { isAuthenticated } from "../utils/auth";

function HomePage() {
  return (
    <>
      {/* Hero Section  */}
      <header className="bg-gray-100 text-slate-800 py-32">
        <div className="contaniner mx-auto text-center">
          <h1 className="text-4xl font-bold mb-4">
            Ace Your Interviews with AI-Driven Tools
          </h1>
          <p className="text-lg mb-12">
            Practice, improve, and track your interview performance with
            real-time feedback and expert recommendations.
          </p>
          <Link
            to="/mock-interview"
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow border hover:bg-neutral-200"
          >
            Get Started
          </Link>
        </div>
      </header>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-6 pb-8">
            Features That Set Us Apart
          </h2>
          <div className="flex flex-col md:flex-row gap-8 justify-evenly mx-4">
            <div className="p-6 bg-white shadow-xl rounded w-auto py-12 hover:shadow-purple-300 transition-all ease-linear duration-200 ">
              <h3 className="text-xl font-bold mb-4 text-black">
                AI-Powered Mock Interviews
              </h3>
              <p className="text-gray-600">
                Practice interviews with instant AI-generated feedback to
                improve your answers.
              </p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded w-auto py-12 hover:shadow-red-300 transition-all ease-linear duration-200">
              <h3 className="text-xl font-bold mb-4">Live Transcription</h3>
              <p className="text-gray-600">
                Get real-time transcription of your responses to analyze
                language use and clarity.
              </p>
            </div>
            <div className="p-6 bg-white shadow-xl rounded w-auto py-12 hover:shadow-emerald-300 transition-all ease-linear duration-200">
              <h3 className="text-xl font-bold mb-4">Performance Insights</h3>
              <p className="text-gray-600">
                Review detailed performance reports to identify strengths and
                areas for improvement.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-8">About Our Platform</h2>
          <p className="text-gray-600 max-w-2xl mx-auto">
            Our platform provides a comprehensive mock interview experience with
            AI-powered tools, including live transcription, video analysis, and
            detailed performance insights. Whether you're preparing for a coding
            interview, HR round, or anything in between, we've got you covered.
          </p>
        </div>
      </section>

      {/* How It Works Section */}
      <section className="py-12 bg-gray-50">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-16">How It Works</h2>
          <div className="grid grid-cols-2 grid-rows-4 md:grid-rows-2 md:grid-cols-4 gap-6">
            <div className="p-6 row-span-1 col-span-1 md:row-span-1 md:col-span-1 border-2 rounded-lg shadow-lg hover:shadow-red-400 transition-all ease-linear">
              <h3 className="text-xl font-bold mb-2">1. Sign Up</h3>
              <p className="text-gray-600">
                Create a free account to access all features.
              </p>
            </div>
            <div className="p-6 row-start-2 col-start-2 md:row-start-2 md:col-start-2 border-2 rounded-lg shadow-lg hover:shadow-green-400 transition-all ease-linear">
              <h3 className="text-xl font-bold mb-2">2. Choose a Question</h3>
              <p className="text-gray-600">
                Select from a library of mock interview questions.
              </p>
            </div>

            <div className="p-6 row-start-3 col-start-1 md:row-start-1 md:col-start-3 border-2 rounded-lg shadow-lg hover:shadow-purple-400 transition-all ease-linear">
              <h3 className="text-xl font-bold mb-2">3. Record Your Answer</h3>
              <p className="text-gray-600">
                Answer in a realistic interview environment.
              </p>
            </div>

            <div className="p-6 row-start-4 col-start-2 md:row-start-2 md:col-start-4 border-2 rounded-lg shadow-lg hover:shadow-blue-400 transition-all ease-linear">
              <h3 className="text-xl font-bold mb-2">4. Get Feedback</h3>
              <p className="text-gray-600">
                Review AI-generated insights and expert tips.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Call-to-Action Section */}
      <footer className="bg-slate-900 text-gray-200 py-16 pt-24">
        <div className="container mx-auto text-center">
          <h2 className="text-3xl font-bold mb-4">
            Ready to Level Up Your Interview Skills?
          </h2>
          <p className="mb-6">
            Sign up today and start preparing for your next big opportunity.
          </p>
          <Link
            to={isAuthenticated() ? "/dashboard" : "/login"}
            className="px-6 py-3 bg-white text-blue-600 font-semibold rounded shadow hover:bg-gray-100"
          >
            Join Now
          </Link>
        </div>
      </footer>
    </>
  );
}

export default DefaultHOC(HomePage);
