import { Post, Category } from '@/types/types';
import Image from 'next/image';
import React from 'react';
import ImageWithFallback from './ImageWIthFallback';

export default function Box({ item, categories }: { item: Post, categories: Category[] }) {
  return (
    <li key={item.id} className='w-80 h-full relative shadow-xl rounded-md overflow-hidden pb-20 hover:shadow-2xl transform-none hover:-translate-y-2 transition-all duration-300'>
      <div className='w-full h-52 relative rounded-md overflow-hidden bg-slate-200'>
        <ImageWithFallback fill src={item.imageUrl} alt={item.title} />
      </div>
      <div className='flex px-1'>
        {item.categories.map((item, index) => (
          <p key={index} className='text-indigo-700 font-medium mx-1 text-[0.9rem]'>
            {categories.filter(e => e.id === item)[0].name}
          </p>
        ))}
      </div>
      <h4 className='p-2 font-semibold text-[1.05rem]'>
        {item.title}
      </h4>
      <p className='px-2 text-slate-500 font-light text-[0.9rem]'>
        {item.excerpt}
      </p>
      <div className='absolute bottom-4 left-4 flex'>
        <div className='w-12 h-12 rounded-full relative overflow-hidden'>
          <Image quality={10} alt="" src={"/alone.jpg"} fill />
        </div>
        <div className='mx-5 flex justify-center flex-col'>
          <p className='text-sm'>undefined</p>
          <p className='text-sm font-light text-slate-500'>Mar 10,2020 . 4 min read</p>
        </div>
      </div>
    </li>
  )
}