import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import { 
  ShoppingCart, 
  User, 
  BookOpen, 
  Code, 
  Database, 
  Smartphone,
  Globe,
  Shield,
  Search,
  MessageCircle,
  CreditCard,
  Settings
} from 'lucide-react';

export default function ProjectsPage() {
  const projects = [
    {
      id: 1,
      title: "E-commerce Website",
      subtitle: "Full-Featured Online Store",
      description: "Build a complete e-commerce platform with shopping cart, payment integration, user authentication, and admin panel. This project covers all aspects of modern web development.",
      icon: ShoppingCart,
      image: "/api/placeholder/400/250",
      duration: "3 weeks",
      difficulty: "Advanced",
      technologies: ["React.js", "Node.js", "Express.js", "MongoDB", "Stripe API", "JWT"],
      features: [
        "User Registration & Authentication",
        "Product Catalog with Search & Filter",
        "Shopping Cart & Wishlist",
        "Secure Payment Integration",
        "Order Management System",
        "Admin Dashboard",
        "Inventory Management",
        "Email Notifications"
      ],
      learningOutcomes: [
        "Full-stack development workflow",
        "Payment gateway integration",
        "User authentication & authorization",
        "Database design & optimization",
        "API development & testing",
        "Responsive web design"
      ]
    },
    {
      id: 2,
      title: "Portfolio Website",
      subtitle: "Professional Developer Portfolio",
      description: "Create a stunning professional portfolio website to showcase your skills, projects, and experience. Perfect for landing your dream developer job.",
      icon: User,
      image: "/api/placeholder/400/250",
      duration: "1.5 weeks",
      difficulty: "Intermediate",
      technologies: ["Next.js", "React.js", "CSS3", "Framer Motion", "EmailJS"],
      features: [
        "Responsive Design",
        "Animated Interactions",
        "Project Showcase",
        "Skills & Experience Section",
        "Contact Form",
        "Blog Section",
        "SEO Optimization",
        "Dark/Light Theme"
      ],
      learningOutcomes: [
        "Modern CSS techniques",
        "Animation & micro-interactions",
        "SEO best practices",
        "Performance optimization",
        "Email integration",
        "Professional design principles"
      ]
    },
    {
      id: 3,
      title: "Blog Application",
      subtitle: "Multi-User Blogging Platform",
      description: "Develop a feature-rich blogging platform with user roles, rich text editor, comment system, and content management capabilities.",
      icon: BookOpen,
      image: "/api/placeholder/400/250",
      duration: "2.5 weeks",
      difficulty: "Advanced",
      technologies: ["React.js", "Node.js", "SQL Database", "Express.js", "Quill.js"],
      features: [
        "Rich Text Editor",
        "User Role Management",
        "Comment & Reply System",
        "Tag & Category System",
        "Search Functionality",
        "Social Media Integration",
        "Email Subscriptions",
        "Content Moderation"
      ],
      learningOutcomes: [
        "Complex state management",
        "Rich text editing integration",
        "SQL database relationships",
        "User permissions & roles",
        "Search implementation",
        "Content management systems"
      ]
    }
  ];

  const techStack = [
    { name: "Frontend", icon: Globe, techs: ["React.js", "Next.js", "HTML5", "CSS3", "JavaScript ES6+"] },
    { name: "Backend", icon: Code, techs: ["Node.js", "Express.js", "REST APIs", "Authentication"] },
    { name: "Database", icon: Database, techs: ["MongoDB", "SQL", "Mongoose", "Database Design"] },
    { name: "Tools", icon: Settings, techs: ["Git", "VS Code", "Postman", "Deployment"] }
  ];

  return (
    <div className="min-h-screen bg-gradient-secondary">
      {/* Hero Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <Badge variant="secondary" className="mb-4">
              Live Projects
            </Badge>
            <h1 className="text-4xl lg:text-5xl font-bold mb-6">
              Build 
              <span className="text-gradient block">Real-World Projects</span>
            </h1>
            <p className="text-xl text-muted-foreground leading-relaxed">
              Create three industry-standard full-stack applications that showcase your skills 
              and help you build an impressive developer portfolio.
            </p>
          </div>
        </div>
      </section>

      {/* Projects Overview */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center mb-12">Project Portfolio</h2>
            
            <div className="space-y-12">
              {projects.map((project, index) => {
                const IconComponent = project.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={project.id} className={`grid grid-cols-1 lg:grid-cols-2 gap-8 items-center ${!isEven ? 'lg:grid-flow-col-dense' : ''}`}>
                    {/* Project Image/Preview */}
                    <div className={`${!isEven ? 'lg:col-start-2' : ''}`}>
                      <Card className="overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="h-64 bg-gradient-primary flex items-center justify-center">
                          <div className="text-center text-white">
                            <IconComponent className="h-16 w-16 mx-auto mb-4" />
                            <p className="text-lg font-semibold">{project.title}</p>
                            <p className="text-blue-100">Live Project Preview</p>
                          </div>
                        </div>
                      </Card>
                    </div>
                    
                    {/* Project Details */}
                    <div className={`space-y-6 ${!isEven ? 'lg:col-start-1 lg:row-start-1' : ''}`}>
                      <div>
                        <div className="flex items-center gap-4 mb-4">
                          <Badge variant="outline">Project {project.id}</Badge>
                          <Badge variant="secondary">{project.difficulty}</Badge>
                          <Badge variant="outline">{project.duration}</Badge>
                        </div>
                        <h3 className="text-2xl font-bold mb-2">{project.title}</h3>
                        <p className="text-lg text-primary font-semibold mb-4">{project.subtitle}</p>
                        <p className="text-muted-foreground">{project.description}</p>
                      </div>
                      
                      {/* Technologies */}
                      <div>
                        <h4 className="font-semibold mb-3">Technologies Used:</h4>
                        <div className="flex flex-wrap gap-2">
                          {project.technologies.map((tech, techIndex) => (
                            <Badge key={techIndex} variant="outline" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>
                      
                      {/* Key Features */}
                      <div>
                        <h4 className="font-semibold mb-3">Key Features:</h4>
                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                          {project.features.slice(0, 6).map((feature, featureIndex) => (
                            <div key={featureIndex} className="flex items-center text-sm">
                              <div className="w-1.5 h-1.5 bg-primary rounded-full mr-2 flex-shrink-0"></div>
                              <span className="text-muted-foreground">{feature}</span>
                            </div>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Technology Stack */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-6xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Technology Stack</h2>
              <p className="text-lg text-muted-foreground">
                Master these modern technologies through hands-on project development
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {techStack.map((category, index) => {
                const IconComponent = category.icon;
                return (
                  <Card key={index} className="text-center hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="w-12 h-12 bg-primary/10 rounded-full flex items-center justify-center mx-auto mb-4">
                        <IconComponent className="h-6 w-6 text-primary" />
                      </div>
                      <CardTitle className="text-lg">{category.name}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        {category.techs.map((tech, techIndex) => (
                          <div key={techIndex} className="text-sm text-muted-foreground">
                            {tech}
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Learning Outcomes */}
      <section className="py-16">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">What You'll Learn</h2>
              <p className="text-lg text-muted-foreground">
                Each project is designed to teach specific skills and concepts
              </p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {projects.map((project, index) => {
                const IconComponent = project.icon;
                return (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex items-center space-x-3 mb-4">
                        <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                          <IconComponent className="h-5 w-5 text-primary" />
                        </div>
                        <CardTitle className="text-lg">{project.title}</CardTitle>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2">
                        <h4 className="font-semibold text-sm mb-3">Learning Outcomes:</h4>
                        {project.learningOutcomes.map((outcome, outcomeIndex) => (
                          <div key={outcomeIndex} className="flex items-start space-x-2">
                            <div className="w-1.5 h-1.5 bg-primary rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-sm text-muted-foreground">{outcome}</span>
                          </div>
                        ))}
                      </div>
                    </CardContent>
                  </Card>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Project Timeline */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <h2 className="text-3xl font-bold mb-4">Project Timeline</h2>
              <p className="text-lg text-muted-foreground">
                Structured approach to building your portfolio over 8 weeks
              </p>
            </div>
            
            <Card className="p-8">
              <div className="space-y-8">
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    1-3
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Weeks 1-3: Portfolio Website</h3>
                    <p className="text-muted-foreground">Start with frontend fundamentals and build your professional portfolio</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    4-6
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Weeks 4-6: Blog Application</h3>
                    <p className="text-muted-foreground">Dive into backend development and database management</p>
                  </div>
                </div>
                
                <div className="flex items-center space-x-6">
                  <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold">
                    7-8
                  </div>
                  <div className="flex-1">
                    <h3 className="font-semibold mb-1">Weeks 7-8: E-commerce Website</h3>
                    <p className="text-muted-foreground">Advanced full-stack project with payment integration</p>
                  </div>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 gradient-primary text-white">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to Build Amazing Projects?</h2>
          <p className="text-xl mb-8 text-blue-100 max-w-2xl mx-auto">
            Join our evening batch and start building your developer portfolio with real-world projects.
          </p>
          
          <Link to="/auth">
            <Button size="lg" className="bg-yellow-400 hover:bg-yellow-500 text-black font-semibold">
              Start Building - ₹1000
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}