
import { GitHubRepo } from "@/lib/types";

const GITHUB_USERNAME = "ysathyasai";
const API_BASE_URL = "https://api.github.com";

export async function getGitHubRepos(): Promise<GitHubRepo[]> {
  try {
    const response = await fetch(
      `${API_BASE_URL}/users/${GITHUB_USERNAME}/repos?sort=updated&per_page=10`
    );
    
    if (!response.ok) {
      throw new Error(`GitHub API error: ${response.status}`);
    }
    
    const data = await response.json();
    return data as GitHubRepo[];
  } catch (error) {
    console.error("Failed to fetch GitHub repositories:", error);
    return [];
  }
}

export function getLanguageColor(language: string | null): string {
  if (!language) return "bg-gray-600";
  
  const languageColors: Record<string, string> = {
    JavaScript: "bg-yellow-400",
    TypeScript: "bg-blue-500",
    HTML: "bg-orange-500",
    CSS: "bg-purple-500",
    Python: "bg-green-500",
    Java: "bg-red-500",
    "C#": "bg-green-600",
    Ruby: "bg-red-600",
    Go: "bg-blue-400",
    PHP: "bg-indigo-400",
    Swift: "bg-orange-600",
    Kotlin: "bg-purple-600",
    Rust: "bg-orange-700",
    Dart: "bg-blue-300",
  };
  
  return languageColors[language] || "bg-gray-600";
}
