import connectDB from "@/lib/config/db"
import { NextResponse } from "next/server"
import { writeFile } from "fs/promises"
import Blog from "@/lib/models/blog"

const loadDB = async () => {
    await connectDB()
}
loadDB()

// api endpoint for uploading blogs
export async function POST(request) {
    try {
        const formData = await request.formData()
        const timestamp = Date.now()

        const image = formData.get('image')
        if (!image) {
            return NextResponse.json({ success: false, message: "No image uploaded" }, { status: 400 })
        }
        // Convert image to buffer and save
        const imageByteData = await image.arrayBuffer()
        const buffer = Buffer.from(imageByteData)
        const path = `./public/${timestamp}_${image.name}`
        await writeFile(path, buffer)

        const imageUrl = `/${timestamp}_${image.name}`

        // Save to MongoDB
        const blogData = {
            title: formData.get("title"),
            description: formData.get("description"),
            category: formData.get("category"),
            author: formData.get("author"),
            image: imageUrl,
            authorImg: formData.get("authorImg"),
        }

        await Blog.create(blogData)
        console.log('Blog saved successfully.');

        return NextResponse.json({
            success: true,
            message: 'Blog created successfully.'
        }, { status: 201 }
        )
    } catch (error) {
        console.error("Error while creating blog:", error)
        return NextResponse.json(
            { success: false, message: "Internal Server Error", error: error.message },
            { status: 500 }
        )
    }
}