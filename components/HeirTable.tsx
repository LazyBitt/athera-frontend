'use client'

import { Card, CardContent, CardHeader, CardTitle } from './ui/card'
import { Button } from './ui/button'
import { Badge } from './ui/badge'
import { Users, Plus, Edit3, Trash2, MessageSquare, Mail } from 'lucide-react'
import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface Heir {
  id: string
  address: string
  percentage: number
  contactMethod: 'telegram' | 'email'
  telegramChatId?: string
  email?: string
  status: 'active' | 'pending' | 'notified'
}

export function HeirTable() {
  const [heirs, setHeirs] = useState<Heir[]>([
    {
      id: '1',
      address: '0x8ba1f109551bD432803012645Hac136c0c8C8C8',
      percentage: 50,
      contactMethod: 'telegram',
      telegramChatId: '@heir1',
      status: 'active'
    },
    {
      id: '2',
      address: '0x1234567890123456789012345678901234567890',
      percentage: 30,
      contactMethod: 'email',
      email: 'heir2@example.com',
      status: 'pending'
    },
    {
      id: '3',
      address: '0x9876543210987654321098765432109876543210',
      percentage: 20,
      contactMethod: 'telegram',
      telegramChatId: '@heir3',
      status: 'notified'
    }
  ])

  const [isAddingNew, setIsAddingNew] = useState(false)
  const [editingId, setEditingId] = useState<string | null>(null)

  const formatAddress = (addr: string) => {
    return `${addr.slice(0, 6)}...${addr.slice(-4)}`
  }

  const getStatusBadge = (status: Heir['status']) => {
    switch (status) {
      case 'active':
        return <Badge className="bg-green-500/20 text-green-600 border-green-500/30">Active</Badge>
      case 'pending':
        return <Badge className="bg-yellow-500/20 text-yellow-600 border-yellow-500/30">Pending</Badge>
      case 'notified':
        return <Badge className="bg-blue-500/20 text-blue-600 border-blue-500/30">Notified</Badge>
    }
  }

  const addNewHeir = () => {
    const newHeir: Heir = {
      id: Date.now().toString(),
      address: '',
      percentage: 0,
      contactMethod: 'telegram',
      status: 'pending'
    }
    setHeirs(prev => [...prev, newHeir])
    setIsAddingNew(true)
    setEditingId(newHeir.id)
  }

  const updateHeir = (id: string, updates: Partial<Heir>) => {
    setHeirs(prev => prev.map(heir => 
      heir.id === id ? { ...heir, ...updates } : heir
    ))
  }

  const deleteHeir = (id: string) => {
    setHeirs(prev => prev.filter(heir => heir.id !== id))
    if (editingId === id) {
      setEditingId(null)
      setIsAddingNew(false)
    }
  }

  const saveHeir = (id: string) => {
    setEditingId(null)
    setIsAddingNew(false)
  }

  const totalPercentage = heirs.reduce((sum, heir) => sum + heir.percentage, 0)

  return (
    <Card className="border-border/50">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2">
            <Users className="h-5 w-5" />
            Heir Wallets
          </CardTitle>
          <Button onClick={addNewHeir} className="gap-2">
            <Plus className="h-4 w-4" />
            Add New Heir
          </Button>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {/* Percentage Validation */}
          {totalPercentage !== 100 && heirs.length > 0 && (
            <div className="p-3 bg-yellow-50 dark:bg-yellow-950/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
              <p className="text-sm text-yellow-800 dark:text-yellow-200">
                ⚠️ Total allocation: {totalPercentage}%. Must equal 100%.
              </p>
            </div>
          )}

          {/* Heirs List */}
          <div className="space-y-3">
            <AnimatePresence>
              {heirs.map((heir, index) => (
                <motion.div
                  key={heir.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  transition={{ duration: 0.3, delay: index * 0.1 }}
                  className="p-4 bg-surface/50 border border-border/30 rounded-lg"
                >
                  {editingId === heir.id ? (
                    <div className="space-y-3">
                      <div className="grid grid-cols-1 md:grid-cols-4 gap-3">
                        <input
                          type="text"
                          placeholder="Wallet Address"
                          value={heir.address}
                          onChange={(e) => updateHeir(heir.id, { address: e.target.value })}
                          className="col-span-2 px-3 py-2 bg-background border border-border rounded text-sm"
                        />
                        <input
                          type="number"
                          placeholder="Percentage"
                          value={heir.percentage}
                          onChange={(e) => updateHeir(heir.id, { percentage: Number(e.target.value) })}
                          className="px-3 py-2 bg-background border border-border rounded text-sm"
                        />
                        <select
                          value={heir.contactMethod}
                          onChange={(e) => updateHeir(heir.id, { contactMethod: e.target.value as 'telegram' | 'email' })}
                          className="px-3 py-2 bg-background border border-border rounded text-sm"
                        >
                          <option value="telegram">Telegram</option>
                          <option value="email">Email</option>
                        </select>
                      </div>
                      
                      {heir.contactMethod === 'telegram' ? (
                        <input
                          type="text"
                          placeholder="Telegram Chat ID (e.g., @username or chat_id)"
                          value={heir.telegramChatId || ''}
                          onChange={(e) => updateHeir(heir.id, { telegramChatId: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                        />
                      ) : (
                        <input
                          type="email"
                          placeholder="Email Address"
                          value={heir.email || ''}
                          onChange={(e) => updateHeir(heir.id, { email: e.target.value })}
                          className="w-full px-3 py-2 bg-background border border-border rounded text-sm"
                        />
                      )}

                      <div className="flex gap-2">
                        <Button size="sm" onClick={() => saveHeir(heir.id)}>
                          Save
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => {
                            if (isAddingNew) {
                              deleteHeir(heir.id)
                            } else {
                              setEditingId(null)
                            }
                          }}
                        >
                          Cancel
                        </Button>
                      </div>
                    </div>
                  ) : (
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-4">
                        <div>
                          <p className="font-mono text-sm font-medium">
                            {heir.address ? formatAddress(heir.address) : 'No address set'}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <Badge variant="outline">{heir.percentage}%</Badge>
                            {getStatusBadge(heir.status)}
                          </div>
                        </div>
                        
                        <div className="flex items-center gap-2">
                          {heir.contactMethod === 'telegram' ? (
                            <>
                              <MessageSquare className="h-4 w-4 text-blue-500" />
                              <span className="text-sm text-muted-foreground">
                                {heir.telegramChatId || 'No chat ID'}
                              </span>
                            </>
                          ) : (
                            <>
                              <Mail className="h-4 w-4 text-green-500" />
                              <span className="text-sm text-muted-foreground">
                                {heir.email || 'No email'}
                              </span>
                            </>
                          )}
                        </div>
                      </div>

                      <div className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => setEditingId(heir.id)}
                          className="gap-1"
                        >
                          <Edit3 className="h-3 w-3" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          onClick={() => deleteHeir(heir.id)}
                          className="text-red-500 hover:text-red-700 gap-1"
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {heirs.length === 0 && (
            <div className="text-center py-8">
              <Users className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
              <p className="text-muted-foreground">No heirs added yet</p>
              <p className="text-sm text-muted-foreground mt-1">
                Add beneficiaries to receive your assets when inactive
              </p>
            </div>
          )}
        </div>
      </CardContent>
    </Card>
  )
}


