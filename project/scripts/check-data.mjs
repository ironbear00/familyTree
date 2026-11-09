// Loads the family data through Vite (so the @/ alias and TypeScript work) and validates it.
// Exits with code 1 when there are problems, which stops the deploy.
import { createServer } from "vite";

const server = await createServer({
  server: { middlewareMode: true },
  appType: "custom",
  logLevel: "error",
  // Only loading two modules; skip the browser dependency scan.
  optimizeDeps: { noDiscovery: true, include: [] },
});

let errors;
try {
  const { familyData } = await server.ssrLoadModule("/src/data/familyData.ts");
  const { validateFamilyData } = await server.ssrLoadModule("/src/data/validate.ts");
  errors = validateFamilyData(familyData.members);
  if (errors.length === 0) console.log(`가계도 데이터 점검 통과: ${familyData.members.length}명`);
} catch (e) {
  errors = [`familyData.ts를 불러오지 못했어요 (오타나 남은 글자가 있는지 확인): ${e.message}`];
} finally {
  await server.close();
}

if (errors.length) {
  console.error(`가계도 데이터에 문제가 ${errors.length}개 있어요:`);
  errors.forEach((e) => console.error(`  - ${e}`));
  process.exit(1);
}
