const fs = require("fs");
const path = require("path");
const { Command } = require("commander");
const { classifyWithModelPath } = require("./classifier-core");

function readInputText(options) {
  if (options.text) return options.text;
  if (options.file) return fs.readFileSync(path.resolve(options.file), "utf8");
  throw new Error("입력 문서가 없습니다. --text 또는 --file 옵션을 사용하세요.");
}

function run(options) {
  const text = readInputText(options);
  const result = classifyWithModelPath({
    modelPath: options.model,
    text,
    topK: Number(options.topk || 5),
    topics: Number(options.topics || 6),
    legalPath: options.legal,
  });
  console.log(JSON.stringify(result, null, 2));
}

const program = new Command();
program
  .requiredOption("--model <path>", "model json path")
  .option("--legal <path>", "legal department json path", "data/moel_legal_departments.json")
  .option("--text <text>", "input text")
  .option("--file <path>", "input text file path")
  .option("--topk <number>", "similar reference count", "5")
  .option("--topics <number>", "topic keyword count", "6");

program.parse(process.argv);

try {
  run(program.opts());
} catch (err) {
  console.error("Classify failed:", err.message);
  process.exit(1);
}
