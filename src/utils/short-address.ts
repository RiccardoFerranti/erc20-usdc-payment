/**
 * Shortens an Ethereum address by keeping the first 6 and last 4 characters and adding ellipsis in between.
 *
 * @param {string} address - The full Ethereum address to shorten.
 * @returns {string} The shortened address, e.g., '0x1234...cdef'.
 */

export function shortenAddress(address: string) {
  return address.slice(0, 6) + "..." + address.slice(-4);
}
