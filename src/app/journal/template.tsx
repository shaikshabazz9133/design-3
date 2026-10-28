import { SubTransition } from "@/components/site/Transition";

export default function Template({ children }: { children: React.ReactNode }) {
  return <SubTransition>{children}</SubTransition>;
}
