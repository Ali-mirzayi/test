import Box from '@/components/Box';
import Filter from '@/components/Filter';
import Pagination from '@/components/Pagination';
import Search from '@/components/Search';
import { getData } from '@/fetcher/fetcher';
import { Data } from '@/types/types';
import Link from 'next/link';
import { Suspense } from 'react';

export default async function Home({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | number | undefined }
}) {
  const data: Data = await getData();
  const page = searchParams['page'] ?? '1'
  const category = searchParams['category']
  const search = searchParams['search']

  const start = (Number(page) - 1) * 12

  function filter() {
    if(search){
      return data.posts.filter(e => e.id==search).slice(start, start + 12);
    }
    if(category){
      return data.posts.filter(e => e.categories.find(e=>e==category)).slice(start, start + 12);
    }else{
      return data.posts.slice(start, start + 12)
    }
  }

  function boxCount () {
    if(search){
      return data.posts.filter(e => e.id==search).length;
    }
    if(category){
      return data.posts.filter(e => e.categories.find(e=>e==category)).length;
    }else{
      return data.posts.length
    }
  }
console.log(boxCount()<13);
  return (
    <main className='pb-10'>
      <div className='text-center my-10 relative'>
      <Link href={process.env.BASE_URL?process.env.BASE_URL:'/'} className='bg-blue-500 hover:bg-blue-600 text-white pt-1 rounded-[0.2rem] pb-[0.35rem] px-2 sm:px-4 absolute left-3 -top-5 sm:left-5 sm:-top-4'>back</Link>      
        <h1 className='text-3xl font-bold'>From the blog</h1>
        <p className='w-[20rem] md:w-[30rem] m-auto text-sm md:text-base text-slate-500'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Et numquam cupiditate maxime doloribus, velit natus!</p>
      </div>
      <div className='flex justify-evenly items-center my-6'>
        <Suspense fallback={<div/>}>
          <Search data={data.posts} />
        </Suspense>
        <Filter data={data.categories}/>
      </div>
      <ul className='m-auto w-full xl:w-10/12 2xl:w-3/4 gap-y-10 grid justify-items-center grid-cols-1 md:grid-cols-2 lg:grid-cols-3'>
        {
          filter()?.map((item) => (
            <Box key={item.id} item={item} categories={data.categories} />
          ))
        }
      </ul>
      <Pagination
        hasNextPage={start + 12 < boxCount()}
        hasPrevPage={start > 0}
        pages={Math.ceil(boxCount()/12)}
        initialPage={boxCount()<13}
      />
    </main>
  )
}
