// Test básico del validador
const code1 = `pi = 3.142
es_positivo = True
print(pi, es_positivo)`;

const code2 = `pi = 3.14159
es_positivo = True
print(type(pi))
print(type(es_positivo))`;

// Simular validación
const hasType1 = (code1.match(/type\s*\(/g) || []).length;
const hasType2 = (code2.match(/type\s*\(/g) || []).length;

console.log('Código 1 - count type():', hasType1);
console.log('Código 2 - count type():', hasType2);
