import axios from 'axios';
import projectURLS from '@/projectSettings'


export async function updateMongoDBblogContent(blogId: string, markdownContent: string, title="blog", description="blog") {
    console.log("Blog ID:", blogId);
    console.log("Blog content:", markdownContent);
    console.log("title", title)
    console.log("description", description)
    try {
        let url = projectURLS().pythonMongoDBServerUpdateBlog;
        const payload = { markdown_content: markdownContent };
        if (title) payload.title = title;
         if (description) payload.description = description;
        const response = await axios.patch(`${url}/${blogId}`, payload);
        await fetch("https://pwncontracting.com/api/clear-cache")
        console.log("Blog updated successfully:", response.data);
    } catch (error) {
        if (error.response) {
            console.error("Error updating blog content:", error.response.data.detail || error.response.data);
        } else {
            console.error("Network error:", error.message);
        }
    }
}

export async function deleteMongoDBblog(blogID: string) {
    const url = projectURLS().pythonMongoDBServerDeleteBlog + `/${blogID}`;
    const data = {
        blogID: blogID
    };

    try {
        const response = await axios.delete(url);
        console.log('Response:', response.data);
    } catch (error: any) {
        // Check if the error is an AxiosError
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}

export async function addMongoDBblog(
    title: string,
    blogType: string,
    markdownContent: string
) {
    const url = projectURLS().pythonMongoDBServerAddBlog;
    const data = {
        Title: title,
        BlogType: blogType,
        MarkdownContent: markdownContent
    };

    console.log(data)
    try {
        const response = await axios.post(url, data);
        console.log('Response:', response.data);
        return true
    } catch (error: any) {
        // Check if the error is an AxiosError
        console.error("Error:", error.response ? error.response.data : error.message);
        return false
    }
}


