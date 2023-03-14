'use strict'

// Put a backslash (\) before the backtick to escape a backtick in a template
// literal. But it is more readable using a ' then a \`. So use ' instead and
// then replace them with \`.
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Template_literals
export function sql (str) {
  if (!str) {
    return
  }
  return str.replace(/\'/g, '\`')
}
