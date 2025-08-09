import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { useAuth } from '@/contexts/AuthContext';
import { Link } from 'react-router-dom';
import { 
  Code, 
  Database, 
  Globe, 
  Server, 
  Layout, 
  Smartphone,
  Lock,
  Calendar,
  Clock,
  Users
} from 'lucide-react';

export default function CurriculumPage() {
  const { user } = useAuth();
  const isAuthenticated = !!user;
  const modules = [
    {
      id: 1,
      title: "Frontend Development",
      icon: Layout,
      duration: "3 weeks",
      description: "Master modern frontend technologies and build responsive user interfaces",
      topics: [
        "HTML5 & Semantic Elements",
        "CSS3 & Flexbox/Grid",
        "JavaScript ES6+",
        "React.js Fundamentals",
        "React Hooks & State Management",
        "Next.js Introduction",
        "Responsive Design"
      ],
      isPublic: true
    },
    {
      id: 2,
      title: "Backend Development",
      icon: Server,
      duration: "3 weeks",
      description: "Build robust server-side applications and APIs",
      topics: [
        "Node.js Fundamentals",
        "Express.js Framework",
        "REST API Development",
        "Middleware & Authentication",
        "File Upload & Processing",
        "Error Handling",
        "API Security Best Practices"
      ],
      isPublic: true
    },
    {
      id: 3,
      title: "Database Management",
      icon: Database,
      duration: "1 week",
      description: "Learn both SQL and NoSQL databases",
      topics: [
        "MongoDB Basics",
        "Mongoose ODM",
        "SQL Fundamentals",
        "Database Design",
        "CRUD Operations",
        "Data Relationships",
        "Query Optimization"
      ],
      isPublic: true
    },
    {
      id: 4,
      title: "Advanced Topics",
      icon: Code,
      duration: "1 week",
      description: "Additional programming languages and deployment",
      topics: [
        "Python Basics",
        "Java Fundamentals",
        "Version Control (Git)",
        "Deployment Strategies",
        "Cloud Platforms",
        "Performance Optimization",
        "Best Practices"
      ],
      isPublic: false
    }
  ];

  const projects = [
    {
      title: "E-commerce Website",
      description: "Full-featured online store with shopping cart, payment integration, and admin panel",
      tech: ["React.js", "Node.js", "MongoDB", "Express.js"],
      features: ["User Authentication", "Product Catalog", "Shopping Cart", "Payment Gateway", "Admin Dashboard"]
    },
    {
      title: "Portfolio Website",
      description: "Professional developer portfolio with dynamic content and contact forms",
      tech: ["Next.js", "React.js", "CSS3", "Email Integration"],
      features: ["Responsive Design", "Contact Forms", "Project Showcase", "Blog Section", "SEO Optimized"]
    },
    {
      title: "Blog Application",
      description: "Multi-user blogging platform with rich text editor and comment system",
      tech: ["React.js", "Node.js", "SQL Database", "Express.js"],
      features: ["Rich Text Editor", "User Roles", "Comment System", "Search Functionality", "Tag System"]
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Course Curriculum
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Complete 
              <span className="text-gradient block">Full Stack Curriculum</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed mb-8">
              A comprehensive 8-week journey covering frontend, backend, databases, and real-world projects.
              Perfect for evening learners and working professionals.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 text-muted-foreground">
              <div className="flex items-center">
                <Calendar className="h-5 w-5 mr-2 text-primary" />
                <span>8 Weeks Duration</span>
              </div>
              <div className="flex items-center">
                <Clock className="h-5 w-5 mr-2 text-primary" />
                <span>Evening Classes (7-8 PM)</span>
              </div>
              <div className="flex items-center">
                <Users className="h-5 w-5 mr-2 text-primary" />
                <span>Small Batch Size</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Course Modules */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Course Modules</h2>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {modules.map((module) => {
                const IconComponent = module.icon;
                const isLocked = !module.isPublic && !user;
                
                return (
                  <Card key={module.id} className={`hover:shadow-lg transition-shadow ${isLocked ? 'opacity-75' : ''}`}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center">
                            <IconComponent className="h-6 w-6 text-primary" />
                          </div>
                          <div>
                            <CardTitle className="flex items-center gap-2">
                              {module.title}
                              {isLocked && <Lock className="h-4 w-4 text-muted-foreground" />}
                            </CardTitle>
                            <CardDescription>{module.duration}</CardDescription>
                          </div>
                        </div>
                        <Badge variant="outline">Module {module.id}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <p className="text-muted-foreground">{module.description}</p>
                      
                      {(module.isPublic || user) ? (
                        <div className="space-y-2">
                          <h4 className="font-semibold">Topics Covered:</h4>
                          <ul className="grid grid-cols-1 sm:grid-cols-2 gap-1 text-sm">
                            {module.topics.map((topic, index) => (
                              <li key={index} className="flex items-center text-muted-foreground">
                                <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                                {topic}
                              </li>
                            ))}
                          </ul>
                        </div>
                      ) : (
                        <div className="text-center py-4 bg-muted rounded-lg">
                          <Lock className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                          <p className="text-sm text-muted-foreground mb-4">
                            Detailed curriculum available after enrollment
                          </p>
                          <Link to="/auth">
                            <Button size="sm">
                              Enroll Now to View Details
                            </Button>
                          </Link>
                        </div>
                      )}
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Live Projects</h2>
              <p className="text-lg text-muted-foreground">
                Build three industry-standard projects to showcase your skills
              </p>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              {projects.map((project, index) => (
                <Card key={index} className="hover:shadow-lg transition-shadow">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">{project.title}</CardTitle>
                      <Badge variant="secondary">Project {index + 1}</Badge>
                    </div>
                    <CardDescription>{project.description}</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <h4 className="font-semibold mb-2">Technologies Used:</h4>
                      <div className="flex flex-wrap gap-2">
                        {project.tech.map((tech, techIndex) => (
                          <Badge key={techIndex} variant="outline" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold mb-2">Key Features:</h4>
                      <ul className="space-y-1 text-sm">
                        {project.features.map((feature, featureIndex) => (
                          <li key={featureIndex} className="flex items-center text-muted-foreground">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Section */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Class Schedule</h2>
              <p className="text-lg text-muted-foreground">
                Designed for working professionals with evening timings
              </p>
            </div>
            
            <Card className=" bg-[#3466f2] text-white">
              <CardContent className="p-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                  <div>
                    <Clock className="h-8 w-8 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Timing</h3>
                    <p className="text-blue-100">7:00 PM - 8:00 PM</p>
                    <p className="text-blue-100 text-sm">Monday to Friday</p>
                  </div>
                  
                  <div>
                    <Calendar className="h-8 w-8 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Duration</h3>
                    <p className="text-blue-100">8 Weeks</p>
                    <p className="text-blue-100 text-sm">Intensive Training</p>
                  </div>
                  
                  <div>
                    <Globe className="h-8 w-8 mx-auto mb-4" />
                    <h3 className="text-xl font-semibold mb-2">Format</h3>
                    <p className="text-blue-100">Live Online</p>
                    <p className="text-blue-100 text-sm">Interactive Sessions</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      {!user && (
        <section className="py-16 bg-white">
          <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
            <h2 className="text-3xl font-bold mb-4">Ready to Start Learning?</h2>
            <p className="text-lg text-muted-foreground mb-8 max-w-2xl mx-auto">
              Join our evening batch and get access to the complete curriculum, 
              live projects, and lifetime support for just ₹1000.
            </p>
            
            <Link to="/auth">
              <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
                Register Now
              </Button>
            </Link>
          </div>
        </section>
      )}
    </div>
  );
}