import React, { useEffect } from 'react'
import Layout from '../../../Components/Layout'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux';
import { fetchAnnouncementData } from '../../../Redux/thunks/AnnouncementThunk';
import { RootState } from '../../../Redux/store';
import { MdOutlineKeyboardArrowRight } from "react-icons/md";

interface Announdata{
    id:string,
    announcement_title : string,
    announcement_url: string,
    publish_date:string,
    announcement_content: string
}
function Announcement() {
    const { AnnouncementData } = useSelector((state: RootState) => state.announcelist);
    
    const dispatch = useDispatch<any>();

    useEffect(() => {
      dispatch(fetchAnnouncementData());
    }, [dispatch]);
 
    const navigate = useNavigate();
    
    const handleEdit = (id :string)=>{
        navigate('/announcementaddpage',{ state: { id },})
    }
  return (
    <>
       <Layout>
        <header className="fixed w-full h-14 bg-white flex items-center text-center shadow-md border-b border-custom-border">
          <div className="container">
            <div className="relative">
              <Link to="/dashboard" className="absolute left-0">
                <svg
                  className="w-6 h-6"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  width="24"
                  height="24"
                  fill="none"
                  viewBox="0 0 24 24"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m15 19-7-7 7-7"
                  />
                </svg>
              </Link>
              <h3 className="text-lg font-medium">Announcement</h3>
            </div>
          </div>
        </header>
        <section className="py-20">
                    <div className="container">
                        <div className="border rounded-lg p-5 border-[#DCDCE9] bg-white">
                     {
                                        AnnouncementData && AnnouncementData.length > 0 ? (
                                            AnnouncementData.map((item: Announdata, index: number) => {
                                                return   (
                                                  <div className='bg-white border border-[#DCDCE9] p-4 mb-5 rounded-lg cursor-pointer' onClick={()=>handleEdit(item.id)}>
                                            <div className="flex justify-between " key={index}>
                                            <div>
                                            <h3 className='text-xs text-black mb-1'>{new Date(item.publish_date).toLocaleDateString('en-GB', {
                            year: 'numeric',
                            month: '2-digit',
                            day: '2-digit',
                          })}{' '}
                          {new Date(item.publish_date).toLocaleTimeString('en-GB', {
                            hour: '2-digit',
                            minute: '2-digit',
                            second: '2-digit',
                          })}</h3> 
                                            {/* <div className='text-sm text-black' dangerouslySetInnerHTML={{ __html: item.announcement_content }} /> */}
                                            <h4 className='text-sm text-black'>{item.announcement_title}</h4>
                                            </div>
                                            <div >
                                            <MdOutlineKeyboardArrowRight  className="w-[22px] h-[22px] cursor-pointer inline-block me-3 text-black" />
                                            </div> 
                                             </div>
                                             </div>
                                            )
                                        }
                                    )
                                        ) : (
                                          <div role="status" className='flex justify-center'>
                                          <svg aria-hidden="true" className="w-8 h-8 text-black animate-spin dark:text-black fill-blue-600" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                                              <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="currentColor"/>
                                              <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentFill"/>
                                          </svg>
                                          <span className="sr-only">Loading...</span>
                                      </div>
                                        )
                                        } 
                     
                         </div>
                     </div>
        </section>
        </Layout>
    </>
  )
}

export default Announcement
