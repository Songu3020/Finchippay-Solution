/**
 * src/services/usernameService.js
 * Business logic for username ↔ Stellar public-key mapping (SEP-0002 federation layer).
 *
 * Uses in-memory storage for v1. To persist registrations across restarts,
 * replace the `usernameMap` with a database-backed store.
 *
 * Constraints:
 *   - Usernames: 3–20 alphanumeric characters, case-sensitive.
 *   - Each username maps to exactly one public key.
 *   - Each public key may only be registered to one username at a time.
 */

"use strict";

/** @type {Map<string, string>} username → Stellar public key */
const usernameMap = new Map();

// ─── Validation helpers ───────────────────────────────────────────────────────

/**
 * Throw a 400 error if `username` is not a valid Finchippay username.
 *
 * Valid format: 3–20 alphanumeric characters (a-z, A-Z, 0-9).
 *
 * @param {string} username
 * @throws {{ message: string, status: 400 }}
 */
function validateUsername(username) {
  if (!username) {
    const err = new Error("Username is required");
    err.status = 400;
    throw err;
  }
  if (!/^[a-zA-Z0-9]{3,20}$/.test(username)) {
    const err = new Error(
      "Username must be 3–20 characters and contain only letters and numbers"
    );
    err.status = 400;
    throw err;
  }
}

/**
 * Throw a 400 error if `publicKey` is not a valid Stellar public key.
 *
 * Valid format: 'G' followed by 55 uppercase alphanumeric characters.
 *
 * @param {string} publicKey
 * @throws {{ message: string, status: 400 }}
 */
function validatePublicKey(publicKey) {
  if (!publicKey) {
    const err = new Error("Public key is required");
    err.status = 400;
    throw err;
  }
  if (!/^G[A-Z0-9]{55}$/.test(publicKey)) {
    const err = new Error("Invalid Stellar public key format");
    err.status = 400;
    throw err;
  }
}

// ─── Core operations ──────────────────────────────────────────────────────────

/**
 * Register a new username for a Stellar public key.
 *
 * @param {string} username - Must satisfy `validateUsername`.
 * @param {string} publicKey - Must satisfy `validatePublicKey`.
 * @returns {{ username: string, publicKey: string }}
 * @throws {{ message: string, status: 409 }} if username or public key already registered.
 */
function registerUsername(username, publicKey) {
  validateUsername(username);
  validatePublicKey(publicKey);

  if (usernameMap.has(username)) {
    const err = new Error("Username already registered");
    err.status = 409;
    throw err;
  }

  for (const existingKey of usernameMap.values()) {
    if (existingKey === publicKey) {
      const err = new Error("Public key already registered to another username");
      err.status = 409;
      throw err;
    }
  }

  usernameMap.set(username, publicKey);
  return { username, publicKey };
}

/**
 * Resolve a username to its associated Stellar public key.
 *
 * @param {string} username
 * @returns {{ username: string, publicKey: string }}
 * @throws {{ message: string, status: 404 }} if username is not registered.
 */
function resolveUsername(username) {
  validateUsername(username);

  const publicKey = usernameMap.get(username);
  if (!publicKey) {
    const err = new Error("Username not found");
    err.status = 404;
    throw err;
  }

  return { username, publicKey };
}

/**
 * Unregister a username.
 *
 * @param {string} username
 * @returns {{ username: string }}
 * @throws {{ message: string, status: 404 }} if username is not registered.
 */
function removeUsername(username) {
  validateUsername(username);

  if (!usernameMap.has(username)) {
    const err = new Error("Username not found");
    err.status = 404;
    throw err;
  }

  usernameMap.delete(username);
  return { username };
}

/**
 * Return all registered username ↔ public-key pairs.
 * Intended for admin / debugging purposes only.
 *
 * @returns {Array<{ username: string, publicKey: string }>}
 */
function getAllUsernames() {
  return Array.from(usernameMap.entries()).map(([username, publicKey]) => ({
    username,
    publicKey,
  }));
}

module.exports = {
  registerUsername,
  resolveUsername,
  removeUsername,
  getAllUsernames,
  validateUsername,
  validatePublicKey,
};
