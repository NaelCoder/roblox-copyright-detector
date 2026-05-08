import { useState } from "react"

export default function App() {
  const [fileName, setFileName] = useState("")
  const [audioUrl, setAudioUrl] = useState("")
  const [isScanning, setIsScanning] = useState(false)
  const [scanResult, setScanResult] = useState(null)

  const handleFile = (e) => {
    const file = e.target.files[0]

    if (file) {
      setFileName(file.name)
      setAudioUrl(URL.createObjectURL(file))
      setScanResult(null)
    }
  }

  const handleScan = () => {
    if (!fileName) return

    setIsScanning(true)

    setTimeout(() => {
      setIsScanning(false)

      const fakeResults = [
        {
          similarity: "96%",
          risk: "High Risk",
          color: "text-red-400",
          bg: "bg-red-500/10 border-red-500/30",
        },
        {
          similarity: "72%",
          risk: "Medium Risk",
          color: "text-yellow-400",
          bg: "bg-yellow-500/10 border-yellow-500/30",
        },
        {
          similarity: "12%",
          risk: "Safe",
          color: "text-green-400",
          bg: "bg-green-500/10 border-green-500/30",
        },
      ]

      const random =
        fakeResults[Math.floor(Math.random() * fakeResults.length)]

      setScanResult(random)
    }, 3000)
  }

  return (
    <div className="min-h-screen bg-zinc-950 text-white flex items-center justify-center p-6">
      <div className="bg-zinc-900 w-full max-w-2xl p-10 rounded-3xl shadow-2xl border border-zinc-800">

        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Roblox Music Copyright Detector
        </h1>

        <p className="text-zinc-400 mb-8 text-lg">
          Upload audio untuk mendeteksi potensi copyright sebelum upload ke Roblox Creation Hub.
        </p>

        <label className="block border-2 border-dashed border-cyan-500 rounded-2xl p-10 text-center cursor-pointer hover:bg-zinc-800 transition-all">

          <input
            type="file"
            accept=".mp3,.wav,.ogg"
            className="hidden"
            onChange={handleFile}
          />

          <div className="text-6xl mb-4">
            🎵
          </div>

          <p className="text-2xl font-semibold">
            Klik untuk Upload Audio
          </p>

          <p className="text-zinc-500 mt-3">
            MP3, WAV, OGG
          </p>

        </label>

        {fileName && (
          <div className="mt-6 bg-zinc-800 border border-zinc-700 p-5 rounded-2xl">
            <p className="text-cyan-400 font-semibold">
              Uploaded File
            </p>

            <p className="mt-2 text-zinc-300 break-all">
              {fileName}
            </p>
          </div>
        )}

        {audioUrl && (
          <audio
            controls
            className="w-full mt-6"
            src={audioUrl}
          />
        )}

        <button
          onClick={handleScan}
          className="mt-8 w-full bg-cyan-500 hover:bg-cyan-600 py-4 rounded-2xl text-xl font-bold transition-all"
        >
          {isScanning ? "Scanning Audio..." : "Scan Copyright"}
        </button>

        {isScanning && (
          <div className="mt-6">

            <div className="flex justify-between text-sm text-zinc-400 mb-2">
              <span>Analyzing Audio Fingerprint</span>
              <span>Processing...</span>
            </div>

            <div className="w-full h-4 bg-zinc-800 rounded-full overflow-hidden">
              <div className="h-full bg-cyan-500 w-[75%] animate-pulse"></div>
            </div>

          </div>
        )}

        {scanResult && (
          <div
            className={`mt-8 p-6 rounded-2xl border ${scanResult.bg}`}
          >

            <h2 className="text-3xl font-bold mb-4">
              Scan Result
            </h2>

            <div className="grid grid-cols-2 gap-4">

              <div className="bg-zinc-900 p-4 rounded-xl">
                <p className="text-zinc-500 text-sm">
                  Similarity Match
                </p>

                <p className={`text-4xl font-bold mt-2 ${scanResult.color}`}>
                  {scanResult.similarity}
                </p>
              </div>

              <div className="bg-zinc-900 p-4 rounded-xl">
                <p className="text-zinc-500 text-sm">
                  Risk Level
                </p>

                <p className={`text-3xl font-bold mt-3 ${scanResult.color}`}>
                  {scanResult.risk}
                </p>
              </div>

            </div>

            <div className="mt-6 bg-zinc-900 p-4 rounded-xl">
              <p className="text-zinc-500 text-sm">
                AI Detection Summary
              </p>

              <p className="mt-2 text-zinc-300 leading-relaxed">
                Sistem mendeteksi adanya kemiripan audio fingerprint dengan database music reference.
                Disarankan untuk melakukan pengecekan lisensi sebelum upload ke Roblox Creation Hub.
              </p>
            </div>

          </div>
        )}

      </div>
    </div>
  )
}