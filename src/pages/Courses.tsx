import CreateCourseModal from "@/components/CourseUI/CourseModel";
import MernCourseCard from "@/components/CourseUI/mern-course-card"
import { useState } from "react";
import {useAuth} from "@/contexts/AuthContext";

export default function Page() {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const { user, isAdmin } = useAuth();

  return (
    <div className="min-h-screen bg-gray-50">
       <div className=" flex p-4 gradient-primary justify-center items-center"><div className=" text-white font-bold text-[40px]">Our Courses</div></div>
       { (user && isAdmin) && <div className=" flex justify-end items-center p-3 ">
      <button className=" bg-black p-2 text-white rounded-lg" onClick={() => setIsModalOpen(true)}>Add Course</button>
      <CreateCourseModal
        isOpen={isModalOpen}
        onRequestClose={() => setIsModalOpen(false)}
      />
    </div> }
      <MernCourseCard />
    </div>
  )
}
