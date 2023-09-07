'use client'

import { useRouter, useSearchParams } from 'next/navigation';
import { useEffect } from 'react';

interface PaginationProps {
  hasNextPage: boolean
  hasPrevPage: boolean
  pages: number
  initialPage: boolean
}

export default function Pagination ({hasNextPage, hasPrevPage, pages, initialPage}:PaginationProps) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const param = searchParams.get("page");
    const otherParams = searchParams.toString();

    function filterParams(){
      if(otherParams.match('&page=')){
        return otherParams.replace(`&page=${Number(param)}`,'')
      }else if (otherParams.match('page=')){
        return otherParams.replace(`page=${Number(param)}`,'')
      }else{
        return otherParams
      }
    }

    useEffect(()=>{
      if(initialPage && 1 < Number(param)){
        return router.push(otherParams?`/?${filterParams()}&page=1`:`/?page=1`)
      }
    },[initialPage,param]);

    return (
      <div className='flex items-center justify-center gap-2 mt-10 mv-5'>
        <button
          className='bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white pt-1 rounded-[0.2rem] px-2 pb-[0.35rem]'
          disabled={!hasPrevPage}
          onClick={() => {
            router.push(otherParams?`/?${filterParams()}&page=${Number(param ?? '1') - 1}`:`/?page=${Number(param ?? '1') - 1}`)
          }}>
          prev page
        </button>
  
        <div className='mx-5'>
          {param ?? '1'} / {pages}
        </div>
        <button
          className='bg-blue-500 hover:bg-blue-600 disabled:bg-blue-300 text-white pt-1 rounded-[0.2rem] px-2 pb-[0.35rem]'
          disabled={!hasNextPage}
          onClick={() => {
            router.push(otherParams?`/?${filterParams()}&page=${Number(param ?? '1') + 1}`:`/?page=${Number(param ?? '1') + 1}`)
          }}>
          next page
        </button>
      </div>
 )
  }