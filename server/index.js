import express from 'express';
import cors from 'cors';
import Anthropic from '@anthropic-ai/sdk';
import dotenv from 'dotenv';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 3001;

// Middleware
app.use(cors());
app.use(express.json());

// Initialize Anthropic client
const anthropic = new Anthropic({
  apiKey: process.env.ANTHROPIC_API_KEY,
});

// Rate limiting: simple in-memory cache
const usageTracker = new Map();

// Health check endpoint
app.get('/health', (req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

// Smart help endpoint
app.post('/api/smart-help', async (req, res) => {
  try {
    const {
      studentCode,
      exerciseDescription,
      expectedOutput,
      actualOutput,
      errorMessage,
      studentId = 'anonymous',
    } = req.body;

    // Validate required fields
    if (!studentCode || !exerciseDescription) {
      return res.status(400).json({
        error: 'Missing required fields: studentCode and exerciseDescription are required',
      });
    }

    // Simple rate limiting: max 10 requests per student per hour
    const now = Date.now();
    const hourAgo = now - 60 * 60 * 1000;

    if (!usageTracker.has(studentId)) {
      usageTracker.set(studentId, []);
    }

    const userRequests = usageTracker.get(studentId).filter((time) => time > hourAgo);

    if (userRequests.length >= 10) {
      return res.status(429).json({
        error:
          'Has alcanzado el límite de 10 ayudas inteligentes por hora. Intenta de nuevo más tarde.',
        remainingRequests: 0,
      });
    }

    // Track this request
    userRequests.push(now);
    usageTracker.set(studentId, userRequests);

    // Create prompt for Claude
    const prompt = `Eres un tutor de programación Python experto y empático. Un estudiante está atascado en un ejercicio y necesita ayuda.

**Ejercicio:**
${exerciseDescription}

**Salida esperada:**
${expectedOutput || 'No especificada'}

**Código del estudiante:**
\`\`\`python
${studentCode}
\`\`\`

**Salida actual del código:**
${actualOutput || 'El código no produjo salida'}

${errorMessage ? `**Error encontrado:**\n${errorMessage}` : ''}

**Tu tarea:**
1. Identifica qué está haciendo mal el estudiante
2. Explica el error de forma clara y amigable
3. Da una pista específica sin dar la solución completa
4. Si el código tiene errores de sintaxis, menciónalos
5. Anima al estudiante

**Formato de respuesta (JSON):**
{
  "diagnosis": "Explicación breve del problema principal",
  "hint": "Pista específica para resolver el ejercicio",
  "encouragement": "Mensaje motivacional corto",
  "syntaxErrors": ["error1", "error2"] o null si no hay
}

Responde SOLO con el JSON, sin markdown ni texto adicional.`;

    // Call Claude API
    const message = await anthropic.messages.create({
      model: 'claude-3-haiku-20240307', // Modelo más económico
      max_tokens: 500,
      temperature: 0.7,
      messages: [
        {
          role: 'user',
          content: prompt,
        },
      ],
    });

    // Parse Claude's response
    const responseText = message.content[0].text;
    let feedback;

    try {
      feedback = JSON.parse(responseText);
    } catch (parseError) {
      // If JSON parsing fails, create a fallback response
      feedback = {
        diagnosis: responseText.substring(0, 200),
        hint: 'Revisa tu código cuidadosamente y compara con el ejercicio.',
        encouragement: '¡Sigue intentando!',
        syntaxErrors: null,
      };
    }

    // Return response with metadata
    res.json({
      success: true,
      feedback,
      metadata: {
        remainingRequests: 10 - userRequests.length,
        tokensUsed: message.usage.input_tokens + message.usage.output_tokens,
        model: message.model,
      },
    });
  } catch (error) {
    console.error('Error calling Claude API:', error);

    // Handle specific Anthropic errors
    if (error.status === 429) {
      return res.status(429).json({
        error: 'El servicio está temporalmente sobrecargado. Intenta de nuevo en unos momentos.',
      });
    }

    res.status(500).json({
      error: 'Error al generar ayuda inteligente. Intenta de nuevo más tarde.',
      details: process.env.NODE_ENV === 'development' ? error.message : undefined,
    });
  }
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 Smart Help API running on http://localhost:${PORT}`);
  console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
  console.log(`🔑 API Key configured: ${process.env.ANTHROPIC_API_KEY ? '✓' : '✗'}`);
});
