import python from "/public/programming-lang/python.png";
import javascript from "/public/programming-lang/javascript.png";
import java from "/public/programming-lang/java.png";
import csharp from "/public/programming-lang/csharp.png";
import php from "/public/programming-lang/php.png";
import ruby from "/public/programming-lang/ruby.png";
import swift from "/public/programming-lang/swift.png";
import kotlin from "/public/programming-lang/kotlin.png";
import cplusplus from "/public/programming-lang/cplusplus.png";
import bash from "/public/programming-lang/bash.png";
import css from "/public/programming-lang/css.png";
import nextjs from "/public/programming-lang/nextjs.png";
import nodejs from "/public/programming-lang/nodejs.png";
import react from "/public/programming-lang/react.png";
import rust from "/public/programming-lang/rust.png";
import typescript from "/public/programming-lang/typescript.png";
import html from "/public/programming-lang/html.png";
import c from "/public/programming-lang/c.png";

import { StaticImageData } from "next/image";
import { Language, Technology } from "@prisma/client";

export type TechnoItem = {
  src: StaticImageData;
  color: string;
  label: string;
  language: Language;
  technology: Technology;
};

export const SNIPPETS_METADATA: {
  [key: string]: TechnoItem;
} = {
  bash: {
    src: bash,
    color: "var(--bash-color)",
    label: "Bash",
    language: "bash",
    technology: "bash",
  },
  c: {
    src: c,
    color: "var(--c-color)",
    label: "C",
    language: "c",
    technology: "c",
  },
  csharp: {
    src: csharp,
    color: "var(--csharp-color)",
    label: "C#",
    language: "csharp",
    technology: "csharp",
  },
  cpp: {
    src: cplusplus,
    color: "var(--cpp-color)",
    label: "C++",
    language: "cpp",
    technology: "cpp",
  },
  css: {
    src: css,
    color: "var(--css-color)",
    label: "CSS",
    language: "css",
    technology: "css",
  },
  html: {
    src: html,
    color: "var(--html-color)",
    label: "HTML",
    technology: "html",
    language: "jsx",
  },
  java: {
    src: java,
    color: "var(--java-color)",
    label: "Java",
    language: "java",
    technology: "java",
  },
  javascript: {
    src: javascript,
    color: "var(--javascript-color)",
    label: "JavaScript",
    language: "javascript",
    technology: "javascript",
  },
  kotlin: {
    src: kotlin,
    color: "var(--kotlin-color)",
    label: "Kotlin",
    language: "kotlin",
    technology: "kotlin",
  },
  nextjs: {
    src: nextjs,
    color: "var(--nextjs-color)",
    label: "NextJS",
    language: "jsx",
    technology: "nextjs",
  },
  nodejs: {
    src: nodejs,
    color: "var(--nodejs-color)",
    label: "NodeJS",
    language: "typescript",
    technology: "nodejs",
  },
  php: {
    src: php,
    color: "var(--php-color)",
    label: "PHP",
    language: "php",
    technology: "php",
  },
  python: {
    src: python,
    color: "var(--python-color)",
    label: "Python",
    language: "python",
    technology: "python",
  },
  react: {
    src: react,
    color: "var(--react-color)",
    label: "React",
    language: "jsx",
    technology: "react",
  },
  ruby: {
    src: ruby,
    color: "var(--ruby-color)",
    label: "Ruby",
    language: "ruby",
    technology: "ruby",
  },
  rust: {
    src: rust,
    color: "var(--rust-color)",
    label: "Rust",
    language: "rust",
    technology: "rust",
  },
  swift: {
    src: swift,
    color: "var(--swift-color)",
    label: "Swift",
    language: "swift",
    technology: "swift",
  },
  typescript: {
    src: typescript,
    color: "var(--typescript-color)",
    label: "TypeScript",
    language: "typescript",
    technology: "typescript",
  },
};
