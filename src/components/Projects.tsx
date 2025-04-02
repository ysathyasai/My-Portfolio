
import React, { useEffect, useState, useRef } from "react";
import { GitHubRepo } from "@/lib/types";
import { getGitHubRepos, getLanguageColor } from "@/services/github";
import { ExternalLink, Github, Star, GitFork, Code } from "lucide-react";
import { cn } from "@/lib/utils";

const Projects: React.FC = () => {
  const [repos, setRepos] = useState<GitHubRepo[]>([]);
  const [loading, setLoading] = useState(true);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        setLoading(true);
        const data = await getGitHubRepos();
        setRepos(data);
      } catch (error) {
        console.error("Error fetching repos:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchRepos();
  }, []);
  
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('visible');
            const fadeElements = entry.target.querySelectorAll('.fade-up');
            fadeElements.forEach((el, index) => {
              setTimeout(() => {
                el.classList.add('visible');
                el.classList.remove('hidden');
                el.classList.add('opacity-100');
                el.classList.remove('opacity-0');
              }, index * 100);
            });
          }
        });
      },
      {
        threshold: 0.1,
        rootMargin: '0px 0px -100px 0px',
      }
    );
    
    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }
    
    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  return (
    <section id="projects" ref={sectionRef} className="py-24 relative">
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div className="absolute top-40 -left-40 w-96 h-96 bg-accent/10 rounded-full filter blur-3xl"></div>
        <div className="absolute -bottom-20 right-20 w-80 h-80 bg-primary/10 rounded-full filter blur-3xl"></div>
      </div>
      
      <div className="section-container max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="mb-16 text-center fade-up hidden transition-all duration-500 transform translate-y-8">
          <h2 className="text-3xl font-bold tracking-tight text-gradient">Projects</h2>
          <p className="text-gray-400 mt-4 max-w-2xl mx-auto text-center">
            A collection of my recent work, from my GitHub repositories.
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[...Array(6)].map((_, i) => (
              <div 
                key={i} 
                className="glass-card rounded-lg p-6 h-64 animate-pulse"
              >
                <div className="h-6 bg-gray-700 rounded w-3/4 mb-4"></div>
                <div className="h-4 bg-gray-700 rounded w-full mb-2"></div>
                <div className="h-4 bg-gray-700 rounded w-5/6 mb-6"></div>
                <div className="h-3 bg-gray-700 rounded w-1/4 mb-1"></div>
                <div className="h-3 bg-gray-700 rounded w-1/2"></div>
              </div>
            ))}
          </div>
        ) : repos.length === 0 ? (
          <div className="text-center py-20 fade-up hidden transition-all duration-500 transform translate-y-8">
            <Code size={48} className="mx-auto text-gray-500 mb-4" />
            <p className="text-gray-400">No repositories found. Check back later!</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {repos.map((repo, index) => (
              <div 
                key={repo.id}
                className={cn(
                  "glass-card rounded-lg overflow-hidden hover:shadow-glow",
                  "transition-all duration-300 hover:-translate-y-1 fade-up hidden",
                  "h-full flex flex-col"
                )}
                style={{ transitionDelay: `${index * 50}ms` }}
              >
                <div className="p-6 flex flex-col flex-grow">
                  <div className="flex justify-between items-start mb-4">
                    <h3 className="font-medium text-lg truncate text-gradient-primary">{repo.name}</h3>
                    <div className="flex space-x-2">
                      <a 
                        href={repo.html_url} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-gray-400 hover:text-primary transition-colors"
                        aria-label={`View ${repo.name} on GitHub`}
                      >
                        <Github size={18} />
                      </a>
                      {repo.homepage && (
                        <a 
                          href={repo.homepage} 
                          target="_blank" 
                          rel="noopener noreferrer"
                          className="text-gray-400 hover:text-primary transition-colors"
                          aria-label={`Visit live demo for ${repo.name}`}
                        >
                          <ExternalLink size={18} />
                        </a>
                      )}
                    </div>
                  </div>
                  
                  <p className="text-gray-400 text-sm mb-6 line-clamp-3 flex-grow">
                    {repo.description || "No description provided."}
                  </p>
                  
                  <div className="flex justify-between items-center mt-auto">
                    {repo.language ? (
                      <div className="flex items-center">
                        <span className={`w-3 h-3 rounded-full mr-2 ${getLanguageColor(repo.language)}`}></span>
                        <span className="text-sm text-gray-300">{repo.language}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-gray-500">No language detected</span>
                    )}
                    
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center text-gray-400">
                        <Star size={16} className="mr-1" />
                        <span className="text-xs">{repo.stargazers_count}</span>
                      </div>
                      <div className="flex items-center text-gray-400">
                        <GitFork size={16} className="mr-1" />
                        <span className="text-xs">{repo.forks_count}</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
        
        <div className="text-center mt-12 fade-up hidden transition-all duration-500 transform translate-y-8">
          <a 
            href="https://github.com/ysathyasai" 
            target="_blank" 
            rel="noopener noreferrer"
            className="btn-gradient inline-flex items-center space-x-2"
          >
            <Github size={18} />
            <span>View All Projects</span>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;
