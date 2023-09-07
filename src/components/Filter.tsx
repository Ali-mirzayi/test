"use client"
import { Category } from '@/types/types'
import React from 'react'
import Select from 'react-select';
import { useRouter,useSearchParams } from 'next/navigation';

export default function Filter({data}:{data:Category[]}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const options = data.map(i => ({
        value: i.id,
        label: i.name
    }));
    const otherParams = searchParams.toString();
    const param = searchParams.get("category");

    function filterParams(){
        if(otherParams.match('&category=')){
          return otherParams.replace(`&category=${param}`,'')
        }else if (otherParams.match('category=')){
          return otherParams.replace(`category=${param}`,'')
        }else{
          return otherParams
        }
      }

  return (
    <Select
    onChange={(e)=>{router.push(otherParams?`/?${filterParams()}&category=${e?.value}`:`/?category=${e?.value}`)}}
    options={options}
    />
  )
}