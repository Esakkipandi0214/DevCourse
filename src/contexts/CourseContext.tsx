import React, { createContext, useContext, useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "@/contexts/AuthContext";
import type { Database } from '@/integrations/supabase/types';

type Course = Database['public']['Tables']['courses']['Row'];
type Enrollment = Database['public']['Tables']['enrollments']['Row'] & { courses: Course | null };
type Profile = Database['public']['Tables']['profiles']['Row'];

interface CourseContextType {
  courses: Course[];
  enrollments: Enrollment[];
  loading: boolean;
    createCourse: (
    title: string,
    description: string,
    price: number,
    tags: string[],
    startingDate: string,
    endingDate: string,
    holidays: string[]
  ) => Promise<void>;
  courseUsers: Profile[];
   updateCourse: (
    courseId: string,
    title: string,
    description: string,
    price: number,
    tags: string[],
    startingDate: string,
    endingDate: string,
    holidays: string[]
  ) => Promise<void>;
  deleteCourse: (courseId: string) => Promise<void>;
  enrollInCourse: (courseId: string) => Promise<void>;
  fetchCourses: () => Promise<void>;
  fetchUserEnrollments: () => Promise<void>;
  fetchCourseEnrollments: (courseId: string) => Promise<void>;
}

const CourseContext = createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({ children }: { children: React.ReactNode }) {
  const { user } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [enrollments, setEnrollments] = useState<Enrollment[]>([]);
  const [courseUsers, setCourseUsers] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchCourses = useCallback(async () => {
    setLoading(true);
    const { data, error } = await supabase
      .from("courses")
      .select("*");
    if (!error) setCourses(data);
    setLoading(false);
  }, []);

  const fetchUserEnrollments = useCallback(async () => {
    if (!user) return;
    setLoading(true);
    const { data, error } = await supabase
      .from("enrollments")
      .select("*, courses(*)")
      .eq("user_id", user.id);
    if (!error) setEnrollments(data as Enrollment[]);
    setLoading(false);
  }, [user]);

  const fetchCourseEnrollments = useCallback(async (courseId: string) => {
    setLoading(true);
    const { data: enrollments, error: enrollmentError } = await supabase
      .from("enrollments")
      .select("user_id")
      .eq("course_id", courseId);

    if (enrollmentError) {
      // console.error("Error fetching enrollments:", enrollmentError);
      setLoading(false);
      return;
    }

    const userIds = enrollments.map(enrollment => enrollment.user_id);
    const { data: users, error: userError } = await supabase
      .from("profiles")
      .select("*")
      .in("user_id", userIds);

    if (userError) {
      // console.error("Error fetching users:", userError);
    } else {
      setCourseUsers(users);
    }
    setLoading(false);
  }, []);

  useEffect(() => {
    fetchCourses();
  }, [fetchCourses]);

  useEffect(() => {
    if (user) {
      fetchUserEnrollments();
    }
  }, [user, fetchUserEnrollments]);
const createCourse = useCallback(
  async (
    title: string,
    description: string,
    price: number,
    tags: string[],
    startingDate: string,  // YYYY-MM-DD
    endingDate: string,    // YYYY-MM-DD
    holidays: string[]     // array of YYYY-MM-DD strings
  ) => {
    const { error } = await supabase
      .from("courses")
      .insert([{
        title,
        description,
        price,
        tags,
        starting_date: startingDate,
        ending_date: endingDate,
        holidays
      }]);

    if (!error) {
      await fetchCourses();
    } else {
      // console.error("Error creating course:", error);
      throw error;
    }
  },
  [fetchCourses]
);

const updateCourse = useCallback(
  async (
    courseId: string,
    title: string,
    description: string,
    price: number,
    tags: string[],
    startingDate: string,  // YYYY-MM-DD
    endingDate: string,    // YYYY-MM-DD
    holidays: string[]     // array of YYYY-MM-DD strings
  ) => {
    const { error } = await supabase
      .from("courses")
      .update({
        title,
        description,
        price,
        tags,
        starting_date: startingDate,
        ending_date: endingDate,
        holidays
      })
      .eq("id", courseId);

    if (!error) {
      await fetchCourses();
    } else {
      // console.error("Error updating course:", error);
      throw error;
    }
  },
  [fetchCourses]
);


  const deleteCourse = useCallback(async (courseId: string) => {
    const { error } = await supabase
      .from("courses")
      .delete()
      .eq("id", courseId);
    if (!error) {
      await fetchCourses();
    } else {
      // console.error("Error deleting course:", error);
    }
  }, [fetchCourses]);

  const enrollInCourse = useCallback(async (courseId: string) => {
    if (!user) return;
    const { error } = await supabase
      .from("enrollments")
      .insert([{ user_id: user.id, course_id: courseId }]);
    if (!error) {
      await fetchUserEnrollments();
    } else {
      // console.error("Error enrolling in course:", error);
    }
  }, [user, fetchUserEnrollments]);

  return (
    <CourseContext.Provider
      value={{
        courses,
        courseUsers,
        enrollments,
        loading,
        createCourse,
        updateCourse,
        deleteCourse,
        enrollInCourse,
        fetchCourses,
        fetchUserEnrollments,
        fetchCourseEnrollments
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourses() {
  const context = useContext(CourseContext);
  if (!context) {
    throw new Error("useCourses must be used within a CourseProvider");
  }
  return context;
}
