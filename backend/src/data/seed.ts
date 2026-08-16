import {
  Achievement,
  Certification,
  EducationEntry,
  ExperienceEntry,
  Project,
  SkillCategory,
} from '../types/portfolio';

export const seedProjects: Project[] = [
  {
    id: 'p01',
    slug: 'multi-region-aws-deployment',
    number: '01',
    title: 'Multi-Region Application Deployment with Docker & AWS Route 53',
    description:
      'Engineered an active-passive multi-region cloud deployment architecture across US East (N. Virginia) and Asia Pacific (Mumbai) to eliminate single points of failure and deliver automated regional failover.',
    highlights: [
      'Containerized a Tic-Tac-Toe web application using Dockerfiles to ensure environment consistency and portability across all deployment stages.',
      'Managed Docker images in Amazon ECR with centralized storage and version control to enable seamless multi-region distribution.',
      'Deployed application clusters using AWS ECS (Fargate) across two regions (N. Virginia and Mumbai) to eliminate single points of failure.',
      'Configured AWS Route 53 with latency-based routing and health checks to automatically direct traffic to the nearest healthy region.',
      'Simulated regional failover scenarios to validate Route 53 traffic redirection, achieving 100% service availability during outages.',
    ],
    technologies: ['AWS (EC2, ECR, ECS, Route 53, IAM)', 'Docker', 'GitHub'],
    category: 'Final Year Project',
    liveUrl: '',
    repoUrl: '',
    imageLabel: '',
    docUrl: 'https://github.com/rharikrishnanrajan',
    order: 1,
  },
  {
    id: 'p02',
    slug: 'docker-swarm-deployment',
    number: '02',
    title: 'Scalable Web Service Deployment using Docker Swarm',
    description:
      'Designed and provisioned a fault-tolerant distributed container cluster on AWS EC2, implementing automated node management, internal overlay networking, and ingress load balancing.',
    highlights: [
      'Initialized a Docker Swarm cluster across three AWS EC2 instances (one Manager, two Worker nodes) for distributed task management.',
      'Implemented service scaling to handle fluctuating traffic loads, ensuring high availability of containerized web services.',
      'Leveraged Docker Swarm’s built-in load balancer to distribute incoming requests efficiently across all service replicas.',
      'Provisioned and secured AWS EC2 infrastructure with custom Security Groups and storage configurations.',
    ],
    technologies: ['Docker', 'Docker Swarm', 'AWS EC2', 'Amazon Linux'],
    category: 'L&T EduTech Project',
    liveUrl: '',
    repoUrl: '',
    imageLabel: '',
    docUrl: 'https://github.com/rharikrishnanrajan',
    order: 2,
  },
  {
    id: 'p03',
    slug: 'cicd-react-aws',
    number: '03',
    title: 'CI/CD Pipeline for React Application on AWS',
    description:
      'Built a declarative Pipeline-as-Code delivery workflow on AWS EC2 running Jenkins, integrating automated filesystem vulnerability scanning and secure container publishing.',
    highlights: [
      'Configured a Jenkins server on AWS EC2 to automate the full software delivery lifecycle for a React application.',
      'Integrated Trivy into the pipeline for filesystem and container image vulnerability scanning, ensuring secure deployments.',
      'Authored Jenkinsfile Pipeline-as-Code to handle automated Docker image building, tagging, and pushing to Amazon ECR.',
    ],
    technologies: ['Jenkins', 'Docker', 'Trivy', 'AWS (EC2, ECR)', 'Java', 'React'],
    category: 'L&T EduTech Project',
    liveUrl: '',
    repoUrl: '',
    imageLabel: '',
    docUrl: 'https://github.com/rharikrishnanrajan',
    order: 3,
  },
  {
    id: 'p04',
    slug: 'automated-aws-deployment',
    number: '04',
    title: 'Automated Web Application Deployment on AWS with Jenkins & Docker',
    description:
      'Transformed manual deployments into a deterministic continuous delivery pipeline that pulls code from GitHub, packages portable Docker images, and updates target AWS environments in minutes.',
    highlights: [
      'Developed a Jenkinsfile Pipeline-as-Code to automate the entire software lifecycle from GitHub code commit to production deployment on AWS.',
      'Utilized Docker to package the application and its dependencies into portable images, eliminating environment drift between development and production.',
      'Configured AWS ECR as a private image repository with versioning, enabling reliable rollbacks to previous stable releases.',
      'Provisioned and managed AWS EC2 servers with appropriate Security Group rules (e.g., Port 3000) to host containerized workloads.',
      'Reduced deployment time from hours to minutes and eliminated manual errors by fully automating the release process.',
    ],
    technologies: ['Jenkins', 'Docker', 'AWS EC2', 'AWS ECR', 'Git/GitHub', 'React.js'],
    category: 'Personal Project',
    liveUrl: '',
    repoUrl: '',
    imageLabel: '',
    docUrl: 'https://github.com/rharikrishnanrajan',
    order: 4,
  },
  {
    id: 'p05',
    slug: 'nexara-ai-chatbot',
    number: '05',
    title: 'NEXARA (Chat with Artificial Intelligence)',
    description:
      'Engineered an intelligent conversational mobile application integrating Google Gemini AI API endpoints with structured client-side request processing and state management.',
    highlights: [
      'Built an AI chatbot mobile application in Flutter, integrated with the Gemini AI API to generate conversational responses.',
      'Collaborated with UG classmate M.V. Gayathri to design and develop the app as a group mini project.',
    ],
    technologies: ['Flutter', 'Gemini AI API'],
    category: 'Group Mini Project',
    liveUrl: '',
    repoUrl: '',
    imageLabel: '',
    collaborator: 'M.V. Gayathri',
    date: 'June 2024',
    docUrl: 'https://github.com/rharikrishnanrajan',
    order: 5,
  },
];

