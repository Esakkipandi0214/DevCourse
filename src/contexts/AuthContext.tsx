import React, { createContext, useContext, useEffect, useState } from 'react';
import { User, Session } from '@supabase/supabase-js';
import { supabase } from '@/integrations/supabase/client';

interface AuthContextType {
  user: User | null;
  session: Session | null;
  loading: boolean;
  signUp: (email: string, password: string, fullName: string, phone: string) => Promise<{ error: any }>;
  signIn: (email: string, password: string) => Promise<{ error: any }>;
  signOut: () => Promise<void>;
  resetPassword: (email: string) => Promise<{ error: any }>;
  isAdmin: boolean;
  setAdmin: (userId: string) => Promise<{ error: any }>;
  removeAdmin: (userId: string) => Promise<{ error: any }>;
  allUsers: any[];
  fetchAllUsers: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [session, setSession] = useState<Session | null>(null);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUsers, setAllUsers] = useState<any[]>([]);

  useEffect(() => {
    const { data: { subscription } } = supabase.auth.onAuthStateChange(
      async (event, session) => {
        setSession(session);
        setUser(session?.user ?? null);

        if (session?.user) {
          checkAdminStatus(session.user.id);
        } else {
          setIsAdmin(false);
        }

        setLoading(false);
      }
    );

    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
      setUser(session?.user ?? null);
      if (session?.user) {
        // console.log("User session:", session.user);
        
        checkAdminStatus(session.user.id);
      }
      setLoading(false);
    });

    return () => subscription.unsubscribe();
  }, []);

const checkAdminStatus = async (authUserId: string) => {
  try {
    // 1. Get the profile row for this auth user
    const { data: profile, error: profileError } = await supabase
      .from("profiles")
      .select("id") // profiles.id is the FK to admin_users.user_id
      .eq("user_id", authUserId)
      .single();

    if (profileError) throw profileError;

    // 2. Get all admin rows
    const { data: allAdmins, error: allAdminsError } = await supabase
      .from("admin_users")
      .select("*");

    if (allAdminsError) throw allAdminsError;

    // console.log("Profile:", profile, "All Admins:", allAdmins);

    // 3. Compare profile.id to admin_users.user_id
    const isAdmin = allAdmins.some(admin => admin.user_id === profile.id);
    setIsAdmin(isAdmin);

  } catch (err) {
    // console.error("Error:", err);
    setIsAdmin(false);
  }
};



const fetchAllUsers = async () => {
  // 1. Get all profiles
  const { data: profilesData, error: profilesError } = await supabase
    .from("profiles")
    .select("id, full_name, phone, user_id");

  if (profilesError) {
    console.error("Profiles fetch error:", profilesError);
    return;
  }

  // 2. Get all admins
  const { data: adminsData, error: adminsError } = await supabase
    .from("admin_users")
    .select("user_id");

  if (adminsError) {
    console.error("Admins fetch error:", adminsError);
    return;
  }

  // 3. Convert admin list to a Set for fast lookup
  const adminUserIds = new Set(adminsData.map(admin => admin.user_id));

  // 4. Add isAdmin flag to each profile
  const usersWithAdminFlag = profilesData.map(user => ({
    ...user,
    isAdmin: adminUserIds.has(user.id)
  }));

  // 5. Save to state
  setAllUsers(usersWithAdminFlag);

  console.log("All users with admin flag:", usersWithAdminFlag);
};


  const signUp = async (email: string, password: string, fullName: string, phone: string) => {
    const redirectUrl = `${window.location.origin}/`;

    const { error } = await supabase.auth.signUp({
      email,
      password,
      options: {
        emailRedirectTo: redirectUrl,
        data: { full_name: fullName, phone }
      }
    });

    return { error };
  };

  const signIn = async (email: string, password: string) => {
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    return { error };
  };

  const signOut = async () => {
    await supabase.auth.signOut();
  };

  const resetPassword = async (email: string) => {
    const { error } = await supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/auth?mode=reset`,
    });
    return { error };
  };

  const setAdmin = async (userId: string) => {
    const { error } = await supabase
      .from('admin_users')
      .insert([{ user_id: userId }]);

    if (!error && user?.id === userId) {
      setIsAdmin(true);
    }

    return { error };
  };

  const removeAdmin = async (userId: string) => {
    const { error } = await supabase
      .from('admin_users')
      .delete()
      .eq('user_id', userId);

    if (!error && user?.id === userId) {
      setIsAdmin(false);
    }

    return { error };
  };

  const value = {
    user,
    session,
    loading,
    signUp,
    signIn,
    signOut,
    resetPassword,
    isAdmin,
    setAdmin,
    removeAdmin,
    allUsers,
    fetchAllUsers
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
