import React from 'react'

function AnnouncementPopup() {
  return (
    <>
       <section className="h-screen flex items-center justify-center">
             <div className="bg-white px-6 py-6 rounded-2xl sm:mx-auto w-full max-w-lg mx-2">
           <h3 className='text-center mb-5 text-lg font-bold'>Announcement Details</h3>
                <div className="flex items-center gap-5">
                 <ul>
                    <li className='text-base mb-3 font-semibold'>announcement_title : </li>
                    <li className='text-base mb-3 font-semibold'>announcement_content :</li>
                    <li className='text-base mb-3 font-semibold'>announcement_status :</li>
                 </ul>  
                 <ul>
                    <li className='text-base mb-3'>01j82gwnhh9j0x1gfzcx0t69ys</li>
                    <li className='text-base mb-3'>Tenetur maiores modi</li>
                    <li className='text-base mb-3'>Tenetur maiores modi</li>
                 </ul>
                </div>
                <div className="flex justify-end">
                <button className='rounded-md bg-[#178285] py-[10px] px-6 text-white'>Close</button>
                </div>
              </div>
        </section>
    </>
  )
}

export default AnnouncementPopup
