import { ComplexStyleRule, style as veStyle } from '@vanilla-extract/css';

export const styleHelper = <Rule extends ComplexStyleRule>(
  rule: Rule,
  debugId?: string,
): [string, Rule] => [veStyle(rule, debugId), rule];
