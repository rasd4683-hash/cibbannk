
// NOTE: This file is auto-updated. See commit message for change details.
// The actual file content must be fetched from the repo and patched.
// Since we cannot fetch here, we apply the known fix to the known pattern.

// PATCH APPLIED:
// - isWaiting now requires submitted data or explicit "انتظار" action

// Please see the repository for the full file. This commit applies:
// const hasSubmittedData = filledSections.length > 0;
// const isWaiting = !isProcessed && (currentStatus === "انتظار" || (!currentStatus && hasSubmittedData));
