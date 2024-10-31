import axios from 'axios';
import projectURLS from  '@/projectSettings'



export async function uploadMongoDBblog(
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

    try {
        const response = await axios.post(url, data);
        console.log('Response:', response.data);
    } catch (error: any) {
        // Check if the error is an AxiosError
        console.error("Error:", error.response ? error.response.data : error.message);
    }
}


