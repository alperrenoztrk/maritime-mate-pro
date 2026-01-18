/**
 * Code sanitizer for AI-generated React components
 * Blocks dangerous patterns to prevent XSS and unauthorized access
 */

// Dangerous patterns that should be blocked
const DANGEROUS_PATTERNS = [
  // Storage access
  /localStorage\s*\./gi,
  /sessionStorage\s*\./gi,
  /indexedDB/gi,
  
  // Cookie access
  /document\s*\.\s*cookie/gi,
  
  // Dynamic code execution
  /\beval\s*\(/gi,
  /new\s+Function\s*\(/gi,
  /Function\s*\(/gi,
  
  // DOM manipulation that could be dangerous
  /document\s*\.\s*write/gi,
  /document\s*\.\s*writeln/gi,
  /innerHTML\s*=/gi,
  /outerHTML\s*=/gi,
  /insertAdjacentHTML/gi,
  
  // Network requests
  /\bfetch\s*\(/gi,
  /XMLHttpRequest/gi,
  /\baxios\b/gi,
  
  // Window manipulation
  /window\s*\.\s*location/gi,
  /window\s*\.\s*open/gi,
  /window\s*\.\s*parent/gi,
  /window\s*\.\s*top/gi,
  /window\s*\.\s*frames/gi,
  
  // Script injection
  /<\s*script/gi,
  /javascript\s*:/gi,
  /data\s*:\s*text\/html/gi,
  
  // Import/require (could load external code)
  /\bimport\s*\(/gi,
  /\brequire\s*\(/gi,
  
  // Prototype pollution
  /__proto__/gi,
  /prototype\s*\[/gi,
  /Object\s*\.\s*defineProperty/gi,
  
  // Dangerous globals
  /\bProcess\b/gi,
  /\bBuffer\b/gi,
  /\bglobal\b/gi,
];

// Dangerous string literals to check for
const DANGEROUS_STRINGS = [
  'localStorage',
  'sessionStorage',
  'document.cookie',
  'eval(',
  'new Function',
  'Function(',
  'fetch(',
  'XMLHttpRequest',
  'window.location',
  'window.open',
  '<script',
  'javascript:',
  '__proto__',
];

export interface SanitizationResult {
  isValid: boolean;
  violations: string[];
  sanitizedCode: string | null;
}

/**
 * Sanitize AI-generated code by checking for dangerous patterns
 */
export function sanitizeCode(code: string): SanitizationResult {
  const violations: string[] = [];
  
  if (!code || typeof code !== 'string') {
    return {
      isValid: false,
      violations: ['Invalid code input'],
      sanitizedCode: null,
    };
  }

  // Check for dangerous patterns using regex
  for (const pattern of DANGEROUS_PATTERNS) {
    if (pattern.test(code)) {
      const patternName = pattern.source.replace(/\\s\*\\./g, '.').replace(/\\/g, '');
      violations.push(`Dangerous pattern detected: ${patternName}`);
      // Reset lastIndex for global patterns
      pattern.lastIndex = 0;
    }
  }

  // Check for dangerous string literals
  const lowerCode = code.toLowerCase();
  for (const dangerousStr of DANGEROUS_STRINGS) {
    if (lowerCode.includes(dangerousStr.toLowerCase())) {
      // Already covered by patterns, skip to avoid duplicates
      continue;
    }
  }

  // If violations found, code is not valid
  if (violations.length > 0) {
    return {
      isValid: false,
      violations: [...new Set(violations)], // Remove duplicates
      sanitizedCode: null,
    };
  }

  return {
    isValid: true,
    violations: [],
    sanitizedCode: code,
  };
}

/**
 * Quick check if code contains any dangerous patterns
 */
export function isCodeSafe(code: string): boolean {
  return sanitizeCode(code).isValid;
}

/**
 * Get human-readable security warning for violations
 */
export function getSecurityWarning(violations: string[]): string {
  if (violations.length === 0) return '';
  
  return `⚠️ Güvenlik Uyarısı: Bu kod potansiyel olarak tehlikeli kalıplar içeriyor:\n${violations.map(v => `• ${v}`).join('\n')}\n\nBu kod güvenlik nedeniyle çalıştırılmayacak.`;
}
