#!/bin/bash

echo "🔧 Corrigiendo rutas que apuntan a '../middleware/auth' ..."

# Reemplazar require('../middleware/auth') por require('../middleware/authMiddleware')
sed -i "s#require('../middleware/auth')#require('../middleware/authMiddleware')#g" routes/*.js

# Reemplazar require(\"../middleware/auth\") por require(\"../middleware/authMiddleware\")
sed -i 's#require("../middleware/auth")#require("../middleware/authMiddleware")#g' routes/*.js

# Reemplazar const auth = require(...) por const { authenticate } = require(...)
sed -i "s#const auth = require('../middleware/authMiddleware');#const { authenticate } = require('../middleware/authMiddleware');#g" routes/*.js
sed -i 's#const auth = require("../middleware/authMiddleware");#const { authenticate } = require("../middleware/authMiddleware");#g' routes/*.js

# Reemplazar destructuraciones antiguas
sed -i "s#{ authenticate } = require('../middleware/auth')#{ authenticate } = require('../middleware/authMiddleware')#g" routes/*.js
sed -i 's#{ authenticate } = require("../middleware/auth")#{ authenticate } = require("../middleware/authMiddleware")#g' routes/*.js

echo "✅ Reemplazos completados."
echo "⚠️ Recuerda: si alguna ruta usaba hasRole o refreshTokenIfNeeded, deben importarse desde sus propios middlewares."
