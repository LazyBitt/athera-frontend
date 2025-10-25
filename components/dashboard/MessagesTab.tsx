'use client'

import { useState } from 'react'
import { useDashboardStore } from '../../store/dashboard'
import { uploadToIPFS, uploadTextToIPFS, getIPFSUrl } from '../../lib/ipfs'
import { FileText, Image as ImageIcon, Upload, Loader2, ExternalLink, Trash2, MessageSquare, X } from 'lucide-react'
import { motion } from 'framer-motion'
import { formatDistance } from 'date-fns'

export function MessagesTab() {
  const { ipfsFiles, addIPFSFile, removeIPFSFile, addNotification } = useDashboardStore()
  const [isUploading, setIsUploading] = useState(false)
  const [textMessage, setTextMessage] = useState('')
  const [selectedFile, setSelectedFile] = useState<File | null>(null)
  
  const handleUpload = async () => {
    if (!textMessage.trim() && !selectedFile) return
    
    setIsUploading(true)
    try {
      // Upload text message if provided
      if (textMessage.trim()) {
        const textCid = await uploadTextToIPFS(textMessage)
        addIPFSFile({
          cid: textCid,
          name: 'Message',
          type: 'text',
          content: textMessage,
        })
      }
      
      // Upload file if provided
      if (selectedFile) {
        const fileCid = await uploadToIPFS(selectedFile)
        addIPFSFile({
          cid: fileCid,
          name: selectedFile.name,
          type: selectedFile.type.startsWith('image/') ? 'image' : 'file',
        })
      }
      
      addNotification({
        type: 'success',
        message: textMessage && selectedFile 
          ? 'Message and file uploaded successfully'
          : textMessage 
            ? 'Message uploaded successfully'
            : 'File uploaded successfully',
      })
      
      // Reset form
      setTextMessage('')
      setSelectedFile(null)
    } catch (error: any) {
      addNotification({
        type: 'error',
        message: error.message || 'Failed to upload',
      })
    } finally {
      setIsUploading(false)
    }
  }
  
  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSelectedFile(file)
    }
  }
  
  const removeSelectedFile = () => {
    setSelectedFile(null)
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
        <h3 className="text-sm font-medium text-gray-400 mb-4">
          Upload message and/or files for your heirs
        </h3>
        
        <div className="space-y-4">
          {/* Text Message */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Message (Optional)
            </label>
            <textarea
              value={textMessage}
              onChange={(e) => setTextMessage(e.target.value)}
              placeholder="Write a message for your heirs..."
              rows={5}
              className="w-full px-4 py-3 bg-slate-800 border border-slate-700 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:border-violet-500 transition-colors resize-none"
            />
          </div>
          
          {/* File Upload */}
          <div>
            <label className="block text-sm text-gray-400 mb-2">
              Attachment (Optional)
            </label>
            
            {selectedFile ? (
              <div className="bg-slate-800 border border-slate-700 rounded-xl p-4">
                <div className="flex items-center gap-3">
                  <div className="p-2 bg-violet-500/10 rounded-lg">
                    {selectedFile.type.startsWith('image/') ? (
                      <ImageIcon className="h-5 w-5 text-violet-400" />
                    ) : (
                      <FileText className="h-5 w-5 text-violet-400" />
                    )}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-white font-medium truncate">
                      {selectedFile.name}
                    </p>
                    <p className="text-xs text-gray-500">
                      {(selectedFile.size / 1024).toFixed(2)} KB
                    </p>
                  </div>
                  <button
                    onClick={removeSelectedFile}
                    className="p-1.5 text-gray-500 hover:text-red-400 hover:bg-red-500/10 rounded-lg transition-colors"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ) : (
              <div className="border-2 border-dashed border-slate-700 rounded-xl p-6 text-center hover:border-violet-500 transition-colors">
                <input
                  type="file"
                  onChange={handleFileSelect}
                  disabled={isUploading}
                  accept="image/*,.txt,.pdf"
                  className="hidden"
                  id="file-upload"
                />
                <label
                  htmlFor="file-upload"
                  className="cursor-pointer flex flex-col items-center gap-2"
                >
                  <Upload className="h-8 w-8 text-gray-500" />
                  <div>
                    <p className="text-sm text-white font-medium">
                      Click to upload
                    </p>
                    <p className="text-xs text-gray-500">
                      Images, PDFs, or text files
                    </p>
                  </div>
                </label>
              </div>
            )}
          </div>
          
          {/* Upload Button */}
          <button
            onClick={handleUpload}
            disabled={(!textMessage.trim() && !selectedFile) || isUploading}
            className="w-full px-4 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-slate-700 disabled:text-gray-500 text-white font-medium rounded-xl transition-all flex items-center justify-center gap-2 shadow-lg shadow-blue-500/20"
          >
            {isUploading ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                Uploading to IPFS...
              </>
            ) : (
              <>
                <Upload className="h-4 w-4" />
                Upload to IPFS
              </>
            )}
          </button>
          
          <p className="text-xs text-gray-500 text-center">
            You can upload a message, a file, or both together
          </p>
        </div>
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
                      : file.type === 'file'
                      ? 'bg-green-500/10'
                      : 'bg-blue-500/10'
                  }`}>
                    {file.type === 'image' ? (
                      <ImageIcon className="h-5 w-5 text-purple-400" />
                    ) : file.type === 'file' ? (
                      <FileText className="h-5 w-5 text-green-400" />
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
      

    </div>
  )
}
