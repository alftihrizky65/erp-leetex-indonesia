'use client'

import React, { useState, useRef, useEffect } from 'react'
import Link from 'next/link'
import { use } from 'react'
import * as Icons from 'lucide-react'
import { allConversations, conversationMessages } from '../page'

// Simple Avatar Component
const Avatar: React.FC<{
  fallback: string
  color?: string
  size?: 'sm' | 'md' | 'lg'
  className?: string
}> = ({ fallback, color = 'bg-gray-500', size = 'md', className = '' }) => {
  const sizeClasses = {
    sm: 'w-8 h-8 text-sm',
    md: 'w-10 h-10 text-base',
    lg: 'w-12 h-12 text-lg'
  }

  return (
    <div className={`${sizeClasses[size]} ${color} rounded-full flex items-center justify-center ${className}`}>
      <span className="font-semibold text-white">{fallback}</span>
    </div>
  )
}

export default function InboxDetailPage({ params }: { params: Promise<{ id: string }> }) {
  // Unwrap params Promise
  const { id } = use(params)
  const [messages, setMessages] = useState<any[]>([])
  const [newMessage, setNewMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  // Get conversation data based on ID
  const conversationId = parseInt(id)
  const conversation = allConversations.find(c => c.id === conversationId) || allConversations[0]

  // Load messages for this conversation
  useEffect(() => {
    const loadedMessages = conversationMessages[conversationId] || [
      {
        id: 1,
        senderId: 'them',
        sender: conversation.name,
        fallbackAvatar: conversation.fallbackAvatar,
        avatarColor: conversation.avatarColor,
        content: 'Halo, ada yang bisa saya bantu?',
        timestamp: '09:00',
        status: 'read'
      }
    ]
    setMessages(loadedMessages)
  }, [conversationId])

  // Auto scroll to bottom when new message arrives
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [messages])

  const handleSendMessage = () => {
    if (!newMessage.trim()) return

    const newMsg = {
      id: messages.length + 1,
      senderId: 'me',
      sender: 'Anda',
      fallbackAvatar: 'A',
      avatarColor: 'bg-green-700',
      content: newMessage,
      timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
      status: 'sent' as const
    }

    setMessages([...messages, newMsg])
    setNewMessage('')

    // Simulate typing and response
    setTimeout(() => {
      setIsTyping(true)
      setTimeout(() => {
        setIsTyping(false)
        const responses = [
          'Terima kasih atas infonya. Saya akan segera tindak lanjuti.',
          'Baik, sudah saya terima. Nanti saya kabari lebih lanjut.',
          'Siap, saya akan proses secepatnya.',
          'Ok, nanti saya follow up.',
          'Terima kasih, sudah saya catat.',
        ]
        const response = {
          id: messages.length + 2,
          senderId: 'them',
          sender: conversation.name,
          fallbackAvatar: conversation.fallbackAvatar,
          avatarColor: conversation.avatarColor,
          content: responses[Math.floor(Math.random() * responses.length)],
          timestamp: new Date().toLocaleTimeString('id-ID', { hour: '2-digit', minute: '2-digit' }),
          status: 'read' as const
        }
        setMessages(prev => [...prev, response])
      }, 1500)
    }, 500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <div className="h-screen flex flex-col bg-[#f8f9fa]">
      {/* Header */}
      <header className="bg-white border-b border-gray-200 px-6 py-3">
        <div className="flex items-center justify-between">
          {/* Left: Back & Contact Info */}
          <div className="flex items-center gap-4">
            <Link
              href="/inbox"
              className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors"
            >
              <Icons.ArrowLeft className="w-5 h-5 text-gray-600" />
            </Link>

            <div className="flex items-center gap-3">
              <div className="relative">
                <Avatar
                  fallback={conversation.fallbackAvatar}
                  color={conversation.avatarColor}
                  size="lg"
                />
                {conversation.online && (
                  <div className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full" />
                )}
              </div>
              <div>
                <h2 className="font-semibold text-gray-900">{conversation.name}</h2>
                <div className="flex items-center gap-2 text-xs text-gray-500">
                  <span>{conversation.position}</span>
                  <span>•</span>
                  <span>{conversation.department}</span>
                  {conversation.online && (
                    <>
                      <span>•</span>
                      <span className="text-green-600 flex items-center gap-1">
                        <span className="w-1.5 h-1.5 rounded-full bg-green-500" />
                        Online
                      </span>
                    </>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* Right: Actions */}
          <div className="flex items-center gap-2">
            <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
              <Icons.Phone className="w-5 h-5 text-gray-600" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
              <Icons.Video className="w-5 h-5 text-gray-600" />
            </button>
            <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
              <Icons.Search className="w-5 h-5 text-gray-600" />
            </button>
            <div className="w-px h-6 bg-gray-200" />
            <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors">
              <Icons.MoreVertical className="w-5 h-5 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      {/* Messages Area */}
      <main className="flex-1 overflow-y-auto px-6 py-4">
        <div className="max-w-4xl mx-auto space-y-4">
          {/* Date Divider */}
          <div className="flex items-center justify-center">
            <div className="bg-white px-4 py-2 rounded-full border border-gray-200 text-xs text-gray-500">
              Hari Ini
            </div>
          </div>

          {/* Messages */}
          {messages.map((message) => {
            const isMe = message.senderId === 'me'

            return (
              <div key={message.id} className={`flex items-end gap-3 ${isMe ? 'flex-row-reverse' : ''}`}>
                {/* Avatar */}
                <Avatar
                  fallback={message.fallbackAvatar}
                  color={message.avatarColor}
                  size="md"
                />

                {/* Message Bubble */}
                <div className={`max-w-md ${isMe ? 'items-end' : 'items-start'} flex flex-col`}>
                  <div
                    className={`px-4 py-3 rounded-2xl ${
                      isMe
                        ? 'bg-[#2E7D32] text-white rounded-br-sm'
                        : 'bg-white text-gray-900 border border-gray-200 rounded-bl-sm'
                    }`}
                  >
                    {!isMe && (
                      <p className="text-xs font-medium text-[#2E7D32] mb-1">{message.sender}</p>
                    )}
                    <p className="text-sm leading-relaxed">{message.content}</p>
                  </div>
                  <div className={`flex items-center gap-1 mt-1 text-xs text-gray-400 ${isMe ? 'justify-end' : ''}`}>
                    <span>{message.timestamp}</span>
                    {isMe && (
                      <>
                        {message.status === 'read' && (
                          <>
                            <Icons.Check className="w-3 h-3 text-[#2E7D32]" />
                            <Icons.Check className="w-3 h-3 text-[#2E7D32] -ml-2" />
                            <span className="text-[10px]">Dibaca</span>
                          </>
                        )}
                        {message.status === 'delivered' && (
                          <>
                            <Icons.Check className="w-3 h-3 text-gray-400" />
                            <span className="text-[10px]">Terkirim</span>
                          </>
                        )}
                        {message.status === 'sent' && (
                          <Icons.Clock className="w-3 h-3 text-gray-400" />
                        )}
                      </>
                    )}
                  </div>
                </div>
              </div>
            )
          })}

          {/* Typing Indicator */}
          {isTyping && (
            <div className="flex items-end gap-3">
              <Avatar
                fallback={conversation.fallbackAvatar}
                color={conversation.avatarColor}
                size="md"
              />
              <div className="bg-white border border-gray-200 px-4 py-3 rounded-2xl rounded-bl-sm">
                <div className="flex items-center gap-1">
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                  <span className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                </div>
              </div>
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </main>

      {/* Input Area */}
      <footer className="bg-white border-t border-gray-200 px-6 py-4">
        <div className="max-w-4xl mx-auto">
          <div className="flex items-end gap-3">
            {/* Attachment Button */}
            <button className="flex items-center justify-center w-10 h-10 rounded-lg hover:bg-gray-100 transition-colors shrink-0">
              <Icons.Paperclip className="w-5 h-5 text-gray-600" />
            </button>

            {/* Input Field */}
            <div className="flex-1 relative">
              <input
                type="text"
                value={newMessage}
                onChange={(e) => setNewMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={`Ketik pesan ke ${conversation.name}...`}
                className="w-full px-4 py-3 bg-[#f8f9fa] rounded-xl text-sm focus:outline-none focus:ring-2 focus:ring-[#2E7D32]/20 border border-transparent focus:border-[#2E7D32]"
              />
              <div className="absolute right-3 top-1/2 -translate-y-1/2 flex items-center gap-2">
                <button className="p-1 hover:bg-gray-200 rounded transition-colors">
                  <Icons.Smile className="w-5 h-5 text-gray-500" />
                </button>
              </div>
            </div>

            {/* Send Button */}
            <button
              onClick={handleSendMessage}
              disabled={!newMessage.trim()}
              className={`flex items-center justify-center w-12 h-12 rounded-xl transition-all ${
                newMessage.trim()
                  ? 'bg-[#2E7D32] hover:bg-[#1b5e20] text-white shadow-md'
                  : 'bg-gray-200 text-gray-400 cursor-not-allowed'
              }`}
            >
              <Icons.Send className="w-5 h-5" />
            </button>
          </div>

          {/* Quick Replies */}
          <div className="flex items-center gap-2 mt-3 overflow-x-auto pb-1">
            {[
              'Baik, terima kasih',
              'Saya akan cek segera',
              'Mohon ditindaklanjuti',
              'Noted',
              'Siap',
            ].map((quickReply) => (
              <button
                key={quickReply}
                onClick={() => setNewMessage(quickReply)}
                className="px-3 py-1.5 bg-[#f8f9fa] hover:bg-gray-100 border border-gray-200 rounded-full text-xs text-gray-700 whitespace-nowrap transition-colors"
              >
                {quickReply}
              </button>
            ))}
          </div>
        </div>
      </footer>
    </div>
  )
}
