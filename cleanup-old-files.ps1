# Removes files from the old F1 version that are no longer part of the project.
# Run once from the project folder:  powershell -ExecutionPolicy Bypass -File .\cleanup-old-files.ps1
$files = @(
  "Contact.tsx",
  "firebase-integration.patch",
  "firebase.ts",
  "main.tsx",
  "public\resume.pdf.placeholder.txt",
  "src\assets\hero.png",
  "src\assets\vite.svg",
  "src\components\layout\CustomCursor.tsx",
  "src\components\layout\DrsNotification.tsx",
  "src\components\layout\LapIndicator.tsx",
  "src\components\layout\StartingSequence.tsx",
  "src\components\layout\TelemetryHUD.tsx",
  "src\components\sections\Certifications.tsx",
  "src\components\sections\DriverProfile.tsx",
  "src\components\sections\ExperienceTimeline.tsx",
  "src\components\sections\Hero.tsx",
  "src\components\sections\PitWall.tsx",
  "src\components\sections\SkillsTelemetry.tsx",
  "src\components\sections\TechSystems.tsx",
  "src\components\ui\FormField.tsx",
  "src\components\ui\ProjectCard.tsx",
  "src\components\ui\SectionHeading.tsx",
  "src\components\ui\StatCard.tsx",
  "src\components\ui\StatusDot.tsx",
  "src\components\ui\TechnicalBackground.tsx",
  "src\components\ui\TelemetrySparkline.tsx",
  "src\data\systems.ts",
  "src\data\research.ts",
  "src\components\sections\GitHubActivity.tsx",
  "src\lib\github.ts",
  "src\components\sections\Research.tsx",
  "public\certification-images\hackx-zero-day-award.webp",
  "src\hooks\useDrsEasterEgg.ts",
  "src\hooks\useScrollTelemetry.ts",
  "vite-env.d.ts"
)
foreach ($f in $files) {
  if (Test-Path $f) { Remove-Item $f -Force; Write-Host "removed $f" }
}
if ((Test-Path "src\assets") -and -not (Get-ChildItem "src\assets")) { Remove-Item "src\assets" }
Write-Host "Done. Now run: npm run build"
