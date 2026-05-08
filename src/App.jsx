import { useState } from "react"

export default function App() {
  const [fileName, setFileName] = useState("")

  const handleFile = (e) => {
    const file = e.target.files[0]

    if (file) {
      setFileName(file.name)
    }
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white flex items-center justify-center">
      <div className="bg-zinc-800 p-10 rounded-2xl shadow-2xl w-[500px]">
        
        <h1 className="text-5xl font-bold text-cyan-400 mb-4">
          Roblox Music Copyright Detector
        </h1>

        <p className="text-zinc-300 mb-8">
          Upload audio untuk mendeteksi copyright music.
        </p>

        <label className="block border-2 border-dashed border-cyan-400 rounded-xl p-8 text-center cursor-pointer hover:bg-zinc-700 transition">
          
          <input
            type="file"
            accept=".mp3,.wav,.ogg"
            className="hidden"
            onChange={handleFile}
          />

          <p className="text-lg">
            Klik untuk upload audio
          </p>

          <p className="text-sm text-zinc-400 mt-2">
            MP3, WAV, OGG
          </p>
        </label>

        {fileName && (
          <div className="mt-6 bg-zinc-700 p-4 rounded-xl">
            <p className="text-cyan-300 font-semibold">
              File Uploaded:
            </p>

            <p className="mt-1 text-zinc-200">
              {fileName}
            </p>
          </div>
        )}

        <button className="mt-6 w-full bg-cyan-500 hover:bg-cyan-600 py-3 rounded-xl font-bold">
          Scan Copyright
        </button>

      </div>
    </div>
  )
}