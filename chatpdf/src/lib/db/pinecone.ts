import {Pinecone} from "@pinecone-database/pinecone";
import { downloadFromS3 } from "../s3-server";
import {PDFLoader} from 'langchain/document_loaders/fs/pdf';

let pinecone : Pinecone | null=null;


export const getPineconeClient = async ()=>{
    if(!pinecone){
        const pc = new Pinecone({
            apiKey: process.env.PINECONE_API_KEY!,
          });
    }
    return pinecone;
}

/*
STEPS
1)Obtain PDF from S3 bucket
2)Split and segemnt the pdf
3)vectorise and embed indices
4)store the vector in pinecone db 
*/
type PDFPage={
    pageContent:string;
    metadata:{
        loc:{pageNumber:number}
    }
}
export async function loadS3IntoPinecone(fileKey:string){
    //Obtaining the pdf by downloading and read from pdf
    console.log('downloading s3 file into the system.....');
    const file_name = await downloadFromS3(fileKey);
    if(!file_name){
        throw new Error("Couldnt get from S3");
    }
    const loader=new PDFLoader(file_name);
    const pages=await loader.load();

    //Split and segment each page into smaller documents
    return pages;
}

async function prepareDocument(page:PDFPage){
    
}


