
/**
 * @swagger
 * /productos:
 *   get:
 *     summary: Obtener productos públicos
 *     tags: [API Pública]
 *     parameters:
 *       - in: header
 *         name: x-public-token
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Lista de productos públicos
 */
