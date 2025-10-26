'use client'

import { useState } from 'react'
import { uploadToIPFS, isPinataConfigured } from '@/lib/ipfs'

export default function TestUploadPage() {
  const [file, setFile] = useState<File | null>(null)
  const [uploading, setUploading] = useState(false)
  const [result, setResult] = useState<string>('')
  const [error, setError] = useState<string>('')

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    console.log('File input changed!', e.target.files)
    
    if (e.target.files && e.target.files[0]) {
      const selectedFile = e.target.files[0]
      console.log('File selected:', {
        name: selectedFile.name,
        type: selectedFile.type,
        size: selectedFile.size
      })
      
      setFile(selectedFile)
      setResult('')
      setError('')
    } else {
      console.log('No file selected')
    }
  }

  const handleUpload = async () => {
    if (!file) return

    setUploading(true)
    setError('')
    setResult('')

    try {
      console.log('Starting upload test...')
      console.log('File:', file.name, file.type, file.size)
      console.log('Pinata configured:', isPinataConfigured())

      const hash = await uploadToIPFS(file)
      setResult(`Success! IPFS Hash: ${hash}`)
      console.log('Upload successful:', hash)
    } catch (err: any) {
      console.error('Upload failed:', err)
      setError(err.message || 'Upload failed')
    } finally {
      setUploading(false)
    }
  }

  return (
    <div className="min-h-screen bg-slate-950 p-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold text-white mb-8">
          Test IPFS Upload
        </h1>

        <div className="bg-slate-900 border border-slate-800 rounded-xl p-6 space-y-6">
          {/* Config Status */}
          <div className="p-4 bg-slate-800 rounded-lg">
            <p className="text-sm text-gray-400">
              Pinata Status:{' '}
              <span
                className={
                  isPinataConfigured() ? 'text-green-400' : 'text-red-400'
                }
              >
                {isPinataConfigured() ? 'Configured ✓' : 'Not Configured ✗'}
              </span>
            </p>
          </div>

          {/* File Input */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Select File
            </label>
            <div className="relative">
              <input
                type="file"
                accept="image/*,application/pdf,.doc,.docx"
                onChange={handleFileChange}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-blue-600 file:text-white hover:file:bg-blue-700 file:cursor-pointer cursor-pointer"
              />
            </div>
            {file && (
              <div className="mt-2 p-3 bg-slate-800 rounded-lg text-sm text-gray-400">
                <p>📄 Name: {file.name}</p>
                <p>📋 Type: {file.type}</p>
                <p>💾 Size: {(file.size / 1024).toFixed(2)} KB</p>
              </div>
            )}
          </div>

          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={!file || uploading}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-colors"
          >
            {uploading ? 'Uploading...' : 'Upload to IPFS'}
          </button>

          {/* Result */}
          {result && (
            <div className="p-4 bg-green-500/10 border border-green-500/20 rounded-lg">
              <p className="text-sm text-green-300">{result}</p>
            </div>
          )}

          {/* Error */}
          {error && (
            <div className="p-4 bg-red-500/10 border border-red-500/20 rounded-lg">
              <p className="text-sm text-red-300">{error}</p>
            </div>
          )}

          {/* Instructions */}
          <div className="p-4 bg-slate-800 rounded-lg">
            <h3 className="text-sm font-medium text-white mb-2">
              Debug Instructions:
            </h3>
            <ol className="text-xs text-gray-400 space-y-1 list-decimal list-inside">
              <li>Open Browser Console (F12)</li>
              <li>Select a photo file</li>
              <li>Click Upload to IPFS</li>
              <li>Check console for detailed logs</li>
              <li>Copy any error messages</li>
            </ol>
          </div>
        </div>
      </div>
    </div>
  )
}
