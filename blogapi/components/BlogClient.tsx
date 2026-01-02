"use client"

import React, { useState } from 'react'

const BlogClient = () => {
    const [title, setTitle] = useState('')
    const [content, setContent] = useState('')
    const [author, setAuthor] = useState('')
    const [loading, setLoading] = useState(false)

    const handleWriteBlog = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/blogs', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({ title, content, author })
            })

            if (!response.ok) {
                throw new Error('Failed to create blog')
            }

            const data = await response.json()
            console.log(data)

            setTitle('')
            setContent('')
            setAuthor('')
        } catch (error) {
            console.log(error)
        } finally {
            setLoading(false)
        }
    }

    return (
        <>
            <div className='flex justify-center items-center'>
                <input
                    type="text" placeholder='Title'
                    className='border border-zinc-800 rounded-md px-3 py-2'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />
                <textarea
                    placeholder='Content' className='border border-zinc-800 rounded-md px-3 py-2'
                    value={content}
                    onChange={(e) => setContent(e.target.value)} />
                <input
                    type="text" placeholder='Author'
                    className='border border-zinc-800 rounded-md px-3 py-2'
                    value={author}
                    onChange={(e) => setAuthor(e.target.value)} />
                <button
                    className='cursor-pointer text-xl border border-zinc-800 rounded-md px-3 py-2 hover:bg-zinc-800 hover:text-white transition-all'
                    onClick={handleWriteBlog}>
                    {loading ? 'Writing...' : 'Write Blog'}
                </button>
            </div>
        </>
    )
}

export default BlogClient