import { Data } from "@/types/types"

const emptyMockData:Data = {
  "posts": [{
      "id": 0,
      "slug": "",
      "title": "",
      "excerpt": "",
      "imageUrl": "",
      "categories": [0]
    }],
  "categories": [{
      "id": 0,
      "name": "",
      "slug": ""
  }]} 

export async function getData():Promise<Data> {
  if (process.env.BASE_URL){
    const res = await fetch(process.env.BASE_URL+'/api')
     if (!res.ok) {
      throw new Error('Failed to fetch')
    }
    return res.json()
   }else{
    return emptyMockData
   }
  }
