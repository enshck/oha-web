let _token: string | null = null;

/**
 * In-memory storage for the current authentication token.
 */
export const tokenHandler = {
  /**
   * Retrieves the stored access token.
   *
   * @returns {string|null} The current token, or null if none is set.
   */
  get: (): string | null => _token,

  /**
   * Stores a new access token in memory.
   *
   * @param {string} token - The token to store.
   */
  set: (token: string): void => {
    _token = token;
  },

  /**
   * Clears the stored access token.
   */
  clear: (): void => {
    _token = null;
  },
};
