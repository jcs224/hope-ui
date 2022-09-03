import { nodeTypes } from "@mdx-js/mdx";
import mdx from "@mdx-js/rollup";
import rehypePrettyCode from "rehype-pretty-code";
import rehypeRaw from "rehype-raw";
import remarkGfm from "remark-gfm";
import remarkShikiTwoslash from "remark-shiki-twoslash";
import solid from "solid-start/vite";
import netlify from "solid-start-netlify";
import node from "solid-start-node";
import { defineConfig } from "vite";

const adapter = process.env.GITHUB_ACTIONS ? node() : netlify();

export default defineConfig({
  plugins: [
    {
      ...mdx({
        jsx: true,
        jsxImportSource: "solid-js",
        providerImportSource: "solid-mdx",
        rehypePlugins: [
          [rehypeRaw, { passThrough: nodeTypes }],
          [rehypePrettyCode, {}],
        ],
        remarkPlugins: [
          remarkGfm,
          [
            // @ts-ignore
            remarkShikiTwoslash.default,
            {
              disableImplicitReactImport: true,
              includeJSDocInHover: true,
              themes: ["github-light", "github-dark"],
              defaultOptions: {
                lib: ["dom", "es2015"],
              },
              defaultCompilerOptions: {
                allowSyntheticDefaultImports: true,
                esModuleInterop: true,
                target: "ESNext",
                module: "ESNext",
                lib: ["dom", "es2015"],
                jsxImportSource: "solid-js",
                jsx: "preserve",
                types: ["vite/client"],
                paths: {
                  "~/*": ["./src/*"],
                },
              },
            },
          ],
        ],
      }),
      enforce: "pre",
    } as any,
    solid({ adapter, extensions: [".mdx", ".md"] }),
  ],
});
