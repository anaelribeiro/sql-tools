window.addEventListener("DOMContentLoaded", () => {
  const baseTable = document.getElementById("baseTable");
  const baseAlias = document.getElementById("baseAlias");
  const selectColumns = document.getElementById("selectColumns");
  const joinType = document.getElementById("joinType");
  const joinsInput = document.getElementById("joinsInput");
  const outputSql = document.getElementById("outputSql");
  const generateBtn = document.getElementById("generateBtn");
  const copyBtn = document.getElementById("copyBtn");
  const clearBtn = document.getElementById("clearBtn");

  const joinKeywords = [
    "LEFT JOIN",
    "RIGHT JOIN",
    "INNER JOIN",
    "FULL JOIN",
    "JOIN"
  ];

  function normalizeJoinLine(line, defaultJoinType) {
    const trimmed = line.trim();
    if (!trimmed) return "";

    const upper = trimmed.toUpperCase();

    for (const keyword of joinKeywords) {
      if (upper.startsWith(keyword)) {
        return trimmed;
      }
    }

    return defaultJoinType + " " + trimmed;
  }

  function buildSql() {
    const table = baseTable.value.trim();
    const alias = baseAlias.value.trim();
    const columns = selectColumns.value.trim();
    const defaultJoinType = joinType.value;
    const rawJoins = joinsInput.value
      .split("\n")
      .map((line) => line.trim())
      .filter((line) => line);

    if (!table) {
      outputSql.value = "Please fill in the base table.";
      return;
    }

    let sql = "";

    sql += "SELECT\n";
    sql += columns ? columns + "\n" : "    *\n";
    sql += "FROM " + table;

    if (alias) {
      sql += " " + alias;
    }

    sql += "\n";

    if (rawJoins.length > 0) {
      const joins = rawJoins.map((line) => normalizeJoinLine(line, defaultJoinType));
      sql += joins.join("\n") + "\n";
    }

    outputSql.value = sql.trim();
  }

  async function copySql() {
    const text = outputSql.value;
    if (!text.trim()) return;

    try {
      await navigator.clipboard.writeText(text);
      copyBtn.textContent = "Copied";
      setTimeout(() => {
        copyBtn.textContent = "Copy SQL";
      }, 1200);
    } catch (error) {
      copyBtn.textContent = "Copy failed";
      setTimeout(() => {
        copyBtn.textContent = "Copy SQL";
      }, 1200);
    }
  }

  function clearAll() {
    baseTable.value = "";
    baseAlias.value = "";
    selectColumns.value = "";
    joinsInput.value = "";
    outputSql.value = "";
    joinType.value = "LEFT JOIN";
  }

  generateBtn.addEventListener("click", buildSql);
  copyBtn.addEventListener("click", copySql);
  clearBtn.addEventListener("click", clearAll);
});
