

export type UpdateCallBack =  { updateAppliedJobs: (UID: number, transportObject: JobDataUpdate, Method: JobFetchMethods, contentType:string | null) => Promise<RawJobData>}

export interface JobData {
    attributes: {
        userEmail:string
    }
}

export type JobFetchMethods = "POST" | "DELETE" | "PUT"
/**
 * Represents all the updatable properties of my job application in strapi.
 */

export type RawJobData = 
{
    attributes: {
    Company?: string,
    Applied_Date?: string,
    Job_Posting_URL?: string,
    Main_Posting_URL?: string,
    Resume_version?: string,
    Education_Requirements?: string,
    Job_Description?: string,
    createdAt?: string,
    updatedAt?: string,
    publishedAt?: string,
    Rejection_Message?: string,
    Job_Location?: string,  
    nuber_of_applicants?: string,
    follow_up_notes?: string,
    tech_stack?: string,
    years_experience_required?: string,
    coverletter?: string,
    platform?: string,
    Job_Title?: string,
    userEmail?: string
}

}
export type JobDataUpdate = {
    data: {
        Company?: string,
        Resume?: string,
        Applied_Date?: string,
        Job_Posting_URL?: string,
        Main_Posting_URL?: string,
        Resume_version?: string,
        Education_Requirements?: string,
        Job_Description?: string,
        createdAt?: string,
        updatedAt?: string,
        publishedAt?: string,
        Rejection_Message?: string,
        Job_Location?: string,  
        nuber_of_applicants?: string,
        follow_up_notes?: string,
        tech_stack?: string,
        years_experience_required?: string,
        coverletter?: string,
        platform?: string,
        Job_Title?: string,
        userEmail?: string,
    }
} 