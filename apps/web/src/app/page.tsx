import { Button } from "@repo/ui/button"

export default function Home() {
  return (
    <div className="flex min-h-svh flex-col items-center justify-center gap-4">
      <h1 className="text-4xl font-bold">Hello, World</h1>
      <p className="text-muted-foreground">
        Production-ready monorepo boilerplate
      </p>
      <Button>Get Started</Button>
    </div>
  )
}
