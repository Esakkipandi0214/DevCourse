import { useEffect, useState } from 'react';
import { useAuth } from '@/contexts/AuthContext';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import { useNavigate, Link } from 'react-router-dom';
import { BookOpen, Eye, EyeOff } from 'lucide-react';

export default function AuthPage() {
  const [isSignUp, setIsSignUp] = useState(false);
  const [isForgotPassword, setIsForgotPassword] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    fullName: '',
    phone: ''
  });

  const { signUp, signIn, resetPassword, user } = useAuth();
  const { toast } = useToast();
  const navigate = useNavigate();

  useEffect(()=>{
    // Redirect if already authenticated
  if (user) {
    navigate('/dashboard');
  }
  },[user, navigate]);

  

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isForgotPassword) {
        const { error } = await resetPassword(formData.email);
        
        if (error) {
          toast({
            title: "Reset Password Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Reset Link Sent!",
            description: "Please check your email for password reset instructions.",
          });
          setIsForgotPassword(false);
        }
      } else if (isSignUp) {
        const { error } = await signUp(formData.email, formData.password, formData.fullName, formData.phone);
        
        if (error) {
          toast({
            title: "Sign Up Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Success!",
            description: "Account created successfully. Please check your email to verify your account.",
          });
          navigate('/payment');
        }
      } else {
        const { error } = await signIn(formData.email, formData.password);
        
        if (error) {
          toast({
            title: "Sign In Error",
            description: error.message,
            variant: "destructive",
          });
        } else {
          toast({
            title: "Welcome back!",
            description: "You have been signed in successfully.",
          });
          navigate('/dashboard');
        }
      }
    } catch (error) {
      toast({
        title: "Error",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData(prev => ({
      ...prev,
      [e.target.name]: e.target.value
    }));
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-secondary py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        {/* Header */}
        <div className="text-center">
          <Link to="/" className="flex items-center justify-center space-x-2 mb-6">
            <BookOpen className="h-8 w-8 text-primary" />
            <span className="text-2xl font-bold text-gradient">DevCourse</span>
          </Link>
          <h2 className="text-3xl font-bold">
            {isForgotPassword ? 'Reset Password' : isSignUp ? 'Join the Course' : 'Welcome Back'}
          </h2>
          <p className="mt-2 text-muted-foreground">
            {isForgotPassword 
              ? 'Enter your email to receive reset instructions'
              : isSignUp 
                ? 'Start your full stack development journey' 
                : 'Sign in to access your dashboard'
            }
          </p>
        </div>

        {/* Form */}
        <Card>
          <CardHeader>
            <CardTitle>
              {isForgotPassword ? 'Reset Password' : isSignUp ? 'Create Account' : 'Sign In'}
            </CardTitle>
            <CardDescription>
              {isForgotPassword 
                ? 'We\'ll send you a link to reset your password'
                : isSignUp 
                  ? 'Enter your details to register for the course' 
                  : 'Enter your credentials to continue'
              }
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              {!isForgotPassword && isSignUp && (
                <>
                  <div className="space-y-2">
                    <Label htmlFor="fullName">Full Name</Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      type="text"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your full name"
                    />
                  </div>
                  
                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      placeholder="+91 9876543210"
                    />
                  </div>
                </>
              )}
              
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleInputChange}
                  required
                  placeholder="your@email.com"
                />
              </div>
              
              {!isForgotPassword && (
                <div className="space-y-2">
                  <Label htmlFor="password">Password</Label>
                  <div className="relative">
                    <Input
                      id="password"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={formData.password}
                      onChange={handleInputChange}
                      required
                      placeholder="Enter your password"
                      className="pr-10"
                    />
                    <Button
                      type="button"
                      variant="ghost"
                      size="sm"
                      className="absolute right-0 top-0 h-full px-3 py-2 hover:bg-transparent"
                      onClick={() => setShowPassword(!showPassword)}
                    >
                      {showPassword ? (
                        <EyeOff className="h-4 w-4" />
                      ) : (
                        <Eye className="h-4 w-4" />
                      )}
                    </Button>
                  </div>
                </div>
              )}
              
              <Button type="submit" className="w-full" disabled={loading}>
                {loading ? 'Processing...' : 
                 isForgotPassword ? 'Send Reset Link' :
                 isSignUp ? 'Create Account' : 'Sign In'}
              </Button>
            </form>
            
            <div className="mt-6 text-center space-y-2">
              {!isForgotPassword && (
                <>
                  <Button
                    variant="link"
                    onClick={() => setIsSignUp(!isSignUp)}
                    className="text-sm"
                  >
                    {isSignUp 
                      ? 'Already have an account? Sign in' 
                      : "Don't have an account? Sign up"
                    }
                  </Button>
                  
                  {!isSignUp && (
                    <div>
                      <Button
                        variant="link"
                        onClick={() => setIsForgotPassword(true)}
                        className="text-sm font-medium text-primary hover:text-primary/80"
                      >
                        Forgot your password?
                      </Button>
                    </div>
                  )}
                </>
              )}
              
              {isForgotPassword && (
                <Button
                  variant="link"
                  onClick={() => setIsForgotPassword(false)}
                  className="text-sm"
                >
                  ← Back to sign in
                </Button>
              )}
            </div>
          </CardContent>
        </Card>

        {/* Back to home */}
        <div className="text-center">
          <Link to="/" className="text-sm text-muted-foreground hover:text-primary">
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}