export async function truncateTables(): Promise<void> {
  try {
  } catch (error) {
    throw new Error(`ERROR: Cleaning test db: ${error}`);
  }
}
