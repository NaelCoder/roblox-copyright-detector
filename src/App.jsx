import { useState } from "react";

export default function RobloxMusicCopyrightDetector() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [isScanning, setIsScanning] = useState(false);
  const [scanFinished, setScanFinished] = useState(false);
  const [audioPreview, setAudioPreview] = useState(null);
  const [dragActive, setDragActive] = useState(false);
  const [riskLevel, setRiskLevel] = useState("High Risk");

  const demoMatches = [
    {
      title: "Night Drive Remix",
      owner: "Aether Studio",
      similarity: "96%",
      status: "High Risk"
    },
    {
      title: "Summer Beat Loop",
      owner: "Nova Audio",
      similarity: "72%",
      status: "Medium Risk"
    },
    {
      title: "Original Upload",
      owner: "No Match Found",
      similarity: "12%",
      status: "Safe"
    }
  ];

  const handleFileUpload = (event) => {
    const file = event.target.files?.[0];

    if (file) {
      setSelectedFile(file);
      setScanFinished(false);
      setAudioPreview(URL.createObjectURL(file));
    }
  };

  const handleScan = () => {
    if (!selectedFile) {
      alert("Upload file music terlebih dahulu");
      return;
    }

    setIsScanning(true);

    setTimeout(() => {
      setIsScanning(false);
      setScanFinished(true);

      const risks = ["High Risk", "Medium Risk", "Safe"];
      const randomRisk = risks[Math.floor(Math.random() * risks.length)];
      setRiskLevel(randomRisk);
    }, 3000);
  };

  const getStatusStyle = (status) => {
    switch (status) {
      case "High Risk":
        return "bg-red-100 text-red-700 border border-red-200";
      case "Medium Risk":
        return "bg-yellow-100 text-yellow-700 border border-yellow-200";
      default:
        return "bg-green-100 text-green-700 border border-green-200";
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white p-6">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 text-center">
          <h1 className="text-5xl font-bold mb-4">
            Roblox Music Copyright Detector
          </h1>

          <p className="text-zinc-400 text-lg max-w-3xl mx-auto">
            Website prototype untuk mendeteksi potensi copyright music
            sebelum upload ke Roblox Creation Hub. Sistem melakukan
            audio fingerprint scanning dan mencocokkan musik dengan
            database referensi.
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-8">
          <div className="bg-zinc-900 rounded-3xl p-6 shadow-2xl border border-zinc-800">
            <h2 className="text-2xl font-semibold mb-5">
              Upload Audio
            </h2>

            <div
              className={`border-2 border-dashed rounded-2xl p-10 text-center transition-all ${dragActive ? "border-blue-500 bg-blue-500/10" : "border-zinc-700 hover:border-blue-500"}`}
              onDragEnter={() => setDragActive(true)}
              onDragLeave={() => setDragActive(false)}
              onDragOver={(e) => e.preventDefault()}
              onDrop={(e) => {
                e.preventDefault();
                setDragActive(false);

                const file = e.dataTransfer.files?.[0];

                if (file) {
                  setSelectedFile(file);
                  setAudioPreview(URL.createObjectURL(file));
                  setScanFinished(false);
                }
              }}
            >
              <div className="text-6xl mb-4">🎵</div>

              <div>
                <p className="text-lg font-medium mb-2">
                  Drag & Drop File Music
                </p>

                <p className="text-zinc-400 mb-4">
                  MP3, WAV, OGG hingga 20MB
                </p>
              </div>

              <input
                type="file"
                accept="audio/*"
                onChange={handleFileUpload}
                className="hidden"
                id="musicUpload"
              />

              <label
                htmlFor="musicUpload"
                className="inline-block bg-blue-600 hover:bg-blue-500 px-5 py-3 rounded-xl font-medium transition-all cursor-pointer"
              >
                Pilih File
              </label>

              {audioPreview && (
                <div className="mt-5">
                  <audio
                    controls
                    className="w-full rounded-xl"
                    src={audioPreview}
                  />
                </div>
              )}

              {selectedFile && (
                <div className="mt-5 bg-zinc-800 rounded-xl p-3 text-left">
                  <p className="font-medium break-all">
                    {selectedFile.name}
                  </p>

                  <p className="text-sm text-zinc-400 mt-1">
                    {(selectedFile.size / 1024 / 1024).toFixed(2)} MB
                  </p>
                </div>
              )}
            </div>

            <div className="mt-8 space-y-5">
              <div>
                <label className="block mb-2 text-sm text-zinc-300">
                  Judul Audio
                </label>

                <input
                  type="text"
                  placeholder="Masukkan judul musik"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-zinc-300">
                  Nama Creator
                </label>

                <input
                  type="text"
                  placeholder="Masukkan nama creator"
                  className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block mb-2 text-sm text-zinc-300">
                  Lisensi Musik
                </label>

                <select className="w-full bg-zinc-800 border border-zinc-700 rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <option>Original Music</option>
                  <option>Royalty Free</option>
                  <option>Creative Commons</option>
                  <option>Commercial License</option>
                </select>
              </div>

              <button
                onClick={handleScan}
                className="w-full bg-emerald-600 hover:bg-emerald-500 py-4 rounded-2xl text-lg font-semibold transition-all"
              >
                {isScanning
                  ? "Scanning Audio..."
                  : "Scan Copyright"}
              </button>

              {isScanning && (
                <div className="bg-zinc-800 rounded-xl p-4 mt-4">
                  <div className="flex justify-between mb-2 text-sm">
                    <span>Audio fingerprint scanning</span>
                    <span>Processing...</span>
                  </div>

                  <div className="w-full bg-zinc-700 h-3 rounded-full overflow-hidden">
                    <div className="bg-emerald-500 h-full w-[75%] animate-pulse"></div>
                  </div>
                </div>
              )}

              {scanFinished && (
                <div className="bg-emerald-500/10 border border-emerald-500/30 rounded-xl p-4 mt-4">
                  <p className="font-semibold text-emerald-400">
                    Scan selesai!
                  </p>

                  <p className="text-sm text-zinc-300 mt-1">
                    Sistem berhasil menganalisis fingerprint audio.
                    Status risiko terdeteksi sebagai:
                    <span
                      className={`ml-2 font-semibold ${
                        riskLevel === "High Risk"
                          ? "text-red-400"
                          : riskLevel === "Medium Risk"
                          ? "text-yellow-400"
                          : "text-green-400"
                      }`}
                    >
                      {riskLevel}
                    </span>
                  </p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-6">
            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl">
              <h2 className="text-2xl font-semibold mb-4">
                Hasil Analisis
              </h2>

              <div className="bg-zinc-800 rounded-2xl p-5 mb-5">
                <div className="flex justify-between items-center mb-2">
                  <span className="text-zinc-400">
                    Audio Fingerprint Match
                  </span>

                  <span className="font-semibold">
                    {riskLevel === "High Risk"
                      ? "96%"
                      : riskLevel === "Medium Risk"
                      ? "72%"
                      : "12%"}
                  </span>
                </div>

                <div className="w-full bg-zinc-700 rounded-full h-4 overflow-hidden">
                  <div
                    className={`${
                      riskLevel === "High Risk"
                        ? "bg-red-500 w-[96%]"
                        : riskLevel === "Medium Risk"
                        ? "bg-yellow-500 w-[72%]"
                        : "bg-green-500 w-[12%]"
                    } h-full transition-all duration-700`}
                  ></div>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4 text-center">
                <div className="bg-zinc-800 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">143K</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Database Tracks
                  </p>
                </div>

                <div className="bg-zinc-800 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">2.4s</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Scan Speed
                  </p>
                </div>

                <div className="bg-zinc-800 rounded-2xl p-4">
                  <h3 className="text-3xl font-bold">AI</h3>
                  <p className="text-zinc-400 text-sm mt-1">
                    Detection Engine
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-zinc-900 rounded-3xl p-6 border border-zinc-800 shadow-2xl">
              <div className="flex items-center justify-between mb-5">
                <h2 className="text-2xl font-semibold">
                  Similar Music Match
                </h2>

                <span className="text-sm text-zinc-400">
                  Database Result
                </span>
              </div>

              <div className="space-y-4">
                {demoMatches.map((item, index) => (
                  <div
                    key={index}
                    className="bg-zinc-800 rounded-2xl p-4 flex items-center justify-between"
                  >
                    <div>
                      <h3 className="font-semibold text-lg">
                        {item.title}
                      </h3>

                      <p className="text-zinc-400 text-sm">
                        Owner: {item.owner}
                      </p>
                    </div>

                    <div className="text-right">
                      <p className="font-semibold mb-2">
                        {item.similarity}
                      </p>

                      <span
                        className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusStyle(
                          item.status
                        )}`}
                      >
                        {item.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 bg-zinc-900 rounded-3xl p-8 border border-zinc-800 shadow-2xl">
          <h2 className="text-3xl font-bold mb-6">
            Cara Kerja Sistem
          </h2>

          <div className="grid md:grid-cols-4 gap-5">
            <div className="bg-zinc-800 rounded-2xl p-5">
              <div className="text-4xl mb-3">1️⃣</div>

              <h3 className="font-semibold text-lg mb-2">
                Upload Audio
              </h3>

              <p className="text-zinc-400 text-sm">
                Creator mengunggah file audio sebelum publish ke Roblox.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-5">
              <div className="text-4xl mb-3">2️⃣</div>

              <h3 className="font-semibold text-lg mb-2">
                Fingerprint Scan
              </h3>

              <p className="text-zinc-400 text-sm">
                Sistem AI mengekstrak pola unik dari audio.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-5">
              <div className="text-4xl mb-3">3️⃣</div>

              <h3 className="font-semibold text-lg mb-2">
                Database Matching
              </h3>

              <p className="text-zinc-400 text-sm">
                Audio dibandingkan dengan database copyright music.
              </p>
            </div>

            <div className="bg-zinc-800 rounded-2xl p-5">
              <div className="text-4xl mb-3">4️⃣</div>

              <h3 className="font-semibold text-lg mb-2">
                Risk Detection
              </h3>

              <p className="text-zinc-400 text-sm">
                Sistem memberikan tingkat risiko copyright.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
