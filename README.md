# Medium Blog API

A full-stack blog application built with **Next.js**, **MongoDB**, and **Zod** validation.

## Features

- ✅ Create blog posts with validation
- ✅ Retrieve all blog posts
- ✅ MongoDB integration
- ✅ Zod schema validation
- ✅ Next.js API routes
- ✅ TypeScript & React client

## Tech Stack

- **Frontend:** React, Next.js, TypeScript
- **Backend:** Next.js API Routes
- **Database:** MongoDB
- **Validation:** Zod
- **Styling:** Tailwind CSS

## Project Structure

```
blogapi/
├── app/
│   ├── api/blogs/          # API routes
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Home page
├── components/
│   └── BlogClient.tsx      # Blog form component
├── models/
│   └── Blog.ts             # Mongoose model + Zod schema
├── libs/
│   └── db.ts               # MongoDB connection
└── package.json
```

## Installation

```bash
cd blogapi
pnpm install
```

## Environment Variables

Create a `.env.local` file:

```
MONGODB_URI=your_mongodb_connection_string
```

## Running the Project

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000)

## API Endpoints

### GET /api/blogs
Returns all blog posts

**Response:**
```json
{
  "message": "Welcome to the Personal Blog API!",
  "status": 200,
  "blogs": [...]
}
```

### POST /api/blogs
Create a new blog post

**Request Body:**
```json
{
  "title": "My Blog Title",
  "content": "This is the blog content with at least 50 characters...",
  "author": "John"
}
```

## Validation Rules

- **Title:** 5-50 characters (required)
- **Content:** 50-500 characters (required)
- **Author:** 3-50 characters (required)

**Error Response (HTTP 400):**
```json
{
  "message": "Invalid blog data",
  "errors": [...]
}
```

**Success Response (HTTP 201):**
```json
{
  "message": "Blog created successfully",
  "data": {...}
}
```

## Usage

1. Fill in the blog form on the homepage
2. Click "Write Blog"
3. View validation errors or success message
4. Check MongoDB for saved posts

---

Built with ❤️ for Medium-style blogging