export const seedSkills: SkillCategory[] = [
  {
    id: 's01',
    category: 'Cloud & Infrastructure',
    skills: [
      'AWS EC2',
      'AWS ECS Fargate',
      'Amazon ECR',
      'AWS Route 53',
      'AWS IAM & RBAC',
      'AWS Systems Manager (SSM)',
      'AWS VPC & Networking',
    ],
    order: 1,
  },
  {
    id: 's02',
    category: 'DevOps & CI/CD Automation',
    skills: [
      'Jenkins Automation Server',
      'Pipeline-as-Code (Jenkinsfile)',
      'CI/CD Release Pipelines',
      'GitHub Webhooks & Actions',
      'Automated Rollback Strategies',
    ],
    order: 2,
  },
  {
    id: 's03',
    category: 'Containers & Orchestration',
    skills: [
      'Docker Containerization',
      'Docker Swarm Clustering',
      'AWS ECS Task Definitions',
      'Multi-Stage Docker Builds',
      'Container Image Optimization',
    ],
    order: 3,
  },
  {
    id: 's04',
    category: 'Security & Quality (DevSecOps)',
    skills: [
      'Trivy Vulnerability Scanner',
      'SonarQube Code Quality',
      'Container Image CVE Auditing',
      'IAM Least Privilege Policies',
      'Secrets & Key Security',
    ],
    order: 4,
  },
  {
    id: 's05',
    category: 'Operating Systems & Scripting',
    skills: [
      'Linux Administration',
      'Amazon Linux 2 / 2023',
      'Ubuntu Server',
      'Bash & Shell Scripting',
      'Git Version Control',
    ],
    order: 5,
  },
  {
    id: 's06',
    category: 'AI & Engineering Automation',
    skills: [
      'Google Gemini AI API',
      'Antigravity CLI Tooling',
      'Automated Dev Workflows',
      'LLM Prompt Engineering',
      'AI-Assisted CI/CD Diagnostics',
    ],
    order: 6,
  },
];

export const seedCertifications: Certification[] = [
  {
    id: 'c01',
    name: 'Fundamentals of Agile Methodology with DevOps Integration',
    issuer: 'L&T EduTech',
    date: 'Aug 2023 – Nov 2023',
    pdfUrl: 'https://lntedutech.com',
    order: 1,
  },
  {
    id: 'c02',
    name: 'DevOps and Cloud',
    issuer: 'L&T EduTech',
    date: 'Jan 2024 – Apr 2024',
    pdfUrl: 'https://lntedutech.com',
    order: 2,
  },
  {
    id: 'c03',
    name: 'DevOps Container Services',
    issuer: 'L&T EduTech',
    date: 'Jun 2024 – Oct 2024',
    pdfUrl: 'https://lntedutech.com',
    order: 3,
  },
  {
    id: 'c04',
    name: 'Blockchain and Its Applications',
    issuer: 'NPTEL SWAYAM',
    date: 'Jan 2026 – Apr 2026',
    pdfUrl: 'https://nptel.ac.in',
    order: 4,
  },
  {
    id: 'c05',
    name: 'Introduction to Data Science',
    issuer: 'Cisco Networking Academy',
    date: 'Jan 20, 2026',
    pdfUrl: 'https://www.netacad.com',
    order: 5,
  },
];

export const seedAchievements: Achievement[] = [];

export const seedEducation: EducationEntry[] = [
  {
    id: 'e01',
    degree: 'Master of Computer Applications (MCA)',
    institution: 'Dr. G.R. Damodaran College of Science',
    status: 'Pursuing — up to 2nd Semester',
    cgpa: '8.05',
    order: 1,
  },
  {
    id: 'e02',
    degree: 'Bachelor of Computer Applications (BCA)',
    institution: 'Sri Ramakrishna College of Arts and Science',
    cgpa: '7.94',
    order: 2,
  },
];

export const seedExperience: ExperienceEntry[] = [];
