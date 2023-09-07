"use client"
import { Post } from '@/types/types';
import React from 'react';
import { ReactSearchAutocomplete } from 'react-search-autocomplete';
import { useRouter,useSearchParams } from 'next/navigation';

type Item = {
 id: number;
 name: string;
}

export default function Search({data}:{data:Post[]}) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const items:Item[] = data.map(i => ({
        id: i.id,
        name: i.title
    }));


    const otherParams = searchParams.toString();
    const param = searchParams.get("search");

    function filterParams(){
        if(otherParams.match('&search=')){
          return otherParams.replace(`&search=${param}`,'')
        }else if (otherParams.match('search=')){
          return otherParams.replace(`search=${param}`,'')
        }else{
          return otherParams
        }
      }

      const handleOnSelect = (item:Item) => {
       return router.push(otherParams?`/?${filterParams()}&search=${item.id}`:`/?search=${item.id}`)
      }

      const handleDelete = () => {
        return router.push(otherParams?`/?${filterParams()}`:``)
      }

      const formatResult = (item:any) => {
        return (
            <span style={{ display: 'block', textAlign: 'left' }}>{item.name}</span>
        )
      }
  return data ? (
    <div className='w-[15rem] md:w-[30rem] z-10 relative'>
            <ReactSearchAutocomplete
            items={items}
            onClear={handleDelete}
            onSelect={handleOnSelect}
            autoFocus
            inputDebounce={500}
            formatResult={formatResult}
            className='absolute'
          />
    </div>
  ) : <div/>
}