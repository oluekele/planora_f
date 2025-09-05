export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: "OWNER" | "ADMIN" | "MEMBER" | "CLIENT" | "PERSONAL";
  isApproved: boolean;
  organization?: {
    id: string;
    name: string;
    slug: string;
  } | null;
}
