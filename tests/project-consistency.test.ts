import { describe, expect, test } from "bun:test"
import { promises as fs } from "fs"
import path from "path"

const repoRoot = path.join(import.meta.dir, "..")
const commandsDir = path.join(repoRoot, "plugins", "compound-engineering", "commands")
const docsIndexPath = path.join(repoRoot, "docs", "index.html")

async function listFilesRecursive(root: string): Promise<string[]> {
  const output: string[] = []
  const stack = [root]

  while (stack.length > 0) {
    const current = stack.pop()!
    const entries = await fs.readdir(current, { withFileTypes: true })
    for (const entry of entries) {
      const fullPath = path.join(current, entry.name)
      if (entry.isDirectory()) {
        stack.push(fullPath)
      } else if (entry.isFile()) {
        output.push(fullPath)
      }
    }
  }

  return output
}

describe("project consistency", () => {
  test("docs command count matches command file count", async () => {
    const commandFiles = await listFilesRecursive(commandsDir)
    const actualCount = commandFiles.filter((file) => file.endsWith(".md")).length

    const indexHtml = await fs.readFile(docsIndexPath, "utf8")
    const match = indexHtml.match(/(\d+)\s+Powerful Commands/)
    expect(match).toBeTruthy()

    const docsCount = Number(match![1])
    expect(docsCount).toBe(actualCount)
  })

  test("legacy TodoWrite/TodoRead tokens are not present in active sources", async () => {
    const scanRoots = [
      path.join(repoRoot, "src"),
      path.join(repoRoot, "tests"),
      path.join(repoRoot, "plugins", "compound-engineering"),
      path.join(repoRoot, "docs"),
    ]

    const excludedFiles = new Set([path.join(import.meta.dir, "project-consistency.test.ts")])
    const pattern = /\b(TodoWrite|TodoRead|todowrite|todoread)\b/

    const hits: string[] = []
    for (const root of scanRoots) {
      const files = await listFilesRecursive(root)
      for (const file of files) {
        if (excludedFiles.has(file)) continue
        const content = await fs.readFile(file, "utf8")
        if (pattern.test(content)) {
          hits.push(path.relative(repoRoot, file))
        }
      }
    }

    expect(hits).toEqual([])
  })
})
