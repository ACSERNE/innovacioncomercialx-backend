#!/bin/bash

gh label create "feature" --description "Nueva funcionalidad o mejora" --color FFD700

gh issue create --title "Crear exportador de reportes PDF y Excel" \
  --body "Debe permitir generar reportes desde las transacciones y exportarlos desde React." \
  --label "feature"

gh issue create --title "Autenticación con 2FA (Autenticación en dos pasos)" \
  --body "Implementar autenticación robusta usando JWT + código de verificación 2FA (por correo o app tipo Google Authenticator)." \
  --label "feature"

gh issue create --title "Sistema de Alertas por vencimiento o stock bajo" \
  --body "Diseñar lógica que genere alertas automáticas para productos próximos a vencer o con stock bajo. Mostrar alertas desde React." \
  --label "feature"

gh issue create --title "Reportes diarios, semanales y mensuales" \
  --body "Generar reportes automáticos en la base de datos desde las transacciones. Mostrar resumen en el dashboard de React y exportar si es necesario." \
  --label "feature"

gh issue create --title "Registrar ventas con actualización de stock y caja" \
  --body "Al registrar una venta debe descontarse el stock, actualizar el flujo de caja (entrada) y guardarse en la tabla correspondiente." \
  --label "feature"
