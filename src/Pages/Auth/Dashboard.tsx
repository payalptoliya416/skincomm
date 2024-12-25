import React, { useEffect, useState } from "react";
import Layout from "../../Components/Layout";
import { useDispatch, useSelector } from "react-redux";
import DashboardBottom from "../../Components/Auth/DashboardBottom";
import DashboardSidebar from "../../Components/Auth/DashboardSidebar";
import DashboardRightBar from "../../Components/Auth/DashboardRightBar";
import DashboardTop from "../../Components/Auth/DashboardTop";
import { fetchAnnouncePendingData } from "../../Redux/thunks/AnnouncePendingThunk";
import { RootState } from "../../Redux/store";
import { fetchAnnounceReadData } from "../../Redux/thunks/AnnounceReadThunk";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const loginState = useSelector((state: any) => state.loginState.data.user);
  const { AnnouncependingtData, loading } = useSelector(
    (state: RootState) => state.pendingAnnounce
  );
  const dispatch = useDispatch<any>();

  useEffect(() => {
    dispatch(fetchAnnouncePendingData());
  }, [dispatch]);

  const [open, setOpen] = useState(true);

  const handleClose = (id: any) => {
    setOpen(false);
    dispatch(fetchAnnounceReadData(id));
  };
  const isDataEmpty = !AnnouncependingtData || !AnnouncependingtData.announcement;
const isRead = !AnnouncependingtData || !AnnouncependingtData.read

  return (
    <Layout>
      <nav className="bg-[#178285] fixed w-full top-0 left-0 py-3 z-20">
        <div className="container">
          <div className="flex items-center justify-between">
            <DashboardSidebar loginState={loginState} />
            <DashboardRightBar />
          </div>
        </div>
      </nav>
      <DashboardTop />
      <DashboardBottom />
     {isRead === false ? (
        <>
          {loginState && open && !loading && !isDataEmpty && (
        <>
          <div className="fixed inset-0 bg-black opacity-50 z-10"></div>
          <div className="fixed inset-0 z-20 flex items-center justify-center ">
            <section className="flex items-center justify-center relative w-full max-w-[500px]">
              <div className="bg-white px-10 py-8 rounded-2xl sm:mx-auto w-full max-w-lg mx-2">
              
                <div>
                  <div className="gap-5">
                    <Link to={`${AnnouncependingtData.announcement?.announcement_url}`}>
                      <h3
                        dangerouslySetInnerHTML={{
                          __html: AnnouncependingtData.announcement?.announcement_title,
                        }}
                        className="text-center text-lg  font-bold mb-4 "
                      />
                    </Link>
                    <p
                      className="te xt-base mb-3 font-light"
                      dangerouslySetInnerHTML={{
                        __html: AnnouncependingtData.announcement?.announcement_content,
                      }}
                    />
                  </div>
                  <div className="absolute top-0 right-0">
                    <IoIosCloseCircle
                      className="text-3xl text-[#178285] cursor-pointer"
                      onClick={() => handleClose(AnnouncependingtData.announcement?.id)}
                    />
                  </div>
                </div>
              </div>
            </section>
          </div>
        </>
      )}
        </>
     ):""}
    

      {/* {loading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-lg">Loading...</div>
        </div>
      )} */}
{/* 
      {isDataEmpty && !loading && (
        <div className="fixed inset-0 z-20 flex items-center justify-center">
          <div className="text-center text-lg">No announcements available.</div>
        </div>
      )} */}
    </Layout>
  );
};

export default Dashboard;
