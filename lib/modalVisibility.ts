export function registerModalVisibility() {
  if (typeof document === "undefined") {
    return () => {};
  }

  const currentCount = Number(document.body.dataset.sevenModalCount ?? "0");
  const nextCount = currentCount + 1;

  document.body.dataset.sevenModalCount = String(nextCount);
  document.body.dataset.sevenModalOpen = "true";

  return () => {
    const updatedCount = Math.max(0, Number(document.body.dataset.sevenModalCount ?? "1") - 1);

    if (updatedCount === 0) {
      delete document.body.dataset.sevenModalCount;
      delete document.body.dataset.sevenModalOpen;
      return;
    }

    document.body.dataset.sevenModalCount = String(updatedCount);
    document.body.dataset.sevenModalOpen = "true";
  };
}
