module.exports = {
  analizarLog(content) {
    const lines = content.split("\n");
    const errores = lines.filter(line => /error|fail|missing|undefined/i.test(line));
    const syncIssues = lines.filter(line => /DATABASE_URL.*(no match|mismatch|invalid)/i.test(line));

    if (errores.length > 0) {
      console.warn("\n⚠️ Errores detectados:");
      errores.forEach(line => console.log("🔴", line));
    }

    if (syncIssues.length > 0) {
      console.warn("\n🔄 Desincronización detectada:");
      syncIssues.forEach(line => console.log("🟡", line));
    }

    if (errores.length === 0 && syncIssues.length === 0) {
      console.log("\n✅ Log limpio.");
    }
  }
};