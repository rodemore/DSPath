import type { Section } from '../../types';
import {
  validateForIfCounter,
  validateForIfSum,
  validateForIfList,
  validateForNestedIf,
  validateForIfStats,
  validateForIfString,
  validateWhileIfCounter,
  validateForRangeIf,
  validateForListConditional,
} from './validators';

export const module12: Section = {
  id: 11,
  moduleNumber: 'Módulo 12',
  title: 'Desafíos:',
  titleHighlight: 'Integrando Conceptos',
  theoryBlocks: [
    {
      icon: '🎯',
      title: 'Poniendo todo junto',
      content: 'Has aprendido los fundamentos de Python: variables, operadores, strings, listas, diccionarios, condicionales y bucles. Ahora es momento de <strong>combinarlos</strong> para resolver problemas más interesantes y reales.',
    },
    {
      icon: '💪',
      title: 'Estrategia para resolver problemas',
      content: 'Cuando enfrentes un problema complejo, divídelo en pasos pequeños:<br><br>1. <strong>Entiende</strong> qué te piden<br>2. <strong>Identifica</strong> qué estructuras necesitas (bucles, condicionales, listas...)<br>3. <strong>Planifica</strong> el orden de las operaciones<br>4. <strong>Implementa</strong> paso a paso<br>5. <strong>Prueba</strong> y ajusta',
    },
    {
      icon: '🔥',
      title: 'Ejemplo integrador: Análisis de notas',
      content: 'Veamos un ejemplo que combina listas, bucles FOR y condicionales:',
      codeExample: {
        filename: 'analisis_notas.py',
        code: `<span class="identifier">notas</span> = [<span class="number">85</span>, <span class="number">92</span>, <span class="number">78</span>, <span class="number">65</span>, <span class="number">90</span>, <span class="number">45</span>, <span class="number">88</span>]

<span class="identifier">aprobados</span> = <span class="number">0</span>
<span class="identifier">excelentes</span> = <span class="number">0</span>
<span class="identifier">suma_total</span> = <span class="number">0</span>

<span class="comment"># Analizar cada nota</span>
<span class="keyword">for</span> <span class="identifier">nota</span> <span class="keyword">in</span> notas:
    suma_total = suma_total + nota

    <span class="keyword">if</span> nota &gt;&#61; <span class="number">90</span>:
        excelentes = excelentes + <span class="number">1</span>

    <span class="keyword">if</span> nota &gt;&#61; <span class="number">70</span>:
        aprobados = aprobados + <span class="number">1</span>

<span class="comment"># Calcular promedio</span>
<span class="identifier">promedio</span> = suma_total / <span class="builtin">len</span>(notas)

<span class="comment"># Mostrar resultados</span>
<span class="builtin">print</span>(<span class="string">f"Total de estudiantes: {len(notas)}"</span>)
<span class="builtin">print</span>(<span class="string">f"Aprobados: {aprobados}"</span>)
<span class="builtin">print</span>(<span class="string">f"Excelentes: {excelentes}"</span>)
<span class="builtin">print</span>(<span class="string">f"Promedio: {promedio:.2f}"</span>)

<span class="output"># → Total de estudiantes: 7</span>
<span class="output"># → Aprobados: 5</span>
<span class="output"># → Excelentes: 2</span>
<span class="output"># → Promedio: 77.57</span>`,
      },
    },
  ],
  tipBox: {
    icon: '🌟',
    content: 'Los ejercicios de este módulo combinan múltiples conceptos. Si te atascas, revisa los módulos anteriores y descompón el problema en partes más pequeñas. ¡Tú puedes!',
  },
  exercises: [
    {
      id: 'ex-12-1',
      number: 'EJERCICIO 12.1',
      description: 'Crea una lista <span class="inline-code">numeros = [3, 7, 12, 5, 18, 9, 21]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">if</span> para contar cuántos números son pares. Crea una variable <span class="inline-code">pares = 0</span> y auméntala cuando encuentres un número par (usa <span class="inline-code">numero % 2 == 0</span>). Imprime el contador al final.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForIfCounter,
    },
    {
      id: 'ex-12-2',
      number: 'EJERCICIO 12.2',
      description: 'Crea una lista <span class="inline-code">precios = [25, 50, 15, 80, 30]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">if</span> para sumar solo los precios menores a 40. Crea <span class="inline-code">total = 0</span> y acumula solo cuando el precio sea menor a 40. Imprime el total.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForIfSum,
    },
    {
      id: 'ex-12-3',
      number: 'EJERCICIO 12.3',
      description: 'Crea una lista <span class="inline-code">temperaturas = [22, 28, 19, 31, 25, 18]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">if</span> para crear una nueva lista llamada <span class="inline-code">dias_calurosos = []</span>. Agrega a esta lista solo las temperaturas mayores a 25 usando <span class="inline-code">.append()</span>. Imprime la lista resultante.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForIfList,
    },
    {
      id: 'ex-12-4',
      number: 'EJERCICIO 12.4',
      description: 'Crea una lista <span class="inline-code">edades = [15, 22, 17, 30, 12, 25]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">if-elif-else</span> para clasificar cada edad e imprimir:<br>- "Niño" si edad &lt; 13<br>- "Adolescente" si 13 &lt;&#61; edad &lt; 18<br>- "Adulto" si edad &gt;&#61; 18',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForNestedIf,
    },
    {
      id: 'ex-12-5',
      number: 'EJERCICIO 12.5',
      description: 'Crea una lista <span class="inline-code">notas = [85, 92, 78, 65, 90, 45, 88]</span>.<br><br>Calcula y muestra:<br>1. El promedio (usa <span class="inline-code">sum()</span> y <span class="inline-code">len()</span>)<br>2. Cuántos aprobaron (nota &gt;&#61; 70)<br>3. Cuántos reprobaron (nota &lt; 70)<br>Usa un bucle <span class="inline-code">for</span> para contar aprobados y reprobados. Imprime los tres resultados.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForIfStats,
    },
    {
      id: 'ex-12-6',
      number: 'EJERCICIO 12.6',
      description: 'Crea una variable <span class="inline-code">palabra = "Python"</span>.<br><br>Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">if</span> para contar cuántas vocales (a, e, i, o, u) tiene la palabra. Crea <span class="inline-code">vocales = 0</span> y auméntala cuando encuentres una vocal. Usa <span class="inline-code">letra.lower()</span> para comparar en minúsculas. Imprime el contador.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForIfString,
    },
    {
      id: 'ex-12-7',
      number: 'EJERCICIO 12.7',
      description: 'Usa un bucle <span class="inline-code">for</span> con <span class="inline-code">range(1, 21)</span> para imprimir solo los números divisibles entre 3. Usa <span class="inline-code">if numero % 3 == 0</span> para verificarlo.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForRangeIf,
    },
    {
      id: 'ex-12-8',
      number: 'EJERCICIO 12.8',
      description: 'Crea una lista <span class="inline-code">productos = ["manzana", "pan", "leche", "arroz", "agua"]</span>.<br><br>Usa un bucle <span class="inline-code">for</span> para imprimir solo los productos que tengan más de 4 letras. Usa <span class="inline-code">len(producto) &gt; 4</span> como condición.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateForListConditional,
    },
    {
      id: 'ex-12-9',
      number: 'EJERCICIO 12.9',
      description: '⭐ <strong>DESAFÍO CON WHILE:</strong> Crea dos variables: <span class="inline-code">numero = 2</span> y <span class="inline-code">contador = 0</span>.<br><br>Usa un bucle <span class="inline-code">while</span> para contar cuántas veces puedes multiplicar numero por 2 antes de que supere 100. En cada iteración, multiplica numero por 2 y aumenta contador en 1. Al final, imprime el contador.',
      expectedOutput: '',
      validationMode: 'custom',
      customValidator: validateWhileIfCounter,
    },
  ],
};
