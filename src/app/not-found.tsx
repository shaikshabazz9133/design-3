import { Button } from "@/components/site/ui";

export default function NotFound() {
  return (
    <section className="mx-auto flex min-h-[85vh] max-w-3xl flex-col items-center justify-center px-5 pt-24 text-center">
      <p className="font-serif text-[clamp(6rem,20vw,12rem)] font-light italic leading-none text-champagne">404</p>
      <h1 className="mt-4 font-serif text-4xl font-light text-bone sm:text-5xl">This room hasn&apos;t been designed yet.</h1>
      <p className="mt-5 max-w-md font-sans text-[15px] font-light leading-7 text-mute">The page you were looking for has moved or never existed. Let us show you somewhere more beautiful.</p>
      <div className="mt-10 flex flex-wrap justify-center gap-4">
        <Button href="/" variant="dark">Return home</Button>
        <Button href="/projects" variant="outline-dark">View projects</Button>
      </div>
    </section>
  );
}
