import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { 
  Code, 
  Database, 
  Globe, 
  Users, 
  Clock, 
  Award,
  ChevronRight,
  Star,
  Calendar,
  Video
} from 'lucide-react';
import { Link } from 'react-router-dom';

export default function HomePage() {
  const scrollToRegistration = () => {
    const element = document.getElementById('registration');
    element?.scrollIntoView({ behavior: 'smooth' });
  };

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="gradient-primary text-white py-20 lg:py-32">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="text-center lg:text-left">
              <div className="animate-float mb-6">
                <Badge variant="secondary" className="text-primary text-white bg-white/20 border-white/30">
                  🚀 Evening Batch - Perfect for Working Professionals
                </Badge>
              </div>
              
              <h1 className="text-4xl lg:text-6xl font-bold mb-6 leading-tight">
                Become a 
                <span className="block text-yellow-300">Full Stack Developer</span>
                <span className="block text-lg lg:text-2xl font-normal text-blue-100">
                  Evening Batch (After 7 PM)
                </span>
              </h1>
              
              <p className="text-xl mb-8 text-blue-100 leading-relaxed">
                Learn Frontend, Backend, and Databases with Live Projects – Perfect for students & working professionals.
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 mb-8">
                <Button 
                  size="lg" 
                  className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold"
                  onClick={scrollToRegistration}
                >
                  Join Now for ₹1000
                  <ChevronRight className="ml-2 h-5 w-5" />
                </Button>
                <Link to="/curriculum">
                  <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                    View Curriculum
                  </Button>
                </Link>
              </div>
              
              <div className="flex flex-wrap gap-6 text-blue-100">
                <div className="flex items-center">
                  <Calendar className="h-5 w-5 mr-2" />
                  <span>2 Months</span>
                </div>
                <div className="flex items-center">
                  <Video className="h-5 w-5 mr-2" />
                  <span>Live Online Classes</span>
                </div>
                <div className="flex items-center">
                  <Clock className="h-5 w-5 mr-2" />
                  <span>Starts Soon</span>
                </div>
              </div>
            </div>
            
            <div className="hidden lg:block">
              <div className="relative">
                <Card className="bg-white/10 backdrop-blur border-white/20">
                  <CardHeader>
                    <CardTitle className="text-white">Course Highlights</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="flex items-center text-white">
                      <Code className="h-5 w-5 mr-3 text-yellow-300" />
                      <span>Frontend: React.js, Next.js</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Database className="h-5 w-5 mr-3 text-yellow-300" />
                      <span>Backend: Node.js, Express.js</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Globe className="h-5 w-5 mr-3 text-yellow-300" />
                      <span>3 Live Projects</span>
                    </div>
                    <div className="flex items-center text-white">
                      <Users className="h-5 w-5 mr-3 text-yellow-300" />
                      <span>Small Batch Size</span>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-20 bg-gradient-secondary">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-6">About the Course</h2>
            <p className="text-lg text-muted-foreground mb-8 leading-relaxed">
              Our Full Stack Developer Evening Batch is specially designed for working professionals and students 
              who want to transition into tech or upgrade their skills. With live projects, hands-on learning, 
              and flexible evening timings, you'll master modern web development technologies.
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Industry-Ready Skills</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Learn the latest technologies used by top companies in the industry.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Users className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Small Batch Size</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Personal attention with limited students per batch for better learning.
                  </CardDescription>
                </CardContent>
              </Card>
              
              <Card className="text-center hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="mx-auto w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mb-4">
                    <Globe className="h-6 w-6 text-primary" />
                  </div>
                  <CardTitle>Live Projects</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription>
                    Build real-world projects that you can showcase in your portfolio.
                  </CardDescription>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">2</div>
              <div className="text-blue-100">Months Duration</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">3</div>
              <div className="text-blue-100">Live Projects</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">₹1000</div>
              <div className="text-blue-100">Course Fee</div>
            </div>
            <div>
              <div className="text-3xl lg:text-4xl font-bold mb-2">24/7</div>
              <div className="text-blue-100">Support Access</div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonial Section */}
      {/* <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-3xl lg:text-4xl font-bold mb-12">What Students Say</h2>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Perfect timing for working professionals. The evening batch allowed me to upskill 
                    without affecting my day job. Great instructor and practical projects!"
                  </p>
                  <div>
                    <div className="font-semibold">Priya Sharma</div>
                    <div className="text-sm text-muted-foreground">Software Engineer</div>
                  </div>
                </CardContent>
              </Card>
              
              <Card className="p-6">
                <CardContent className="space-y-4">
                  <div className="flex text-yellow-400">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-current" />
                    ))}
                  </div>
                  <p className="text-muted-foreground italic">
                    "Learned so much in just 2 months! The live projects helped me build a 
                    strong portfolio. Highly recommend for anyone looking to start their tech journey."
                  </p>
                  <div>
                    <div className="font-semibold">Rajesh Kumar</div>
                    <div className="text-sm text-muted-foreground">Frontend Developer</div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section> */}

      {/* CTA Section */}
      <section id="registration" className="py-20 gradient-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl lg:text-4xl font-bold mb-6">Ready to Start Your Journey?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join our evening batch and transform your career with practical full stack development skills.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/auth">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Register Now - ₹1000
                <ChevronRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            {/* <a href="https://wa.me/918925722979" target="_blank" rel="noopener noreferrer">
              <Button size="lg" variant="outline" className="text-white border-white hover:bg-white hover:text-blue-600">
                WhatsApp Us
              </Button>
            </a> */}
          </div>
        </div>
      </section>

      {/* Fixed Join Button for Mobile */}
      <div className="fixed bottom-6 right-6 z-50 md:hidden">
        <Link to="/auth">
          <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold shadow-lg">
            Join Now
          </Button>
        </Link>
      </div>
    </div>
  );
}