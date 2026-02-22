export function detectLanguage(code: string): string {
  if (!code) return 'javascript';
  
  const trimmedCode = code.trim();

  // Basic Heuristics
  if (trimmedCode.startsWith('<!DOCTYPE html>') || trimmedCode.includes('</html>')) return 'html';
  if (trimmedCode.includes('import React') || trimmedCode.includes('export default function') || trimmedCode.includes('className=')) return 'tsx';
  if (trimmedCode.includes('public class') || trimmedCode.includes('System.out.println')) return 'java';
  if (trimmedCode.includes('def ') && trimmedCode.includes(':')) return 'python';
  if (trimmedCode.includes('#include <stdio.h>') || trimmedCode.includes('int main(')) return 'c';
  if (trimmedCode.includes('fn main()') || trimmedCode.includes('println!')) return 'rust';
  if (trimmedCode.includes('package main') && trimmedCode.includes('func main()')) return 'go';
  if (trimmedCode.includes('<?php')) return 'php';
  if (trimmedCode.includes('background-color:') || trimmedCode.includes('margin:')) return 'css';
  if (trimmedCode.startsWith('{') && trimmedCode.endsWith('}')) return 'json';

  // Default to JavaScript if it looks like JS
  if (trimmedCode.includes('const ') || trimmedCode.includes('let ') || trimmedCode.includes('console.log') || trimmedCode.includes('function')) return 'javascript';

  return 'javascript'; // Default fallback
}
