export const Api = {
  async getColors(): Promise<string[]> {
    // We mock this method, so this shouldn't happen
    console.log("Calling real Api.getData()");
    return [];
  },
};
