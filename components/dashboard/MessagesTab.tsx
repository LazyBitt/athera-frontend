'use client'

import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboard'
import { uploadToIPFS, uploadTextToIPFS, getIPFSUrl } from '../../lib/ipfs'
import { FileText, Image as ImageIcon, Upload, Loader2, ExternalLink, Trash2, MessageSquare } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDistance } from 'date-fns'

export function MessagesTab() {
  const { ipfsFiles, addIPFSFile, removeIPFSFile, addNotification } = useDashboardStore()
  const [isUploading, setIsUploading] = useState(false)
  const [textMessage, setTextMessage] = useState('')
  const [uploadType, setUploadType] = useState<'text' | 'file'>('text')
  
  const handleTextUpload = async () => {
    if (!textMessage.trim()) return
    
    setIsUploading(true)
    try {
      const cid = await uploadTextToIPFS(textMessage)
      addIPFSFile({
        cid,
        name: 'Message',
        type: 'text',
        content: textMessage,
      })
      addNotification({
        type: 'success',
        message: 'Message uploaded (Demo Mode - Mock CID generated)',
      })
      setTextMessage('')
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to upload message',
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return
    
    setIsUploading(true)
    try {
      const cid = await uploadToIPFS(file)
      addIPFSFile({
        cid,
        name: file.name,
        type: file.type.startsWith('image/') ? 'image' : 'text',
      })
      addNotification({
        type: 'success',
        message: `${file.name} uploaded (Demo Mode - Mock CID generated)`,
      })
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to upload file',
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleDelete = (cid: string) => {
    removeIPFSFile(cid)
    addNotification({
      type: 'info',
      message: 'File removed from list',
    })
  }
  
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-xl font-bold text-white mb-1">Messages & Files</h2>
        <p className="text-sm text-gray-400">
          Upload messages or images to IPFS for your heirs
        </p>
      </div>
      
      {/* Upload Section */}
      <div className="bg-slate-900/50 border border-slate-800 rounded-2xl p-6">
        <div className="flex gap-2 mb-4">
          <button
            onClick={() => setUploadType('text')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              uploadType === 'text'
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/20'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <FileText className="h-4 w-4" />
            Text Message
          </button>
          <button
            onClick={() => setUploadType('file')}
            className={`flex items-center gap-2 px-4 py-2 text-sm font-medium rounded-xl transition-all ${
              uploadType === 'file'
                ? 'bg-gradient-to-r from-violet-500 to-purple-500 text-white shadow-lg shadow-violet-500/20'
                : 'bg-gray-800 text-gray-400 hover:text-white'
            }`}
          >
            <ImageIcon className="h-4 w-4" />
            Upload File
          </button>
        </div>
        
        {uploadType === 'text' ? (
          <div className="space-y-4">
            <div>
              <label className="block text-sm text-gray-400 mb-2">Your Message</label>
              <textarea
                value={textMessage}
                onChange={(e) => setTextMessage(e.target.value)}
                placeholder="Write a message for your heirs..."
                rows={6}
                className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-blue-500 transition-colors resize-none"
              />
            </div>
            
            <button
              onClick={handleTextUpload}
              disabled={!textMessage.trim() || isUploading}
              className="w-full px-4 py-3 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-700 hover:to-purple-700 disabled:from-gray-700 disabled:to-gray-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-violet-500/20"
            >
              {isUploading ? (
                <>
                  <Loader2 className="h-4 w-4 animate-spin" />
                  Uploading (Demo)...
                </>
              ) : (
                <>
                  <Upload className="h-4 w-4" />
                  Upload (Demo Mode)
                </>
              )}
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <div className="border-2 border-dashed border-slate-700 rounded-xl p-8 text-center hover:border-blue-500 transition-colors">
              <input
                type="file"
                onChange={handleFileUpload}
                disabled={isUploading}
                accept="image/*,.txt,.pdf"
                className="hidden"
                id="file-upload"
              />
              <label
                htmlFor="file-upload"
                className="cursor-pointer flex flex-col items-center gap-3"
              >
                {isUploading ? (
                  <>
                    <Loader2 className="h-12 w-12 text-blue-500 animate-spin" />
                    <p className="text-sm text-gray-400">Uploading to IPFS...</p>
                  </>
                ) : (
                  <>
                    <Upload className="h-12 w-12 text-gray-500" />
                    <div>
                      <p className="text-sm text-white font-medium mb-1">
                        Click to upload or drag and drop
                      </p>
                      <p className="text-xs text-gray-500">
                        Images, PDFs, or text files
                      </p>
                    </div>
                  </>
                )}
              </label>
            </div>
          </div>
        )}
      </div>
      
      {/* Files List */}
      <div>
        <h3 className="text-lg font-semibold text-white mb-4">Uploaded Files</h3>
        
        {ipfsFiles.length === 0 ? (
          <div className="text-center py-12 bg-slate-900/30 border border-slate-800 rounded-2xl">
            <MessageSquare className="h-12 w-12 text-gray-600 mx-auto mb-3" />
            <p className="text-gray-400">No files uploaded yet</p>
          </div>
        ) : (
          <div className="space-y-3">
            {ipfsFiles.map((file, index) => (
              <motion.div
                key={file.cid}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.05 }}
                className="bg-slate-900/50 border border-slate-800 rounded-xl p-4 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start gap-4">
                  <div className={`p-2.5 rounded-xl ${
                    file.type === 'image' 
                      ? 'bg-purple-500/10' 
                      : 'bg-blue-500/10'
                  }`}>
                    {file.type === 'image' ? (
                      <ImageIcon className="h-5 w-5 text-purple-400" />
                    ) : (
                      <FileText className="h-5 w-5 text-blue-400" />
                    )}
                  </div>
                  
                  <div className="flex-1 min-w-0">
                    <h4 className="text-sm font-medium text-white mb-1">
                      {file.name}
                    </h4>
                    <p className="text-xs text-gray-500 mb-2">
                      {formatDistance(file.timestamp, new Date(), { addSuffix: true })}
                    </p>
                    {file.content && (
                      <p className="text-sm text-gray-400 line-clamp-2 mb-2">
                        {file.content}
                      </p>
                    )}
                    <div className="flex items-center gap-2">
                      <div className="flex items-center gap-1 text-xs text-gray-500">
                        <ExternalLink className="h-3 w-3" />
                        <span>Demo CID (not on IPFS)</span>
                      </div>
                      <span className="text-gray-600">•</span>
                      <code className="text-xs text-gray-500 font-mono">
                        {file.cid.slice(0, 12)}...
                      </code>
                    </div>
                  </div>
                  
                  <button
                    onClick={() => handleDelete(file.cid)}
                    className="p-2 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </motion.div>
            ))}
          </div>
        )}
      </div>
      
      {/* Info */}
      <div className="bg-blue-500/10 border border-blue-500/20 rounded-2xl p-4">
        <div className="flex gap-3">
          <div className="text-2xl">💡</div>
          <div>
            <p className="text-sm text-blue-300 font-semibold mb-2">
              IPFS Storage with Pinata (Free)
            </p>
            <p className="text-xs text-blue-200 mb-2">
              To enable real IPFS uploads:
            </p>
            <ol className="text-xs text-blue-300 space-y-1 list-decimal list-inside">
              <li>Sign up at <a href="https://www.pinata.cloud/" target="_blank" rel="noopener noreferrer" className="underline">pinata.cloud</a> (Free 1GB)</li>
              <li>Get your API Key and Secret</li>
              <li>Add to <code className="bg-blue-900/30 px-1 py-0.5 rounded">.env.local</code>:
                <div className="mt-1 bg-blue-900/30 p-2 rounded text-xs font-mono">
                  NEXT_PUBLIC_PINATA_API_KEY=your_key<br/>
                  NEXT_PUBLIC_PINATA_SECRET_KEY=your_secret
                </div>
              </li>
              <li>Restart server and uploads will work!</li>
            </ol>
            <p className="text-xs text-blue-400 mt-2">
              Without credentials, demo mode with mock CIDs is used.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}
