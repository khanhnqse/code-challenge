import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import {
  User,
  Mail,
  MapPin,
  Code,
  Github,
  Linkedin,
  Globe,
} from "lucide-react";

const candidateInfo = {
  name: "Nguyen Quang Khanh",
  title: "Frontend Developer",
  email: "khanhqn03@gmail.com",
  location: "Ho Chi Minh City, Vietnam",
  experience: "1+ years",
  availability: "Available for immediate start",
  skills: [
    "React",
    "TypeScript",
    "Next.js",
    "Node.js",
    "Tailwind CSS",
    "shadcn/ui",
  ],
  links: {
    github: "https://github.com/khanhnqse",
    linkedin: "https://www.linkedin.com/in/khanhnqse/",
    portfolio: "https://quangkhanh.vercel.app/",
  },
};

export function CandidateCard() {
  return (
    <Card className="max-w-2xl mx-auto">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="space-y-1">
            <CardTitle className="text-xl flex items-center gap-2">
              <User className="w-5 h-5" />
              {candidateInfo.name}
            </CardTitle>
            <CardDescription className="text-base">
              {candidateInfo.title}
            </CardDescription>
          </div>
          <div className="flex gap-2">
            <Badge
              variant="default"
              className="bg-green-900 text-green-100 text-xs"
            >
              {candidateInfo.availability}
            </Badge>
            <Badge variant="outline" className="text-xs">
              {candidateInfo.experience}
            </Badge>
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {/* Contact Info */}
        <div className="flex items-center gap-4 text-sm text-muted-foreground">
          <div className="flex items-center gap-1">
            <Mail className="w-4 h-4" />
            <span>{candidateInfo.email}</span>
          </div>
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{candidateInfo.location}</span>
          </div>
        </div>

        {/* Skills */}
        <div>
          <div className="flex items-center gap-2 mb-2">
            <Code className="w-4 h-4" />
            <span className="text-sm font-medium">Key Skills</span>
          </div>
          <div className="flex flex-wrap gap-1">
            {candidateInfo.skills.map((skill, index) => (
              <Badge key={index} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Social Links */}
        <div className="flex gap-2">
          <a
            href={candidateInfo.links.github}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 hover:underline"
          >
            <Github className="w-4 h-4" />
            GitHub
          </a>
          <a
            href={candidateInfo.links.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 hover:underline"
          >
            <Linkedin className="w-4 h-4" />
            LinkedIn
          </a>
          <a
            href={candidateInfo.links.portfolio}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1 text-sm text-blue-400 hover:text-blue-300 hover:underline"
          >
            <Globe className="w-4 h-4" />
            Portfolio
          </a>
        </div>
      </CardContent>
    </Card>
  );
}
