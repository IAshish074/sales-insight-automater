import { useState } from "react";
import { uploadFile } from "./api";

function App() {
  const [file, setFile] = useState(null);
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [status, setStatus] = useState("idle"); // idle, loading, success, error

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!file || !email) {
      setMessage("Please provide both a file and an email address.");
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      setMessage("Parsing your sales data...");

      const res = await uploadFile(file, email);

      if (res.data.status === "error") {
        throw new Error(res.data.message);
      }

      setStatus("success");
      setMessage(res.data.message || "Summary successfully generated and sent to your email!");
    } catch (err) {
      setStatus("error");
      setMessage(err.response?.data?.detail || err.message || "An error occurred while processing the file.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-100 via-purple-50 to-pink-100 flex items-center justify-center p-4 selection:bg-indigo-300">
      <div className="max-w-md w-full animate-fade-in relative z-10 transition-all duration-300">

        {/* Glassmorphism Card */}
        <div className="bg-white/80 backdrop-blur-xl shadow-2xl rounded-3xl p-8 border border-white/40">

          <div className="text-center mb-10">
            <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-indigo-600 tracking-tight">
              Insight Automator
            </h1>
            <p className="text-slate-500 mt-2 text-sm font-medium">Turn quarterly data into executive stories, instantly.</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Sales Data
              </label>
              <div className="relative group">
                <input
                  type="file"
                  accept=".csv, .xlsx"
                  onChange={(e) => {
                    setFile(e.target.files[0]);
                    setStatus("idle");
                    setMessage("");
                  }}
                  className="block w-full text-sm text-slate-500
                    file:mr-4 file:py-2.5 file:px-4
                    file:rounded-xl file:border-0
                    file:text-sm file:font-semibold
                    file:bg-indigo-50 file:text-indigo-600
                    hover:file:bg-indigo-100
                    border border-slate-200 rounded-xl cursor-pointer
                    focus:outline-none focus:ring-2 focus:ring-indigo-500/50 transition-all"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-2">
                Recipient Email
              </label>
              <input
                type="email"
                placeholder="executive@rabbitt.ai"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 rounded-xl border border-slate-200 bg-white/50 focus:bg-white focus:outline-none focus:ring-2 focus:ring-indigo-500/50 shadow-sm transition-all"
              />
            </div>

            <button
              type="submit"
              disabled={status === "loading"}
              className={`w-full py-3.5 px-4 rounded-xl font-bold text-white shadow-lg shadow-indigo-200 transition-all flex items-center justify-center transform active:scale-[0.98] ${status === "loading"
                  ? "bg-indigo-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-indigo-500 to-blue-600 hover:from-indigo-600 hover:to-blue-700 hover:shadow-indigo-300"
                }`}
            >
              {status === "loading" ? (
                <div className="flex items-center space-x-2">
                  <div className="w-5 h-5 border-t-2 border-b-2 border-white rounded-full animate-spin"></div>
                  <span>Processing...</span>
                </div>
              ) : (
                "Generate Brief"
              )}
            </button>
          </form>

          {/* Feedback Message */}
          {message && (
            <div
              className={`mt-6 p-4 rounded-xl text-sm font-medium text-center animate-fade-in ${status === "error"
                  ? "bg-red-50 text-red-600 border border-red-100"
                  : status === "success"
                    ? "bg-green-50 text-green-700 border border-green-100"
                    : "bg-indigo-50 text-indigo-700 border border-indigo-100"
                }`}
            >
              {message}
            </div>
          )}

        </div>

        {/* Decorative elements behind card */}
        <div className="absolute top-0 left-0 w-64 h-64 bg-indigo-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob -z-10 translate-x-[-10%] translate-y-[-10%]"></div>
        <div className="absolute top-0 right-0 w-64 h-64 bg-purple-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-2000 -z-10 translate-x-[10%] translate-y-[-10%]"></div>
        <div className="absolute bottom-0 left-20 w-64 h-64 bg-pink-200 rounded-full mix-blend-multiply filter blur-3xl opacity-30 animate-blob animation-delay-4000 -z-10 translate-y-[10%]"></div>
      </div>
    </div>
  );
}

export default App;